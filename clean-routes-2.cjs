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
      
      // We want to remove anything from `meta: () =>` up to `component: X` or `function X`
      // Since it's messy, let's just use regex to remove lines that are leftovers from the route definition
      const lines = content.split('\n');
      const newLines = [];
      let inMetaBlock = false;
      let i = 0;
      
      while (i < lines.length) {
        let line = lines[i];
        if (line.includes('meta: () => [')) {
          inMetaBlock = true;
          i++;
          continue;
        }
        if (inMetaBlock) {
          if (line.trim() === '],') {
            inMetaBlock = false;
          } else if (line.trim() === ']') {
            inMetaBlock = false;
          }
          i++;
          continue;
        }
        
        if (line.trim().startsWith('component: ')) {
          i++;
          continue;
        }
        
        if (line.trim().startsWith('validateSearch: ')) {
           // Skip validateSearch block until we find `}`
           while (i < lines.length && !lines[i].includes('}')) {
              i++;
           }
           i++; // skip the `}` line
           continue;
        }

        newLines.push(line);
        i++;
      }
      
      content = newLines.join('\n');
      fs.writeFileSync(dirPath, content, 'utf8');
    }
  });
}

cleanRoutes(path.join(__dirname, 'src', 'app'));
