export default () => ({
  langName: 'English',
  newsBanner: '🎉 New website has been released!',
  navbar: {
    items: [
      'Introduction',
      'Getting started',
      'Community',
      'Resources'
    ],
    dropdownName: 'Links',
    dropdown: [
      {
        name: 'Github',
        url: 'https://github.com/robotframework/robotframework',
        description: 'Source code + issues'
      },
      {
        name: 'Forum',
        url: 'http://forum.robotframework.org/',
        description: 'Discuss Robot Framework'
      },
      {
        name: 'Foundation',
        url: 'https://robotframework.org/foundation/',
        description: 'Support the development'
      },
      {
        name: 'Robocon',
        url: 'https://robocon.io/',
        description: 'Annual conference'
      },
      {
        name: 'Shop',
        url: 'https://reddyshop.co/robotframework/',
        description: 'Support the development'
      },
      {
        name: 'RPA',
        url: 'https://robotframework.org/rpa/',
        description: 'RPA stuff'
      }
    ]
  },
  introduction: {
    title: 'Introduction',
    body:
      `Robot Framework is a generic open source automation framework.
      It can be used for test automation and robotic process automation (RPA).<br><br>

      Robot Framework is actively supported, with many industry-leading companies using
      it in their software development.<br><br>

      Robot Framework is open and extensible. Robot Framework can be integrated with virtually any
      other tool to create powerful and flexible automation solutions.
      Robot Framework is free to use without licensing costs.<br><br>

      Robot Framework has easy syntax, utilizing human-readable keywords. Its capabilities can be extended
      by libraries implemented with Python, Java or many other programming languages.
      Robot Framework has a rich ecosystem around it, consisting of libraries and tools that are developed as separate projects.`,
    companies: [
      {
        name: 'ABB',
        description: 'ABB is using Robot Framework in software development for testing distribution automation related configuration tools, web interfaces and embedded devices.',
        imgName: 'ABB.svg'
      },
      {
        name: 'Cisco',
        description: 'Cisco’s Customer Experience (CX) supports the testing & validation of Cisco and 3rd party solutions deployed by our customers. This includes Solution Validation Services (SVS) delivered both on Cisco-premise and customer-premise.',
        imgName: 'Cisco.svg'
      },
      {
        name: 'Condé Nast',
        description: 'Condé Nast <a href="https://technology.condenast.com/story/automated-testing-qa-brand-sites-robot-framework">transformed their quality assurance for their brand sites,</a> such as Brides, Wired and Architectural Digest, from an entirely manual process to automated one with Robot Framework.',
        imgName: 'Condé_Nast.svg'
      },
      {
        name: 'KONE',
        description: 'KONE is widely using Robot Framework in software development for testing embedded systems in elevators and escalators.',
        imgName: 'Kone.svg'
      }
    ]
  },
  gettingStarted: {
    title: 'Getting Started',
    body:
      '<p>Here\'s a quick introduction to get you started with Robot Framework. </p>',
    tabs: [
      {
        name: 'Install',
        description: `
          <p>Robot Framework is implemented with Python, so you need to have <a href="https://www.python.org/downloads/">Python installed.</a><br>On Windows machines, make sure to add <a href="https://docs.python.org/3/using/windows.html#the-full-installer">Python to PATH</a> during installation.</p>
          <p>Installing Robot Framework with pip is simple:
          <pre class="line">pip install robotframework</pre></p>
          <p>To check that the installation was succesful, run
          <pre class="line">robot --version</pre></p>
          <p>For a full guide, please see
          <a href="https://github.com/robotframework/robotframework/blob/master/INSTALL.rst">Installation instructions</a>.
          It also covers topics such as running Robot Framework on Jython (JVM) and IronPython (.NET).</p>
          <p>Now you are ready to write your first tests!</p>
          `
      },
      {
        name: 'Robot Syntax',
        description: `<p>This is a simple example to illustrate how Robot Framework works.
        The example is based on the <a href="https://github.com/robotframework/WebDemo">WebDemo</a> which
        we encourage to check for more details and to try it out yourself.</p>
<robot>*** Settings ***
Documentation     A test suite for valid login.
...
...               Keywords are imported from the resource file
Resource          resource.robot

*** Test Cases ***
Valid Login
    Open Login Page
    Input Credentials    demo    mode
    Submit Credentials
    Welcome Page Should Be Open
    [Teardown]    Close Browser
</robot>
        <p>The test case uses imported keywords such as <span class="hljs">Open Login Page</span> that
        abstract the inner workings and enable the test to be easily readable with natural language.</p>
        <p>Below you'll see the <span class="hljs">resource.robot</span> file. It is extended with
        <a href="https://robotframework.org/SeleniumLibrary/SeleniumLibrary.html">SeleniumLibrary</a>
        that provides lots of useful keywords for web testing such as <span class="hljs">Open Browser</span>.
        Keywords are composable, meaning you can define new keywords that use pre-existing keywords.</p>
        <robot>*** Settings ***
Documentation     Reusable keywords and variables.
Library           SeleniumLibrary

*** Variables ***
\${SERVER}         localhost:7272
\${BROWSER}        Firefox
\${LOGIN URL}      http://\${SERVER}/
\${WELCOME URL}    http://\${SERVER}/welcome.html

*** Keywords ***
Open Login Page
    Open Browser    \${LOGIN URL}    \${BROWSER}
    Login Page Should Be Open

Login Page Should Be Open
    Location Should Be    \${LOGIN URL}
    Title Should Be    Login Page

Input Credentials
    [Arguments]    \${username}    \${password}
    Input Text    username_field    \${username}
    Input Text    password_field    \${password}

Submit Credentials
    Click Button    login_button

Welcome Page Should Be Open
    Location Should Be    \${WELCOME URL}
    Title Should Be    Welcome Page
        </robot>
        <p>After running the test a log file will be generated that contains
        the test results and information about the run.</p>
        <a href="./log.html">Example log file</a>.`
      },
      {
        name: 'Further Learning'
      }
    ]
  },
  community: {
    title: 'Community',
    body:
      `<p>Robot Framework has a vibrant community of testing enthusiasts around it. Feel free to
      stop by if you have any questions, need advice or would just like to connect with like-minded people!</p>
      <p>There is also an annual RoboCon conference that is hosted in Helsinki, Finland.
      RoboCon 2022 will be a hybrid event that can be attended online and in real life.
      For more information and to watch previous years' talks, visit
      <a href="https://robocon.io">robocon.io</a></p>`,
    links: {
      forum: {
        title: 'Forum',
        description: 'Official Robot Framework forum.'
      },
      slack: {
        title: 'Slack',
        description: 'Community team chat. Click to get invited!'
      },
      openSpace: {
        title: 'Open space',
        description: 'Meet the Robot Framework developers and foundation members. Join topics created by others or bring your own (Robot Framework related). Also in Slack #open-space.'
      }
    }
  },
  resources: {
    title: 'Resources',
    body:
      `<p>Robot Framework is open source and there is a huge community of contributors around it.
      The software is built with expandability in mind and there are numerous ways to extend
      it's use cases for various needs.</p>
      <p>If you have created or found a library that you think should be listed here, please
      <a href="https://github.com/robotframework/robotframework.github.com">let us know</a>
      by submitting a pull request or an issue. You are also welcome to report unmaintained
      ones that shouldn't be listed anymore.`,
    tabs: [
      {
        name: 'Built-in',
        key: 'builtin',
        description: `Libraries and tools that are bundled with the framework. Libraries provide
        the actual automation and testing capabilities to Robot Framework by providing keywords.`
      },
      {
        name: 'Libraries',
        key: 'libraries',
        description: `Separately developed external libraries that
        can be installed based on your needs. Creating your own libraries is a breeze. For instructions, see
        <a href="http://robotframework.org/robotframework/latest/RobotFrameworkUserGuide.html#creating-test-libraries">
        creating test libraries</a> in Robot Framework User Guide.`
      },
      {
        name: 'Tools',
        key: 'tools',
        description: `Supporting tools ease automation: editing, running, building and so on.
        Most of these tools are developed as separate projects, but some are built into the framework itself.`
      }
    ],
    mobileTitles: [
      'Standard',
      'External'
    ]
  }
})
