const fs = require('fs');
const path = require('path');

function copyDir(src, dest) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        if (entry.isDirectory()) {
            copyDir(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

function copyFile(src, dest) {
    const parentDir = path.dirname(dest);
    if (!fs.existsSync(parentDir)) fs.mkdirSync(parentDir, { recursive: true });
    fs.copyFileSync(src, dest);
}

const dist = path.join(__dirname, 'dist');
fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });

copyDir('css', path.join(dist, 'css'));
copyDir('img', path.join(dist, 'img'));
copyDir('js', path.join(dist, 'js'));
copyFile('index.html', path.join(dist, 'index.html'));
copyFile('mobile.html', path.join(dist, 'mobile.html'));
copyFile('report.html', path.join(dist, 'report.html'));
copyFile('generated_report.html', path.join(dist, 'generated_report.html'));

// Stable pretty routes for Cloudflare Pages without relying on _redirects.
copyFile('mobile.html', path.join(dist, 'mobile', 'index.html'));
copyFile('report.html', path.join(dist, 'report', 'index.html'));
copyFile('generated_report.html', path.join(dist, 'generated_report', 'index.html'));

console.log('Build completed: dist/');
