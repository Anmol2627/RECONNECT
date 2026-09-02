const fs = require('fs');
const path = require('path');

const srcRoutesDir = path.join(__dirname, 'src', 'routes');
const appDir = path.join(__dirname, 'src', 'app');

const routeMapping = {
  'index.tsx': 'page.tsx',
  'check-in.tsx': '(participant)/check-in/page.tsx',
  'journey.tsx': '(participant)/journey/page.tsx',
  'messages.tsx': '(participant)/messages/page.tsx',
  'progress.tsx': '(participant)/progress/page.tsx',
  'recommendations.tsx': '(participant)/recommendations/page.tsx',
  'resources.tsx': '(participant)/resources/page.tsx',
  'search.tsx': '(participant)/search/page.tsx',
  'settings.tsx': '(participant)/settings/page.tsx',
  'support.tsx': '(participant)/support/page.tsx',
  'sessions.index.tsx': '(participant)/sessions/page.tsx',
  'sessions.employment-confidence-cohort.tsx': '(participant)/sessions/employment-confidence-cohort/page.tsx',
  'courses.tsx': '(participant)/courses/page.tsx',
  'courses.workplace-communication.tsx': '(participant)/courses/workplace-communication/page.tsx'
};

function ensureDirSync(dirpath) {
  if (!fs.existsSync(dirpath)) {
    fs.mkdirSync(dirpath, { recursive: true });
  }
}

function processContent(content) {
  if (!content.includes('"use client"') && !content.includes("'use client'")) {
    content = '"use client";\n' + content;
  }
  content = content.replace(/import\s+\{.*?\bLink\b.*?\}\s+from\s+["']@tanstack\/react-router["']/g, 'import Link from "next/link"');
  content = content.replace(/import\s+\{.*?\buseNavigate\b.*?\}\s+from\s+["']@tanstack\/react-router["']/g, 'import { useRouter } from "next/navigation"');
  content = content.replace(/const\s+navigate\s*=\s*useNavigate\(\)/g, 'const router = useRouter()');
  content = content.replace(/navigate\(\{.*?to:\s*(["'][^"']+["']).*?\}\)/g, 'router.push($1)');
  content = content.replace(/import\s+\{\s*createFileRoute\s*\}\s+from\s+["']@tanstack\/react-router["'];?/g, '');
  
  const routeMatch = content.match(/export\s+const\s+Route\s*=\s*createFileRoute\([^)]+\)\(\{\s*component:\s*([A-Za-z0-9_]+),?/);
  if (routeMatch) {
    const compName = routeMatch[1];
    content = content.replace(/export\s+const\s+Route\s*=\s*createFileRoute[\s\S]*?\}\);?/, '');
    if (!content.includes(`export default ${compName}`) && !content.includes(`export default function ${compName}`)) {
       content += `\nexport default ${compName};\n`;
    }
  }

  content = content.replace(/import\s+\{\s*\}\s+from\s+["']@tanstack\/react-router["'];?/g, '');
  content = content.replace(/<Link([^>]*)to=/g, '<Link$1href=');
  return content;
}

if (fs.existsSync(srcRoutesDir)) {
  for (const [oldName, newPath] of Object.entries(routeMapping)) {
    const oldFilePath = path.join(srcRoutesDir, oldName);
    if (fs.existsSync(oldFilePath)) {
      let content = fs.readFileSync(oldFilePath, 'utf8');
      content = processContent(content);
      const newFilePath = path.join(appDir, newPath);
      ensureDirSync(path.dirname(newFilePath));
      fs.writeFileSync(newFilePath, content, 'utf8');
      console.log(`Migrated ${oldName} to ${newPath}`);
    }
  }
}

function processDir(dir) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    if (fs.statSync(dirPath).isDirectory()) {
      processDir(dirPath);
    } else if (dirPath.endsWith('.ts') || dirPath.endsWith('.tsx')) {
      let content = fs.readFileSync(dirPath, 'utf8');
      let original = content;
      content = processContent(content);
      content = content.replace(/useRouterState\(\)\.location\.pathname/g, 'usePathname()');
      content = content.replace(/import\s+\{.*?\buseRouterState\b.*?\}\s+from\s+["']@tanstack\/react-router["']/g, 'import { usePathname } from "next/navigation"');
      if (content.includes('usePathname()') && !content.includes('next/navigation')) {
        content = 'import { usePathname } from "next/navigation";\n' + content;
      }
      if (content !== original) {
        fs.writeFileSync(dirPath, content, 'utf8');
        console.log(`Updated component ${dirPath}`);
      }
    }
  });
}

processDir(path.join(__dirname, 'src', 'components'));
