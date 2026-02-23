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
  html += getNavDivider('SHRINES');
  html += getNavBullet('balatro', overides={isBroken: true});
  html += getNavBullet('celeste');
  html += getNavBullet('deltarune', overides={isBroken: true});
  html += getNavBullet('factorio', overides={isBroken: true});
  html += getNavBullet('pokemon', overides={isBroken: true});
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
  let html = 'IDK WHAT TO PUT HERE YET :3';
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
  
  /* flags */
  html += getButton('trans-flag.png');
  html += getButton('polyamorous-flag.png');
  html += getButton('lesbian-flag.png');

  /* etc pride */
  html += getButton('youre-telling-me-a-queer-coded-this.png');
  html += getButton('pridenow.gif');

  /* irl pol */
  html += getButton('diy-hrt.png');
  html += getButton('no-nazi-no-fascism-no-racism.gif');
  html += getButton('free-palestine.gif');
  html += getButton('acab.gif');
  html += getButton('legalise-it-now.gif');
  html += getButton('melt-ice.gif');
  html += getButton('i-support-right-to-repair.png');

  /* web pol */
  html += getButton('100-percent-human-0-percent-ai.png');
  html += getButton('made-on-gnu-linux.gif');
  html += getButton('just-use-png.gif');
  html += getButton('neocities-now.png');
  html += getButton('internet-archive.gif');
  html += getButton('this-is-an-anti-ai-site.gif');
  html += getButton('lets-get-physical.gif');
  html += getButton('piracy-now.gif');
  html += getButton('i-hate-microsoft.png');
  html += getButton('ublock-origin-now.png');
  html += getButton('css-is-awesome.png');

  /* tenders */
  html += getButton('gameboy-advance.png');
  html += getButton('ds-logo.png');
  html += getButton('3ds-logo.png');
  html += getButton('gamecube-logo.png');
  html += getButton('wii-logo.png');

  /* gayming */
  html += getButton('wanna-be-a-big-shot.gif');
  html += getButton('kris-where-tf-are-we.png');
  html += getButton('stardew-valley.gif');
  html += getButton('pokemon.gif');
  html += getButton('bad-apple.gif');
  html += getButton('ralsei-smoking-a-blunt.gif');
  html += getButton('windose20.png');

  /* sillies */
  html += getButton('ban-time-travel-now.gif');
  html += getButton('best-viewed-with-a-computer.gif');
  html += getButton('under-construction.png');
  html += getButton('graphic-design.gif');
  html += getButton('i-like-computer.png');
  html += getButton('css-is-difficult.gif');
  html += getButton('toe-beans-now.gif');
  html += getButton('just-a-blank-button.gif');
  html += getButton('made-with-my-own-two-paws.gif');
  html += getButton('cereal-rainbow-cat.png');
  html += getButton('adhd.png');
  html += getButton('dont-click-here-no.png', link='https://en.wikipedia.org/wiki/Reverse_psychology');
  html += getButton('this-site-is-miku-approved.gif');
  html += getButton('powered-by-a-mouse-in-a-wheel.gif');
  html += getButton('best-viewed-with-open-eyes.gif');
  html += getButton('powered-by-the-void.gif');
  html += getButton('warning-this-site-is-canon.gif');
  
  document.getElementById(doc).innerHTML = html;
}
