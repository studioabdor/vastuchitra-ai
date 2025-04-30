const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [32, 180]; // 32px for favicon, 180px for apple-touch-icon

async function generateFavicons() {
  const svgBuffer = fs.readFileSync(path.join(__dirname, '../public/favicon.svg'));
  
  for (const size of sizes) {
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(path.join(__dirname, `../public/${size === 32 ? 'favicon.png' : 'apple-touch-icon.png'}`));
  }
  
  console.log('Favicons generated successfully!');
}

generateFavicons().catch(console.error); 