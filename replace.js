const fs = require('fs');
const files = [
  'src/app/innovation-hub/client-true-brain/ClientTrueBrain.tsx',
  'src/app/innovation-hub/InnovationHubClient.tsx',
  'src/components/innovation/TrueBrainProductGrid.tsx',
  'src/components/ArnoCapabilities.tsx'
];
files.forEach(f => {
  if(fs.existsSync(f)) {
    let content = fs.readFileSync(f, 'utf8');
    // Replace The Legal Studio.
    content = content.replace(/The Legal Studio\./g, `Urvashi's Tech Suite`);
    content = content.replace(/THE LEGAL STUDIO\./g, `URVASHI'S TECH SUITE`);
    // Remove the full stop from An Intelligent Synthesis...
    content = content.replace(/Architecture\./g, 'Architecture');
    // Remove full stops at the end of sentences in quotes in TrueBrainProductGrid.tsx
    if (f.includes('TrueBrainProductGrid.tsx')) {
      content = content.replace(/\."/g, '"');
      content = content.replace(/\.`/g, '`');
    }
    fs.writeFileSync(f, content);
  }
})
