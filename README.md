# Agentsflow

Easily create, connect & run autonomous [autogen](https://github.com/microsoft/autogen) AI agents from a streamlined web interface.

**Please note:** This project is currently in its initial stages but in active development.

![AgentFlow Design](docs/images/design.png)

---

## Running:

Ensure that [git](https://cli.github.com), [nodejs](https://nodejs.org/de/download), [python 3.11](https://www.python.org/downloads/) and [poetry](https://python-poetry.org/docs/) are installed, and then...

Download, build, and start agentsflow with the following commands:

```bash
git clone https://github.com/jaemil/agentsflow
cd agentsflow
npm run agentsflow
```

Click the link provided in the terminal to load the UI.

## Roadmap

Goals may change and are unsorted

- [x] Add websockets to autogen agent.
- [x] Let the agent execute code.
- [x] Simple html websocket client.
- [x] Add nextjs as a frontend.
- [x] Implement react-flow.
- [x] Drag and drop to add agents to the flow.
- [ ] Make the basic application work (connect agents, run agents, select agents, etc.)
- [ ] Vector database for agents (https://github.com/microsoft/autogen/releases/tag/v0.1.10).
- [ ] Popup for global settings (OpenAI API Key and model).
- [ ] Agent Settings (model, name, llm_config..)
- [ ] Popup to add own agent.
- [ ] Save custom flow templates.
- [ ] Save custom agents.
- [ ] Export flow as a python script.
- [ ] Add group chat functionality.
- [ ] Add a documentation website.
- [ ] Ability to use local LLM model.
- [ ] Implement 3rd party tools (https://github.com/FlowiseAI/Flowise).
- [ ] Export/Import application settings/flows/agents.
- [ ] Docker Compose file to quickly get started.
- [ ] Create landing page.
- [ ] Show generated files.
- [ ] Make agents multimodal.

## Get Involved

We tend to congregate on the autogen Discord server. See [CONTRIBUTING.md](CONTRIBUTING.md)

## License

This project is licensed under [GNU General Public License (Version 3)](LICENSE.md)
