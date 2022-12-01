## Remote UI-Scripting

This is a sample application to demonstrate how to dynamically import independently-deployed UI-components from URLs.

In this sample, we are using two Next.js apps and the UI-components are built using React.

The two Next.js apps:

1. [Host](host)
2. [UI-Lib](ui-lib)

### Host

`Host` is an ordinary Next.js app (can be substituted with other React meta frameworks). Currently, `Host` can only interpret the UI-Components on client-side. No SSR capability yet.

[useRemoteComp.ts](host/src/hooks/useRemoteComp.ts) is the core logic to import the remote UI-components.

[useRemoteDependencies.ts](host/src/hooks/useRemoteDependencies.ts) is where `Host` app exposes some common-dependencies consumed by various UI-components.

[componentsMapper.ts](host/src/util/componentsMapper.ts) is responsible to map ID (a string) to a URL (also a string). The `Host` app will then import this URL.

To run `Host` locally:

```
npm run dev
```

Make sure you have already host the UI-components locally too (see `UI-Lib` section below).

---

### UI-Lib

`UI-Lib` is an ordinary Next.js app as well (can be substituted with other React meta frameworks). However it is not meant to be deployed as a Next.js app. The Next.js app only serves as a development framework (e.g. so we can leverage Hot Module Reloading feature from Next.js).

The output of `UI-Lib` is the UI-components. One UI-component corresponds to one .js file.

These .js files are built using [Webpack](ui-lib/webpack.config.js).

To build and host the components locally:

```
npm run build-serve
```

This command does not watch changes on your components. If you're in testing phase, test it on [ui-lib/pages/index.js](ui-lib/pages/index.tsx).

You can check the output files (from Webpack) on `build/` folder.

---

### Live Demo

Link: https://remote-ui-scripting.vercel.app/.

The live demo is using [this components map](https://assets.analytics.glair.ai/scripts/charts_dashboards_sample.json).

If you run this demo locally, the map in [host/src/util/componentsMapper.ts](host/src/util/componentsMapper.ts) will be used instead.

You can change the mapping by exposing public environment variable `NEXT_PUBLIC_COMPONENTS_MAP_JSON` (see `host/.env.example` file).

---

### References

1. [Paciolan/remote-component](https://github.com/Paciolan/remote-component)
2. [Tiny Frontend](https://tiny-frontend.github.io/)
3. [Micro Frontends](https://martinfowler.com/articles/micro-frontends.html)
4. [Ecosystem Building Block: API + Platform Extensions](https://medium.com/gdplabs/ecosystem-building-block-api-platform-extensions-87fa0e38510f)
5. [Ecosystem Building Block: Scripting Engine Use Cases and Considerations](https://medium.com/gdplabs/java-scripting-engine-2720fbd7ba4d)
