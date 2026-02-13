const puppeteer = require ('puppeteer');
const fs = require('fs').promises;
const path = require('node:path');

// THINGS WITHOUT OTHER FUNCTIONS

async function writeHTML(filepath, htmlStr) {
  let fileHandle;
  try {
    fileHandle = await fs.open(filepath, 'w');
    await fileHandle.write(htmlStr);
  }
  catch (err) {
    console.error('failed writing:', err)
  }
  finally {
    if (fileHandle) {
      await fileHandle.close();}
  }
}

async function getFileStrFromPath(filePath) {
  try {
    const str = await fs.readFile(filePath, 'utf8');
    return str
  }
  catch (err) {
    console.error(err);
  }
}

async function getHTMLs(dirPath) {
  try {
    const dirFiles = await fs.readdir(dirPath);
    const htmlFiles = dirFiles.filter(file => file.endsWith('.html'));
    return htmlFiles;
  } 
  catch (err) {
    console.error('Error reading directory:', err);
    throw err;
  }
}

function copySimpleFiles(srcDir, publicDir) {
  const FILE_WHITELIST = ['favicon.png', 'robots.txt', 'style.css'];
  
  for (let i = 0; i < FILE_WHITELIST.length; i++) {
    fs.copyFile(path.join(srcDir, FILE_WHITELIST[i]), path.join(publicDir, FILE_WHITELIST[i]));
  }
}

async function wipeDir(dir) {
  try {
    await fs.rm(dir, {recursive : true});}
  catch (err) {
    if (err.code !== 'ENOENT') {
      console.error(err);}}
  try {
    await fs.mkdir(dir);}
  catch (err) {
    if (err.code !== 'EEXIST') {
      console.error(err);}}
}

async function makeDir(path) {
  try {
    await fs.mkdir(path);
  }
  catch (err) {
    if (err.code !== 'EEXIST') {
      console.log(err)
    }
  }
}

// THINGS USING OTHER FUNCS

async function copyImages(srcDir, publicDir) {
  const CSS_FILENAME = 'style.css';
  htmlFiles = await getHTMLs(publicDir);
  htmlFiles.push(CSS_FILENAME);
  for (let i = 0; i < htmlFiles.length; i++) {
    const fileStr = await getFileStrFromPath(path.join(publicDir, htmlFiles[i]));
    let htmlImgs = fileStr.match(/(?<=<img src=")(.+?)(?=")/g);
    let cssImgs = fileStr.match(/(?<=url\(")(.+)(?="\))/g);
    if (i + 1 == htmlFiles.length) {
      imgMatches = cssImgs;
    } else {
      imgMatches = htmlImgs;
    }
    if (imgMatches == null) {
      imgMatches = [];
    }
    for (let i = 0; i < imgMatches.length; i++) {
      imgMatchSuffix = imgMatches[i].replace('./', '');
      imgFolder = path.join(publicDir, path.join(imgMatchSuffix, '..'));
      sourcePath = path.join(srcDir, imgMatchSuffix);
      destPath = path.join(publicDir, imgMatchSuffix);
      await makeDir(imgFolder);
      try {
        await fs.copyFile(sourcePath, destPath); 
      }
      catch (err) {
        if (err.code === 'ENOENT') {
          console.log('image does not exist: ' + sourcePath);
        } else {
          console.error(err);
        }
      }
    }
  }
}

// MAIN

async function main() {
  // paths :3
  const ROOT_DIR = path.join(__dirname, '..'); // change if moving build.js up or down
  const SRC_DIR = path.join(ROOT_DIR, 'src');
  const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
  const FILE_PREFIX = 'file://'

  // nuke the public
  await wipeDir(PUBLIC_DIR);

  // defining browser elements
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const htmlFiles = await getHTMLs(SRC_DIR);
  let dest;

  // getting writing html files
  for (let i = 0; i < (Object.keys(htmlFiles).length); i++) {
    // dest = FILE_PREFIX + path.join(SRC_DIR, htmlFiles[i]);
    dest = FILE_PREFIX + SRC_DIR + '/' + htmlFiles[i];
    console.log(dest)
    await page.goto(dest); // idk how to properly do file_prefix
    const bodyHTML = await page.evaluate(() => document.documentElement.outerHTML);
    await writeHTML(path.join(PUBLIC_DIR, htmlFiles[i]), bodyHTML);
  }

  await browser.close();

  // copying other stuffs
  copySimpleFiles(SRC_DIR, PUBLIC_DIR);
  await copyImages(SRC_DIR, PUBLIC_DIR);
}

main();