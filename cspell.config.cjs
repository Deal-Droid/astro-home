/** @type {import('cspell').TraceOptions} */
module.exports = {
  allowCompoundWords: true,
  caseSensitive: false,
  ignoreRegExpList: ["/[\\u0E00-\\u0E7F]/g"], // Thai characters
  words: [
    // Product name
    "Astroship",
    "Astronav",
    "Linkify",
    // People name
    "Apirak",
    "Panatkool",
    "Ziemann",
    // Address
    "Salatammasop",
    "Taweewattana",
    // New word
    "agentic",
  ],

  ignoreWords: ["nomargin", "Grice", "surjithctly", "xaugxgesi6a"],
  /**
   ** List of words to always be considered incorrect.
   */
  flagWords: [],
  ignorePaths: [
    "**/*.yml",
    "**/*.svg",
    "**/*.conf",
    "pnpm-lock.yaml",
    "package.json",
  ],
};
