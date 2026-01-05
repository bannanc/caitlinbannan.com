const fs = require("fs");
const path = require("path");

module.exports = () => {
  const dir = path.join(__dirname, "choreography");

  const files = fs.readdirSync(dir)
    .filter(file => file.endsWith(".json"));

  return files
    .map(file => {
      const data = require(path.join(dir, file));
      return {
        slug: file.replace(/\.json$/, ""),
        ...data
      };
    })
    .sort((a, b) => a.title.localeCompare(b.title));
};

