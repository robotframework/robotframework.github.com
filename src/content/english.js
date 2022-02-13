export default () => ({
  langName: 'English',
  newsBanner: '📣 <a href="https://robocon.io/">RoboCon 2022 tickets available!</a> 📣',
  navbar: {
    items: [
      {
        name: 'Getting started',
        id: 'getting-started'
      },
      {
        name: 'Resources',
        id: 'resources'
      },
      {
        name: 'Community',
        id: 'community'
      },
      {
        name: 'Development',
        id: 'development'
      }
    ],
    dropdownDocs: {
      name: 'Docs',
      items: [
        {
          name: 'User Guide',
          url: 'https://robotframework.org/robotframework/#user-guide',
          description: 'All features explained'
        },
        {
          name: 'Standard Libraries',
          url: 'https://robotframework.org/robotframework/#standard-libraries',
          description: 'Keyword documentation'
        },
        {
          name: 'Public API',
          url: 'https://robot-framework.readthedocs.io/en/stable/',
          description: 'Build RF extensions'
        }
      ]
    },
    dropdownLinks: {
      name: 'External sites',
      items: [
        {
          name: 'Github',
          url: 'https://github.com/robotframework/robotframework',
          description: 'Source code + issues'
        },
        {
          name: 'Forum',
          url: 'https://forum.robotframework.org/',
          description: 'Discuss Robot Framework'
        },
        {
          name: 'Foundation',
          url: '/foundation/',
          description: 'Support the development',
          isRouterLink: true
        },
        {
          name: 'Robocon',
          url: 'https://robocon.io/',
          description: 'Annual conference'
        },
        {
          name: 'Youtube',
          url: 'https://www.youtube.com/channel/UCuOaCtN8bI9O_E2VYIumIqg',
          description: 'Conference talks archived'
        },
        {
          name: 'Shop',
          url: 'https://reddyshop.co/robotframework/',
          description: 'Support the development'
        },
        {
          name: 'RPA',
          url: 'https://robotframework.org/rpa/',
          description: 'Robotic process automation'
        }
      ]
    }
  },
  introduction: {
    title: 'Introduction',
    body:
      `Robot Framework is a generic open source automation framework.
      It can be used for test automation and robotic process automation (RPA).<br><br>

      Robot Framework is supported by <a href="/foundation/">Robot Framework Foundation</a>.
      Many industry-leading companies use the tool in their software development.<br><br>

      Robot Framework is open and extensible. Robot Framework can be integrated with virtually any
      other tool to create powerful and flexible automation solutions.
      Robot Framework is free to use without licensing costs.<br><br>

      Robot Framework has an easy syntax, utilizing human-readable keywords. Its capabilities can be extended
      by libraries implemented with Python, Java or many other programming languages.
      Robot Framework has a rich ecosystem around it, consisting of libraries and tools that are developed as separate projects.`,
    usedByTitle: 'Robot Framework is used by...',
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
      },
      {
        name: 'Finnair',
        description: 'Finnair is using Robot Framework to support Finnair digital platform development.',
        imgName: 'Finnair.svg'
      },
      {
        title: 'Finnish Tax Administration',
        description: `Finnish Tax Administration is using Robot Framework in multiple projects.
        Robot Framework is one of the core tools in their development to make Quality Assurance and Automation.`,
        imgName: 'Vero.svg'
      },
      {
        name: 'Juniper Networks',
        description: 'Juniper Networks has built an extensive automation framework on top of Robot Framework for end-to-end qualification of Juniper products. It is used extensively in multiple groups including engineering and support.',
        imgName: 'Juniper_Networks.svg'
      },
      {
        name: 'Naval Research Laboratory',
        description: 'The Naval Research Laboratory extends Robot Framework to provide a seamless integration with the <a href="https://www.nrl.navy.mil/itd/imda/products/sage" target="_blank">SAGE</a> multi-agent system. This integration enables Robot Framework to drive distributed simulation and monitoring for test automation of SOA systems.',
        imgName: 'Naval_Research_Laboratory.svg'
      },
      {
        name: 'Nokia',
        description: 'Robot Framework was initially developed at Nokia Networks and it is used extensively around the whole company. It is used for testing different devices, software systems and protocols via GUIs, APIs and various other interfaces.',
        imgName: 'Nokia.svg'
      },
      {
        name: 'Wärtsilä',
        description: 'Wärtsilä Digital Technologies uses Robot to automate various types of testing. API testing, component testing, functional and system tests are used to ensure the highest quality of a wide variety of software.',
        imgName: 'Wartsila.svg'
      }
    ]
  },
  gettingStarted: {
    title: 'Getting Started',
    body:
      `<cite>Code is worth a thousand words.</cite>
      <p>Below you'll find a live Robot Framework editor with embedded <a href="https://pyodide.org/en/stable/" target="_blank">WASM Python</a> environment to run it online.
      Feel free to experiment with it! <b>NOTE: This is the editor's first release.</b> If you find bugs,
      please report them in <a href="https://github.com/robotframework/robotframework.github.com/issues" target="_blank">Github issues.</a></p>
      <p>To start using Robot Framework in a project of your own, please also check tabs "Install" and "Learn".</p>`,
    // body:
    //   `<p>Using Robot Framework is completely free, no strings attached.
    //   Due to its expandable open source nature Robot Framework is extremely
    //   versatile for various test and RPA cases. Using it does not require expert skills in coding.</p>
    //   <p>Here's a quick introduction to get you started with Robot Framework. </p>`,
    tabs: [
      {
        name: 'Editor'
      },
      // old example-tab in case text is still needed
      /* {
        name: 'Examples',
        description: `<p>This is a simple example to illustrate how Robot Framework works.
        The example is based on the <a href="/demoapp" target="_blank">Demo App</a> which
        we encourage to check for more details and to try it out yourself.</p>
<robot>*** Settings ***
Documentation     A test suite for valid login.
...
...               Keywords are imported from the resource file
Resource          resource.robot

*** Test Cases ***
Valid Login
    Open Login Page
    Input Credentials    robot    overloard
    Submit Credentials
    Welcome Page Should Be Open
</robot>
        <p>The test case uses imported keywords such as <span class="hljs">Open Login Page</span> that
        abstract the inner workings and enable the test to be easily readable with natural language.</p>
        <p>Below you'll see the <span class="hljs">resource.robot</span> file. It is extended with
        <a href="https://robotframework-browser.org" target="_blank">Browser library</a>
        that provides lots of useful keywords for web testing such as <span class="hljs">New Page</span>.
        Keywords are composable, meaning you can define new keywords that use pre-existing keywords.</p>
        <robot>*** Settings ***
Documentation     Reusable keywords and variables.
Library           Browser

*** Variables ***
\${DEMO_URL}      https://robotframework.org/demoapp
\${BROWSER_TYPE}  webkit

*** Keywords ***
Open Login Page
    New Browser  \${BROWSER_TYPE}
    New Page    \${DEMO_URL}
    Login Page Should Be Open

Login Page Should Be Open
    Get Url   ==    \${DEMO_URL}
    Get Title   ==    Robot Framework

Input Credentials
    [Arguments]    \${username}    \${password}
    Type Text    text=Username    \${username}
    Type Text    text=Password    \${password}

Submit Credentials
    Click    input[type=submit]

Welcome Page Should Be Open
    Get Url   ==   \${DEMO URL}
    Get Text   body   ==   I salute you, Robot overloard!
    Get Title  ==    Robots rule</robot>
        <p>After running the test a log file will be generated. The log file contains
        the test results and information about the run.</p>
        <a href="./example/log.html" target="_blank">Example log file</a>.
        <a href="./example/example.robot" target="_blank">example.robot</a>.
        <a href="./example/resource.robot" target="_blank">resource.robot</a>.`
      }, */
      {
        name: 'Install',
        description: `
          <p>Robot Framework is implemented with Python, so you need to have
          <a href="https://www.python.org/downloads/" target="_blank">Python installed.</a>
          <br>On Windows machines, make sure to add
          <a href="https://docs.python.org/3/using/windows.html#the-full-installer" target="_blank">Python to PATH</a>
          during installation.</p>
          <p>Installing Robot Framework with pip is simple:
          <pre class="line">pip install robotframework</pre></p>
          <p>To check that the installation was succesful, run
          <pre class="line">robot --version</pre></p>
          <p>For a full guide, please see
          <a href="https://github.com/robotframework/robotframework/blob/master/INSTALL.rst" target="_blank">Installation instructions</a>.
          It also covers topics such as running Robot Framework on Jython (JVM) and IronPython (.NET).</p>
          <p>Now you are ready to write your first tests!</p>
          `
      },
      {
        name: 'Learn'
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
      <a href="https://robocon.io" target="_blank">robocon.io</a></p>`,
    links: {
      forum: {
        title: 'Forum',
        description: 'Official Robot Framework forum.'
      },
      slack: {
        title: 'Slack',
        description: 'Community team chat.<br><a href="https://rf-invite.herokuapp.com/" target="_blank">Click for invite!</a>'
      },
      openSpace: {
        title: 'Open space',
        description: 'Meet the Robot Framework developers and foundation members. Join topics created by others or bring your own. Also in Slack #open-space. <a href="./robot-framework-open-space.ics">ICS file</a>'
      }
    }
  },
  resources: {
    title: 'Resources',
    body:
      `<p>Robot Framework is open source and supported by <a href="/foundation/">Robot Framework Foundation</a>.
      There is a huge community of contributors around the tool.
      The software is built with expandability in mind and there are numerous ways to extend
      it's use cases for various needs.</p>
      <p>If you have created or found a library that you think should be listed here, please
      <a href="https://github.com/robotframework/robotframework.github.com" target="_blank">let us know</a>
      by submitting a pull request or an issue. You are also welcome to report unmaintained
      ones that shouldn't be listed anymore.`,
    tabs: [
      {
        name: 'Libraries',
        key: 'libraries',
        description: `Separately developed external libraries that
        can be installed based on your needs. Creating your own libraries is a breeze. For instructions, see
        <a href="https://robotframework.org/robotframework/latest/RobotFrameworkUserGuide.html#creating-test-libraries" target="_blank">
        creating test libraries</a> in Robot Framework User Guide.`
      },
      {
        name: 'Built-in',
        key: 'builtin',
        description: `Libraries and tools that are bundled with the framework. Libraries provide
        the actual automation and testing capabilities to Robot Framework by providing keywords.`
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
  },
  development: {
    title: 'Development',
    body: `<p>Development of Robot Framework is funded by the non-profit
    <a href="/foundation/">Robot Framework Foundation</a>. It consists
    of companies and organizations that want to ensure the continuity of Robot Framework now and
    in the future.</p>
    <p>Thanks to these sponsors, Robot Framework remains completely
    free to use while being actively maintained and developed. Foundation also covers other
    related expenses such as the development of this website and organizing various meetups.`,
    sponsorBoxTitle: 'Members of Robot Framework Foundation',
    howToJoin: '<a href="/foundation/">How to join</a>'
  },
  usersPage: {
    title: 'Users of Robot Framework',
    body: `If you'd like your company added here, please submit a
      <a href="https://github.com/robotframework/robotframework.github.com/pulls">pull request</a> or an
      <a href="https://github.com/robotframework/robotframework.github.com/issues">issue</a>.`
    // list of users is found in ./resources/users.js
  },
  foundation: {
    lead: `<p class="lead">Robot Framework Foundation is a non-profit consortium that fosters the growth of Robot Framework.
    It was founded by companies with a common interest to ensure the development of Robot Framework now and in
    the future. We are always looking for new members to join.</p>`,
    benefitsAndCost: {
      title: 'Benefits and cost',
      body: `<p>When your company becomes a member you will:</p>
      <ol>
        <li>Ensure Robot Framework is maintained and developed</li>
        <li>Get visibility about your membership for your company if you wish</li>
        <li>Gain ability to participate in decision making</li>
        <li>Get all this for an affordable price per user</li>
      </ol>
      <h3>Annual Fees</h3>
      <p>Annual fee is determined by how many Robot Framework users are in your organization:</p>
      <table class="col-sm-12 col-md-6">
        <tr>
          <th>Users</th>
          <th>Fee</th>
        </tr>
        <tr>
          <td>1-2</td>
          <td>500€</td>
        <tr>
          <td>3-10</td>
          <td>1500€</td>
        </tr>
        <tr>
          <td>11-50</td>
          <td>3000€</td>
        </tr>
        <tr>
          <td>51-250</td>
          <td>6000€</td>
        </tr>
        <tr>
          <td>251-</td>
          <td>12000€</td>
        </tr>
      </table>

`
    },
    howToJoin: {
      title: 'How to join',
      body: `<p>If you'd like to become a member of Robot Framework Foundation, please</p>
      <ol>
        <li>Fill in <a href="https://forms.gle/Mek9HQ1Ni31SeW1NA" target="_blank">the application</a></li>
        <li>Robot Framework Foundation board will make a voting according to our rules</li>
        <li>You are added to the webpage and mailing list, when you are accepted</li>
        <li>Welcome to make the world of Open Source and Automation better!</li>
      </ol>
      <p>If you have any questions related to the membership, please send an email to
      <a href="mailto:robotframework-foundation{at}{'@'}{at}googlegroups.com">robotframework-foundation{at}{'@'}{at}googlegroups.com</a>
      and we will get back to you.</p>
      <h3>For existing members</h3>
      <p>If your contact person changes and for other such matters, please contact <a href="mailto:admin{at}{'@'}{at}robotframework.org">admin{at}{'@'}{at}robotframework.org</a></p>
      `
    },
    whatWeDo: {
      title: 'What we do',
      body: `<p>We sponsor the development of Robot Framework. Sponsoring other projects in the wider
      Robot Framework ecosystem can also be considered. We take care of the overall Robot Framework infrastructure
      including public websites, email lists and CI servers. We promote Robot Framework by organizing meetups and
      the yearly conference <a href="https://robocon.io/">RoboCon</a>.
      <br><a href="https://forum.robotframework.org/t/robot-framework-foundation-unfolded/276">Read more..</a></p>
      <h3>Robot Framework Foundation Members</h3>`
    }
  }
})
