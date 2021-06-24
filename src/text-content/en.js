export default () => ({
  newsBanner: 'RF 4.0 is out! <a href="www.google.com">Click here</a> for release notes',
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

      Robot Framework is actively supported, with many industry-leading companies using it in their software development.<br><br>

      Robot Framework is open and extensible and can be integrated with virtually any other tool to create powerful and flexible automation solutions.
      Being open source also means that Robot Framework is free to use without licensing costs.
      Robot Framework has easy syntax, utilizing human-readable keywords. Its capabilities can be extended by libraries implemented with Python or Java.
      The framework has a rich ecosystem around it, consisting of libraries and tools that are developed as separate projects.`,
    companies: [
      {
        name: 'ABB',
        description: 'ABB is using Robot Framework in software development for testing distribution automation related configuration tools, web interfaces and embedded devices.',
        imgName: 'ABB.svg'
      },
      {
        name: 'Cisco',
        description: 'Cisco’s Customer Experience (CX) supports the testing & validation of Cisco and 3rd party solutions deployed by our customers. This includes Solution Validation Services (SVS) delivered both on Cisco-premise and customer-premise as part of a NetDevOps (CI/CD) process where continuous validation accelerates technology adoption, de-risks IT deployments, changes and upgrades, and ensures complex migrations are transparent.',
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
      `Robot Framework is a generic open source automation framework.
      It can be used for test automation and robotic process automation (RPA).<br><br>

      Robot Framework is actively supported, with many industry-leading companies using it in their software development.<br><br>

      Robot Framework is open and extensible and can be integrated with virtually any other tool to create powerful and flexible automation solutions.
      Being open source also means that Robot Framework is free to use without licensing costs.
      Robot Framework has easy syntax, utilizing human-readable keywords. Its capabilities can be extended by libraries implemented with Python or Java.
      The framework has a rich ecosystem around it, consisting of libraries and tools that are developed as separate projects.<br><br>

      Robot Framework project is hosted on GitHub where you can find further documentation, source code, and issue tracker. Downloads are hosted at PyPI.<br<br>

      Robot Framework is operating system and application independent.
      The core framework is implemented using Python and also runs on Jython (JVM) and IronPython (.NET).<br><br>

      Robot Framework itself is open source software released under Apache License 2.0, and most of the libraries and tools in the ecosystem are also open source.
      The framework was initially developed at Nokia Networks and was open sourced in 2008.`
  }
})
