<template>
    <div class="row no-gutters">
     <div class="col-md-2">
         <navigation-vertical :pages="pages"/>
     </div>

    <div class="col-md-10" id="scroller"
    ref="content" style="position:relative;height:100vh;overflow-y:scroll;overflow-x:hidden;-webkit-overflow-scrolling: touch;">
        <app-header/>
        <page-block v-for="(page, index) in pages.filter(page => page.data)"
          v-bind:page="page"
          v-bind:index="index"
          v-bind:key="index"
          class="pl-md-5 px-lg-2 p-sm-3 py-2 p-xs-1"/>
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
          member_box: false,
          feature_box: false,
          data: {
            text: {
              twitter: true,
              header: "Introduction",
              text: '<p> <b>Robot Framework</b> is a generic open source automation framework. It can be used for test automation and robotic process automation (RPA). <p> Robot Framework is actively supported, with many industry-leading companies using it in their software development. </p> Robot Framework is open and extensible and can be integrated with virtually any other tool to create powerful and flexible automation solutions. Being open source also means that Robot Framework is free to use without licensing costs. </p> <p> Robot Framework has easy syntax, utilizing human-readable keywords. Its capabilities can be extended by libraries implemented with Python or Java. The framework has a rich ecosystem around it, consisting of <a href="#libraries">libraries</a> and <a href="#tools">tools</a> that are developed as separate projects. </p> <p> Robot Framework project is hosted on <a href="https://github.com/robotframework/robotframework" target="_blank">GitHub</a> where you can find further documentation, source code, and issue tracker. Downloads are hosted at <a href="https://pypi.python.org/pypi/robotframework" target="_blank">PyPI</a>. <p> Robot Framework is operating system and application independent. The core framework is implemented using <a href="http://python.org" target="_blank">Python</a> and also runs on <a href="http://jython.org" target="_blank">Jython</a> (JVM) and <a href="http://ironpython.net" target="_blank">IronPython</a> (.NET). </p> <p> Robot Framework itself is open source software released under <a href="http://www.apache.org/licenses/LICENSE-2.0.html" target="_blank">Apache License 2.0</a>, and most of the libraries and tools in the ecosystem are also open source. The framework was initially developed at <a href="http://networks.nokia.com" target="_blank">Nokia Networks</a> and was open sourced in 2008.</p>'
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
                  '<p> Robot Framework has a modular architecture that can be extended with bundled and self-made <a href="#libraries">libraries</a>. </p> <p> Data is defined in files using the syntax shown in the <a href="#examples">examples</a> below. A file containing tests or tasks creates a suite, and placing these files into directories creates a nested structure of suites. </p>'
              },
              {
                header: "EASY",
                text:
                  "<p> When execution is started, the framework first parses the data. It then utilizes keywords provided by the libraries to interact with the target system. Libraries can communicate with the system either directly or using other tools as drivers. </p> <p> Test or task execution is started from the command line. As a result, you get a report and log in HTML format as well as an XML output. These provide an extensive look into what your system does. </p>"
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
          title: "Sponsors",
          text_block: true,
          tab_box: false,
          member_box: true,
          hide_from_nav: true,
          feature_box: false,
          data: {
            text: {
              membersText: 'Robot Framework\'s development is nowadays sponsored by <a href="http://robotframework.org/foundation" target="_blank">Robot Framework Foundation</a> consisting of the following member organizations:',
            },
            members: [
                {
                  title: "Aito",
                  href: "https://aito.ai/rpa/",
                  img: require("@/assets/img/sponsors/aito.png"),
                },
                {
                  title: "Aktia",
                  href: "https://www.aktia.fi/",
                  img: require("@/assets/img/sponsors/aktia.png"),
                },
                {
                  title: "Botlabs",
                  href: "https://botlabs.fi/en/home/",
                  img: require("@/assets/img/sponsors/Botlabs.jpg"),
                },
                {
                  title: "Cap Gemini",
                  href: "https://www.capgemini.com/",
                  img: require("@/assets/img/sponsors/capgemini.png"),
                },
                {
                  title: "Chili",
                  href: "https://www.chili.com/",
                  img: require("@/assets/img/sponsors/chili.jpg"),
                },
                {
                  title: "cisco",
                  href: "https://www.cisco.com/",
                  img: require("@/assets/img/sponsors/cisco.jpg"),
                },
                {
                  title: "comiq",
                  href: "http://comiq.fi/",
                  img: require("@/assets/img/sponsors/comiq.jpg"),
                },
                {
                  title: "deutsche post adress",
                  href: "https://www.deutschepost.de/de/p/postadress.html",
                  img: require("@/assets/img/sponsors/deutsche post.png"),
                },
                {
                  title: "digia",
                  href: "http://www.digia.com/",
                  img: require("@/assets/img/sponsors/digia.png"),
                },
                {
                  title: "eficode",
                  href: "http://www.eficode.fi/",
                  img: require("@/assets/img/sponsors/eficode.png"),
                },
                {
                  title: "eliga",
                  href: "http://eliga.fi/",
                  img: require("@/assets/img/sponsors/eliga.jpg"),
                },
                {
                  title: "etteplan",
                  href: "http://www.espotel.com/",
                  img: require("@/assets/img/sponsors/etteplan.png"),
                },
                {
                  title: "F2G Solutions",
                  href: "https://www.f2gsolutions.com",
                  img: require("@/assets/img/sponsors/f2g.png"),
                },
                {
                  title: "finnair",
                  href: "https://www.finnair.com/",
                  img: require("@/assets/img/sponsors/finnair.jpg"),
                },
                {
                  title: "gofore",
                  href: "https://gofore.com/",
                  img: require("@/assets/img/sponsors/gofore.png"),
                },
                {
                  title: "henix",
                  href: "https://www.henix.com",
                  img: require("@/assets/img/sponsors/henix.png"),
                },
                {
                  title: "hiq",
                  href: "http://www.hiqfinland.fi/",
                  img: require("@/assets/img/sponsors/hiq.jpg"),
                },
                {
                  title: "humanitec",
                  href: "https://humanitec.com/",
                  img: require("@/assets/img/sponsors/humanitec.png"),
                },
                {
                  title: "imbus",
                  href: "https://www.imbus.de/softwaretest/",
                  img: require("@/assets/img/sponsors/imbus.png"),
                },
                {
                  title: "knowit",
                  href: "http://www.knowit.fi/",
                  img: require("@/assets/img/sponsors/knowit.jpg"),
                },
                {
                  title: "kuka",
                  href: "http://www.kuka.com/",
                  img: require("@/assets/img/sponsors/kuka.png"),
                },
                {
                  title: "luoto",
                  href: "https://www.luotocompany.fi/",
                  img: require("@/assets/img/sponsors/luoto.jpg"),
                },
                {
                  title: "meliora",
                  href: "https://www.melioratestlab.com/",
                  img: require("@/assets/img/sponsors/meliora.jpg"),
                },
                {
                  title: "nets",
                  href: "https://www.nets.eu/",
                  img: require("@/assets/img/sponsors/nets.jpg"),
                },
                {
                  title: "nokia",
                  href: "https://www.nokia.com/",
                  img: require("@/assets/img/sponsors/nokia.png"),
                },
                {
                  title: "northcode",
                  href: "https://www.northcode.fi/",
                  img: require("@/assets/img/sponsors/northcode.png"),
                },
                {
                  title: "op",
                  href: "https://www.op.fi/op-ryhma",
                  img: require("@/assets/img/sponsors/op.png"),
                },
                {
                  title: "opuscapita",
                  href: "https://www.opuscapita.com/",
                  img: require("@/assets/img/sponsors/opuscapita.jpg"),
                },
                {
                  title: "oura",
                  href: "https://ouraring.com/",
                  img: require("@/assets/img/sponsors/oura.png"),
                },
                {
                  title: "ouro",
                  href: "https://www.ouro.fi/",
                  img: require("@/assets/img/sponsors/ouro.png"),
                },
                {
                  title: "qentinel",
                  href: "http://qentinel.fi/",
                  img: require("@/assets/img/sponsors/qentinel.png"),
                },
                {
                  title: "qfactory",
                  href: "http://www.q-factory.fi/",
                  img: require("@/assets/img/sponsors/qfactory.jpg"),
                },
                {
                  title: "reaktor",
                  href: "http://reaktor.fi/",
                  img: require("@/assets/img/sponsors/reaktor.png"),
                },
                {
                  title: "robocorp",
                  href: "https://robocorptech.com/",
                  img: require("@/assets/img/sponsors/robocorp.png"),
                },
                {
                  title: "segron",
                  href: "https://www.segron.com",
                  img: require("@/assets/img/sponsors/segron.png"),
                },
                {
                  title: "signant health",
                  href: "https://signanthealth.com",
                  img: require("@/assets/img/sponsors/signant.png"),
                },
                {
                  title: "siili",
                  href: "http://www.siili.com/",
                  img: require("@/assets/img/sponsors/siili.jpg"),
                },
                {
                  title: "sisua",
                  href: "https://www.sisuadigital.com",
                  img: require("@/assets/img/sponsors/sisua.png"),
                },
                {
                  title: "sleepiq",
                  href: "https://bamlabs.com/",
                  img: require("@/assets/img/sponsors/sleepiq.png"),
                },
                {
                  title: "symbio",
                  href: "http://www.symbio.com/",
                  img: require("@/assets/img/sponsors/symbio.jpg"),
                },
                {
                  title: "testimate",
                  href: "http://www.testimate.fi/",
                  img: require("@/assets/img/sponsors/testimate.jpg"),
                },
                {
                  title: "tietoevry",
                  href: "https://www.tietoevry.com/",
                  img: require("@/assets/img/sponsors/tietoevry.png"),
                },
                {
                  title: "vala",
                  href: "http://www.valagroup.com/",
                  img: require("@/assets/img/sponsors/vala.jpg"),
                },
                {
                  title: "veikkaus",
                  href: "https://www.veikkaus.fi/",
                  img: require("@/assets/img/sponsors/veikkaus.png"),
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
                '<p> Libraries provide the actual automation and testing capabilities to Robot Framework by providing keywords. Several standard libraries are bundled with the framework, and there are separately developed external libraries galore that can be installed based on your needs. Creating your own libraries <a href="http://robotframework.org/robotframework/latest/RobotFrameworkUserGuide.html#creating-test-libraries" target="_blank">is a breeze</a>. </p> <p> <a href="https://github.com/robotframework/robotframework.github.com" target="_blank">Let us know</a> if useful libraries are missing from the list or if a library on the list seems to be unmaintained.</p>'
            },
            tabs: [
              {
                title: "External",
                items: [
                  {
                    title: "AppiumLibrary",
                    href:
                      "https://github.com/serhatbolsu/robotframework-appiumlibrary",
                    text:
                      "Library for Android and iOS testing. It uses Appium internally."
                  },
                  {
                    title: "ArchiveLibrary",
                    href:
                      "https://github.com/bulkan/robotframework-archivelibrary",
                    text: "Library for handling zip- and tar-archives."
                  },
                  {
                    title: "AutoItLibrary",
                    href:
                      "https://github.com/nokia/robotframework-autoitlibrary",
                    text:
                      "Windows GUI testing library that uses AutoIt freeware tool as a driver."
                  },
                  {
                    title: "AutoRecorder",
                    href:
                      "https://github.com/sebastianciupinski/robotframework-autorecorder#readme",
                    text:
                      "Library which allows to automatically record video for test/suites execution."
                  },
                  {
                    title: "Browser Library",
                    href:
                      "https://github.com/MarketSquare/robotframework-browser",
                    text:
                      'Robot Framework Browser library is a modern web testing library powered by <a href="https://playwright.dev" target="_blank">🎭 Playwright</a>.<br/>Aiming for 🚀 speed, ✅ reliability and 🔬 visibility.'
                  },
                  {
                    title: "CncLibrary",
                    href:
                      "https://github.com/eficode/robotframework-cnclibrary",
                    text:
                      "Library for driving a CNC milling machine."
                  },
                  {
                    title: "ConfluentKafkaLibrary",
                    href:
                      "https://github.com/robooo/robotframework-ConfluentKafkaLibrary",
                    text:
                      "Library for python confluent kafka."
                  },
                  {
                    title: "CURFLibrary",
                    href:
                      "https://github.com/Openwide-Ingenierie/robotframework-can-uds-library",
                    text: "Library for testing CAN bus with support for ISO-TP and UDS."
                  },
                  {
                    title: "Database Library (Java)",
                    href:
                      "https://github.com/Hi-Fi/robotframework-dblibrary",
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
                      "Library for Data-Driven Testing with external 📤 data tables (csv, xls, xlsx, etc.). 🧬 Pairwise Combinatorial Testing support."
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
                    title: "DoesIsLibrary",
                    href:
                      "https://github.com/sebastianciupinski/robotframework-doesislibrary#readme",
                    text:
                      'Library with autogenerated keywords like Is Something, Does Someting created form assertion keywords like Should Be, Should Not Be, etc'
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
                    title: "HTTP RequestsLibrary (Python)",
                    href:
                      "https://github.com/MarketSquare/robotframework-requests#readme",
                    text:
                      "Library for HTTP level testing using Python Requests internally."
                  },
                  {
                    title: "HttpRequestLibrary (Java)",
                    href:
                      "https://github.com/Hi-Fi/robotframework-httprequestlibrary#readme",
                    text:
                      'Library for HTTP level testing using Apache HTTP client. Available also at <a href="http://search.maven.org/#search%7Cga%7C1%7Ca%3A%22robotframework-httprequestlibrary%22" target="_blank">Maven central</a>.'
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
                    href:
                      "https://github.com/eficode/JavaFXLibrary#readme",
                    text:
                      'Library for testing JavaFX applications, based on <a href="https://github.com/TestFX/TestFX" target="_blank">TestFX</a>. Has also remote interface support.'
                  },
                  {
                    title: "KiCadLibrary",
                    href:
                      "https://github.com/madworx/robotframework-kicadlibrary#readme",
                    text:
                      "Library for interacting with KiCad EDA designs."
                  },
                  {
                  title: "ListenerLibrary",
                    href:
                      "https://github.com/sebastianciupinski/robotframework-listenerlibrary#readme",
                    text: "Library allows to register keywords to run before/after other keywords and suites."
                  },
                  {
                    title: "Mainframe3270 Library",
                    href:
                      "https://github.com/Altran-PT-GDC/Robot-Framework-Mainframe-3270-Library/blob/master/README.md",
                    text:
                      "Library that allows to create automated test scripts to test IBM Mainframe 3270."
                  },
                  {
                    title: "MQTT library",
                    href:
                      "https://github.com/randomsync/robotframework-mqttlibrary#readme",
                    text: "Library for testing MQTT brokers and applications."
                  },
                  {
                    title: "PuppeteerLibrary",
                    href:
                      "https://qahive.github.io/robotframework-puppeteer.github.io/",
                    text:
                      "Library for web testing using Puppeteer tool internally."
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
                    title: "RPA framework",
                    href: "https://www.rpaframework.org/",
                    text: "Collection of open-source libraries and tools for Robotic Process Automation (RPA), designed to be used both with Robot Framework and Python."
                  },
                  {
                    title: "SapGuiLibrary",
                    href: "https://github.com/frankvanderkuur/robotframework-sapguilibrary/",
                    text:
                      "Library for testing the SAPGUI client using the internal SAP Scripting Engine"
                  },
                  {
                    title: "ScreenCapLibrary",
                    href: "https://github.com/mihaiparvu/ScreenCapLibrary",
                    text: "Library for taking screenshots and video recording. Similar functionality as Screenshot standard library, with some additional features."
                  },
                  {
                    title: "SeleniumScreenshots",
                    href: "https://datakurre.github.io/robotframework-seleniumscreenshots/",
                    text: "Library for annotating and cropping screenshots taken with SeleniumLibrary. "
                  },
                  {
                    title: "SeleniumLibrary",
                    href: "http://github.com/robotframework/SeleniumLibrary/",
                    text:
                      "Web testing library that uses popular Selenium tool internally."
                  },
                  {
                    title: "SeleniumLibrary for Java",
                    href:
                      "https://github.com/MarketSquare/robotframework-seleniumlibrary-java#readme",
                    text: "Java port of the SeleniumLibrary."
                  },
                  {
                    title: "SikuliLibrary",
                    href:
                      "https://github.com/rainmanwy/robotframework-SikuliLibrary#readme",
                    text:
                      'Sikuli Robot Framework Library provide keywords to test UI through <a href="http://sikulix.com/" target="_blank">Sikulix</a>. This library supports Python 2.x and 3.x.'
                  },
                  {
                    title: "SoapLibrary",
                    href:
                      "https://github.com/Altran-PT-GDC/Robot-Framework-SOAP-Library",
                    text:
                      'This library is designed for those who want to work with webservice automation as if they were using SoapUI, make a request through an XML file, and receive the response in another XML file.'
                  },
                  {
                    title: "SSHLibrary",
                    href: "https://github.com/robotframework/SSHLibrary",
                    text:
                      "Enables executing commands on remote machines over an SSH connection. Also supports transfering files using SFTP."
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
                      'Library to enable to test Java FX applications using the <a href="https://github.com/TestFX/TestFX" target="_blank">TestFX framework</a>. Has also remote interface support. <a href="https://github.com/weiqigao/Robot-Framework-Test-FX-Library" target="_blank">Maintained Fork...</a>'
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
                    title: "WADLibrary",
                    href: "https://github.com/Adwisit/WADLibrary",
                    text: "Application testing library for Robot Framework that utilizes Win App Driver."
                  },
                  {
                    title: "Zoomba Library",
                    href: "https://github.com/Accruent/robotframework-zoomba",
                    text: "Library extending features in many popular tools for GUI, Rest API, Soap API, Mobile, and Windows (WinAppDriver) automation. An ideal all-in-one toolkit for new or existing Robot Framework projects."
                  }
                ]
              },{
                title: "Standard",
                items: [
                  {
                    title: "Builtin",
                    href:
                      "http://robotframework.org/robotframework/latest/libraries/BuiltIn.html",
                    text:
                      "Provides a set of often needed generic keywords. Always automatically available without imports."
                  },
                  {
                    title: "Collections",
                    href:
                      "http://robotframework.org/robotframework/latest/libraries/Collections.html",
                    text:
                      "Provides a set of keywords for handling Python lists and dictionaries."
                  },
                  {
                    title: "DateTime",
                    href:
                      "http://robotframework.org/robotframework/latest/libraries/DateTime.html",
                    text:
                      "Library for date and time conversions. New in Robot Framework 2.8.5."
                  },
                  {
                    title: "Dialogs",
                    href:
                      "http://robotframework.org/robotframework/latest/libraries/Dialogs.html",
                    text:
                      "Provides means for pausing the execution and getting input from users."
                  },
                  {
                    title: "OperatingSystem",
                    href:
                      "http://robotframework.org/robotframework/latest/libraries/OperatingSystem.html",
                    text:
                      "Enables various operating system related tasks to be performed in the system where Robot Framework is running."
                  },
                  {
                    title: "Process",
                    href:
                      "http://robotframework.org/robotframework/latest/libraries/Process.html",
                    text:
                      "Library for running processes in the system. New in Robot Framework 2.8."
                  },
                  {
                    title: "Remote",
                    href: "https://github.com/robotframework/RemoteInterface",
                    text:
                      "Special library acting as a proxy between Robot Framework and libraries elsewhere. Actual libraries can be running on different machines and be implemented using any programming language supporting XML-RPC protocol."
                  },
                  {
                    title: "Screenshot",
                    href:
                      "http://robotframework.org/robotframework/latest/libraries/Screenshot.html",
                    text:
                      "Provides keywords to capture screenshots of the desktop."
                  },
                  {
                    title: "String",
                    href:
                      "http://robotframework.org/robotframework/latest/libraries/String.html",
                    text:
                      "Library for generating, modifying and verifying strings."
                  },
                  {
                    title: "Telnet",
                    href:
                      "http://robotframework.org/robotframework/latest/libraries/Telnet.html",
                    text:
                      "Makes it possible to connect to Telnet servers and execute commands on the opened connections."
                  },
                  {
                    title: "XML",
                    href:
                      "http://robotframework.org/robotframework/latest/libraries/XML.html",
                    text:
                      "Library for generating, modifying and verifying XML files."
                  },
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
                    title: "Python Library Core",
                    href: "https://github.com/robotframework/PythonLibCore",
                    text:
                      "Tools to ease creating larger test libraries for Robot Framework using Python."
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
                  },
                  {
                    title: "plone.app.robotframework",
                    href:
                      "https://pypi.python.org/pypi/plone.app.robotframework",
                    text:
                      "Provides resources and tools for writing functional Selenium tests for Plone CMS and its add-ons."
                  },
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
                '<p> Supporting tools ease automation: editing, running, building and so on. Most of these tools are developed as separate projects, but some are built into the framework itself. </p> <p> <a href="https://github.com/robotframework/robotframework.github.com" target="_blank">Let us know</a> if useful tools are missing from the list. </p>'
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
                      "Tool for generating keyword documentation for libraries and resource files."
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
                      "Tool for cleaning up and changing format of Robot Framework data files."
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
                    title: "Robot Framework Language Server for Visual Studio Code",
                    text: "Language Server Protocol implementation for Robot Framework.",
                    href: "https://marketplace.visualstudio.com/items?itemName=robocorptech.robotframework-lsp"
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
                  },
                  {
                    title: "Debugger for Visual Studio Code",
                    text: "A Visual Studio Code extension that lets you debug robot files with call stack, breakpoints, etc.",
                    href: "https://marketplace.visualstudio.com/items?itemName=JacobPhilip.danfoss-robotframework-debug"
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
                      "Plugin to collect and publish Robot Framework execution results in Jenkins."
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
                    title: "DbBot",
                    href: "https://github.com/robotframework/DbBot",
                    text:
                      "Tool for serializing Robot Framework execution results, i.e. output.xml files, into a SQLite database. It serves a good starting point to create your own reporting and analyzing tools."
                  },
                  {
                    title: "Distbot",
                    href: "https://github.com/rajeevnaikte/distbot",
                    text: "A bot for self distribution of Robot Framework tests into multiple machines/docker and execute in parallel (without need of master node)."
                  },
                  {
                    title: "Fixml",
                    href: "https://bitbucket.org/robotframework/fixml",
                    text:
                      "Tool for fixing Robot Framework output files that are broken."
                  },
                  {
                    title: "Mabot",
                    href: "http://github.com/robotframework/mabot/",
                    text:
                      "Tool for reporting manual tests in format compatible with Robot Framework outputs."
                  },
                  {
                    title: "Oxygen",
                    href: "https://github.com/eficode/robotframework-oxygen",
                    text:
                      "Tool for consolidating other test tools' reporting to Robot Framework outputs."
                  },
                  {
                    title: "Pabot",
                    href: "https://github.com/mkorpela/pabot",
                    text: "A parallel executor for Robot Framework tests and tasks."
                  },
                  {
                    title: "RFDoc",
                    href: "http://github.com/robotframework/rfdoc",
                    text:
                      "Web based system for storing and searching Robot Framework library and resource file documentations."
                  },
                  {
                    title: "rfswarm",
                    href: "https://github.com/damies13/rfswarm",
                    text:
                      "Testing tool that allows you to use Robot Framework test cases for performance or load testing."
                  },
                  {
                    title: "Robot Corder",
                    href: "https://github.com/sohwendy/Robotcorder",
                    text:
                      "Robot Corder generates Robot Framework test script by recording user interactions and scanning the html page in your Chrome browser. It aims to be equivalent of Selenium IDE for RobotFramework browser test automation."
                  },
                  {
                    title: "Robot Framework Hub",
                    href: "https://github.com/boakley/robotframework-hub/wiki",
                    text:
                      "Lightweight web server that provides access to the Robot Framework test assets via browser."
                  },
                  {
                    title: "Robot Framework Lexer",
                    href: "https://bitbucket.org/robotframework/pygmentslexer",
                    text:
                      "Robot Framework syntax highlighting with Pygments. Link is to the lexer project itself, but the lexer is part of Pygments from version 1.6 onwards."
                  },
                  {
                    title: "Robot Tools",
                    href: "https://bitbucket.org/robotframework/robottools",
                    text:
                      "Collection of supporting tools that can be used with Robot Framework."
                  },
                  {
                    title: "Robocop linter",
                    href: "https://github.com/MarketSquare/robotframework-robocop",
                    text: "Static code analysis tool for Robot Framework with use of latest robot API and many built-in rules that can be easily configured or switched off."
                  },
                  {
                    title: "RobotMK",
                    href: "https://github.com/simonmeggle/robotmk/",
                    text:
                      "RobotMK integrates results of Robot tests into the monitoring system Checkmk. Makes it possible to send alerts if any keyword/test/suite runtime exceeds the allowed runtime or fails. Performance graphs and SLA reports. Web based configuration of Robot parameters. Automatic client deployment rule system (\"bakery\")."
                  },
                  {
                    title: "SAGE Framework",
                    href: "https://www.nrl.navy.mil/itd/imda/products/sage",
                    text:
                      "Multi-agent based extension to Robot Framework. Agent based systems make it possible to test distributed systems such as Service Oriented Architecture systems. SAGE Provides a library of Robot Framework keywords for creating and managing SAGE agent networks as well as collecting and reporting results from remote agents."
                  },

                  {
                    title: "StatusChecker",
                    href: "https://github.com/robotframework/statuschecker/",
                    text:
                      "A tool for validation that executed Robot Framework test cases have expected statuses and log messages. Mainly targeted for test library developers."
                  },
                  {
                    title: "Test Assistant",
                    href: "https://github.com/jg8481/leon/tree/develop/packages/robotframework-test-assistant",
                    text: "Control test processes and RPA tasks with your voice or with a text message sent directly to the assistant through leon-ai's UI.."
                  },
                  {
                    title: "TestDataTable",
                    href: "https://github.com/damies13/TestDataTable",
                    text: "Enables you to assign test data variable values from a single set of data to multiple scripts while allowing you to ensure each script has a unique data value."
                  },
                  {
                    title: "Tesults Listener",
                    href: "https://www.tesults.com/docs?doc=robot",
                    text: "A listener that provides a codeless integration experience for test results reporting from Robot Framework into Tesults."
                  },
                  {
                    title: "Xray Test Management",
                    href: "https://www.getxray.app/",
                    text: "Xray is a Test Management app for Jira that provides the ability to track coverage based on traditional manual test cases, exploratory testing and automation-related results. For automation, users can track detailed results from test scripts implemented with Robot Framework and link them to the respective requirements."
                  }
                ]
              }
            ]
          }
        },
        {
          title: "Learning",
          text_block: true,
          tab_box: true,
          feature_box: false,
          data: {
            text: {
              header: "Learning",
              text:
                '<p> Want to get started? Looking for a way to do things? Here are the most important documentation resources needed to work with Robot Framework. Notice that individual <a href="#libraries">libraries</a> and <a href="#tools">tools</a> in the ecosystem have their own documentation that is typically accessed via their project pages. </p> <p> <a href="https://github.com/robotframework/robotframework.github.com" target="_blank">Let us know</a> if useful links are missing from the list. </p>'
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
                  },
                  {
                    title: "Robohub",
                    href: "https://hub.robocorp.com/robotic-process-automation/basics-of-rpa/",
                    text:
                      "RPA tutorials and guidelines"
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
                  {
                    title: "Robot Framework katas",
                    href: "https://github.com/eficode-academy/rf-katas",
                    text:
                      "Series of exercises and examples how to get started with test automation. No prior knowledge of test automation required."
                  }
                ]
              },
              /*{
                title: "Videos",
                items: [
                  {
                    src: "https://www.youtube.com/embed/T0SK5A1rwdk"
                  },
                  {
                    src: "https://www.youtube.com/embed/LhUre0hu8I8"
                  },
                  {
                    src: "https://www.youtube.com/embed/819sBbvT6gM"
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
                  },
                  {
                    title: "Much more at robocon.io!",
                    href: "https://robocon.io/#previous-talks",
                    text: ""
                  }
                ]
              },*/
              {
                title: "Trainings/Certification",
                items: [
                  {
                    title: "Certification",
                    href: "https://tickets.robotframework.org/cert/",
                    text:
                      "Robot Framework offers certification exams in select locations. <br><b>Due to coronavirus the tests are momentarily unavailable.</b>"
                  },
                  {
                    title: "Introduction to Robot Framework (FREE)",
                    href: "https://testautomationu.applitools.com/robot-framework-tutorial/",
                    text:
                      "Want to learn Robot Framework? Learn the fundamentals in 1 hour with Test Automation University’s FREE course!"
                  },
                  {
                    title: "Robot Framework Workshops",
                    href: "https://robot-work.shop/",
                    text:
                      "Robot Framework workshops events"
                  },
                  {
                    title: "RoboCon Workshops",
                    href: "https://tickets.robotframework.org/",
                    text:
                      "Robot Framework Conference Workshops"
                  },
                  /*{
                    title: "Robotframeworktutorial.com",
                    href: "http://www.robotframeworktutorial.com",
                    text:
                      "Offers several paid video training courses that have got 3000+ students in over 90 countries up and running very quickly."
                  }*/
                ]
              }
            ]
          }
        },
        {
          title: "Community",
          text_block: true,
          community_block: true,
          feature_box: false,
          data: {
            text: {
              header: "Community",
              text: "Robot Framework has a vibrant community around it with various online forums, annual RoboCon conference, and meetup groups around the world."
            },
            items: [
              {
                title: 'community',
                items: [
                  {
                    img: require("@/assets/img/ROBOTFW_Mark_Black_LOW.png"),
                    title: 'Forum',
                    href: 'http://forum.robotframework.org',
                    text: 'New Robot Framework community forum. '
                  },
                  {
                    img: require("@/assets/img/slack.png"),
                    title: 'Slack',
                    href: 'http://robotframework.slack.com',
                    text: 'Community team chat. Get an <a href="https://rf-invite.herokuapp.com/" target="_blank">invite to the workspace.</a>'
                  },
                  {
                    img: require("@/assets/img/gmail.png"),
                    title: 'Mailing list',
                    href: 'http://groups.google.com/group/robotframework-users',
                    text: 'Google groups community mailing list.'
                  },
                  {
                    title: "Robocon",
                    href: "https://robocon.io/",
                    text: "Annual Robot Framework conference"
                  },
                  {
                    title: "@robotframework",
                    href: "http://twitter.com/robotframework",
                    text: "Announcements in Twitter."
                  },
                  {
                    title: "Meetup Groups",
                    href:
                      "https://www.meetup.com/pro/robot-framework-foundation",
                    text:
                      "Robot Framework meetup groups around the globe."
                  },
                  {
                    title: "LinkedIn",
                    href:
                      "https://www.linkedin.com/groups/3710899/",
                    text: "Robot Framework group on LinkedIn."
                  },
                  {
                    title: "robotframework-announce",
                    href:
                      "http://groups.google.com/group/robotframework-announce",
                    text:
                      "Mailing list for just release announcements, nothing more."
                  },
                  {
                    title: "Stack Overflow",
                    href:
                      "http://stackoverflow.com/questions/tagged/robotframework",
                    text:
                      "Questions in Stack Overflow tagged with Robot Framework."
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
                    title: "Facebook",
                    href: "https://www.facebook.com/robotframeworkofficial",
                    text:
                      "Robot Framework Facebook page."
                  }
                ]
              }
            ]
          }
        },
        {
          title: "CoC",
          text_block: true,
          data: {
            text: {
              header: "Code of Conduct",
              text: `
                <p>
                  ROBOT FRAMEWORK FOUNDATION is dedicated to providing a harassment-free experience for everyone,
                  regardless of gender, gender identity and expression, sexual orientation, disability, physical
                  appearance, body size, age, race, or religion. We do not tolerate harassment of participants in any
                  form.
                </p>
                <p>
                  This code of conduct applies to all ROBOT FRAMEWORK spaces, both online and off.
                  Anyone who violates this code of conduct may be sanctioned or expelled from these spaces at the
                  discretion of the Robot Framework board.
                </p>
                <p>
                  Some ROBOT FRAMEWORK spaces may have additional rules in place, which will be made clearly available
                  to participants. Participants are responsible for knowing and abiding by these rules.
                  If you are being harassed by a member of ROBOT FRAMEWORK, notice that someone else is being
                  harassed, or have any other concerns, please contact <a href="mailto: awareness@robotframework.org">awareness@robotframework.org</a>.
                </p>
                `,
              textExpanded: `
                <h4>Harassment includes</h4>
                <p class="mb-0">• Offensive comments related to gender, gender identity and expression, sexual orientation, disability, mental illness, neuro(a)typicality, physical appearance, body size, age, race, or religion.
                <br>• Unwelcome comments regarding a person’s lifestyle choices and practices, including those related to food, health, parenting, drugs, and employment.
                <br>• Deliberate misgendering or use of ‘dead’ or rejected names.
                <br>• Gratuitous or off-topic sexual images or behaviour  in spaces where they’re not appropriate.
                <br>• Physical contact and simulated physical contact (eg, textual descriptions like “*hug*” or “*backrub*”) without consent or after a request to stop.
                <br>• Threats of violence.
                <br>• Incitement of violence towards any individual, including encouraging a person to commit suicide or to engage in self-harm.
                <br>• Deliberate intimidation.
                <br>• Stalking or following.
                <br>• Harassing photography or recording, including logging online activity for harassment purposes.
                <br>• Sustained disruption of discussion.
                <br>• Unwelcome sexual attention.
                <br>• Pattern of inappropriate social contact, such as requesting/assuming inappropriate levels of intimacy with others
                <br>• Continued one-on-one communication after requests to cease.
                <br>• Deliberate “outing” of any aspect of a person’s identity without their consent except as necessary to protect vulnerable people from intentional abuse.
                <br>• Publication of non-harassing private communication.
                <br>• ROBOT FRAMEWORK community prioritizes marginalized people’s safety over privileged people’s comfort. The Robot Framework board reserves the right not to act on complaints regarding:</p>
                <p class="ml-4 mt-0">• ‘Reverse’ -isms, including ‘reverse racism,’ ‘reverse sexism,’ and ‘cisphobia’
                <br>• Reasonable communication of boundaries, such as “leave me alone,” “go away,” or “I’m not discussing this with you.”
                <br>• Communicating in a ‘tone’ you don’t find congenial
                <br>• Criticizing racist, sexist, cissexist, or otherwise oppressive behaviour or assumptions</p>
                <h4>Reporting</h4>
                <p>• If you are being harassed by a member of ROBOT FRAMEWORK, notice that someone else is being harassed, or have any other concerns, please contact <a style="display: inline;" href="mailto: awareness@robotframework.org">awareness@robotframework.org</a>. If the person who is harassing you is on the team, they will recuse themselves from handling your incident. We will respond as promptly as we can.
                <br>• This code of conduct applies to ROBOT FRAMEWORK spaces, but if you are being harassed by a member of ROBOT FRAMEWORK outside our spaces, we still want to know about it. We will take all good-faith reports of harassment by ROBOT FRAMEWORK members seriously. This includes harassment outside our spaces and harassment that took place at any point in time. The abuse team reserves the right to exclude people from ROBOT FRAMEWORK based on their past behaviour, including behaviour outside ROBOT FRAMEWORK spaces and behaviour towards people who are not in ROBOT FRAMEWORK community.
                <br>• In order to protect volunteers from abuse and burnout, we reserve the right to reject any report we believe to have been made in bad faith. Reports intended to silence legitimate criticism may be deleted without response.
                <br>• We will respect confidentiality requests for the purpose of protecting victims of abuse. At our discretion, we may publicly name a person about whom we’ve received harassment complaints, or privately warn third parties about them, if we believe that doing so will increase the safety of ROBOT FRAMEWORK members or the general public. We will not name harassment victims without their affirmative consent.</p>
                <h4>Consequences</h4>
                <p>• Participants asked to stop any harassing behaviour are expected to comply immediately.
                <br>• If a participant engages in harassing behaviour, the Robot Framework board may take any action they deem appropriate, up to and including expulsion from all ROBOT FRAMEWORK spaces and identification of the participant as a harasser to other ROBOT FRAMEWORK members or the general public.</p>
              `
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
                title: "ABB",
                href: "http://www.abb.com",
                img: require("@/assets/img/users/abb.png"),
                text:
                  "ABB is using Robot Framework in software development for testing distribution automation related configuration tools, web interfaces and embedded devices."
              },
              {
                title: "Accruent",
                href: "https://www.accruent.com/",
                img: require("@/assets/img/users/accruent.png"),
                text:
                  'Accruent has been using Robot Framework since 2015 to drive API, GUI, mobile, and desktop automation testing throughout the company. Accruent has since made its <a href="https://github.com/Accruent/robotframework-zoomba" target="_blank">Zoomba</a> library open source to help other teams make the move to Robot Framework.'
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
                title: "Altran",
                href: "https://www.altran.com/",
                img: require("@/assets/img/users/altran.png"),
                text:
                  "Altran is a world leader in engineering solutions and R&D, and is using extensively RobotFramework mainly in it's Global Engineering Centers. Altran is also an active contributor for the RobotFramework community and is the main developer of several RobotFramework libraries."
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
                title: "Finnish Tax Administration",
                href: "https://www.vero.fi/en/individuals/",
                img: require("@/assets/img/users/vero.png"),
                text:
                  "Finnish Tax Administration is using Robot Framework in multiple projects. Robot Framework is one of the core tools in their development to make Quality Assurance and Automation."
              },
              {
                title: "Flipdish",
                href: "https://www.flipdish.com/",
                img: require("@/assets/img/users/flipdish.png"),
                text:
                  "Flipdish are using Robot Framework for web, mobile and api, to enable us to test and release multiple white label products used for online ordering platforms across the globe."
              },
              {
                title: "HeyMath",
                href: "https://plp.heymath.com/",
                img: require("@/assets/img/users/heymath.png"),
                text:
                  "HeyMath! is a comprehensive E-learning program with world-class creative digital content.We use Robot Framework for end-to-end automation testing for our Products and ensuring the quality before delivering to the end users."
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
                title: "Nokia",
                href: "http://www.nokia.com",
                img: require("@/assets/img/users/nokia.png"),
                text:
                  "Robot Framework was initially developed at Nokia Networks and it is used extensively around the whole company. It is used for testing different devices, software systems and protocols via GUIs, APIs and various other interfaces."
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
                title: "QA Hive",
                href: "https://www.qahive.com",
                img: require("@/assets/img/users/qahive.png"),
                text:
                  "QA Hive is using Robot Framework for automation tests and automation tasks for reduce overall manual process and improve system reliability."
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
                href: "https://www.ryerson.ca/",
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
                  "Segron is a Bratislava-based company offering beyond end-to-end testing solution for Telecommunications. Our tool is based on Robot Framework and is the first true end-to-e nd solution for testing multiple interfaces and technologies with a single tool."
              },
              {
                title: "Testmo",
                href: "https://www.testmo.com/",
                img: require("@/assets/img/users/testmo.png"),
                text:
                  "Testmo is a test management tool for modern software teams. The Testmo team uses Robot Framework for acceptance testing and to support its customers' QA."
              },
              {
                title: "TMA Solutions",
                href: "https://www.tmasolutions.com",
                img: require("@/assets/img/users/TMAlogo.png"),
                text:
                  "TMA Solutions is using Robot Framework to automate not only single product but also complex interoperability testing, involving API, desktop, mobile, web, network devices and special hardware. With this framework, we can easily expand testing scopes, improve automation run speed while still keeping high reliability."
              },
              {
                title: "Wärtsilä Digital Technologies",
                href: "https://www.wartsila.com/",
                img: require("@/assets/img/users/wartsila.png"),
                text:
                  "Wärtsilä Digital Technologies uses Robot to automate various types of testing. API testing, component testing, functional and system tests are used to ensure the highest quality of a wide variety of software. The Robot Framework helps us automate testing of mobile applications, web applications and cross-platform desktop applications."
              },
              {
                title: "zilogic",
                href: "http://www.zilogic.com",
                img: require("@/assets/img/users/zilogic.png"),
                text:
                  "Zilogic Systems is using Robot Framework for integration testing of embedded products. We convert requirements into test cases,write necessary libraries to test the Device Under Test."
              },
              {
                title: "Zymr Inc",
                href: "https://www.zymr.com",
                img: require("@/assets/img/users/zymr.png"),
                text:
                  "Zymr has deep expertise in the Robot Framework and using it extensively for automating the test cases for the clients in various industries. It has been used within Docker and other containers."
              }
            ]
          }
        },
        {
          title: "Foundation",
          text_block: true,
          tab_box: false,
          url: 'https://robotframework.org/foundation/',
          feature_box: false
        },
        {
          title: "RoboCon",
          text_block: true,
          tab_box: false,
          url: 'https://robocon.io',
          feature_box: false
        },
        {
          title: "GitHub",
          text_block: true,
          tab_box: false,
          url: 'https://github.com/robotframework/robotframework',
          feature_box: false
        },
        {
          title: "Forum",
          text_block: true,
          tab_box: false,
          url: 'http://forum.robotframework.org',
          feature_box: false
        },
        {
          title: "Shop",
          text_block: true,
          tab_box: false,
          url: 'https://reddyshop.co/robotframework/',
          feature_box: false
        },
        {
          title: "RPA",
          text_block: true,
          tab_box: false,
          url: 'https://robotframework.org/rpa/',
          feature_box: false
        }
      ]
    };
  }
};
</script>
