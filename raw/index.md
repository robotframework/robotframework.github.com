# Robot Framework

> An open source automation framework for test automation and RPA. Human-readable keyword syntax, extensible in Python, supported by the Robot Framework Foundation and used across the industry.

<hero-banner backgroundFade="none" title="<span class="rf-mark rf-mark--full"></span><br><span class="ink-teal">Robot</span><br>Frame&#8203;work<span class="rf-mark rf-mark--tm"></span>" titleSize="big">

> Robot Framework® is an **open source automation framework** for test automation and [robotic process automation (RPA)](https://docs.robotframework.org/docs/getting_started/rpa). It is supported by the [Robot Framework Foundation](/foundation) and widely used in the industry.
> 
> Its [human-friendly and versatile syntax](https://docs.robotframework.org/docs/style_guide) uses keywords and supports [extending through libraries](https://docs.robotframework.org/docs/extending_robot_framework/custom-libraries/python_library) in Python, Java, and other languages.
> 
> It integrates with other tools for comprehensive automation without licensing fees, bolstered by a rich community with hundreds of [3rd party libraries](#resources).

</hero-banner>

<page-section width="narrow" :sticky-title="true">
<item-row :same-height="true" list-type="wrapping">
<event-calendar max-width="40" max-width-mobile="100">



</event-calendar>

<news-list max-width="60" max-width-mobile="100">



</news-list>
</item-row>
</page-section>

<divider>



</divider>

<page-section width="default" title="Get Started" :sticky-title="true">

**Code is worth a thousand words.**

Below you'll find a live Robot Framework editor. Feel free to experiment with it — if you find bugs, please report them in [GitHub issues](https://github.com/robotframework/robotframework.github.com/issues).

To start using Robot Framework in a project of your own, see the **Install** and **Learn** tabs. And do visit the [Robot Framework Docs](https://docs.robotframework.org/).

<tab-box>
<tab-panel icon="robot" label="Editor">
<robot-editor>



</robot-editor>
</tab-panel>

<tab-panel icon="python" label="Install">

Robot Framework is implemented with Python, so you need [Python installed](https://www.python.org/downloads/). On Windows, make sure to add [Python to PATH](https://docs.python.org/3/using/windows.html#the-full-installer) during installation.

Installing Robot Framework with pip is simple:

```shellsession [console]
$ pip install robotframework
Collecting robotframework
  Downloading robotframework-7.4.2-py3-none-any.whl.metadata (7.6 kB)
Downloading robotframework-7.4.2-py3-none-any.whl (807 kB)
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 807.1/807.1 kB 8.4 MB/s  0:00:00
Installing collected packages: robotframework
Successfully installed robotframework-7.4.2
```

To check that the installation was successful, run:

```shellsession [console]
$ robot --version
Robot Framework 7.4.2 (Python 3.12.0 on darwin)
```

For a full guide, see the [installation instructions](https://github.com/robotframework/robotframework/blob/master/INSTALL.rst).

Now you are ready to write your first tests.

</tab-panel>

<tab-panel icon="text" label="Learn">

#### [Robot Framework Docs](https://docs.robotframework.org/)

Learn with guides and examples that cover Robot Framework all the way from installation to advanced usage.

#### [User Guide](https://robotframework.org/robotframework/latest/RobotFrameworkUserGuide.html)

Reference manual explaining all Robot Framework features in detail.

#### [Public API](https://robot-framework.readthedocs.org/en/latest/)

Public API for writing your own tools against Robot Framework.

#### [How to write good test cases](https://github.com/robotframework/HowToWriteGoodTestCases/blob/master/HowToWriteGoodTestCases.rst)

Guidelines for writing good test cases using Robot Framework.

#### [Dos And Don'ts](https://www.slideshare.net/pekkaklarck/robot-framework-dos-and-donts)

Slide set loosely based on 'How to write good test cases' guidelines.

#### [Introduction Slides](https://www.slideshare.net/pekkaklarck/robot-framework-introduction)

Generic Robot Framework introduction slides.

#### [Robot Framework katas](https://github.com/eficode-academy/rf-katas)

Series of exercises and examples how to get started with test automation. No prior knowledge of test automation required.

#### [Web Demo](https://github.com/robotframework/WebDemo)

Demonstrates how to create tests and higher level keywords. The system under test is a simple web page that is tested using SeleniumLibrary.

#### [Robot Demo](https://github.com/robotframework/RobotDemo)

Demonstrates how to create tests and test libraries. The system under test is a simple calculator that is tested using a custom library.

#### [Demo: ATDD with Robot Framework](https://code.google.com/p/atdd-with-robot-framework/)

How to use Robot Framework for Acceptance Test Driven Development (ATDD) a.k.a. Specification by Example.

#### [Demo: Using C with Robot Framework](https://bitbucket.org/robotframework/cdemo)

This simple example demonstrates how to use C language from Robot Framework test libraries.

#### [Demo: Remote interface](https://github.com/jg8481/robotframework-scala-remote-library)

Example demonstrates how to use Robot Framework's [Remote interface](https://github.com/robotframework/RemoteInterface) to call test libraries written in any programming language.

</tab-panel>
</tab-box>
</page-section>

<divider>



</divider>

<page-section width="default" title="Resources" :sticky-title="true">

Robot Framework is open source and supported by the [Robot Framework Foundation](/foundation). There is a huge community of contributors around the tool. The software is built with expandability in mind, and there are numerous ways to extend its use cases.

If you have created or found a library that you think should be listed here, please [let us know](https://github.com/robotframework/robotframework.github.com) by submitting a pull request or an issue. You are also welcome to report unmaintained ones that shouldn't be listed any more.

<resource-table :tabs="[{"label":"Libraries","source":"libraries","description":"Separately developed external libraries that you install as you need them. Creating your own is straightforward — see creating test libraries in the User Guide."},{"label":"Built-in","source":"builtin","description":"Libraries and tools bundled with the framework. These provide the actual automation and testing capabilities."},{"label":"Tools","source":"tools","description":"Supporting tools that ease automation work — editors, runners, reporting and integrations."}]">



</resource-table>
</page-section>

<divider>



</divider>

<page-section width="narrow" title="Community" :sticky-title="true">

Robot Framework has a vibrant community of testing enthusiasts around it. Stop by if you have questions, need advice, or would just like to connect with like-minded people.

There is also an annual RoboCon conference hosted in Helsinki, Finland. For more information and to watch previous years' talks, visit [robocon.io](https://robocon.io) or our [YouTube channel](https://www.youtube.com/channel/UCuOaCtN8bI9O_E2VYIumIqg).

To support Robot Framework you can find a [T-shirt](https://supergeek.de/de/products/24916-im-the-robot-dark/) and a [coffee cup](https://supergeek.de/de/products/24915-im-the-robot-bright/1232-tasse-coffee-mug/) in our [shop](https://shop.robotframework.org/).

<item-row :same-height="true" list-type="wrapping">
<page-card gap="0.3" max-width="33" max-width-mobile="100">
<styled-link buttonStyle="ticket" href="https://forum.robotframework.org/" label="Forum" :external="true" icon="/img/community/forum.svg" iconDark="/img/community/forum-dark.svg">



</styled-link>

Official Robot Framework forum.

</page-card>

<page-card gap="0.3" max-width="33" max-width-mobile="100">
<styled-link buttonStyle="ticket" href="https://robotframework.slack.com/" label="Slack" :external="true" icon="/img/community/slack.svg" className="border-0">



</styled-link>

Community team chat.
[Click for invite!](https://slack.robotframework.org/)

</page-card>

<page-card gap="0.3" max-width="33" max-width-mobile="100">

**Others**

- [LinkedIn](https://www.linkedin.com/groups/3710899/)
- [Facebook](https://www.facebook.com/robotframeworkofficial)
- [Mailing list](https://groups.google.com/group/robotframework-users)

</page-card>
</item-row>

<modal-button buttonStyle="secondary" label="Code of Ethics" title="Code of Ethics" width="auto">
<page-section width="narrow">

The Robot Framework Foundation is dedicated to providing a harassment-free experience for everyone, regardless of gender, gender identity and expression, sexual orientation, disability, physical appearance, body size, age, race, or religion. We do not tolerate harassment of participants in any form.

This code of ethics applies to all Robot Framework spaces, both online and off. Anyone who violates it may be sanctioned or expelled from those spaces at the discretion of the Robot Framework board.

Some Robot Framework spaces may have additional rules in place, which will be made clearly available to participants. Participants are responsible for knowing and abiding by those rules.

If you are being harassed by a member of the Robot Framework community, notice that someone else is being harassed, or have any other concerns, please contact [awareness@robotframework.org](mailto:awareness@robotframework.org).

</page-section>

<page-section width="narrow" title="Harassment Includes">

- Offensive comments related to gender, gender identity and expression, sexual orientation, disability, mental illness, neuro(a)typicality, physical appearance, body size, age, race, or religion
- Unwelcome comments regarding a person's lifestyle choices and practices, including those related to food, health, parenting, drugs, and employment
- Deliberate misgendering or use of 'dead' or rejected names
- Gratuitous or off-topic sexual images or behaviour in spaces where they're not appropriate
- Physical contact and simulated physical contact (for example textual descriptions like "*hug*" or "*backrub*") without consent or after a request to stop
- Threats of violence
- Incitement of violence towards any individual, including encouraging a person to commit suicide or to engage in self-harm
- Deliberate intimidation
- Stalking or following
- Harassing photography or recording, including logging online activity for harassment purposes
- Sustained disruption of discussion
- Unwelcome sexual attention
- A pattern of inappropriate social contact, such as requesting or assuming inappropriate levels of intimacy with others
- Continued one-on-one communication after requests to cease
- Deliberate "outing" of any aspect of a person's identity without their consent, except as necessary to protect vulnerable people from intentional abuse
- Publication of non-harassing private communication

</page-section>

<page-section width="narrow">

The Robot Framework community prioritises marginalised people's safety over privileged people's comfort. The Robot Framework board reserves the right not to act on complaints regarding:

- 'Reverse' -isms, including 'reverse racism', 'reverse sexism', and 'cisphobia'
- Reasonable communication of boundaries, such as "leave me alone", "go away", or "I'm not discussing this with you"
- Communicating in a 'tone' you don't find congenial
- Criticising racist, sexist, cissexist, or otherwise oppressive behaviour or assumptions

</page-section>

<page-section width="narrow" title="Reporting">

- If you are being harassed by a member of the Robot Framework community, notice that someone else is being harassed, or have any other concerns, please contact [awareness@robotframework.org](mailto:awareness@robotframework.org). If the person harassing you is on the team, they will recuse themselves from handling your incident. We will respond as promptly as we can.
- This code of ethics applies to Robot Framework spaces, but if you are being harassed by a member of the community outside our spaces, we still want to know about it. We take all good-faith reports of harassment by Robot Framework members seriously — including harassment outside our spaces, and harassment that took place at any point in time. The team reserves the right to exclude people from Robot Framework based on their past behaviour, including behaviour outside our spaces and behaviour towards people who are not in the community.
- In order to protect volunteers from abuse and burnout, we reserve the right to reject any report we believe to have been made in bad faith. Reports intended to silence legitimate criticism may be deleted without response.
- We will respect confidentiality requests for the purpose of protecting victims of abuse. At our discretion, we may publicly name a person about whom we have received harassment complaints, or privately warn third parties about them, if we believe that doing so will increase the safety of Robot Framework members or the general public. We will not name harassment victims without their affirmative consent.

</page-section>

<page-section width="narrow" title="Consequences">

- Participants asked to stop any harassing behaviour are expected to comply immediately.
- If a participant engages in harassing behaviour, the Robot Framework board may take any action they deem appropriate, up to and including expulsion from all Robot Framework spaces and identification of the participant as a harasser to other members or to the general public.

</page-section>
</modal-button>

<video-embed :width="2000" className="rounded-lg" title="Robot Framework — the community" url="https://www.youtube.com/embed/qbFNSVSRBZ8">



</video-embed>
</page-section>

<divider>



</divider>

<page-section width="default" title="Development" :sticky-title="true">

Development of Robot Framework is funded by the non-profit [Robot Framework Foundation](/foundation). It consists of companies and organisations that want to ensure the continuity of Robot Framework now and in the future.

The project is hosted on [GitHub](https://github.com/robotframework/robotframework).

Thanks to the sponsors, Robot Framework remains completely free to use while being actively maintained and developed. The Foundation also covers related expenses such as the development of this website and organising various meetups.

<page-card gap="0" max-width="100" max-width-mobile="100" :centered="true" :external="true" accent="" href="" link-label="" styling="default">

#### Members of Robot Framework Foundation

<sponsor-grid variant="logos">



</sponsor-grid>

Interested in joining?

<styled-link buttonStyle="secondary" href="foundation" label="Visit the Foundation..." :centered="true">



</styled-link>
</page-card>

<milestone-list>



</milestone-list>
</page-section>
