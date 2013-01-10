---
layout: default
title: Robot Framework
---
.. container:: header

  .. image:: /assets/img/banner.png

Introduction
============

.. container:: news

    News

    Tweets by `@robotframework <http://twitter.com/robotframework>`_


Robot Framework is a generic test automation framework for acceptance testing and acceptance test-driven development (ATDD). It has easy-to-use tabular test data syntax and utilizes the keyword-driven testing approach. Its testing capabilities can be extended by test libraries implemented either with Python or Java, and users can create new keywords from existing ones using the same syntax that is used for creating test cases.

Robot Framework is open source software released under `Apache License 2.0 <http://www.apache.org/licenses/LICENSE-2.0.html>`_. Its copyrights are owned and development supported by `Nokia Siemens Networks <http://www.nokiasiemensnetworks.com/>`_.

  
Examples
========

.. container:: examples

  .. code-block:: robotframework

    *** Settings ***
    Library     OperatingSystem

    *** Variables ***
    ${MESSAGE}  Hello, world!

    *** Test Cases ***
    My Test  [Documentation]  Example test
        Log         ${MESSAGE}
        My Keyword  /tmp

    Another Test
        Should Be Equal  ${MESSAGE}  Hello, world!

    *** Keywords ***
    My Keyword  [Arguments]  ${path}
        Directory Should Exist  ${path}

  .. container:: carousel-caption
  
    This is a caption header.

.. container:: examples

  .. code-block:: robotframework      

    ***Settings***
    Library	ExampleLibrary


    ***Test Cases***
    Simple Test
      Simple Keyword
        Greet Robot Framework
        Greet World

    Returning Value
      ${result} = Multiply By Two 4.1
      Numbers Should Be Equal ${result} 8.2

    Failing Test
      Numbers Should Be Equal 2 2
      Numbers Should Be Equal 2 3

  .. container:: carousel-caption

    This is another caption header.


Test libraries
==============

Test libraries lorem ipsum sil dolor est  lorem ipsum sil dolor est lorem ipsum sil dolor est lorem ipsum sil dolor est

- `AutoItLibrary <http://code.google.com/p/robotframework-autoitlibrary/>`_
- `Database Library (Java) <http://franz-see.github.com/Robotframework-Database-Library/>`_
- `Database Library (Python) <https://github.com/ThomasJaspers/robotframework-dblibrary>`_
- `Eclipse Library <http://code.google.com/p/robotframework-eclipselibrary/>`_
- `HTTP test library using livetest <https://github.com/peritus/robotframework-httplibrary>`_
- `HTTP test library using Requests <https://github.com/bulkan/robotframework-requests>`_
- `JavalibCore <https://github.com/robotframework/JavalibCore>`_ 
- `RemoteApplications <https://github.com/robotframework/RemoteApplications>`_ 
- `SeleniumLibrary <http://code.google.com/p/robotframework-seleniumlibrary/>`_
- `Selenium2Library <https://github.com/rtomac/robotframework-selenium2library>`_
- `SSHLibrary <http://code.google.com/p/robotframework-sshlibrary/>`_
- `SwingLibrary <https://github.com/robotframework/SwingLibrary>`_
- `watir-robot <https://github.com/semperos/watir-robot>`_
- `WatinLibrary <http://code.google.com/p/robotframework-watinlibrary/>`_

Tools
=====

Tools provide lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsum  ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsum

Editors
-------
- `RIDE <http://code.google.com/p/robotframework-ride/>`_ 
    is an IDE tool for editing test data.
- `Eclipse plugin <https://github.com/NitorCreations/RobotFramework-EclipseIDE>`_
- `Emacs major mode <https://github.com/sakari/robot-mode>`_
- `TextMate bundle <https://bitbucket.org/jussimalinen/robot.tmbundle/>`_
- `Vim plugin <https://github.com/mfukar/robotframework-vim>`_

Build tools
-----------
- `Jenkins plugin <https://wiki.jenkins-ci.org/display/JENKINS/Robot+Framework+Plugin>`_
- `Maven plugin <http://robotframework.github.com/MavenPlugin/>`_
- `RobotAnt <http://code.google.com/p/robotframework-ant/>`_
    is a ant task for using robotframework inside ant build scripts.

Other
-----
- `Mabot <http://code.google.com/p/robotframework-mabot/>`_ 
    is a tool for manual test result reporting.
- `RFdoc <http://code.google.com/p/rfdoc/>`_ 
    is a web based system for storing and searching Robot Framework test library and resource file documentations.

Communication
=============

Here be us.


Mailing lists
-------------

- `robotframework-users <http://groups.google.com/group/robotframework-users>`_
- `robotframework-announce <http://groups.google.com/group/robotframework-announce>`_
- `robotframework-devel <http://groups.google.com/group/robotframework-devel>`_
- `robotframework-commit <http://groups.google.com/group/robotframework-commit>`_
- `japanese users list <http://groups.google.com/group/robotframework-ja>`_


IRC
---

- #robotframework @freenode

Blogs
-----
- `@robotframework in Twitter <http://twitter.com/robotframework>`_
- `Here be Robots! <http://hereberobots.blogspot.fi/>`_
- `Codecentric -- Agile testing <http://blog.codecentric.de/en/category/agile/agile-testing/>`_
- `Radek Wierzbicki -- Robot Framework <http://www.radekw.com/blog/category/robot-framework/>`_


