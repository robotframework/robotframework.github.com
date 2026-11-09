# Robot Framework + AI

> Robot Framework is AI-ready. The Robot Framework Foundation's recommended way to use Robot Framework with coding agents such as Claude Code, GitHub Copilot and Codex — RobotCode CLI or the RobotMCP server, whichever fits your workflow.

<hero-banner subtitle="Robot Framework. Your AI agent. Your choice." title="Ready for the AI agent era" title-size="big">
<item-row list-type="wrapping">
<page-card styling="unstyled">
<styled-link button-style="primary" href="#recommended-setup" label="Get started">



</styled-link>
</page-card>
</item-row>
</hero-banner>

<page-section width="narrow">

AI agents can discover the libraries and keywords you have installed, write tests, run them, inspect the results and improve them — across web, API, mobile, desktop and more. **AI is optional. Your tools stay open. You stay in control.**

Robot Framework already works great with AI — no architectural change was needed. We're actively building more on top of it, in the open and together with the community, and anyone can contribute. The setup below is the one we recommend today, but it's one way, not the only way: try it, contribute back, or tell us how you do it, so together we can improve good practices and strengthen AI adoption across the community.

</page-section>

<page-section width="narrow" title="A natural pair for the AI era">

Robot Framework was designed long before coding agents existed. The choices that made it work for people now make it work for agents.

<item-row list-type="wrapping" :same-height="true">
<page-card max-width="50" max-width-mobile="100" gap="0.33">

#### The layer where people keep track

Keyword-driven tests capture the *why* and the workflow that code alone doesn't show — living documentation that you and the agent both read.

</page-card>

<page-card max-width="50" max-width-mobile="100" gap="0.33">

#### Built for agents

Plain-text test files, a command-line interface, machine-readable JSON output, and libraries written in Python: the formats coding agents work with best.

</page-card>

<page-card max-width="50" max-width-mobile="100" gap="0.33">

#### One framework, many technologies

Web, API, mobile, desktop and more through libraries — one syntax for you and your agent, whatever you test.

</page-card>

<page-card max-width="50" max-width-mobile="100" gap="0.33">

#### Verification matters more than ever

When code is cheap to produce, checking that it does the right thing becomes the important work. That is what Robot Framework is for.

</page-card>
</item-row>
</page-section>

<page-section width="narrow" title="New to Robot Framework?">
<item-row list-type="wrapping">
<page-card max-width="35" max-width-mobile="100" styling="unstyled">

Start here: let the AI install it for you, then continue with the recommended setup below.

1. **Copy the prompt**
2. **Paste it into any coding assistant app** — ChatGPT, Claude, Gemini or another.
3. **Answer its questions** about your system and what you want to automate.

It then guides you through the setup one step at a time.

</page-card>

<page-card max-width="65" max-width-mobile="100" styling="unstyled">
<ai-artifact name="environment-setup">



</ai-artifact>
</page-card>
</item-row>
</page-section>

<page-section width="narrow" title="Recommended setup">

Already using Robot Framework? There are two ways to connect your coding agent — Claude Code, ChatGPT (Codex), GitHub Copilot and others. Pick the one that fits how you work.

<item-row list-type="wrapping" :vertically-centered="true">
<page-card max-width="55" max-width-mobile="100" styling="stroke">

#### Option 1: RobotCode CLI agent plugin

Your agent looks up the keywords you actually have installed, runs and debugs your tests, and reads the results — using your project's own configuration and environment. Install it into that environment:

```bash
pip install "robotcode[all]"
claude plugin marketplace add robotcodedev/robotframework-agent-plugins
claude plugin install robotcode@robotframework-agent-plugins
```

Using Copilot, Codex or VS Code? The RobotCode guide has the commands for your agent.

<styled-link button-style="secondary" href="https://robotcode.io/guides/ai-agents/" label="RobotCode setup guide">



</styled-link>
</page-card>

<page-card max-width="45" max-width-mobile="100" styling="unstyled">
<video-embed src="https://www.youtube.com/embed/XhGh-3nPxRA" title="RobotCode 1.0 Launch Party, RoboCon 2025">



</video-embed>

**RobotCode 1.0 Launch Party**, RoboCon 2025. **Partly outdated:** recorded before the agent plugin existed.

</page-card>
</item-row>

<item-row list-type="wrapping" :vertically-centered="true">
<page-card max-width="45" max-width-mobile="100" styling="unstyled">
<video-embed src="https://www.youtube.com/embed/Lv8EJ_q4U98" title="RF MCP: Say It, Test It, Ship It, RoboCon 2026">



</video-embed>

**RF MCP: Say It, Test It, Ship It**, Many Kasiriha, RoboCon 2026.

</page-card>

<page-card max-width="55" max-width-mobile="100" styling="stroke">

#### Option 2: RobotMCP (rf-mcp)

An MCP server that lets your agent run keywords live — against a browser, an API, a mobile app or a database — see what actually happens, and turn the steps that pass into a clean `.robot` suite. Install it as a tool, then register it with your agent:

```bash
uv tool install "rf-mcp[all]"
robotmcp install
```

Have an existing project? Run `robotmcp install` from its directory, so RobotMCP can see your own libraries.

<styled-link button-style="secondary" href="https://github.com/manykarim/rf-mcp" label="RobotMCP on GitHub">



</styled-link>
</page-card>
</item-row>
</page-section>

<page-section width="narrow" title="Prompts">

Ready-made prompts you can open, copy or download. Each one is a plain Markdown file: read it before you run it, and adapt it to your project.

<ai-catalog>



</ai-catalog>
</page-section>

<page-section width="narrow" title="A note on security">

Agent plugins and MCP servers let your agent run commands on your machine. Review what you install, as you would with any dependency. Both options above are open source, so anyone can read them.

</page-section>

<page-section width="narrow" title="Get involved">

- **Library maintainers:** make the examples in your keyword documentation best-practice examples. Libdoc tells an agent which keywords exist; your examples tell it how to use them well. That is the context agents miss most.
- **Everyone:** join the conversation on [Robot Framework Slack](https://slack.robotframework.org/), where the AI Workgroup shares its work, or [email the Executive Director](mailto:executive.director@robotframework.org).

**This is just the start.** AI is moving fast, and so are we — join the movement!

</page-section>

<page-section width="narrow" title="Learn more">

- [Working with AI agents](https://robotcode.io/guides/ai-agents/) — RobotCode documentation
- [RobotCode CLI reference](https://robotcode.io/reference/cli/)
- [Robot Framework Docs](https://docs.robotframework.org/docs) — guides from installation to advanced use
- [Agent Skills best practices](https://agentskills.io/skill-creation/best-practices) — for writing your own skills
- [rf-prompt-forge](https://github.com/MarketSquare/rf-prompt-forge) — where the prompts on this page are maintained
- [RoboCon archive](https://archive.robocon.io/) — talks from past conferences, including AI topics

</page-section>
