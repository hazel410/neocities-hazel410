/* UTILS */

function capitalize(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

function getImgBullet(image, text, html, altText=text + " :D", link=1) {
  /* inits */
  let outputHTML;
  let imageHTML;
  let textHTML;
  
  /* change dynamic content */
  switch (link) {
    case 0: /* we dont want link */
      imageHTML = /* html */ `<img src="${image}">`;
      textHTML = /* html */ `${text}`;
      break;
    case 1: /* want default link */
      imageHTML = /* html */ `<a href=${html} title="${altText}"><img src="${image}"></a>`;
      textHTML = /* html */ `<a href=${html} title="${altText}">${text}</a>`;
      break;
    default: /* want custom link */
      imageHTML = /* html */ `<a href=${link} title="${altText}"><img src="${image}"></a>`;
      textHTML = /* html */ `<a href=${link} title="${altText}">${text}</a>`;
      break;
  }
  
  /* appending dynamic to static */
  outputHTML = /* html */ `
  <div class=container>
    <div class=frame>
      ${imageHTML}
    </div>
    <div class=shrine-text>
      ${textHTML}
    </div>
  </div>
  `;

  return outputHTML;
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

  /* sanitizing inputs and adding santitized to output*/
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
  // PREAMBLE
  let html = '';
  let shrines = ['balatro', 'celeste', 'deltarune', 'factorio',  'pokemon', 'splatoon'];
  let info = [];
  let other = [];

  // SHRINES
  html += /* html */`
    <h4>&#9734 SHRINES &#9734</h4>
    `;
    
  for (let shrine of shrines){
    let shrinePNG =  './shrine-icons/' + shrine + '.png' ;
    let shrineHTML = './' + shrine + '.html';
    let shrineNAME = capitalize(shrine);
    html += getImgBullet(shrinePNG, shrineNAME, shrineHTML)
  }

  // INFO
  html += /* html */`
    <h4>&#9734 INFO &#9734</h4>
    `;

  // OTHER
  html += /* html */`
    <h4>&#9734 OTHER &#9734</h4>
    `;

    html += /* html */ getImgBullet("./favicon.png", "Home", "index.html")

  // END
  document.getElementById(doc).innerHTML = html;
}

function loadFooter(doc) {
  let html = 'IDK WHAT TO PUT HERE YET :3';
  document.getElementById(doc).innerHTML = html;
}