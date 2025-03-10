import sys
import js
import micropip
import json
import os
import shutil
import traceback
import time

from importlib import import_module, reload
from io import StringIO
from pathlib import Path

def log(message):
    js.postMessage(json.dumps({"std_output": message}))


requirements_list = json.loads(requirements)
try:
    try:
        import robot
        from robot.libdocpkg import LibraryDocumentation
        from robot.conf import RobotSettings
    except ImportError:
        robot = None

    if robot is None:
        log(f"Install Robot Framework")
        if not [req for req in requirements_list if req.split('==')[0] == 'robotframework']:
            rf_version = f"=={version}" if version else ""
            requirements_list.insert(0, f"robotframework{rf_version}")
        try:
            await micropip.install(requirements_list, keep_going=True)
            time.sleep(1)
            import robot
            from robot.libdocpkg import LibraryDocumentation
            from robot.conf import RobotSettings
            log(f" = version {robot.__version__}\n")
        except Exception as e:
            js.console.log(f"Installation Exception: {e}")
            js.console.log(traceback.format_exc())
            log(f"\n{traceback.format_exc()}")
            raise e
        if requirements_list:
            log(f"Installed Requirements: {requirements_list}\n")

    os.chdir("/")
    dirname = "/robot_files"
    if os.path.exists(dirname):
        js.console.log("Clean up working dir.")
        shutil.rmtree(dirname)
    os.makedirs(dirname)
    os.chdir(dirname)
    sys.path.append(os.getcwd())
    js.console.log(f"Python working dir: {os.getcwd()}")


    class Listener:

        ROBOT_LISTENER_API_VERSION = 2

        def _post_message(self):
            log(sys.stdout.getvalue())
            sys.__stdout__.truncate(0)

        def library_import(self, name, attrs):
            self._gen_libdoc(attrs["source"])

        def resource_import(self, name, attrs):
            self._gen_libdoc(attrs["source"])

        def _gen_libdoc(self, source):
            try:
                if not robot.__version__.startswith("3"):
                    libdoc = LibraryDocumentation(source)
                    js.postMessage(json.dumps({"libdocJson": libdoc.to_json()}))
            except:
                pass

        def start_suite(self, name, args):
            self._post_message()

        def start_test(self, name, args):
            self._post_message()

        def start_keyword(self, name, args):
            self._post_message()

        def end_keyword(self, name, args):
            self._post_message()

        def end_test(self, name, args):
            self._post_message()

        def end_suite(self, name, args):
            self._post_message()

        def close(self):
            self._post_message()


    try:

        def write_file(file):
            with open(file["fileName"], "w") as f:
                js.console.log(f'Writing file {file["fileName"]} to folder {dirname}.')
                f.writelines(file["content"])

        file_list = json.loads(file_catalog)
        robot_arguments = json.loads(robot_args)

        for file in file_list:
            write_file(file)
        js.console.log(f"Files in working dir: {os.listdir('.')}")
        result = -2

        console_links_enabled = "ConsoleLinks" in RobotSettings._cli_opts

        try:
            if test_case_name:
                kwargs = {"test": test_case_name}
                testcli = f' --test "{test_case_name}"'
            else:
                kwargs = {}
                testcli = ""

            if robot_arguments:
                log(f"Robot Run Arguments: {robot_args}\n")
                log(f"\nRunning Robot Framework:\n")
                if console_links_enabled:
                    robot_arguments["consolelinks"] = 'off'
            else:
                log(f"> robot --loglevel TRACE:INFO --exclude EXCL --skip SKIP\n"
                    f"  --removekeywords tag:REMOVE --flattenkeywords tag:FLAT{testcli} .\n")
                if console_links_enabled:
                    kwargs["consolelinks"] = 'off'

            org_stdout = sys.__stdout__
            org_stderr = sys.__stderr__
            sys.stdout = sys.__stdout__ = StringIO()
            sys.stderr = sys.__stderr__ = sys.__stdout__
            for file in file_list:
                file_name, file_ext = os.path.splitext(
                    file["fileName"]
                )  # TODO: does not work correctly
                if file_ext == ".py":
                    js.console.log(f'reimporting: {file["fileName"]}')
                    m = import_module(file_name)
                    m = reload(m)
            if robot_arguments:
                robot_arguments["listener"] = [Listener()] + robot_arguments.get("listener", [])
                robot_arguments["consolecolors"] = "ansi"
                result = robot.run(
                    ".",
                    outputdir="/results",
                    **robot_arguments
                )
            else:
                result = robot.run(
                    ".",
                    consolecolors="ansi",
                    listener=[Listener()],
                    loglevel="TRACE:INFO",
                    exclude="EXCL",
                    skip="SKIP",
                    removekeywords="tag:REMOVE",
                    flattenkeywords="tag:FLAT",
                    outputdir="/results",
                    **kwargs,
                )
            js.console.log(f"result: {result}")
        except Exception as e:
            js.console.log(f"Robot Run Exception: {e}")
            js.console.log(traceback.format_exc())
            traceback.print_exc(file=sys.__stdout__)
        finally:
            std_output = sys.__stdout__.getvalue()
            sys.__stdout__ = org_stdout
            sys.stdout = sys.__stdout__
            log(std_output)

        with open("/results/log.html", "r", encoding="UTF-8") as f:
            log_html = str(f.read())

        with open("/results/report.html", "r") as f:
            report_html = str(f.read())

        js.postMessage(
            json.dumps(
                {"log_html": log_html, "report_html": report_html, "std_output": std_output}
            )
        )

    except Exception as e:
        print("Exception:")
        js.console.log(traceback.format_exc())
        js.postMessage(json.dumps({}))
except Exception as e:
    pass