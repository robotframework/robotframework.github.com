export default () => ([
  {
    name: 'Builtin',
    href: 'http://robotframework.org/robotframework/latest/libraries/BuiltIn.html',
    description: 'Provides a set of often needed generic keywords. Always automatically available without imports.',
    tags: ['library']
  },
  {
    name: 'Collections',
    href: 'http://robotframework.org/robotframework/latest/libraries/Collections.html',
    description: 'Provides a set of keywords for handling Python lists and dictionaries.',
    tags: ['library']
  },
  {
    name: 'DateTime',
    href: 'http://robotframework.org/robotframework/latest/libraries/DateTime.html',
    description: 'Library for date and time conversions.',
    tags: ['library']
  },
  {
    name: 'Dialogs',
    href: 'http://robotframework.org/robotframework/latest/libraries/Dialogs.html',
    description: 'Provides means for pausing the execution and getting input from users.',
    tags: ['library']
  },
  {
    name: 'OperatingSystem',
    href: 'http://robotframework.org/robotframework/latest/libraries/OperatingSystem.html',
    description: 'Enables various operating system related tasks to be performed in the system where Robot Framework is running.',
    tags: ['library']
  },
  {
    name: 'Process',
    href: 'http://robotframework.org/robotframework/latest/libraries/Process.html',
    description: 'Library for running processes in the system.',
    tags: ['library']
  },
  {
    name: 'Remote',
    href: 'https://github.com/robotframework/RemoteInterface',
    description: 'Special library acting as a proxy between Robot Framework and libraries elsewhere. Actual libraries can be running on different machines and be implemented using any programming language supporting XML-RPC protocol.',
    tags: ['library']
  },
  {
    name: 'Screenshot',
    href: 'http://robotframework.org/robotframework/latest/libraries/Screenshot.html',
    description: 'Provides keywords to capture screenshots of the desktop.',
    tags: ['library']
  },
  {
    name: 'String',
    href: 'http://robotframework.org/robotframework/latest/libraries/String.html',
    description: 'Library for generating, modifying and verifying strings.',
    tags: ['library']
  },
  {
    name: 'Telnet',
    href: 'http://robotframework.org/robotframework/latest/libraries/Telnet.html',
    description: 'Makes it possible to connect to Telnet servers and execute commands on the opened connections.',
    tags: ['library']
  },
  {
    name: 'XML',
    href: 'http://robotframework.org/robotframework/latest/libraries/XML.html',
    description: 'Library for generating, modifying and verifying XML files.',
    tags: ['library']
  },
  {
    name: 'Rebot',
    description: 'Generate logs and reports based on XML outputs and for combining multiple outputs together.',
    href: 'http://robotframework.org/robotframework/latest/RobotFrameworkUserGuide.html#post-processing-outputs',
    tags: ['tool']
  },
  {
    name: 'Libdoc',
    description: 'Generate keyword documentation for test libraries and resource files.',
    href: 'http://robotframework.org/robotframework/latest/RobotFrameworkUserGuide.html#libdoc',
    tags: ['tool']
  },
  {
    name: 'Testdoc',
    description: 'Generate high level HTML documentation based on Robot Framework test cases.',
    href: 'http://robotframework.org/robotframework/latest/RobotFrameworkUserGuide.html#testdoc',
    tags: ['tool']
  },
  {
    name: 'Tidy',
    description: 'Cleaning up and changing format of Robot Framework test data files.',
    href: 'http://robotframework.org/robotframework/latest/RobotFrameworkUserGuide.html#tidy',
    tags: ['tool']
  }
])
