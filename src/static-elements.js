// function utils

function capitalize(val) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

function getNavDivider(dividerText) {
  let outputHTML = /*html*/ `
    <h4>&#9734 ${dividerText} &#9734</h4>
  `;
  return outputHTML
}

function sanitizeUndef(unsanitized, fallback) {
  if (unsanitized === undefined) {
    return fallback;
  }
  else {
    return unsanitized;
  }
}

function sanitizeSpaces(unsanitized, replacer='-') {
  return (unsanitized.split(' ').join(replacer)).replaceAll('!', '');
}

function getNavBullet(item, overides={}) {
  let navTEXT = sanitizeUndef(overides.text, capitalize(item));
  let navIMG = sanitizeUndef(overides.image, './nav-icons/' + sanitizeSpaces(item) + '.png');
  let navLINK = sanitizeUndef(overides.link, './' + sanitizeSpaces(item,'_') + '.html');
  let navTALT = sanitizeUndef(overides.textAlt, 'Go To ' + navLINK);
  let navIALT = sanitizeUndef(overides.imgAlt, navTEXT);
  let isBroken = sanitizeUndef(overides.isBroken, false);
  let isMissingImage = sanitizeUndef(overides.isMissingImage, false);
  
  let htmlImg;
  let htmlText;

  // text portion
  if(isBroken) {
    htmlText = /*html*/ `${navTEXT}`;
  } else {
    htmlText = /*html*/ `<a href="${navLINK}" title="${navTALT}" alt="${navTALT}">${navTEXT}</a>`;
  }

  // img portion
  if(isMissingImage) {
    htmlImg = /*html*/ ``;
    console.log(item);
  } else if(isBroken) {
    htmlImg = /*html*/ `<img src="${navIMG}" title="${navIALT}" alt="${navIALT}">`;
  } else if(!isBroken) {
    htmlImg = /*html*/ `<a href="${navLINK}" title="${navIALT}" alt="${navIALT}"><img src="${navIMG}" title="${navIALT}" alt="${navIALT}"></a>`;
  }

  let outputHTML = /*html*/ `
  <div class=container>
    <div class=nav-flex-frame>
      ${htmlImg}
    </div>
    <div class=nav-flex-text>
      ${htmlText}
    </div>
  </div>
  `;

  return outputHTML;
}

function getButton(fileName, link='') {
  const BUTTON_DIR = 'buttons/';
  const displayName = (fileName.substring(0, fileName.lastIndexOf("."))).replaceAll('-', ' ');
  const innerHTML = /*html*/ `<img src="${BUTTON_DIR}${fileName}" alt="${displayName}" title="${displayName}">`;

  if(link == '') {
    return innerHTML;
  } else {
    return /*html*/ `<a href="${link}" rel="noreferrer noopener" target="_blank">${innerHTML}</a>`;
  }
  
}

/* static constants */

function loadMeta(doc) {
  let html = /* html */ `
    <link href="./style.css" rel="stylesheet" />
    <link href="./favicon.png" rel="icon" type="image/x-icon" />
    <title>Hazel's Hideaway</title>
    <meta content="hazel410 personal website" name="Hazel's Hideaway" />
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  `;
  document.getElementById(doc).innerHTML = html;
}

function loadHeader(doc, headings={}) {
  let html = '';

  /* update to use sanitizeUndef... maybe */
  if (headings.h1 === undefined) {
    headings.h1 = "Hazel's Hideaway";}
  html += /* html */ `<div class="header-title">${headings.h1}</div>`;
  if (headings.h2 !== undefined) {
    html += /* html */ `<h3>${headings.h2}</h3>`;}
  if (headings.h3 !== undefined) {
    html += /* html */ `<h5>${headings.h3}</h5>`;}

  document.getElementById(doc).innerHTML = html;
}

function loadNavbar(doc) {
  let html = '';
  
  // Shrines
  html += getNavDivider('AUTISM');
  html += getNavBullet('balatro', overides={isBroken: true});
  html += getNavBullet('celeste');
  html += getNavBullet('deltarune');
  html += getNavBullet('factorio', overides={isBroken: true});
  html += getNavBullet('pokemon');
  html += getNavBullet('splatoon', overides={isBroken: true});

  // Info
  html += getNavDivider('INFO');
  html += getNavBullet("about me", overides={isMissingImage: true});

  // other
  html += getNavDivider('OTHER');
  html += getNavBullet("index", overides={text: "Home"});
  html += getNavBullet("cool links", overides={isMissingImage: true});
  html += getNavBullet("useful links", overides={isBroken: true, isMissingImage: true});
  html += getNavBullet("buttons", overides={isMissingImage: true});
  html += getNavBullet("credits", overides={isBroken: true, isMissingImage: true});

  document.getElementById(doc).innerHTML = html;
}

