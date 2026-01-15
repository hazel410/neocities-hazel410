const SHRINE_ROOT = './shrines/'

let navbar = document.querySelector('#navbar');
let html = '';
let shrines = ['balatro', 'celeste', 'deltarune', 'factorio',   'pokemon', 'splatoon'];
let info = [];
let other = [];

function capitalize(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

// ===================================
// SHRINES
// ===================================

html += `
  <h4>☆ SHRINES ☆</h4>
  `;
for (let shrine of shrines){
  let shrineGeneric = SHRINE_ROOT + shrine + '/' + shrine; // ../shrines/{shrine}/{shrine}
  let shrinePNG = shrineGeneric + '.png' ;
  let shrineHTML = shrineGeneric + '.html';
  let shrineNAME = capitalize(shrine);
  html += `
  <div class=container>
    <div class=frame>
      <a href=${shrineHTML} title="${shrineNAME} :D"}> <img src="${shrinePNG}"> </a>
    </div>
    <div class=shrine-text>
      <a href=${shrineHTML} title="${shrineNAME} :D">${shrineNAME}</a>
    </div>
  </div>
  `
}

// ===================================
// INFO
// ===================================

html += `
  <h4>☆ INFO ☆</h4>
  `;

// ===================================
// OTHER
// ===================================

html += `
  <h4>☆ OTHER ☆</h4>
  `;

// ===================================
// END
// ===================================

navbar.innerHTML = html