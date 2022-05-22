# mf-playground

A playground for webpack [Module Federation](https://webpack.js.org/concepts/module-federation/) to explore the behaviors of `shared` options.

## Getting Started

This repo use [`pnpm`](https://pnpm.io/) as package manager.

```bash
pnpm install
```

## Local Dev Server

To start preview the examples locally, run

```bash
pnpm run dev
```

And then open `http://localhost:4000`.

## Build

To generate a static site that is deployable, run

```bash
./build.sh
```

A `dist` folder will be created that contains all the static files to be deployed to any hosting service.