function loadFooter(doc) {
  let html = `source hosted on <a href="https://www.github.com/hazel410/neocities-hazel410">github</a>`;
  document.getElementById(doc).innerHTML = html;
}

/* static sometimes */

function loadLinkedButtons (doc) {
  let html = '';
  html += getButton('petra-pixel.png', link='https://petrapixel.neocities.org/');
  html += getButton('the-nonexistent-fandoms-fandom.gif', link='https://nonexistentfandomsfandom.neocities.org/');
  html += getButton('venula.gif', link='https://venula.neocities.org/');
  html += getButton('seafare.png', link='https://seafare.neocities.org/');
  html += getButton('centiskorch.png', link='https://centiskor.ch');
  html += getButton('tacky-villain.png', link='https://tackyvillain.neocities.org');
  html += getButton('a-tiny-space.gif', link='https://starrs.neocities.org/tinyspace/');

  document.getElementById(doc).innerHTML = html;
}

function loadAllButtons(doc) {
  let html = '';
  let buttonFiles = [];

  /* flags */
  buttonFiles.push([
    'trans-flag.png',
    'polyamorous-flag.png',
    'lesbian-flag.png',
    // 'nonbinary-flag.png',
    // 'genderqueer-flag.png',
    'autistic-pride-flag-websafe-infinity.png',
    'autistic-pride-flag-tbh-creature.png',
    'trans-flag-blahaj.png',
  ]);

  /* etc pride */
  buttonFiles.push([
    'youre-telling-me-a-queer-coded-this.png',
    'pridenow.gif',
    'diy-hrt.png',
  ]);

  /* irl pol */
  buttonFiles.push([
    'no-nazi-no-fascism-no-racism.gif',
    'free-palestine.gif',
    'acab.gif',
    'legalise-it-now.gif',
    'melt-ice.gif',
    'i-support-right-to-repair.png',
  ]);

  /* web pol */
  buttonFiles.push([
    '100-percent-human-0-percent-ai.png',
    'made-on-gnu-linux.gif',
    'just-use-png.gif',
    'neocities-now.png',
    'internet-archive.gif',
    'this-is-an-anti-ai-site.gif',
    'lets-get-physical.gif',
    'piracy-now.gif',
    'i-hate-microsoft.png',
    'ublock-origin-now.png',
    'css-is-awesome.png',
  ]);

  /* tenders */
  buttonFiles.push([
    'gameboy-advance.png',
    'ds-logo.png',
    '3ds-logo.png',
    'gamecube-logo.png',
    'wii-logo.png',
  ]);

  /* gayming */
  buttonFiles.push([
    'wanna-be-a-big-shot.gif',
    'kris-where-tf-are-we.png',
    'stardew-valley.gif',
    'pokemon.gif',
    'bad-apple.gif',
    'ralsei-smoking-a-blunt.gif',
    'windose20.png',
  ]);

  /* sillies */
  buttonFiles.push([
    'ban-time-travel-now.gif',
    'best-viewed-with-a-computer.gif',
    'under-construction.png',
    'graphic-design.gif',
    'i-like-computer.png',
    'css-is-difficult.gif',
    'toe-beans-now.gif',
    'blank-raised-button.png',
    'made-with-my-own-two-paws.gif',
    'cereal-rainbow-cat.png',
    'adhd.png',
    'dont-click-here-no.png -link=https://en.wikipedia.org/wiki/Reverse_psychology',
    'this-site-is-miku-approved.gif',
    'powered-by-a-mouse-in-a-wheel.gif',
    'best-viewed-with-open-eyes.gif',
    'powered-by-the-void.gif',
    'warning-this-site-is-canon.gif',
  ]);

  for(let i = 0; i < buttonFiles.length; i++) {
    for(let j = 0; j < buttonFiles[i].length; j++) {
      let item = buttonFiles[i][j];
      let linkIndex = item.indexOf(' -link=');
      if (linkIndex == -1) {
        html += getButton(item);
      } else {
        let buttonLink = item.slice(linkIndex + 7)
        html += getButton(item.slice(0, item.indexOf(' ')), link=buttonLink)
        console.log(item.slice(linkIndex + 7));
      }
    }
  }

  document.getElementById(doc).innerHTML = html;
}