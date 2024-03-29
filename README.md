## Beancount Analysis Web

[简体中文](./README-zh_CN.md)

Beancount Analysis Web is a project that presents Beancount account statistical analysis through a web interface. It currently supports analysis of annual expenses, annual income, monthly expenses, and monthly income.

![](./screenshot.png)

## Prerequisites

This project relies on the `bean-query` command from an already installed Beancount, so before using this project, make sure you have Beancount installed correctly. For installation and usage of Beancount, you can refer to the [Beancount project's introduction](https://github.com/beancount/beancount) for more details.


### Tech Stack

- Frontend framework: Vue3
- Backend framework: Fastify
- No database
- Build tool: Vite
- Frontend and backend language: TypeScript

**Note**: This project is in a WIP (Work In Progress) state, some features may not be implemented yet or might have issues.

### How to run the project

1. Clone the project

```
git clone git@github.com:tortorse/beancount-analysis-web.git
```

2. Install dependencies

```
pnpm install
```

3. Build frontend and backend

```
pnpm run build
```

4. Run frontend and backend

```
pnpm run start
```

After completing the above steps, the project should be running successfully, and you can access the frontend <http://localhost:4173/> in your browser to view the statistical analysis of Beancount accounts.
