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
  rcc create
  rcc run</code></pre>`
        }, {
          name: 'macOS',
          description: `
<pre><code><button class="icon-copy">&nbsp;</button><span>brew install robocorp/tools/rcc</span>
  rcc create
  rcc run</code></pre>`
        }, {
          name: 'Linux',
          description: `
<pre><code><button class="icon-copy">&nbsp;</button><span>curl -o rcc https://downloads.robocorp.com/rcc/releases/latest/linux64/rcc</span>
  chmod a+x rcc
  rcc create
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

      <p>The power of Robot Framework comes from its ecosystem of tools, libraries, and community. It is
      the world’s most popular and widely used framework for open-source RPA.</p>`
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
      title: 'Quickstart',
      body: `<p>Quickstart is still work in progress and will be released later this year.
      Meanwhile, check User Guide for general <a href="https://robotframework.org/robotframework/latest/RobotFrameworkUserGuide.html#creating-tasks">task creation instructrions</a>!</p>`
    },
    resources: {
      title: 'Resources',
      body: `<p>Robot Framework itself provides the language to describe automations. To create an RPA
      bot with Robot Framework, you’ll combine tooling (develop, package, run) with libraries (bot capabilities.)
      This list is a collection of RPA resources to get you started</p>`,
      tooling: {
        title: 'Tooling',
        description: 'Tools for developing and running bots with Robot Framework',
        list: [
          {
            name: 'RCC',
            href: 'https://github.com/robocorp/rcc#readme',
            description: 'Toolchain for creating, packaging, and running bots with Robot Framework and Python'
          }, {
            name: 'Robot Framework Language Server for VS Code',
            href: 'https://marketplace.visualstudio.com/items?itemName=robocorp.robotframework-lsp',
            description: 'VS Code extension for Robot Framework language'
          }, {
            name: 'RCC features for VS Code',
            href: 'https://marketplace.visualstudio.com/items?itemName=robocorp.robocorp-code',
            description: 'VS Code extension for RCC'
          }
        ]
      },
      libraries: {
        title: 'Libraries',
        description: 'RPA focused / useful libraries',
        list: [
          {
            name: 'RPA framework',
            href: 'https://rpaframework.org',
            description: 'Common RPA functionality in a single library - includes desktop, browser, Excel, PDF, email, and many more capabilities'
          }, {
            name: 'Playwright',
            href: 'https://robotframework-browser.org',
            description: 'Powerful browser automation library utilizing Playwright. It comes with a built-in browser.'
          }, {
            name: 'SAP GUI Library',
            href: 'https://github.com/frankvanderkuur/robotframework-sapguilibrary',
            description: 'GUI automation for SAP'
          }, {
            name: 'Mainframe 3270 Library',
            href: 'https://github.com/Altran-PT-GDC/Robot-Framework-Mainframe-3270-Library',
            description: 'Automating 3270 mainframes'
          }, {
            name: 'DataDriver Libary',
            href: 'https://github.com/Snooz82/robotframework-datadriver',
            description: 'Data-driven automation through tables (csv, xls, xlsx, etc.)'
          }
        ]
      },
      tutorials: {
        title: 'Examples and tutorials for RPA',
        description: '',
        list: [
          {
            name: 'Robocorp Portal',
            href: 'https://robocorp.com/portal/',
            description: 'Examples and templates for RPA projects'
          }, {
            name: 'Robocorp RPA certifications',
            href: 'https://robocorp.com/docs/courses',
            description: 'Robocorp certification trainings for RPA (free)'
          }
        ]
      }
    }
  }
})
