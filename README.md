# Agentsflow

Easily create, connect & run autonomous [autogen](https://github.com/microsoft/autogen) AI agents from a streamlined web interface.

**Please note:** This project is currently in its initial stages but in active development.

![AgentFlow Design](docs/images/design.png)

## Quick Installation:

Ensure that [git](https://cli.github.com) and [pdm](https://pdm.fming.dev/latest/#installation) are installed, and then...

```bash
git clone https://github.com/jaemil/agentsflow
cd agentsflow
pdm install
pdm run uvicorn server:app --port 8999
```

The application can be accessed via [http://127.0.0.1:8999](http://127.0.0.1:8999) in your browser.

---

## Running Development Server:

Ensure that [git](https://cli.github.com), [pdm](https://pdm.fming.dev/latest/#installation), [nodejs](https://nodejs.org/de/download) and [pnmp](https://pnpm.io/installation) (recommended) are installed, and then...

1. Start [Fastapi](https://fastapi.tiangolo.com/)

```bash
git clone https://github.com/jaemil/agentsflow
cd agentsflow
pdm install
pdm run uvicorn server:app --port 8999
```

2. Start [Nextjs](https://nextjs.org/docs) (open a new terminal)

```bash
cd frontend_src
pnpm install or npm run install
pnpm dev or npm run dev
```

The application can be accessed via [http://127.0.0.1:3000](http://127.0.0.1:3000) in your browser.

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
