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

const dist = path.join(__dirname, 'dist');
if (!fs.existsSync(dist)) fs.mkdirSync(dist);

copyDir('css', path.join(dist, 'css'));
copyDir('img', path.join(dist, 'img'));
copyDir('js', path.join(dist, 'js'));
fs.copyFileSync('index.html', path.join(dist, 'index.html'));
fs.copyFileSync('mobile.html', path.join(dist, 'mobile.html'));
fs.copyFileSync('report.html', path.join(dist, 'report.html'));
fs.copyFileSync('generated_report.html', path.join(dist, 'generated_report.html'));
fs.copyFileSync('_redirects', path.join(dist, '_redirects'));

console.log('Build completed: dist/');
