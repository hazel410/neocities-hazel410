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

function loadFloweryTable(doc) {
  let html = `<table>
    <tr>
      <th>line</th>
      <th>audio</th>
      <th>download</th>
    </tr>\n`;
  const floweryFiles = [
    'snd_flowery_voiceclip_all_according_to_all_according_to_plant.wav', 
    'snd_flowery_voiceclip_blingo_blizzard.wav', 
    'snd_flowery_voiceclip_calling_for_help.wav', 
    'snd_flowery_voiceclip_chou_exciting_ja.wav', 
    'snd_flowery_voiceclip_dont_you_like_serving_humans.wav', 
    'snd_flowery_voiceclip_dont_you_like_serving_humans_ja.wav', 
    'snd_flowery_voiceclip_flowers_blooms_in_your_heart.wav', 
    'snd_flowery_voiceclip_flowers_blooms_in_your_heart_ja.wav', 
    'snd_flowery_voiceclip_flowery.wav', 
    'snd_flowery_voiceclip_flowery2.wav', 
    'snd_flowery_voiceclip_flowery2_ja.wav', 
    'snd_flowery_voiceclip_forget_it.wav', 
    'snd_flowery_voiceclip_forget_it_ja.wav', 
    'snd_flowery_voiceclip_get_a_chance_1.wav', 
    'snd_flowery_voiceclip_get_a_chance_1_ja.wav', 
    'snd_flowery_voiceclip_get_a_chance_2.wav', 
    'snd_flowery_voiceclip_give_to_you.wav', 
    'snd_flowery_voiceclip_give_to_you_ja.wav', 
    'snd_flowery_voiceclip_glue.wav', 
    'snd_flowery_voiceclip_glue_ja.wav', 
    'snd_flowery_voiceclip_go_home.wav', 
    'snd_flowery_voiceclip_go_home_ja.wav', 
    'snd_flowery_voiceclip_goodbye.wav', 
    'snd_flowery_voiceclip_great_style.wav', 
    'snd_flowery_voiceclip_great_style_ja.wav', 
    'snd_flowery_voiceclip_grown_like_a_turnip.wav', 
    'snd_flowery_voiceclip_grown_like_a_turnip_ja.wav', 
    'snd_flowery_voiceclip_hah.wav', 
    'snd_flowery_voiceclip_heh_it_s_my_jarona.wav', 
    'snd_flowery_voiceclip_heh_it_s_my_jarona_ja.wav', 
    'snd_flowery_voiceclip_hereicome.wav', 
    'snd_flowery_voiceclip_hereicomesanfrandisc.wav', 
    'snd_flowery_voiceclip_hereicomesanfrandisc_ja.wav', 
    'snd_flowery_voiceclip_hereicomesanfrandisco_strong.wav', 
    'snd_flowery_voiceclip_hereicomesanfrandisco_strong_ja.wav', 
    'snd_flowery_voiceclip_hereicomesanfrandisco_weak.wav', 
    'snd_flowery_voiceclip_hey.wav', 
    'snd_flowery_voiceclip_hey_boys.wav', 
    'snd_flowery_voiceclip_hey_boys_ja.wav', 
    'snd_flowery_voiceclip_hey_raly.wav', 
    'snd_flowery_voiceclip_hey_raly_ja.wav', 
    'snd_flowery_voiceclip_heyguys.wav', 
    'snd_flowery_voiceclip_heyguys_ja.wav', 
    'snd_flowery_voiceclip_heyguysithinkifoundaglue.wav', 
    'snd_flowery_voiceclip_heyguysithinkifoundaglue_ja.wav', 
    'snd_flowery_voiceclip_heytherelittleguy.wav', 
    'snd_flowery_voiceclip_heytherelittleguy_ja.wav', 
    'snd_flowery_voiceclip_hoo.wav', 
    'snd_flowery_voiceclip_huh.wav', 
    'snd_flowery_voiceclip_huhillshowyou.wav', 
    'snd_flowery_voiceclip_im_falling.wav', 
    'snd_flowery_voiceclip_im_falling_ja.wav', 
    'snd_flowery_voiceclip_im_falling_vending_ja.wav', 
    'snd_flowery_voiceclip_im_only_trying_to_help_you.wav', 
    'snd_flowery_voiceclip_im_only_trying_to_help_you_ja.wav', 
    'snd_flowery_voiceclip_imsorryonceagainikeptaladyinwaiting.wav', 
    'snd_flowery_voiceclip_imsorryonceagainikeptaladyinwaiting_ja.wav', 
    'snd_flowery_voiceclip_it.wav', 
    'snd_flowery_voiceclip_its_all_in_a_name.wav', 
    'snd_flowery_voiceclip_its_all_in_a_name_ja.wav', 
    'snd_flowery_voiceclip_its_all_yours.wav', 
    'snd_flowery_voiceclip_its_all_yours_ja.wav', 
    'snd_flowery_voiceclip_its_so_human.wav', 
    'snd_flowery_voiceclip_its_so_human_ja.wav', 
    'snd_flowery_voiceclip_itsme.wav', 
    'snd_flowery_voiceclip_itsme_ja.wav', 
    'snd_flowery_voiceclip_itsmeflowery.wav', 
    'snd_flowery_voiceclip_itsmeflowery_ja.wav', 
    'snd_flowery_voiceclip_itsmyjarona_ja.wav', 
    'snd_flowery_voiceclip_jarona1.wav', 
    'snd_flowery_voiceclip_jarona1_ja.wav', 
    'snd_flowery_voiceclip_jarona2.wav', 
    'snd_flowery_voiceclip_jarona2_ja.wav', 
    'snd_flowery_voiceclip_jarona3.wav', 
    'snd_flowery_voiceclip_jarona3_ja.wav', 
    'snd_flowery_voiceclip_jarona4.wav', 
    'snd_flowery_voiceclip_jarona4_ja.wav', 
    'snd_flowery_voiceclip_kris.wav', 
    'snd_flowery_voiceclip_kris_ja.wav', 
    'snd_flowery_voiceclip_last_jarona.wav', 
    'snd_flowery_voiceclip_last_jarona_ja.wav', 
    'snd_flowery_voiceclip_leaf_it_to_me.wav', 
    'snd_flowery_voiceclip_leaf_it_to_me_ja.wav', 
    'snd_flowery_voiceclip_lend_me_your_power.wav', 
    'snd_flowery_voiceclip_lend_me_your_power_ja.wav', 
    'snd_flowery_voiceclip_minipeppers.wav', 
    'snd_flowery_voiceclip_minipeppers_ja.wav', 
    'snd_flowery_voiceclip_mostlys.wav', 
    'snd_flowery_voiceclip_mostlys_ja.wav', 
    'snd_flowery_voiceclip_my_favorite_two.wav', 
    'snd_flowery_voiceclip_my_favorite_two_ja.wav', 
    'snd_flowery_voiceclip_my_human.wav', 
    'snd_flowery_voiceclip_my_human_ja.wav', 
    'snd_flowery_voiceclip_my_king.wav', 
    'snd_flowery_voiceclip_my_king_ja.wav', 
    'snd_flowery_voiceclip_my_king_ja_alt.wav', 
    'snd_flowery_voiceclip_mysterious_wind.wav', 
    'snd_flowery_voiceclip_mysterious_wind_ja.wav', 
    'snd_flowery_voiceclip_no_way_its_your_children.wav', 
    'snd_flowery_voiceclip_no_way_its_your_children_ja.wav', 
    'snd_flowery_voiceclip_nonono.wav', 
    'snd_flowery_voiceclip_omega_flowery.wav', 
    'snd_flowery_voiceclip_omega_flowery_ja.wav', 
    'snd_flowery_voiceclip_powering_up.wav', 
    'snd_flowery_voiceclip_prism_blow.wav', 
    'snd_flowery_voiceclip_prism_blow_ja.wav', 
    'snd_flowery_voiceclip_sanfran.wav', 
    'snd_flowery_voiceclip_say_that_again.wav', 
    'snd_flowery_voiceclip_say_that_again_ja.wav', 
    'snd_flowery_voiceclip_smile_again.wav', 
    'snd_flowery_voiceclip_smile_again_ja.wav', 
    'snd_flowery_voiceclip_sorryaboutthatguys.wav', 
    'snd_flowery_voiceclip_sorryaboutthatguys_ja.wav', 
    'snd_flowery_voiceclip_sorryaboutthatlittleguy.wav', 
    'snd_flowery_voiceclip_sorryaboutthatlittleguy_ja.wav', 
    'snd_flowery_voiceclip_sorryabouttheguy.wav', 
    'snd_flowery_voiceclip_sorryabouttheguy_ja.wav', 
    'snd_flowery_voiceclip_sorryabouttheguys_ja.wav', 
    'snd_flowery_voiceclip_sorrytokeepaladyinwaiting.wav', 
    'snd_flowery_voiceclip_sorrytokeepaladyinwaiting_ja.wav', 
    'snd_flowery_voiceclip_sorrytokeepyouladies.wav', 
    'snd_flowery_voiceclip_sorrytokeepyouladies_ja.wav', 
    'snd_flowery_voiceclip_sorrytokeepyouwaiting1.wav', 
    'snd_flowery_voiceclip_sorrytokeepyouwaiting1_ja.wav', 
    'snd_flowery_voiceclip_sorrytokeepyouwaiting2.wav', 
    'snd_flowery_voiceclip_sorrytokeepyouwaiting2_ja.wav', 
    'snd_flowery_voiceclip_sorrytokeepyouwaiting3_ja.wav', 
    'snd_flowery_voiceclip_spiral_dance.wav', 
    'snd_flowery_voiceclip_stingus.wav', 
    'snd_flowery_voiceclip_stingus_ja.wav', 
    'snd_flowery_voiceclip_suckle_it_up.wav', 
    'snd_flowery_voiceclip_suckle_it_up_ja.wav', 
    'snd_flowery_voiceclip_susie.wav', 
    'snd_flowery_voiceclip_susie_ja.wav', 
    'snd_flowery_voiceclip_take_that.wav', 
    'snd_flowery_voiceclip_take_that_ja.wav', 
    'snd_flowery_voiceclip_thats_my_dreams.wav', 
    'snd_flowery_voiceclip_thats_my_dreams_ja.wav', 
    'snd_flowery_voiceclip_thats_my_dreams_ja_alt.wav', 
    'snd_flowery_voiceclip_thatsgreat.wav', 
    'snd_flowery_voiceclip_thatsgreat_ja.wav', 
    'snd_flowery_voiceclip_the_boys.wav', 
    'snd_flowery_voiceclip_the_boys_ja.wav', 
    'snd_flowery_voiceclip_the_diner.wav', 
    'snd_flowery_voiceclip_the_diner_ja.wav', 
    'snd_flowery_voiceclip_theyre_eating_my_flesh.wav', 
    'snd_flowery_voiceclip_theyre_eating_my_flesh_ja.wav', 
    'snd_flowery_voiceclip_thisguysyourbestfriend.wav', 
    'snd_flowery_voiceclip_thisguysyourbestfriend_ja.wav', 
    'snd_flowery_voiceclip_try_my_flavor.wav', 
    'snd_flowery_voiceclip_try_my_flavor_ja.wav', 
    'snd_flowery_voiceclip_what_a_predictable_creature.wav', 
    'snd_flowery_voiceclip_what_a_predictable_creature_ja.wav', 
    'snd_flowery_voiceclip_with_your_powers_combined.wav', 
    'snd_flowery_voiceclip_with_your_powers_combined_ja.wav', 
    'snd_flowery_voiceclip_wow.wav', 
    'snd_flowery_voiceclip_wow_ja.wav', 
    'snd_flowery_voiceclip_yes.wav', 
    'snd_flowery_voiceclip_yes_ja.wav', 
    'snd_flowery_voiceclip_yoroshiku.wav', 
    'snd_flowery_voiceclip_your_dad.wav', 
    'snd_flowery_voiceclip_your_dad_ja.wav', 
    'snd_flowery_voiceclip_yourdadsmybestfriend.wav', 
    'snd_flowery_voiceclip_yourdadsmybestfriend2_ja.wav', 
    'snd_flowery_voiceclip_yourdadsmybestfriend_ja.wav', 
    'snd_flowery_voiceclip_youre_a_hero.wav', 
    'snd_flowery_voiceclip_youre_a_hero_ja.wav', 
    'snd_forthefans.wav', 
    'snd_forthefans_ja.wav', 
    'snd_ja_kidding.wav', 
    'snd_ja_kidding_ja.wav', 
    'snd_jarona_orange1.wav', 
    'snd_jarona_orange1_ja.wav', 
    'snd_jarona_orange2.wav', 
  ];

  function getFormattedFloweryTitle(floweryText) {
    floweryText = floweryText.replaceAll("snd_flowery_voiceclip_", "");
    floweryText = floweryText.replaceAll(".wav", "");
    return floweryText
  }

  function getFloweryEntry(fileName) {
    const FLOWERY_DIR = './audio/'
    return `<tr>
      <th>${getFormattedFloweryTitle(fileName)}</th>
      <th><audio src="${FLOWERY_DIR}${fileName}" controls></audio></th>
      <th><a href="${FLOWERY_DIR}${fileName}">download</a></th>
    </tr>\n`
    
  }

  for(let i = 0; i < floweryFiles.length; i++) {
    html += getFloweryEntry(floweryFiles[i]);
  }

  html += '</table>'
  document.getElementById(doc).innerHTML = html;
}