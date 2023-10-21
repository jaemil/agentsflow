# Frontend of Agentsflow

## Stack

- Framework: [Nextjs](https://nextjs.org)
- State management: [Zustand](https://github.com/pmndrs/zustand)
- Schema validation: [Zod](https://zod.dev/)
- Component library: [shadcn/ui](https://ui.shadcn.com)
- CSS framework: [Tailwindcss](https://tailwindcss.com)

## Getting started:

### Prerequisites

Ensure that [git](https://cli.github.com), [nodejs](https://nodejs.org/de/download), [python 3.11](https://www.python.org/downloads/) and [poetry](https://python-poetry.org/docs/) are installed, and then...

### Development Server:

To serve the application locally, follow these steps:

1. Install the necessary dependencies:

```bash
nx run frontend:install
```

2. Start a development server:

```bash
nx run frontend:serve
```

3. Open the following URL in your browser: [localhost:4200](localhost:4200) to load the UI.

### Production:

To build and run the application in a production environment:

1. Build the application:

```bash
nx run frontend:build
```

2. Run the bundled application:

```bash
nx run frontend:serve --configuration production
```

### Adding Dependencies:

To add a package:

```bash
nx run frontend:add [package-name]
```

To add a new UI component from [shadcn/ui](https://ui.shadcn.com), run (will be added to agentsflow/libs/componenents/ui):

```bash
npx shadcn-ui@latest add [component-name]
```
