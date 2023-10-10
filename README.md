# Agentsflow

[AutoGen](https://github.com/microsoft/autogen) powered web ui

Easily create & connect autonomous autogen AI agents from a streamlined interface.

![AgentFlow Design](docs/images/design.png)

## Installation:

Ensure that [git](https://cli.github.com) and [pdm](https://pdm.fming.dev/latest/#installation) are installed, and then...

```bash
git clone https://github.com/jaemil/agentsflow
cd agentsflow
pdm install
pdm run uvicorn server:app --port 8999
```

## Roadmap

### Backend

- [x] Add websockets to autogen agent.
- [x] Let the agent execute code?
- [ ] Vector database for the agents.

### Frontend

- [x] Simple html websocket client.
- [x] Add nextjs as a frontend.
- [x] Implement react-flow.
- [ ] Drag and drop to add/connect agents.
- [ ] Modal to create custom agent.

## Get Involved

We tend to congregate on the autogen Discord server. See [CONTRIBUTING.md](CONTRIBUTING.md)

## License

This project is licensed under [GNU General Public License (Version 3)](LICENSE.md)
