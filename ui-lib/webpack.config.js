/*
 * webpack.config.js
 * Sample output of function in "entry":
 * {
    'Bar': './src/components/Bar/index.tsx',
    'Foo': './src/components/Foo/index.tsx',
  }
 */

const path = require("path");
const glob = require("glob");

module.exports = (env) => {
  // Remove console.log when building for production
  const isProd = env.production === true;

  return {
    mode: "production",
    entry: () => {
      // Inspired from https://dev.to/bbenefield89/webpack-how-to-create-dynamic-entry-output-paths-1oc9
      const paths = glob.sync("./src/components/**/index.tsx");
      const retval = {};
      paths.forEach((path) => {
        // The entry is all index.tsx files under components folder
        // The libName will be derived from the folder name
        //  sample 1: "./src/components/Bar/index.tsx" -> "Bar"
        //  sample 2: "./src/components/Foo/index.tsx" -> "Foo"
        const tokens = path.split("/");
        const libName = tokens.slice(-2, -1).join("/");
        retval[libName] = path;
      });
      return retval;
    },
    optimization: {
      minimize: isProd,
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-typescript", "@babel/preset-react"],
            },
          },
        },
      ],
    },
    resolve: {
      // If this "extensions" are unspecified, it will throw error "Module not found" on build.
      extensions: [".tsx", ".ts", ".js"],
      fallback: {
        path: false,
      },
      alias: {
        "@common": path.resolve(__dirname, "src/common"),
        "@components": path.resolve(__dirname, "src/components"),
      },
    },
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "[name].js",
      library: {
        name: "[name]",
        type: "window", // See https://webpack.js.org/guides/author-libraries/
      },
      clean: true,
    },
    externals: {
      // List of external dependencies that will be provided by the host application
      react: "React",
      "next/head": "NextHead",
      "@nivo/core": "NivoCore",
      "@nivo/radar": "NivoRadar",
    },
  };
};
