export default () => ({
  rpa: {
    hero: {
      description: `
      <h2 class="mb-none type-center">
        Get started in seconds with <span class="inline-block">Robot Framework RPA</span>
      </h2>
      <h3 class="type-center">
        Here´s how you set up your first RPA project
      </h3>`,
      tabs: [
        {
          name: 'Windows',
          description: `
<pre><code><button class="icon-copy">&nbsp;</button><span>curl -o rcc.exe https://downloads.robocorp.com/rcc/releases/latest/windows64/rcc.exe</span>
  rcc create example
  cd example
  rcc run</code></pre>`
        }, {
          name: 'macOS',
          description: `
<pre><code><button class="icon-copy">&nbsp;</button><span>brew install robocorp/tools/rcc</span>
  rcc create example
  cd example
  rcc run</code></pre>`
        }, {
          name: 'Linux',
          description: `
<pre><code><button class="icon-copy">&nbsp;</button><span>curl -o rcc https://downloads.robocorp.com/rcc/releases/latest/linux64/rcc</span>
  chmod a+x rcc
  rcc create example
  cd example
  rcc run</code></pre>`
        }
      ]
    },
    intro: {
      title: 'What is Robot Framework RPA?',
      body: `<p>RPA stands for Robotic Process Automation and it’s a method for automating routine
      tasks and processes through user interfaces, APIs, and other interactions that mimic the way
      a human user performs tasks. The power of RPA lies in how you can automate tasks without having
      to change the underlying systems.</p>

      <p>Robot Framework is a keyword-driven automation framework that sits on top of Python. It is an
      abstraction that lets you write powerful automations with simple human-readable commands and minimum overhead.</p>

      <p>The power of Robot Framework comes from its ecosystem of tools, libraries, and community.</p>`
    },
    benefits: {
      title: 'Why use it and what can you do with it?',
      body: `<p>Robot Framework and its ecosystem projects are 100% free and open-source. It is used
      by thousands of developers worldwide and the core Robot Framework is supported by dozens of
      companies through the Robot Framework foundation. Hundreds of companies globally offer support
      and services in the Robot Framework ecosystem.</p>

      <p>Robot Framework is natively extendable through libraries that are built on Python.
      Creating new extensions is extremely simple, so you never run out of capabilities. Community-built
      libraries around Robot Framework provide the functionality to perform virtually any RPA task imaginable.</p>

      <p>There are literally tens of thousands of use-cases for RPA with Robot Framework. Anything
      from automating financial processes like accounts payable, order to cash, procure to pay,
      to healthcare applications around electronic health records, or HR applications such as new employee
      onboarding. You can complete any routine task that a human would do through digital workers built on the Robot Framework.</p>`
    },
    quickstart: {
      title: 'General User Guide',
      body: '<p>Check User Guide for general <a href="https://robotframework.org/robotframework/latest/RobotFrameworkUserGuide.html#creating-tasks">task creation instructions</a>!</p>'
    },
    resources: {
      title: 'Resources',
      body: `<p>Robot Framework itself provides the language to describe automations. Task automation is what is covered by Robot Framework. 
      For orchestrating tasks you need a some sort of orchestrator.</p>`,
      tooling: {
        title: 'Tooling',
        description: 'Tools for developing and running bots with Robot Framework',
        list: [
          {
            name: 'Operaton',
            href: 'https://operaton.org',
            description: 'BPMN based workflow engine orchestrating tasks'
          }, {
            name: 'Purjo',
            href: 'https://github.com/datakurre/purjo',
            description: 'UV based Robot Framework external service task runner for Operaton'
          }, {
            name: 'Robotcode',
            href: 'https://robotcode.dev',
            description: 'Robot Framework extension for VS Code and PyCharm'
          }
        ]
      },
      libraries: {
        title: 'Robot Framework Extensions',
        description: 'Useful libraries',
        list: [
          {
            name: 'MarketSquare',
            href: 'https://github.com/MarketSquare',
            description: 'Collection of libraries for Robot Framework'
          }, {
            name: 'Browser',
            href: 'https://robotframework-browser.org',
            description: 'Powerful browser automation library utilizing Playwright. It comes with a built-in browser.'
          }, {
            name: 'RoboSAPiens',
            href: 'https://github.com/imbus/robotframework-robosapiens',
            description: 'GUI automation for SAP'
          }, {
            name: 'Mainframe 3270 Library',
            href: 'https://github.com/Altran-PT-GDC/Robot-Framework-Mainframe-3270-Library',
            description: 'Automating 3270 mainframes'
          }, {
            name: 'DataDriver Libary',
            href: 'https://github.com/Snooz82/robotframework-datadriver',
            description: 'Data-driven automation through tables (csv, xls, xlsx, etc.)'
          },
          {
            name: 'Pabot',
            href: 'https://pabot.org',
            description: 'Parallel execution of Robot Framework tasks'
          }
        ]
      },
      tutorials: {
        title: 'Examples and tutorials for RPA',
        description: '',
        list: [
          {
            name: 'Operaton Playground',
            href: 'https://datakurre.github.io/operaton-robot-playground/playground/index.html',
            description: 'Full featured training for Process automation with Operaton and Robot Framework.'
          },
          {
            name: 'Robotbook with Robotcode',
            href: 'https://forum.robotframework.org/t/missing-super-useful-functionalities-live-mode-record-execute-from-spreadsheet/8994/10',
            description: 'Example for REPL based task automation.'
          }
        ]
      }
    }
  }
})
