export default () => ({
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

      Robot Framework is open and extensible and can be integrated with virtually any
      other tool to create powerful and flexible automation solutions. Being open source
      also means that Robot Framework is free to use without licensing costs. Robot Framework
      has easy syntax, utilizing human-readable keywords. Its capabilities can be extended
      by libraries implemented with Python or Java. The framework has a rich ecosystem
      around it, consisting of libraries and tools that are developed as separate projects.

      Robot Framework is a generic open source automation framework.
      It can be used for test automation and robotic process automation (RPA).<br><br>`,
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
      `Robot Framework is open and extensible and can be integrated with virtually any other
      tool to create powerful and flexible automation solutions. Being open source also means
      that Robot Framework is free to use without licensing costs. Robot Framework has easy
      syntax, utilizing human-readable keywords. Its capabilities can be extended by libraries
      implemented with Python or Java.`
  },
  community: {
    title: 'Community',
    body:
      `Robot Framework has a vibrant community around it with various online forums, annual
      RoboCon conference, and meetup groups around the world.`
  },
  resources: {
    title: 'Resources',
    body:
      'If you want to add your library here, make a PR.',
    content: [
      {
        name: 'Libraries',
        description: `Libraries provide the actual automation and testing capabilities to
        Robot Framework by providing keywords. Several standard libraries are bundled with
        the framework, and there are separately developed external libraries galore that
        can be installed based on your needs. Creating your own libraries is a breeze.`,
        items: [
          {
            name: 'Builtin',
            description: 'Provides a set of often needed generic keywords. Always automatically available without imports.',
            keywords: ['built-in'],
            stars: null
          },
          {
            name: 'Collections',
            description: 'Provides a set of keywords for handling Python lists and dictionaries.',
            keywords: ['built-in'],
            stars: null
          },
          {
            name: 'DateTime',
            description: 'Date and time conversions. New in Robot Framework 2.8.5.',
            keywords: ['built-in'],
            stars: null
          },
          {
            name: 'DataDriver Library',
            description: 'Data-Driven Testing with external 📤 data tables (csv, xls, xlsx, etc.). 🧬 Pairwise Combinatorial Testing support.',
            keywords: ['csv'],
            stars: 54
          },
          {
            name: 'AppiumLibrary',
            description: 'Android and iOS testing. Uses Appium internally.',
            keywords: ['mobile'],
            stars: 267
          },
          {
            name: 'SapGuiLibrary',
            description: 'Testing the SAPGUI client using the internal SAP Scripting Engine.',
            keywords: ['sap', 'gui'],
            stars: 25
          },
          {
            name: 'SeleniumLibrary',
            description: 'Web testing library that uses popular Selenium tool internally.',
            keywords: ['web', 'selenium'],
            stars: 1049
          }
        ]
      },
      {
        name: 'Tools',
        description: `Supporting tools ease automation: editing, running, building and so on.
        Most of these tools are developed as separate projects, but some are built into the framework itself.`,
        items: [
          {
            name: 'Rebot',
            description: 'Tool for generating logs and reports based on XML outputs and for combining multiple outputs together.',
            keywords: ['built-in']
          }
        ]
      },
      {
        name: 'Learning',
        description: `Want to get started? Looking for a way to do things? Here are the most
        important documentation resources needed to work with Robot Framework. Notice that
        individual libraries and tools in the ecosystem have their own documentation that
        is typically accessed via their project pages.`,
        items: [
          {
            name: 'Installation Instructions',
            description: 'If you are familiar with Python and pip, just run pip install robotframework. Notice that external libraries and tools need to be installed separately.',
            keywords: ['getting started']
          },
          {
            name: 'User Guide',
            description: 'Reference manual explaining all Robot Framework features in detail.',
            keywords: ['documentation']
          },
          {
            name: 'Public API',
            description: 'Public API for writing your own tools against Robot Framework.',
            keywords: ['documentation']
          },
          {
            name: 'Introduction Slides',
            description: 'Generic Robot Framework introduction slides.',
            keywords: ['getting started']
          },
          {
            name: 'How to write good test cases',
            description: 'Guidelines for writing good test cases using Robot Framework.',
            keywords: ['getting started']
          },
          {
            name: 'RPA tutorials',
            description: 'Robocorp RPA tutorials, courses, and guidelines',
            keywords: ['getting started', 'rpa']
          },
          {
            name: 'Quick Start Guide',
            description: 'Introduces the most important features of Robot Framework and acts as an executable demo.',
            keywords: ['getting started']
          },
          {
            name: 'Dos And Don\'ts',
            description: 'Slide set loosely based on \'How to write good test cases\' guidelines.',
            keywords: ['getting started']
          },
          {
            name: 'Web Demo',
            description: 'Demonstrates how to create tests and higher level keywords. The system under test is a simple web page that is tested using SeleniumLibrary.',
            keywords: ['demo']
          },
          {
            name: 'Robot Demo',
            description: 'Demonstrates how to create tests and test libraries. The system under test is a simple calculator that is tested using a custom library.',
            keywords: ['demo']
          },
          {
            name: 'ATDD with Robot Framework',
            description: 'How to use Robot Framework for Acceptance Test Driven Development (ATDD) a.k.a. Specification by Example.',
            keywords: ['demo']
          },
          {
            name: 'Using C with Robot Framework',
            description: 'This simple example demonstrates how to use C language from Robot Framework test libraries.',
            keywords: ['demo']
          },
          {
            name: 'Robot Framework RPA example projects',
            description: 'A library of sample RPA projects and code snippets built on Robot Framework',
            keywords: ['demo', 'rpa']
          },
          {
            name: 'Remote interface demo',
            description: 'Example demonstrates how to use Robot Framework\'s <a href="https://github.com/robotframework/RemoteInterface">Remote interface</a> to call test libraries written in any programming language.',
            keywords: ['demo']
          },
          {
            name: 'Robot Framework katas',
            description: 'Series of exercises and examples how to get started with test automation. No prior knowledge of test automation required.',
            keywords: ['demo']
          }
        ]
      }
    ]
  }
})
