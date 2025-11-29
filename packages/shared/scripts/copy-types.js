import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Копіюємо файли типів до dist
const copyTypes = async () => {
  const srcDir = path.join(__dirname, '../src');
  const distDir = path.join(__dirname, '../dist');
  
  // Створюємо dist директорію якщо не існує
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }
  
  console.log('📁 Копіювання типів...');
  
  // Копіюємо всі .d.ts файли
  const copyRecursive = (src, dest) => {
    if (fs.existsSync(src)) {
      const stats = fs.statSync(src);
      
      if (stats.isDirectory()) {
        if (!fs.existsSync(dest)) {
          fs.mkdirSync(dest, { recursive: true });
        }
        
        const files = fs.readdirSync(src);
        files.forEach(file => {
          copyRecursive(path.join(src, file), path.join(dest, file));
        });
      } else if (src.endsWith('.d.ts') || src.endsWith('.ts')) {
        fs.copyFileSync(src, dest);
        console.log(`✅ Скопійовано: ${path.relative(process.cwd(), src)} -> ${path.relative(process.cwd(), dest)}`);
      }
    }
  };
  
  copyRecursive(srcDir, distDir);
  console.log('🎉 Типи успішно скопійовані!');
};

copyTypes().catch(console.error);