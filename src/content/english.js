export default () => ({
  langName: 'English',
  newsBanner: '🎉 RF 4.0 is out! <a href="www.google.com">Click here</a> for release notes',
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
      '<p>Install & Write your first test</p>',
    tabs: [
      {
        name: 'Install',
        description: `
          <p>Robot Framework is implemented with Python, so you need to have <a href="https://www.python.org/downloads/" target="_blank">Python installed.</a><br>On Windows machines, make sure to add <a href="https://docs.python.org/3/using/windows.html#the-full-installer" target="_blank">Python to PATH</a> during installation.</p>
          <p>Installing Robot Framework with pip is simple:
          <code>pip install robotframework</code></p>
          <p>To check that the installation was succesful, run
          <code>robot --version</code></p>
          <p>Now you are ready to write your first test!</p>
          `
      },
      {
        name: 'Your first test',
        description: `<p>Let's take a look at syntax:</p>
        <robot>*** Settings ***
          Documentation     A test suite with a single test for valid login.
          ...
          ...               This test has a workflow that is created using keywords in
          ...               the imported resource file.
          Resource          resource.txt

          *** Test Cases ***
          Valid Login
              Open Browser To Login Page
              Input Username    demo
              Input Password    mode
              Submit Credentials
              Welcome Page Should Be Open
              [Teardown]    Close Browser
        </robot>
        <p>thats it!</p>`
      },
      {
        name: 'Further Learning',
        description: 'Some example test here'
      }
    ]
  },
  community: {
    title: 'Community',
    body:
      `<p>Robot Framework has a vibrant community around it. Something something something...</p>
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
