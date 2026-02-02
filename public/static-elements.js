// UTILS

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

function sanitizeFileName(unsanitized) {
  return (unsanitized.split(' ').join('-')).replaceAll('!', '');
}

function getNavBullet(item, overides={}) {
  let navTEXT = sanitizeUndef(overides.text, capitalize(item));
  let navIMG = sanitizeUndef(overides.image, './nav-icons/' + sanitizeFileName(item) + '.png');
  let navLINK = sanitizeUndef(overides.link, './' + sanitizeFileName(item) + '.html');
  let navTALT = sanitizeUndef(overides.textAlt, 'Go To ' + navLINK);
  let navIALT = sanitizeUndef(overides.imgAlt, navTEXT);

  let outputHTML = /*html*/ `
  <div class=container>
    <div class=frame>
      <a href=${navLINK} title="${navTALT}"><img src="${navIMG}" title="${navIALT}"></a>
    </div>
    <div class=nav-text>
      <a href=${navLINK} title="${navTALT}">${navTEXT}</a>
    </div>
  </div>
  `;

  return outputHTML
}

/* STATICS */

function loadMeta(doc) {
  let html = /* html */ `
    <link href="./style.css" rel="stylesheet" />
    <link href="./favicon.png" rel="icon" type="image/x-icon" />
    <title>Hazel's Hideaway</title>
    <meta content="hazel410 personal website" name="Hazel's Hideaway" />
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  `
  document.getElementById(doc).innerHTML = html;
}

function loadHeader(doc, headings) {
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
  let navHTML = '';
  
  // Shrines
  navHTML += getNavDivider('SHRINES');
  navHTML += getNavBullet('balatro');
  navHTML += getNavBullet('celeste');
  navHTML += getNavBullet('deltarune');
  navHTML += getNavBullet('factorio');
  navHTML += getNavBullet('pokemon');
  navHTML += getNavBullet('splatoon')

  // Info
  navHTML += getNavDivider('INFO');
  navHTML += getNavBullet("about me");

  // other
  navHTML += getNavDivider('OTHER');
  navHTML += getNavBullet("index", overides={text: "Home"});
  navHTML += getNavBullet("cool links!");
  navHTML += getNavBullet("useful links!");

  document.getElementById(doc).innerHTML = navHTML;
}

function loadFooter(doc) {
  let html = 'IDK WHAT TO PUT HERE YET :3';
  document.getElementById(doc).innerHTML = html;
}