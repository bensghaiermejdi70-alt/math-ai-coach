const fs = require('fs');
const content = fs.readFileSync('src/app/examens-france/page.tsx', 'utf8');

// Find all single-quoted strings that contain accented characters
const regex = /'([^'éèêëùûüôöîïç]*é[^'éèêëùûüôöîïç]*|...)*'/g;

// Actually, let's just find lines with ' followed by any accented char
const lines = content.split('\n');
let fixed = 0;
const newLines = lines.map((line, i) => {
    // Match '...' where ... contains é, è, ê, ë, ù, û, ü, ô, ö, î, ï, ç
    if (line.match(/'[^']*[éèêëùûüôöîïç]/)) {
        // Replace single quotes with double quotes for these lines
        // But we need to be careful about existing double quotes
        const newLine = line.replace(/'/g, '"');
        if (newLine !== line) {
            fixed++;
            console.log(`Line ${i+1}: Fixed`);
            return newLine;
        }
    }
    return line;
});

console.log(`Total lines fixed: ${fixed}`);
fs.writeFileSync('src/app/examens-france/page.tsx', newLines.join('\n'));