const fs = require('fs');
const path = require('path');

function addUseClient(dir) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    if (fs.statSync(dirPath).isDirectory()) {
      addUseClient(dirPath);
    } else if (dirPath.endsWith('.ts') || dirPath.endsWith('.tsx')) {
      let content = fs.readFileSync(dirPath, 'utf8');
      // Skip layout.tsx and next config files, we just want components and pages
      if (dirPath.endsWith('layout.tsx')) return;
      if (!content.includes('"use client"') && !content.includes("'use client'")) {
        fs.writeFileSync(dirPath, '"use client";\n' + content, 'utf8');
        console.log(`Added use client to ${dirPath}`);
      }
    }
  });
}

addUseClient(path.join(__dirname, 'src', 'app'));
addUseClient(path.join(__dirname, 'src', 'components'));
addUseClient(path.join(__dirname, 'src', 'context'));
addUseClient(path.join(__dirname, 'src', 'hooks'));
