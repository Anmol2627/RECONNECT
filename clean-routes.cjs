const fs = require('fs');
const path = require('path');

function cleanRoutes(dir) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    if (fs.statSync(dirPath).isDirectory()) {
      cleanRoutes(dirPath);
    } else if (dirPath.endsWith('.ts') || dirPath.endsWith('.tsx')) {
      let content = fs.readFileSync(dirPath, 'utf8');
      
      // Clean up orphaned route code
      content = content.replace(/,\s*\n\s*\}\);?/g, '');
      content = content.replace(/\s*\n\s*\}\);?/g, '');
      
      fs.writeFileSync(dirPath, content, 'utf8');
    }
  });
}

cleanRoutes(path.join(__dirname, 'src', 'app'));
