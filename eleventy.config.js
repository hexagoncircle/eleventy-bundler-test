const pluginWebc = require("@11ty/eleventy-plugin-webc");
const pluginBundle = require("@11ty/eleventy-plugin-bundle");
const postcss = require("postcss");
const postcssNested = require("postcss-nested");

module.exports = (eleventyConfig) => {
  eleventyConfig.addPlugin(pluginWebc, {
    components: "src/_includes/**/*.webc",
  });

  eleventyConfig.addPlugin(pluginBundle, {
    transforms: [
      async function (content) {
        let result = await postcss([postcssNested]).process(content, {
          from: this.page.inputPath,
          to: null,
        });
        return result.css;
      },
    ],
  });

  eleventyConfig.addLayoutAlias("base", "base.webc");

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data",
    },
  };
};
