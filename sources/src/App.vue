<template>
    <div class="row no-gutters">
     <div class="col-md-2">
         <navigation-vertical :pages="pages"/>
     </div>

    <div class="col-md-10" id="scroller"
    ref="content" style="position:relative;height:100vh;overflow-y:scroll;overflow-x:hidden;-webkit-overflow-scrolling: touch;">
        <app-header/>
        <page-block v-for="(page, index) in pages"
          v-bind:page="page"
          v-bind:index="index"
          v-bind:key="index"
          class="pl-md-5 px-lg-2 p-sm-3 py-5 p-xs-1"/>
        <app-footer class="mt-0 py-5"/>
      </div>
    </div>
</template>
<script>
import PageBlock from "@/components/PageBlock.vue";

export default {
  components: {
    PageBlock
  },
  data() {
    return {
      pages: [
        {
          title: "Introduction",
          text_block: true,
          tab_box: false,
          feature_box: false,
          data: {
            text: {
              twitter: true,
              header: "Introduction",
              text:
                '<p> <b>Robot Framework</b> is a generic open source automation framework for acceptance testing, acceptance test driven development (ATDD), and robotic process automation (RPA). It has easy-to-use tabular test data syntax and it utilizes the keyword-driven testing approach. Its testing capabilities can be extended by test libraries implemented either with Python or Java, and users can create new higher-level keywords from existing ones using the same syntax that is used for creating test cases. </p> <p> Robot Framework project is hosted on <a href="https://github.com/robotframework/robotframework" target="_blank">GitHub</a> where you can find further documentation, source code, and issue tracker. Downloads are hosted at <a href="https://pypi.python.org/pypi/robotframework" target="_blank">PyPI</a>. The framework has a rich ecosystem around it consisting of various generic <a href="#libraries">test libraries</a> and <a href="#tools">tools</a> that are developed as separate projects. </p> <p> Robot Framework is operating system and application independent. The core framework is implemented using <a href="http://python.org" target="_blank">Python</a> and runs also on <a href="http://jython.org" target="_blank">Jython</a> (JVM) and <a href="http://ironpython.net" target="_blank">IronPython</a> (.NET). </p> <p> Robot Framework itself is open source software released under <a href="http://www.apache.org/licenses/LICENSE-2.0.html" target="_blank">Apache License 2.0</a>, and most of the libraries and tools in the ecosystem are also open source. The framework was initially developed at <a href="http://networks.nokia.com" target="_blank">Nokia Networks</a> and it is nowadays sponsored by <a href="http://robotframework.org/foundation" target="_blank">Robot Framework Foundation</a>. </p>'
            }
          }
        },
        {
          title: "Architecture",
          text_block: false,
          tab_box: false,
          feature_box: true,
          twitter: true,
          hide_from_nav: true,
          data: {
            text: [
              {
                header: "CLEAR",
                text:
                  '<p> Robot Framework has a modular architecture that can be extended with bundled and self-made <a href="#libraries">test libraries</a>. </p> <p> Test data is defined in files using the syntax shown in the <a href="#examples">examples</a> below. A file containing test cases creates a test suite and placing these files into directories creates a nested structure of test suites. </p>'
              },
              {
                header: "EASY",
                text:
                  "<p> When test execution is started, the framework first parses the test data. It then utilizes keywords provided by the test libraries to interact with the system under test. Libraries can communicate with the system either directly or using other test tools as drivers. </p> <p> Test execution is started from the command line. As a result you get report and log in HTML format as well as an XML output. These provide extensive look into what your system does. </p>"
              },
              {
                header: "MODULAR",
                img: require("@/assets/img/architecture.png"),
                img_big: require("@/assets/img/architecture_big.png"),
                text: ""
              }
            ]
          }
        },
        {
          title: "Examples",
          text_block: false,
          tab_box: false,
          feature_box: false,
          data: {
            //Different component, TODO: implement in reproducible component
          }
        },
        {
          title: "Libraries",
          text_block: true,
          tab_box: true,
          feature_box: false,
          data: {
            text: {
              header: "Libraries",
              text:
                '<p> Test libraries provide the actual testing capabilities to Robot Framework by providing keywords. There are several standard libraries that are bundled in with the framework, and galore of separately developed external libraries that can be installed based on your needs. Creating your own test libraries <a href="http://robotframework.org/robotframework/latest/RobotFrameworkUserGuide.html#creating-test-libraries" target="_blank">is a breeze</a>. </p> <p> <a href="https://github.com/robotframework/robotframework.github.com" target="_blank">Let us know</a> if there are useful libraries missing from the list or if a library on the list seems to be unmaintained.</p>'
            },
            tabs: [
              {
                title: "Standard",
                items: [
                  {
                    title: "Builtin",
                    href:
                      "http://robotframework.org/robotframework/#standard-libraries",
                    text:
                      "Provides a set of often needed generic keywords. Always automatically available without imports."
                  },
                  {
                    title: "Dialogs",
                    href:
                      "http://robotframework.org/robotframework/#standard-libraries",
                    text:
                      "Provides means for pausing the test execution and getting input from users."
                  },
                  {
                    title: "Collections",
                    href:
                      "http://robotframework.org/robotframework/#standard-libraries",
                    text:
                      "Provides a set of keywords for handling Python lists and dictionaries."
                  },
                  {
                    title: "OperatingSystem",
                    href:
                      "http://robotframework.org/robotframework/#standard-libraries",
                    text:
                      "Enables various operating system related tasks to be performed in the system where Robot Framework is running."
                  },
                  {
                    title: "Remote",
                    href: "https://github.com/robotframework/RemoteInterface",
                    text:
                      "Special library acting as a proxy between Robot Framework and test libraries elsewhere. Actual test libraries can be running on different machines and be implemented using any programming language supporting XML-RPC protocol."
                  },
                  {
                    title: "Screenshot",
                    href:
                      "http://robotframework.org/robotframework/#standard-libraries",
                    text:
                      "Provides keywords to capture screenshots of the desktop."
                  },
                  {
                    title: "String",
                    href:
                      "http://robotframework.org/robotframework/#standard-libraries",
                    text:
                      "Library for generating, modifying and verifying strings."
                  },
                  {
                    title: "Telnet",
                    href:
                      "http://robotframework.org/robotframework/#standard-libraries",
                    text:
                      "Makes it possible to connect to Telnet servers and execute commands on the opened connections."
                  },
                  {
                    title: "XML",
                    href:
                      "http://robotframework.org/robotframework/#standard-libraries",
                    text:
                      "Library for generating, modifying and verifying XML files."
                  },
                  {
                    title: "Process",
                    href:
                      "http://robotframework.org/robotframework/#standard-libraries",
                    text:
                      "Library for running processes in the system. New in Robot Framework 2.8."
                  },
                  {
                    title: "DateTime",
                    href:
                      "http://robotframework.org/robotframework/#standard-libraries",
                    text:
                      "Library for date and time conversions. New in Robot Framework 2.8.5."
                  }
                ]
              },
              {
                title: "External",
                items: [
                  {
                    title: "Android library",
                    href:
                      "https://github.com/lovelysystems/robotframework-androidlibrary#readme",
                    text:
                      "Library for all your Android automation needs. It uses Calabash Android internally."
                  },
                  {
                    title: "AnywhereLibrary",
                    href:
                      "https://github.com/luisxiaomai/robotframework-anywherelibrary",
                    text:
                      "Library for testing Single-Page Apps (SPA). Uses Selenium Webdriver and Appium internally."
                  },
                  {
                    title: "AppiumLibrary",
                    href:
                      "https://github.com/jollychang/robotframework-appiumlibrary",
                    text:
                      "Library for Android- and iOS-testing. It uses Appium internally."
                  },
                  {
                    title: "Archive library",
                    href:
                      "https://github.com/bulkan/robotframework-archivelibrary",
                    text: "Library for handling zip- and tar-archives."
                  },
                  {
                    title: "AutoItLibrary",
                    href:
                      "http://code.google.com/p/robotframework-autoitlibrary/",
                    text:
                      "Windows GUI testing library that uses AutoIt freeware tool as a driver."
                  },
                  {
                    title: "CncLibrary",
                    href:
                      "https://github.com/eficode/robotframework-cnclibrary",
                    text: "Library for driving a CNC milling machine."
                  },
                  {
                    title: "Database Library (Java)",
                    href: "https://github.com/Hi-Fi/robotframework-dblibrary",
                    text:
                      'Java-based library for database testing. Usable with Jython. Available also at <a href="http://search.maven.org/#search%7Cga%7C1%7Ca%3A%22robotframework-dblibrary%22" target="_blank">Maven central</a>.'
                  },
                  {
                    title: "Database Library (Python)",
                    href:
                      "http://franz-see.github.com/Robotframework-Database-Library/",
                    text:
                      "Python based library for database testing. Works with any Python interpreter, including Jython."
                  },
                  {
                    title: "DataDriver Library",
                    href:
                      "https://github.com/Snooz82/robotframework-datadriver",
                    text:
                      "Library for Data-Driven Testing with external data tables (csv, xls, xlsx, etc.). Pairwise Combinatorial Testing support."
                  },
                  {
                    title: "Debug Library",
                    href:
                      "https://github.com/xyb/robotframework-debuglibrary",
                    text:
                      "A debug library for RobotFramework, which can be used as an interactive shell(REPL) also."
                  },
                  {
                    title: "Diff Library",
                    href:
                      "https://github.com/bulkan/robotframework-difflibrary",
                    text: "Library to diff two files together."
                  },
                  {
                    title: "Django Library",
                    href:
                      "https://pypi.python.org/pypi/robotframework-djangolibrary",
                    text:
                      'Library for <a href="https://www.djangoproject.com/" target="_blank">Django</a>, a Python web framework.'
                  },
                  {
                    title: "Eclipse Library",
                    href:
                      "https://github.com/lcarbonn/robotframework-eclipselibrary/",
                    text:
                      "Library for testing Eclipse RCP applications using SWT widgets."
                  },
                  {
                    title: "robotframework-faker",
                    href: "https://pypi.python.org/pypi/robotframework-faker/",
                    text:
                      'Library for <a href="https://github.com/joke2k/faker" target="_blank">Faker</a>, a fake test data generator.'
                  },
                  {
                    title: "FTP library",
                    href:
                      "https://github.com/kowalpy/Robot-Framework-FTP-Library",
                    text:
                      "Library for testing and using FTP server with Robot Framework."
                  },
                  {
                    title: "HTTP library (livetest)",
                    href:
                      "https://github.com/peritus/robotframework-httplibrary/#readme",
                    text:
                      "Library for HTTP level testing using livetest tool internally."
                  },
                  {
                    title: "HTTP library (Requests)",
                    href:
                      "https://github.com/bulkan/robotframework-requests/#readme",
                    text:
                      "Library for HTTP level testing using Request internally."
                  },
                  {
                    title: "HttpRequestLibrary (Java)",
                    href:
                      "https://github.com/Hi-Fi/robotframework-httprequestlibrary#readme",
                    text:
                      'Library for HTTP level testing using Apache HTTP client. Available also at <a href="http://search.maven.org/#search%7Cga%7C1%7Ca%3A%22robotframework-httprequestlibrary%22" target="_blank">Maven central</a>.'
                  },
                  {
                    title: "iOS library",
                    href:
                      "https://github.com/lovelysystems/robotframework-ioslibrary#readme",
                    text:
                      "Library for all your iOS automation needs. It uses Calabash iOS Server internally."
                  },
                  {
                    title: "ImageHorizonLibrary",
                    href:
                      "https://github.com/eficode/robotframework-imagehorizonlibrary#readme",
                    text:
                      "Cross-platform, pure Python library for GUI automation based on image recognition."
                  },
                  {
                    title: "JavaFXLibrary",
                    href: "https://github.com/eficode/JavaFXLibrary#readme",
                    text:
                      'Library for testing JavaFX applications, based on <a href="https://github.com/TestFX/TestFX" target="_blank">TestFX</a>. Has also remote interface support.'
                  },
                  {
                    title: "MongoDB library",
                    href:
                      "https://github.com/iPlantCollaborativeOpenSource/Robotframework-MongoDB-Library#readme",
                    text: "Library for interacting with MongoDB using pymongo."
                  },
                  {
                    title: "Mainframe3270 Library",
                    href:
                      "https://github.com/Altran-PT-GDC/Robot-Framework-Mainframe-3270-Library/blob/master/README.md",
                    text: "Library that allows to create automated test scripts to test IBM Mainframe 3270."
                  },
                  {
                    title: "MQTT library",
                    href:
                      "https://github.com/randomsync/robotframework-mqttlibrary#readme",
                    text: "Library for testing MQTT brokers and applications."
                  },
                  {
                    title: "NcclientLibrary",
                    href: "https://github.com/vkosuri/robotframework-ncclient",
                    text: "https://github.com/ncclient/ncclient"
                  },
                  {
                    title: "Rammbock",
                    href: "https://github.com/robotframework/Rammbock#readme",
                    text:
                      "Generic network protocol test library that offers easy way to specify network packets and inspect the results of sent and received packets."
                  },
                  {
                    title: "RemoteSwingLibrary",
                    href:
                      "https://github.com/robotframework/remoteswinglibrary",
                    text:
                      "Library for testing and connecting to a java process and using SwingLibrary, especially Java Web Start applications."
                  },
                  {
                    title: "RESTinstance",
                    href: "https://github.com/asyrjasalo/RESTinstance/",
                    text: "Robot Framework test library for HTTP JSON APIs."
                  },
                  {
                    title: "SapGuiLibrary",
                    href: "https://github.com/frankvanderkuur/robotframework-sapguilibrary/",
                    text:
                      "Library for testing the SAPGUI client using the internal SAP Scripting Engine"
                  },
                  {
                    title: "Selenium2Screenshots",
                    href: "https://pypi.org/project/robotframework-selenium2screenshots",
                    text: "Library for capturing annotated screenshots with Selenium2Library."
                  },
                  {
                    title: "SeleniumLibrary",
                    href: "http://github.com/robotframework/SeleniumLibrary/",
                    text:
                      "Web testing library that uses popular Selenium tool internally."
                  },
                  {
                    title: "Selenium2Library",
                    href: "https://github.com/robotframework/Selenium2Library",
                    text:
                      "Web testing library that uses Selenium 2. Library is deprecated; users should upgrade to SeleniumLibrary described above."
                  },
                  {
                    title: "Selenium2Library for Java",
                    href:
                      "https://github.com/MarkusBernhardt/robotframework-selenium2library-java#readme",
                    text: "Java port of the Selenium2Library."
                  },
                  {
                    title: "ExtendedSelenium2Library",
                    href:
                      "https://github.com/rickypc/robotframework-extendedselenium2library",
                    text:
                      "Web testing library that uses Selenium2Library internally, providing AngularJS support on top of it."
                  },
                  {
                    title: "SikuliLibrary",
                    href:
                      "https://github.com/rainmanwy/robotframework-SikuliLibrary#readme",
                    text:
                      'Sikuli Robot Framework Library provide keywords to test UI through <a href="http://sikulix.com/" target="_blank">Sikulix</a>. This library supports Python 2.x and 3.x.'
                  },
                  {
                    title: "SSHLibrary",
                    href: "https://github.com/robotframework/SSHLibrary",
                    text:
                      "Enables executing commands on remote machines over an SSH connection. Also supports transfering files using SFTP."
                  },
                  {
                    title: "SudsLibrary",
                    href:
                      "https://github.com/ombre42/robotframework-sudslibrary#readme",
                    text:
                      "A library for functional testing of SOAP-based web services based on Suds, a dynamic SOAP 1.1 client."
                  },
                  {
                    title: "SwingLibrary",
                    href: "https://github.com/robotframework/SwingLibrary/wiki",
                    text:
                      "Library for testing Java applications with Swing GUI."
                  },
                  {
                    title: "TestFX Library",
                    href:
                      "https://github.com/Altran-PT-GDC/Robot-Framework-Test-FX-Library",
                    text:
                      'Library to enable to test Java FX applications using the <a href="https://github.com/TestFX/TestFX" target="_blank">TestFX framework</a>. Has also remote interface support.'
                  },
                  {
                    title: "TFTPLibrary",
                    href:
                      "https://github.com/kowalpy/Robot-Framework-TFTP-Library",
                    text:
                      'Library for interacting over <a href="https://en.wikipedia.org/wiki/Trivial_File_Transfer_Protocol" target="_blank">Trivial File Transfer Portocol</a>.'
                  },
                  {
                    title: "WhiteLibrary",
                    href:
                      "https://github.com/Omenia/robotframework-whitelibrary",
                    text:
                      'Library for automating Windows GUI. Based on White framework, supported technologies include Win32, WinForms, and WPF.'
                  },
                  {
                    title: "watir-robot",
                    href: "https://github.com/semperos/watir-robot/#readme",
                    text: "Web testing library that uses Watir tool."
                  }
                ]
              },
              {
                title: "Other",
                items: [
                  {
                    title: "Creating test libraries",
                    href:
                      "http://robotframework.org/robotframework/latest/RobotFrameworkUserGuide.html#creating-test-libraries",
                    text:
                      "Creating test libraries section in Robot Framework User Guide."
                  },
                  {
                    title: "plone.app.robotframework",
                    href:
                      "https://pypi.python.org/pypi/plone.app.robotframework",
                    text:
                      "Provides resources and tools for writing functional Selenium tests for Plone CMS and its add-ons."
                  },
                  {
                    title: "JavalibCore",
                    href: "https://github.com/robotframework/JavalibCore/wiki",
                    text:
                      "Base for implementing larger Java based test libraries for Robot Framework."
                  },
                  {
                    title: "Remote",
                    href: "https://github.com/robotframework/RemoteInterface",
                    text:
                      "Built-in special library acting as a proxy between Robot Framework and test libraries elsewhere. Actual test libraries can be running on different machines and be implemented using any programming language supporting XML-RPC protocol."
                  },
                  {
                    title: "RemoteApplications",
                    href:
                      "https://github.com/robotframework/RemoteApplications",
                    text:
                      "Special test library for launching Java applications on a separate JVM and taking other libraries into use on them."
                  }
                ]
              }
            ]
          }
        },
        {
          title: "Tools",
          text_block: true,
          tab_box: true,
          feature_box: false,
          data: {
            text: {
              header: "Tools",
              text:
                '<p> Supporting tools ease everything surrounding tests: editing, running, building and so on. Most of these tools are developed as separate projects, but some are built into the framework itself. </p> <p> <a href="https://github.com/robotframework/robotframework.github.com" target="_blank">Let us know</a> if there are useful tools missing from the list. </p>'
            },
            tabs: [
              {
                title: "BUILT-IN",
                items: [
                  {
                    title: "Rebot",
                    href:
                      "http://robotframework.org/robotframework/#built-in-tools",
                    text:
                      "Tool for generating logs and reports based on XML outputs and for combining multiple outputs together."
                  },
                  {
                    title: "Libdoc",
                    href:
                      "http://robotframework.org/robotframework/#built-in-tools",
                    text:
                      "Tool for generating keyword documentation for test libraries and resource files."
                  },
                  {
                    title: "Testdoc",
                    href:
                      "http://robotframework.org/robotframework/#built-in-tools",
                    text:
                      "Generates high level HTML documentation based on Robot Framework test cases."
                  },
                  {
                    title: "Tidy",
                    href:
                      "http://robotframework.org/robotframework/#built-in-tools",
                    text:
                      "Tool for cleaning up and changing format of Robot Framework test data files."
                  }
                ]
              },
              {
                title: "EDITORS",
                items: [
                  {
                    title: "RIDE",
                    text: "Standalone Robot Framework test data editor.",
                    href: "https://github.com/robotframework/RIDE/wiki"
                  },
                  {
                    title: "Atom plugin",
                    text: "Robot Framework plugin for Atom.",
                    href: "https://atom.io/packages/language-robot-framework"
                  },
                  {
                    title: "Brackets plugin",
                    text: "Robot Framework plugin for Brackets.",
                    href:
                      "https://github.com/boakley/brackets-robotframework/wiki"
                  },
                  {
                    title: "Eclipse plugin",
                    text: "Robot Framework plugin for Eclipse IDE.",
                    href:
                      "https://github.com/NitorCreations/RobotFramework-EclipseIDE/wiki"
                  },
                  {
                    title: "Emacs major mode",
                    text: "Emacs major mode for editing tests.",
                    href: "https://github.com/sakari/robot-mode"
                  },
                  {
                    title: "Gedit",
                    text: "Syntax highlighting for Gedit.",
                    href: "https://github.com/vkosuri/gedit-robot"
                  },
                  {
                    title: "Robot Plugin for IntelliJ IDEA",
                    text: "For IntelliJ IDEA-based editors by JIVE Software.",
                    href: "http://plugins.jetbrains.com/plugin/7430"
                  },
                  {
                    title: "Robot Support for IntelliJ IDEA",
                    text:
                      "For IntelliJ IDEA-based editors by Valerio Angelini.",
                    href: "http://plugins.jetbrains.com/plugin/7415"
                  },
                  {
                    title: "Notepad++",
                    text: "Syntax highlighting for Notepad++.",
                    href: "https://github.com/vkosuri/lang-robot"
                  },
                  {
                    title: "RED",
                    text: "Eclipse based editor with a debugger by Nokia.",
                    href: "https://github.com/nokia/RED"
                  },
                  {
                    title: "TextMate bundle",
                    text: "Bundle for TextMate adding syntax highlighting.",
                    href: "https://bitbucket.org/jussimalinen/robot.tmbundle/"
                  },
                  {
                    title: "Sublime assistant",
                    text:
                      "A plugin for Sublime Text 2 &amp; 3 by Andriy Hrytskiv.",
                    href:
                      "https://github.com/andriyko/sublime-robot-framework-assistant"
                  },
                  {
                    title: "Sublime plugin",
                    text: "A plugin for Sublime Text 2 by Mike Gershunovsky.",
                    href: "https://github.com/shellderp/sublime-robot-plugin"
                  },
                  {
                    title: "Vim plugin",
                    text: "Vim plugin for development with Robot Framework.",
                    href: "https://github.com/mfukar/robotframework-vim"
                  },
                  {
                    title: "Intellisense for Visual Studio Code",
                    text: "A Visual Studio Code extension that supports Robot Framework development.",
                    href: "https://marketplace.visualstudio.com/items?itemName=TomiTurtiainen.rf-intellisense"
                  }
                ]
              },
              {
                title: "BUILD TOOLS",
                items: [
                  {
                    title: "Jenkins plugin",
                    href:
                      "https://wiki.jenkins-ci.org/display/JENKINS/Robot+Framework+Plugin",
                    text:
                      "Plugin to collect and publish Robot Framework test results in Jenkins."
                  },
                  {
                    title: "Maven plugin",
                    href: "http://robotframework.github.com/MavenPlugin/",
                    text: "Maven plugin for using Robot Framework."
                  },
                  {
                    title: "Ant task",
                    href: "http://code.google.com/p/robotframework-ant/",
                    text: "Ant task for running Robot Framework tests."
                  }
                ]
              },
              {
                title: "OTHER",
                items: [
                  {
                    title: "Fixml",
                    href: "https://bitbucket.org/robotframework/fixml",
                    text:
                      "Tool for fixing Robot Framework output files that are broken."
                  },
                  {
                    title: "Pabot",
                    href: "https://github.com/mkorpela/pabot",
                    text: "A parallel executor for Robot Framework test cases."
                  },
                  {
                    title: "Mabot",
                    href: "http://github.com/robotframework/mabot/",
                    text:
                      "Tool for reporting manual tests in format compatible with Robot Framework outputs."
                  },
                  {
                    title: "RFDoc",
                    href: "http://github.com/robotframework/rfdoc",
                    text:
                      "Web based system for storing and searching Robot Framework test library and resource file documentations."
                  },
                  {
                    title: "Robot Framework Hub",
                    href: "https://github.com/boakley/robotframework-hub/wiki",
                    text:
                      "Lightweight web server that provides access to the Robot Framework test assets via browser."
                  },
                  {
                    title: "Robot Tools",
                    href: "https://bitbucket.org/robotframework/robottools",
                    text:
                      "Collection of supporting tools that can be used with Robot Framework."
                  },
                  {
                    title: "SAGE Framework",
                    href: "https://www.nrl.navy.mil/itd/imda/products/sage",
                    text:
                      "Multi-agent based extension to Robot Framework. Agent based systems make it possible to test distributed systems such as Service Oriented Architecture systems. SAGE Provides a library of Robot Framework keywords for creating and managing SAGE agent networks as well as collecting and reporting results from remote agents."
                  },
                  {
                    title: "Robot Corder",
                    href: "https://github.com/sohwendy/Robotcorder",
                    text:
                      "Robot Corder generates Robot Framework test script by recording user interactions and scanning the html page in your Chrome browser. It aims to be equivalent of Selenium IDE for RobotFramework browser test automation."
                  },
                  {
                    title: "Robot Framework Lexer",
                    href: "https://bitbucket.org/robotframework/pygmentslexer",
                    text:
                      "Robot Framework syntax highlighting with Pygments. Link is to the lexer project itself, but the lexer is part of Pygments from version 1.6 onwards."
                  },
                  {
                    title: "DbBot",
                    href: "https://github.com/robotframework/DbBot",
                    text:
                      "Tool for serializing Robot Framework test results, i.e. output.xml files, into a SQLite database. It serves a good starting point to create your own reporting and analyzing tools."
                  },
                  {
                    title: "StatusChecker",
                    href: "https://github.com/robotframework/statuschecker/",
                    text:
                      "A tool for validation that executed Robot Framework test cases have expected statuses and log messages. Mainly targeted for test library developers."
                  }
                ]
              }
            ]
          }
        },
        {
          title: "Documentation",
          text_block: true,
          tab_box: true,
          feature_box: false,
          data: {
            text: {
              header: "Documentation",
              text:
                '<p> Want to get started? Looking for a way to do things? Here are the most important documentation resources needed to work with Robot Framework. Notice that individual <a href="#libraries">test libraries</a> and <a href="#tools">tools</a> in the ecosystem have their own documentation that is typically accessed via their project pages. </p> <p> <a href="https://github.com/robotframework/robotframework.github.com" target="_blank">Let us know</a> if there are useful links missing from the list. </p>'
            },
            tabs: [
              {
                title: "Getting started",
                items: [
                  {
                    title: "Installation Instructions",
                    href:
                      "https://github.com/robotframework/robotframework/blob/master/INSTALL.rst",
                    text:
                      "If you are familiar with Python and pip, just run <code>pip install robotframework</code>. Notice that external libraries and tools need to be installed separately."
                  },
                  {
                    title: "Introduction Slides",
                    href:
                      "http://www.slideshare.net/pekkaklarck/robot-framework-introduction",
                    text: "Generic Robot Framework introduction slides."
                  },
                  {
                    title: "Quick Start Guide",
                    href:
                      "https://github.com/robotframework/QuickStartGuide/blob/master/QuickStart.rst",
                    text:
                      "Introduces the most important features of Robot Framework and acts as an executable demo."
                  },
                  {
                    title: "User Guide",
                    href:
                      "http://robotframework.org/robotframework/#user-guide",
                    text:
                      "Reference manual explaining all Robot Framework features in detail."
                  },
                  {
                    title: "How to write good test cases",
                    href:
                      "https://github.com/robotframework/HowToWriteGoodTestCases/blob/master/HowToWriteGoodTestCases.rst",
                    text:
                      "Guidelines for writing good test cases using Robot Framework."
                  },
                  {
                    title: "Dos And Don'ts",
                    href:
                      "http://www.slideshare.net/pekkaklarck/robot-framework-dos-and-donts",
                    text:
                      "Slide set loosely based on 'How to write good test cases' guidelines."
                  },
                  {
                    title: "Public API",
                    href: "http://robot-framework.readthedocs.org/en/latest/",
                    text:
                      "Public API for writing your own tools against Robot Framework."
                  }
                ]
              },
              {
                title: "Demos",
                items: [
                  {
                    title: "Web Demo",
                    href: "https://github.com/robotframework/WebDemo",
                    text:
                      "Demonstrates how to create tests and higher level keywords. The system under test is a simple web page that is tested using SeleniumLibrary."
                  },
                  {
                    title: "Robot Demo",
                    href: "https://github.com/robotframework/RobotDemo",
                    text:
                      "Demonstrates how to create tests and test libraries. The system under test is a simple calculator that is tested using a custom library."
                  },
                  {
                    title: "Quick Start Guide",
                    href:
                      "https://github.com/robotframework/QuickStartGuide/blob/master/QuickStart.rst",
                    text:
                      "Introduces the most important features of Robot Framework and acts as an executable demo."
                  },
                  {
                    title: "ATDD with Robot Framework",
                    href:
                      "https://code.google.com/p/atdd-with-robot-framework/",
                    text:
                      "How to use Robot Framework for Acceptance Test Driven Development (ATDD) a.k.a. Specification by Example."
                  },
                  {
                    title: "Using C with Robot Framework",
                    href: "https://bitbucket.org/robotframework/cdemo",
                    text:
                      "This simple example demonstrates how to use C language from Robot Framework test libraries."
                  },
                  {
                    title: "Remote interface demo",
                    href: "https://github.com/jg8481/robotframework-scala-remote-library",
                    text:
                      "Example demonstrates how to use Robot Framework's <a href='https://github.com/robotframework/RemoteInterface' target='_blank'>Remote interface</a> to call test libraries written in any programming language."
                  },
                ]
              },
              {
                title: "Videos",
                items: [
                  {
                    title: "Create Your First Script - Part 1",
                    src: "https://www.youtube.com/embed/T0SK5A1rwdk",
                    href: "http://www.robotframeworktutorial.com",
                    text: ""
                  },
                  {
                    title: "Create Your First Script - Part 2",
                    src: "https://www.youtube.com/embed/LhUre0hu8I8",
                    href: "http://www.robotframeworktutorial.com",
                    text: ""
                  },
                  {
                    title: "Running RF Scripts from Jenkins CI",
                    src: "https://www.youtube.com/embed/819sBbvT6gM",
                    href: "http://www.robotframeworktutorial.com",
                    text: ""
                  },
                  {
                    title: "",
                    src: "//player.vimeo.com/video/93124154",
                    href: "",
                    text: ""
                  },
                  {
                    title: "",
                    src: "//player.vimeo.com/video/94638895",
                    href: "",
                    text: ""
                  },
                  {
                    title: "",
                    src: "//player.vimeo.com/video/96527858",
                    href: "",
                    text: ""
                  }
                ]
              },
              {
                title: "Online courses",
                items: [
                  {
                    title: "eTestingAcademy",
                    href: "http://www.etestingacademy.com/",
                    text:
                      "Offers online courses to groom you from manual engineer to professional test automation developer with Selenium, Appium and Robot Framework."
                  },
                  {
                    title: "Robotframeworktutorial.com",
                    href: "http://www.robotframeworktutorial.com",
                    text:
                      "Offers several paid video training courses that have got 3000+ students in over 90 countries up and running very quickly."
                  }
                ]
              }
            ]
          }
        },
        {
          title: "Support",
          text_block: true,
          tab_box: true,
          feature_box: false,
          data: {
            text: {
              header: "Support",
              text:
                '<p> There are various forums where to ask questions and discuss about Robot Framework and the ecosystem around it in general. There are also several companies around the world that provide paid support, consultation, and training courses related to the framework. </p> <p> <a href="https://github.com/robotframework/robotframework.github.com" target="_blank">Let us know</a> if there is a support forum or a company offering related services you would like to be added here. </p>'
            },
            tabs: [
              {
                title: "General",
                items: [
                  {
                    title: "@robotframework",
                    href: "http://twitter.com/robotframework",
                    text: "Announcements in Twitter."
                  },
                  {
                    title: "#robotframework",
                    href:
                      "http://webchat.freenode.net/?channels=robotframework&amp;prompt=1",
                    text: "#robotframework IRC channel on freenode."
                  },
                  {
                    title: "Slack",
                    href: "https://robotframework-slack-invite.herokuapp.com/",
                    text: "Robot Framework Slack community."
                  },
                  {
                    title: "robotframework-users",
                    href: "http://groups.google.com/group/robotframework-users",
                    text: "Community mailing list."
                  },
                  {
                    title: "Robot Framework issue tracker",
                    href:
                      "https://github.com/robotframework/robotframework/issues",
                    text:
                      "Notice that external libraries and tools developed as separate projects have their own issue trackers."
                  },
                  {
                    title: "Meetup Groups",
                    href:
                      "https://www.meetup.com/pro/robot-framework-foundation",
                    text:
                      "Robot Framework meetup groups around the globe."
                  }
                ]
              },
              {
                title: "Other",
                items: [
                  {
                    title: "LinkedIn",
                    href:
                      "http://www.linkedin.com/groups/Robot-Framework-3710899",
                    text: "Robot Framework group on LinkedIn."
                  },
                  {
                    title: "AT.info",
                    href:
                      "http://automated-testing.info/category/robot-framework",
                    text: "Robot Framework help forum по-русски."
                  },
                  {
                    title: "robotframework-devel",
                    href: "http://groups.google.com/group/robotframework-devel",
                    text:
                      "Mailing list for contributors and developers of the Robot Framework ecosystem."
                  },
                  {
                    title: "Helsinki Meetup group",
                    href: "https://www.meetup.com/Robot-Framework-Helsinki/",
                    text: "Robot Framework Meetup group in Helsinki, Finland."
                  },
                  {
                    title: "Stack Overflow",
                    href:
                      "http://stackoverflow.com/questions/tagged/robotframework",
                    text:
                      "Questions in Stack Overflow tagged with Robot Framework."
                  },
                  {
                    title: "robotframework-announce",
                    href:
                      "http://groups.google.com/group/robotframework-announce",
                    text:
                      "Mailing list for just release announcements, nothing more."
                  }
                ]
              },
              {
                title: "Vendors",
                items: [
                  {
                    title: "Comiq",
                    href: "http://comiq.fi/",
                    text:
                      "Comiq is a Finnish software quality service provider founded in                2003 employing around 60 QA consultants."
                  },
                  {
                    title: "Digia",
                    href: "http://www.digia.com",
                    text:
                      "Digia is a IT service company that helps its customers developing and innovating solutions that support business operations together with customers."
                  },
                  {
                    title: "Eficode",
                    href: "http://www.eficode.com/",
                    text:
                      "Eficode is the leading devops company in Finland relying on automation, virtualisation and smart tool choices."
                  },
                  {
                    title: "Eliga",
                    href: "http://eliga.fi/",
                    text:
                      "Eliga is a one-man company by Pekka Klärck, the lead developer of Robot Framework. It provides top-notch training, consultation and support services related to Robot Framework and Python programming."
                  },
                  {
                    title: "Etteplan",
                    href: "http://www.espotel.com/",
                    text:
                      "Etteplan is a specialist in industrial equipment engineering, embedded systems and IoT and technical documentation solutions and services with deep knowledge in QA from network edge to cloud in Nordics."
                  },
                  {
                    title: "HiQ",
                    href: "http://www.hiqfinland.fi/",
                    text:
                      "HiQ is a Nordic ICT service and consultancy company focusing on streamlining our customers' businesses and simplifying people's lives."
                  },
                  {
                    title: "imbus",
                    href: "https://www.imbus.de/",
                    text:
                      "imbus is a German leading solution partner for professional software testing and intelligent test automation. The portfolio includes consulting for test automation, test tools, and training."
                  },
                  {
                    title: "Knowit",
                    href: "https://www.knowit.fi/",
                    text:
                      "Knowit is a consulting company that helps its clients succeed by operating close and in an innovative, business-oriented way."
                  },
                  {
                    title: "Mykhailo Poliarush",
                    href: "http://poliarush.com/trainings/robotframework",
                    text: "Commercial Robot Framework training по-русски."
                  },
                  {
                    title: "Q-Factory",
                    href: "http://www.q-factory.fi/",
                    text:
                      "Q-Factory is specialized in test automation and quality assurance services."
                  },
                  {
                    title: "Qentinel",
                    href: "https://qentinel.com/",
                    text:
                      "Qentinel is a Finnish company that specialises in information system quality assurance."
                  },
                  {
                    title: "Reaktor",
                    href: "https://www.reaktor.com/",
                    text:
                      "Reaktor is a creative technology house that constructs exceptional digital services for clients."
                  },
                  {
                    title: "Siili",
                    href: "http://siili.com/",
                    text:
                      "Siili is a modern, full-service technology company, helping you create better business and meaningful digital experiences by combining strategic insight, creative design, data management, and technology expertise."
                  },
                  {
                    title: "Symbio",
                    href: "https://www.symbio.com/",
                    text:
                      "Symbio is international co-creation innovation partner. We help our customers create high quality products and future services in digital world."
                  },
                  {
                    title: "VALA Group",
                    href: "http://www.valagroup.com/",
                    text:
                      "VALA Group provides outstanding software development and quality assurance services by utilizing automation, co-operation and intelligent tool selection for companies ranging from start-ups to major publicly listed companies."
                  }
                ]
              }
            ]
          }
        },
        {
          title: "RPA",
          text_block: true,
          tab_box: false,
          feature_box: false,
          data: {
            text: {
              header: "RPA",
              text:
                'Robot Framework is an open source robotic process automation (RPA) solution that is used to automate business processes. It is open and extensible which means that it can be integrated with virtually any other tool to create powerful and flexible RPA solutions. Read more at <a href="http://robotframework.org/rpa" target="_blank">robotframework.org/rpa</a>'
            }
          }
        },
        {
          title: "Foundation",
          text_block: true,
          tab_box: false,
          feature_box: false,
          data: {
            text: {
              header: "Foundation",
              text:
                'As a company, the best way to join our movement and keep Robot Framework the best test automation solution on the market is to join the Robot Framework Foundation. <a href="http://robotframework.org/foundation/" target="_blank">To foundation</a>'
            }
          }
        },
        {
          title: "Shop",
          text_block: true,
          tab_box: false,
          feature_box: false,
          data: {
            text: {
              header: "Shop",
              text:
                'The easiest way to support Robot Framework is to buy nice swag from our web shop. In addition, it\'s a great way to show your colors! <a href="https://shop.robotframework.org" target="_blank">To shop</a>'
            }
          }
        },
        {
          title: "RoboCon",
          text_block: true,
          tab_box: false,
          feature_box: false,
          data: {
            text: {
              header: "Robocon",
              text:
                '<a href="http://robocon.io" target="_blank">RoboCon</a> is the annual Robot Framework conference organized first time in January 2018 at Helsinki, Finland. The first conference was a huge success with great presentations and over 250 participants. The planning of RoboCon 2019 has already started and <a href="http://robocon.io" target="_blank">Robocon.io</a> will be updated as soon as the plans start to materialize.'
            }
          }
        },
        {
          title: "Users",
          text_block: true,
          tab_box: false,
          feature_box: false,
          user_box: true,
          data: {
            text: {
              header: "Users",
              text:
                '<p> Robot Framework is used very widely around the world in different domains and contexts. <a href="https://github.com/robotframework/robotframework.github.com" target="_blank">Let us know</a> if your company or organization could be added here! </p>'
            },
            users: [
              {
                title: "Nokia",
                href: "http://www.nokia.com",
                img: require("@/assets/img/users/nokia.png"),
                text:
                  "Robot Framework was initially developed at Nokia Networks and it is used extensively around the whole company. It is used for testing different devices, software systems and protocols via GUIs, APIs and various other interfaces."
              },
              {
                title: "ABB",
                href: "http://www.abb.com",
                img: require("@/assets/img/users/abb.png"),
                text:
                  "ABB is using Robot Framework in software development for testing distribution automation related configuration tools, web interfaces and embedded devices."
              },
              {
                title: "Adwisit",
                href: "http://www.adwisit.se",
                img: require("@/assets/img/users/adwisit.png"),
                text:
                  "Adwisit uses Robot Framework to automate end-to-end testing of business processes for customers with a complex structure of third-party products, handling both web and desktop applications."
              },
              {
                title: "Alfastrahovanie",
                href: "https://www.alfastrah.ru/",
                img: require("@/assets/img/users/alfastrahovanie.png"),
                text:
                  "Alfastrahovanie is using Robot Framework as a main regression testing tool for SAP FS CM system. Alfastrahovanie is in the beginning of ATDD path and Robot Framework is the main vehicle there as well."
              },
              {
                title: "Alpha",
                href: "http://www.alpha.company/",
                img: require("@/assets/img/users/alpha.png"),
                text:
                  "At Alpha, we are developing the future of mobile apps for Health, with the latest advances in neuroscience, AI and mobile computing. Robot Framework is a key part of our Health Moonshot development process to help us automatize testing and guarantee the best quality."
              },
              {
                title: "axon",
                href: "http://www.axon.tv",
                img: require("@/assets/img/users/axon.png"),
                text:
                  "Axon is using Robot Framework in testing embedded software and hardware development of broadcast equipment. We automate testing as much as possible in order to speed up development while guarantee quality. Robot Framework is the perfect tool for this job."
              },
              {
                title: "CENX",
                href: "http://www.cenx.com",
                img: require("@/assets/img/users/cenx.png"),
                text:
                  "CENX is using Robot Framework, within a Docker environment, for feature and integration testing of a product that empowers network- and service operation centers."
              },
              {
                title: "Charter Communications",
                href: "https://www.spectrum.com/",
                img: require("@/assets/img/users/spectrum.png"),
                text:
                  "Charter uses Robot Framework for automating feature and protocol testing on network devices like routers and firewalls for device certification, QA and network monitoring."
              },
              {
                title: "cisco",
                href: "https://www.cisco.com/",
                img: require("@/assets/img/users/cisco.jpg"),
                text:
                  "Cisco’s Customer Experience (CX) supports the testing & validation of Cisco and 3rd party solutions deployed by our customers. This includes Solution Validation Services (SVS) delivered both on Cisco-premise and customer-premise as part of a NetDevOps (CI/CD) process where continuous validation accelerates technology adoption, de-risks IT deployments, changes and upgrades, and ensures complex migrations are transparent."
              },
              {
                title: "Conde Nast",
                href: "https://technology.condenast.com/",
                img: require("@/assets/img/users/condenast.png"),
                text:
                  'Cond&eacute; Nast <a href="https://technology.condenast.com/story/automated-testing-qa-brand-sites-robot-framework" target="_blank">transformed their quality assurance for their brand sites</a>, such as Brides, Wired and Architectural Digest, from an entirely manual process to automated one with Robot Framework.'
              },
              {
                title: "FICOSA",
                href: "http://www.ficosa.com",
                img: require("@/assets/img/users/ficosa.png"),
                text:
                  'FICOSA has been using Robot Framework for the last years in the automotive industry. It\'s being used for the automated testing of <a href="https://www.ficosa.com/products/advanced-communication-systems/communication-modules-tcu/" target="_blank">embedded software for in-vehicle telematic units</a> with very good results. We have implemented several Robot Framework libraries to control complex hardware environments in an scalable way.'
              },
              {
                title: "Finnair",
                href: "http://www.finnair.com",
                img: require("@/assets/img/users/finnair.png"),
                text:
                  "Finnair is using Robot Framework to support Finnair digital platform development."
              },
              {
                title: "Juniper Networks",
                href: "https://www.juniper.net/",
                img: require("@/assets/img/users/juniper.png"),
                text:
                  "Juniper Networks has built an extensive automation framework on top of Robot Framework for end-to-end qualification of Juniper products to maintain our commitment to quality for our customers and users. It is used extensively in multiple groups including engineering and support amongst others. We have also worked with third-party test tool vendors to provide Robot Framework friendly APIs to integrate with our framework."
              },
              {
                title: "Kistler",
                href: "https://www.kistler.com",
                img: require("@/assets/img/users/kistler.svg"),
                text:
                  'Kistler is using the Robot Framework for automated system tests of backend and frontend applications for various, very accurate and highly precise <a href="https://www.kistler.com/en/products/systems/" target="_blank">measurement systems</a>.'
              },
              {
                title: "KONE",
                href: "http://www.kone.com",
                img: require("@/assets/img/users/kone.png"),
                text:
                  "KONE is widely using Robot Framework in software development for testing embedded systems in elevators and escalators."
              },
              {
                title: "Lucid Software",
                href: "http://www.kovidndt.com/",
                img: require("@/assets/img/users/lucid.png"),
                text:
                  "Lucid Software is using Robot Framework for complete system automation testing of its NDT software products. Necessary unique libraries are created to test the applications in both Windows and WPF formats."
              },
              {
                title: "metso",
                href: "http://www.metso.com",
                img: require("@/assets/img/users/metso.png"),
                text:
                  'Metso has had good results using Robot Framework in various domains. This includes testing embedded software in valve positioners and <a href="https://www.eficode.com/work/metso" target="_blank">web testing of their Manufacturing Resource Planning system</a>.'
              },
              {
                title: "NRL",
                href: "https://www.nrl.navy.mil",
                img: require("@/assets/img/users/nrl.png"),
                text:
                  'The Naval Research Laboratory extends Robot Framework to provide a seamless integration with the <a href="https://www.nrl.navy.mil/itd/imda/products/sage" target="_blank">SAGE</a> multi-agent system. This integration enables Robot Framework to drive distributed simulation and monitoring for test automation of SOA systems.'
              },
              {
                title: "OpenDaylight",
                href: "http://www.opendaylight.org",
                img: require("@/assets/img/users/opendaylight.png"),
                text:
                  'OpenDaylight is a software-defined network (SDN) platform that uses Robot Framework for unit- and integration tests between different services. If you are interested how, <a href="https://wiki.opendaylight.org/view/CrossProject:Integration_Group:Create_System_Test_Environment#Install_Robot_Framework" target="_blank"> check the wiki</a>.'
              },
              {
                title: "OpenDrives",
                href: "https://opendrives.com/",
                img: require("@/assets/img/users/open_drives.png"),
                text:
                  "OpenDrives is using Robot Framework to accelerate the development of our proprietary software platform and state of the art hardware NAS appliances. As OpenDrives strives to lead the industry in speed and ease of use we needed a tool that could match that. Robot Framework was an easy choice."
              },
              {
                title: "Opuscapita",
                href: "https://www.opuscapita.com/",
                img: require("@/assets/img/users/opuscapita.png"),
                text:
                  "OpusCapita is using Robot Framework in software development for regression testing automation of web applications, API and internal software components."
              },
              {
                title: "Oriental Pearl New Media Co, Ltd",
                href: "http://www.opg.cn/",
                img: require("@/assets/img/users/oriental.png"),
                text:
                  "Oriental Pearl New Media Co, Ltd is using Robot Framework for API and UI testing."
              },
              {
                title: "Rocla",
                href: "http://rocla.com/",
                img: require("@/assets/img/users/rocla.png"),
                text:
                  "Rocla is using Robot Framework widely in development and testing of the software for Trucks and Automated Guided Vehicles (AGV’s)."
              },
              {
                title: "ryerson",
                href: "http://www.ryerson.org",
                img: require("@/assets/img/users/ryerson.png"),
                text:
                  "Ryerson University uses Robot Framework to conduct desktop and mobile browser testing for its suite of applications that serve both students and staff."
              },

              {
                title: "salicru",
                href: "http://www.salicru.com",
                img: require("@/assets/img/users/salicru.png"),
                text:
                  'Salicru has been using Robot Framework in testing embedded software and hardware development of power electronic equipment since 2011. We use Robot Framework along with our proprietary embedded software architecture <a href="https://www.salicru.com/en/white-papers-eng.html" target="_blank">Odyssey</a> to assure the quality of our products and it has become one of the most important tools for us.'
              },
              {
                title: "Segron",
                href: "http://www.segron.com/",
                img: require("@/assets/img/users/segron.png"),
                text:
                  "Segron is a Bratislava-based company offering beyond End2End testing solution for Telecommunications. Our tool is based on Robot Framework and is the first true End2End solution for testing multiple interfaces and technologies with a single tool."
              },
              {
                title: "steeri",
                href: "http://www.steeri.fi/en",
                img: require("@/assets/img/users/steeri.png"),
                text:
                  "Steeri wanted to automate its test runs and chose the keyword-driven and user-friendly Robot Framework as the tool for the job."
              },
              {
                title: "zilogic",
                href: "http://www.zilogic.com",
                img: require("@/assets/img/users/zilogic.png"),
                text:
                  "Zilogic Systems is using Robot Framework for integration testing of embedded products. We convert requirements into test cases,write necessary libraries to test the Device Under Test."
              },
			  {
                title: "QA Hive",
                href: "https://www.qahive.com",
                img: require("@/assets/img/users/qahive.png"),
                text:
                  "QA Hive is using Robot Framework for automation tests and automation tasks for reduce overall manual process and improve system reliability."
              }
            ]
          }
        }
      ]
    };
  }
};
</script>
