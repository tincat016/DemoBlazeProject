const fs = require('fs');
const content = fs.readFileSync('f:/Curace@App/typescriptcurace/pages/basePage.ts', 'utf8');
console.log(JSON.stringify(content));
