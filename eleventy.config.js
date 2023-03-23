const pluginWebc = require("@11ty/eleventy-plugin-webc");
const pluginBundle = require("@11ty/eleventy-plugin-bundle");
const { transform } = require("lightningcss");
const { Buffer } = require("node:buffer");
const { browserslistToTargets } = require("lightningcss");
const browserslist = require("browserslist");

module.exports = (eleventyConfig) => {
  eleventyConfig.addPlugin(pluginWebc, {
    components: "src/_includes/**/*.webc",
  });

  eleventyConfig.addPlugin(pluginBundle, {
    transforms: [
      async function (content) {
        if (this.type === "css") {
          let { code } = transform({
            targets: browserslistToTargets(browserslist("> 0.2% and not dead")),
            drafts: {
              nesting: true,
              customMedia: true,
            },
            code: Buffer.from(content),
          });
          return code;
        }
        return content;
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
