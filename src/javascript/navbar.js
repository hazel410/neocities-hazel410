function capitalize(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

function loadNavbar(doc) {
  // PREAMBLE
  const declaration = document.styleSheets[0].cssRules[0].style;
  const SHRINE_ROOT = declaration.getPropertyValue("--shrines-dir");
  console.log(SHRINE_ROOT)
  let html = '';
  let shrines = ['balatro', 'celeste', 'deltarune', 'factorio',   'pokemon', 'splatoon'];
  let info = [];
  let other = [];

  // SHRINES
  html += /* html */`
    <h4>☆ SHRINES ☆</h4>
    `;
  for (let shrine of shrines){
    let shrineGeneric = SHRINE_ROOT + shrine + '/' + shrine;
    let shrinePNG = shrineGeneric + '.png' ;
    let shrineHTML = shrineGeneric + '.html';
    let shrineNAME = capitalize(shrine);
    html += /* html */`
    <div class=container>
      <div class=frame>
        <a href=${shrineHTML} title="${shrineNAME} :D"><img src="${shrinePNG}"></a>
      </div>
      <div class=shrine-text>
        <a href=${shrineHTML} title="${shrineNAME} :D">${shrineNAME}</a>
      </div>
    </div>
    `
  }

  // INFO
  html += /* html */`
    <h4>☆ INFO ☆</h4>
    `;

  // OTHER
  html += /* html */`
    <h4>☆ OTHER ☆</h4>
    `;

  // END
  document.getElementById(doc).innerHTML = html
}