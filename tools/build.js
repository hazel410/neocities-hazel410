const puppeteer = require ('puppeteer');
const fs = require('fs').promises;

// THINGS WITHOUT OTHER FUNCTIONS

async function writeHTML(filepath, htmlStr) {
  let fileHandle;
  try {
    fileHandle = await fs.open(filepath, 'w');
    await fileHandle.write(htmlStr);
  }
  catch (err) {
    console.error('fucked up:', err)
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

async function isDir(path) {
  try {
    const stats = await fs.stat(path);
    return stats.isDirectory();
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
    fs.copyFile(srcDir + FILE_WHITELIST[i], publicDir + FILE_WHITELIST[i])
  }
}

async function purgeDir(dir) {
  try {
    await fs.rm(dir, {recursive : true});}
  catch (err) {
    if (err.code !== 'ENOENT') {
      console.error(err);}}
  try {
    await fs.mkdir('public');}
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

async function getRootDir() {
  const rootPath = await getFileStrFromPath('tools/root.txt');
  return rootPath;
}

async function copyImages(srcDir, publicDir) {
  const CSS_FILENAME = 'style.css';
  htmlFiles = await getHTMLs(publicDir);
  htmlFiles.push(CSS_FILENAME);
  for (let i = 0; i < htmlFiles.length; i++) {
    const fileStr = await getFileStrFromPath(publicDir + htmlFiles[i]);
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
      imgFolder = publicDir + imgMatchSuffix.slice(0, imgMatchSuffix.search("/")); // this is super lazy
      sourcePath = srcDir + imgMatchSuffix;
      destPath = publicDir + imgMatchSuffix;
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
  // consts
  const ROOT_DIR = await getRootDir();
  const SRC_DIR = ROOT_DIR + 'src/';
  const PUBLIC_DIR = ROOT_DIR + 'public/';
  const FILE_PREFIX = 'file://'

  // nuke the public
  await purgeDir(PUBLIC_DIR);

  // defining browser elements
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const htmlFiles = await getHTMLs(SRC_DIR);

  // getting writing html files
  for (let i = 0; i < (Object.keys(htmlFiles).length); i++) {
    await page.goto(FILE_PREFIX + SRC_DIR + htmlFiles[i]);
    const bodyHTML = await page.evaluate(() => document.documentElement.outerHTML);
    await writeHTML(PUBLIC_DIR + htmlFiles[i], bodyHTML);
  }

  await browser.close();

  // copying other stuffs
  copySimpleFiles(SRC_DIR, PUBLIC_DIR);
  await copyImages(SRC_DIR, PUBLIC_DIR);
}

main();