import foundation from './foundation'
import rpa from './rpa'
import testautomation from './testautomation'

export default () => ({
  ...foundation(),
  ...rpa(),
  ...testautomation(),
  langName: 'English',
  newsBanner: '<div style="color: var(--color-theme); font-size: 1.75rem; font-family: var(--font-title);">📣 ROBOCON 2026 📣</div>Speaker slots available!<br><a href="https://www.robocon.io/cfp">Submit your proposal by 19.10.</a>',
  navbar: {
    items: [
      {
        name: 'Get started',
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
          name: 'Guides',
          url: 'https://docs.robotframework.org/docs',
          description: 'Start here'
        },
        {
          name: 'Syllabus',
          url: 'https://syllabus.robotframework.org',
          description: 'Study for cert'
        },
        {
          name: 'User Guide',
          url: 'https://robotframework.org/robotframework/latest/RobotFrameworkUserGuide.html',
          description: 'Original handbook'
        },
        {
          name: 'Keywords',
          url: 'https://robotframework.org/robotframework/latest/libraries/BuiltIn.html',
          description: 'Built-in keywords'
        },
        {
          name: 'Libraries',
          url: 'https://robotframework.org/robotframework/#standard-libraries',
          description: 'Standard libraries'
        },
        {
          name: 'Public API',
          url: 'https://robot-framework.readthedocs.io/en/stable/',
          description: 'Write extensions'
        }
      ]
    }
  },
  introduction: {
    title: 'Introduction',
    body: `
      <p>
        Robot Framework is an open source automation framework for test automation and <a href="https://docs.robotframework.org/docs/getting_started/rpa">robotic process automation (RPA)</a>.
        It is supported by the <a href="/foundation/">Robot Framework Foundation</a> and <a href="/users">widely used</a> in the industry.
        </p>
        <p>
          Its <a href="https://docs.robotframework.org/docs/style_guide">human-friendly and versatile syntax</a> uses keywords and supports <a href="https://docs.robotframework.org/docs/extending_robot_framework/custom-libraries/python_library">extending through libraries</a> in
          Python, Java, and other languages.
        </p>
        <p class="mb-none">
        It integrates with other tools for comprehensive automation without licensing fees,
        bolstered by a rich community with hundreds of <a href="#resources">3rd party libraries</a>.
      </p>
    `,
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
        name: 'Finnish Tax Administration',
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
      }
    ]
  },
  gettingStarted: {
    title: 'Get Started',
    body:
      `<cite>Code is worth a thousand words.</cite>
      <p>Below you'll find a live Robot Framework editor.
      Feel free to experiment with it! If you find bugs,
      please report them in <a href="https://github.com/robotframework/robotframework.github.com/issues" target="_blank">Github issues.</a></p>
      <p>To start using Robot Framework in a project of your own, please check tabs "Install" and "Learn". Also be sure to visit the new <a href="https://docs.robotframework.org/">Robot Framework Docs</a>!</p>`,
    tabs: [
      {
        name: 'Editor'
      },
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
          <p>To check that the installation was successful, run
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
      For more information and to watch previous years' talks, visit
      <a href="https://robocon.io" target="_blank">robocon.io</a> or our
      <a href="https://www.youtube.com/channel/UCuOaCtN8bI9O_E2VYIumIqg" target="_blank">YouTube Channel</a>.</p>
      <p>To support Robot Framework you can find a <a href="https://supergeek.de/de/products/24916-im-the-robot-dark/" target="_blank">&#128085; T-shirt</a>
      and a <a href="https://supergeek.de/de/products/24915-im-the-robot-bright/1232-tasse-coffee-mug/" target="_blank">&#9749; coffee cup</a>
      from our <a href="https://shop.robotframework.org/" target="_blank">Shop<a>.</p>
`,
    links: {
      forum: {
        title: 'Forum',
        description: 'Official Robot Framework forum.'
      },
      slack: {
        title: 'Slack',
        description: 'Community team chat.<br><a href="https://slack.robotframework.org/" target="_blank">Click for invite!</a>'
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
    <p>Project is hosted at <a href="https://github.com/robotframework/robotframework" target="_blank">GitHub</a></p>
    <p>Thanks to the sponsors, Robot Framework remains completely
    free to use while being actively maintained and developed. Foundation also covers other
    related expenses such as the development of this website and organizing various meetups.`,
    sponsorBoxTitle: 'Members of Robot Framework Foundation',
    howToJoin: '<a href="/foundation/">Join</a>'
  },
  usersPage: {
    title: 'Users of Robot Framework',
    body: `If you'd like your company added here, please submit a
      <a href="https://github.com/robotframework/robotframework.github.com/pulls">pull request</a> or an
      <a href="https://github.com/robotframework/robotframework.github.com/issues">issue</a>.`
    // list of users is found in ./resources/users.js
  }
})
