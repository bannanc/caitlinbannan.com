const fs = require("fs");
const path = require("path");

// Path to the folder containing JSON files
const gigsFolder = path.join(__dirname, "gigs");

// Check if folder exists
if (!fs.existsSync(gigsFolder)) {
    console.warn("Gigs folder not found, returning empty arrays");
    module.exports = { upcoming: [], previous: [] };
    return;
}

// Read all JSON files in the folder
const gigFiles = fs.readdirSync(gigsFolder).filter(f => f.endsWith(".json"));

// Load all gigs
let allGigs = [];
for (const file of gigFiles) {
    const filePath = path.join(gigsFolder, file);
    try {
        const fileGigs = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        allGigs = allGigs.concat(fileGigs);
    } catch (err) {
        console.error(`Error reading ${file}:`, err.message);
    }
}

// Convert date strings to JS Date objects
allGigs.forEach(gig => {
    gig.dateObj = new Date(gig.date);
});

// Today's date (set to start of day for accurate comparison)
const today = new Date();
today.setHours(0, 0, 0, 0);

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