const path = require("path");
module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/preset-scss"
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "@storybook/builder-webpack5"
  },
  "webpackFinal": async (config) => {
    config.resolve.alias = {
      components: path.resolve(__dirname, '../src/components/'),
      src: path.resolve(__dirname, '../src'),
      store: path.resolve(__dirname, '../src/store'),
      svg: path.resolve(__dirname, '../src/assets/svg'),
    };

    return config;
  }
}