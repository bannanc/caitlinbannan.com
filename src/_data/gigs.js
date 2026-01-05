const fs = require("fs");
const path = require("path");

// Path to the folder containing JSON files
const gigsFolder = path.join(__dirname, "gigs");

// Read all JSON files in the folder
const gigFiles = fs.readdirSync(gigsFolder).filter(f => f.endsWith(".json"));

// Load all gigs
let allGigs = [];
for (const file of gigFiles) {
    const filePath = path.join(gigsFolder, file);
    const fileGigs = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    allGigs = allGigs.concat(fileGigs);
}

// Convert date strings to JS Date objects
allGigs.forEach(gig => {
    gig.dateObj = new Date(gig.date);
});

// Today's date
const today = new Date();

// Split gigs into upcoming vs previous
const upcoming = allGigs
    .filter(gig => gig.dateObj >= today)
    .sort((a, b) => a.dateObj - b.dateObj);

const previous = allGigs
    .filter(gig => gig.dateObj < today)
    .sort((a, b) => b.dateObj - a.dateObj);

module.exports = {
    upcoming,
    previous
};
