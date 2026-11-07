const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const imageShortcode = require('./src/_11ty/shortcodes/image-shortcode');
const markdownLibrary = require('./src/_11ty/libraries/markdown-library');
const minifyHtml = require('./src/_11ty/utils/minify-html');
const markdownFilter = require('./src/_11ty/filters/markdown-filter');
const svgFilter = require('./src/_11ty/filters/svg-filter');
const browserSyncConfig = require('./src/_11ty/utils/browser-sync-config');
const { readableDateFilter, machineDateFilter } = require('./src/_11ty/filters/date-filters');
const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  // Plugins
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(syntaxHighlight);

  // Filters
  eleventyConfig.addFilter('markdown', markdownFilter);
  eleventyConfig.addFilter('readableDate', readableDateFilter);
  eleventyConfig.addFilter('machineDate', machineDateFilter);
  eleventyConfig.addFilter('svg', svgFilter);

  // Limit filter — returns first N items from an array
  eleventyConfig.addFilter('limit', (array, n) => array.slice(0, n));

  // Sort by date filter — sorts array by date field, newest first
  eleventyConfig.addFilter('sortByDate', (array) => {
    return array.slice().sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
  });

  // Shortcodes
  eleventyConfig.addNunjucksAsyncShortcode('image', imageShortcode);

  // Libraries
  eleventyConfig.setLibrary('md', markdownLibrary);

  // Merge data instead of overriding
  eleventyConfig.setDataDeepMerge(true);

  // Trigger a build when files in this directory change
  eleventyConfig.addWatchTarget('./src/assets/scss/');

  // Minify HTML output
  eleventyConfig.addTransform('htmlmin', minifyHtml);

  // Don't process folders with static assets
  eleventyConfig.addPassthroughCopy('./src/favicon.png');
  eleventyConfig.addPassthroughCopy('./src/admin');
  eleventyConfig.addPassthroughCopy('./src/assets/img');
  eleventyConfig.addPassthroughCopy('./src/assets/js');

  // Allow Turbolinks to work in development mode
  eleventyConfig.setBrowserSyncConfig(browserSyncConfig);

  // Add date time objects
  eleventyConfig.addFilter("date", (dateObj, format = "MMMM d, yyyy") => {
  return DateTime.fromISO(dateObj).toFormat(format);
});

  // Gig dates, with an optional end date for multi-day events.
  //   withWeekday: "Fri, Oct 30" / "Fri–Sun, Oct 30–Nov 1" / "Fri–Sat, Oct 30–31"
  //   otherwise:   "Oct 30"      / "Oct 30–Nov 1"          / "Oct 30–31"
  eleventyConfig.addFilter("gigDates", (start, end, withWeekday = false) => {
    const s = DateTime.fromISO(start);
    const e = end ? DateTime.fromISO(end) : null;
    if (!e || e.equals(s)) {
      return s.toFormat(withWeekday ? "EEE, MMM d" : "MMM d");
    }
    const days = `${s.toFormat("MMM d")}–${e.toFormat(e.hasSame(s, "month") ? "d" : "MMM d")}`;
    return withWeekday ? `${s.toFormat("EEE")}–${e.toFormat("EEE")}, ${days}` : days;
  });


  return {
    templateFormats: ['md', 'njk', 'html'],
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    passthroughFileCopy: true,
    dir: {
      input: "src",
      output: "./_site",
      includes: "_includes",
      // layouts: "_includes/layouts",
      data: "_data"
    },
  };
};
