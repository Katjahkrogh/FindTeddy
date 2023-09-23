//når siden er loaded, så viser jeg funktionen sidenVises
window.addEventListener("load", sidenVises);

//Liv og point
let liv;
let point;

//Random position defineret
let rndNumber;

//Funktionen der skjuler alle skærme
hideAllScreens();

function sidenVises() {
  console.log("sidenVises");

  //skjul andre skærme
  hideAllScreens();

  //vis startskærm
  document.querySelector("#start").classList.remove("skjul");

  //start_knap pulsere
  document.querySelector("#start_knap").classList.add("pulse");

  //når der klikkes på startknap, så går vi til funktionen showInfo
  document.querySelector("#start_knap").addEventListener("click", showInfo);
}

function showInfo() {
  console.log("showInfo");

  //skjul andre skærme
  hideAllScreens;

  //vis infoskærm
  document.querySelector("#info").classList.remove("skjul");

  //kryds pulsere
  document.querySelector("#kryds").classList.add("pulse");

  //når der klikkes på infoskærm, så går vi til funktionen startSpillet
  document.querySelector("#kryds").addEventListener("click", startSpillet);
}

function startSpillet() {
  console.log("startSpillet");
  printPoints();

  //skjul andre skærme
  hideAllScreens();

  //nulstil point og liv
  point = 0;
  liv = 3;

  //skriv point og liv ud
  document.querySelector("#score_board").textContent = point;
  document.querySelector("#life_board").textContent = liv;

  //Start timer -animation
  document.querySelector("#maelk").classList.add("flasketimer");
  document
    .querySelector("#maelk")
    .addEventListener("animationend", stopSpillet);

  //Random position og delay
  document.querySelector("#teddy_container").classList.add("pos_1");
  document.querySelector("#koedben_container").classList.add("pos_5");

  //Start bouncing animation på elementer
  document.querySelector("#teddy").classList.add("bounce_1");
  document
    .querySelector("#teddy_container")
    .addEventListener("click", clickTeddy);
  document
    .querySelector("#teddy_container")
    .addEventListener("animationend", teddyReset);

  document.querySelector("#koedben").classList.add("bounce_2");
  document
    .querySelector("#koedben_container")
    .addEventListener("click", clickKoedben);
  document
    .querySelector("#koedben_container")
    .addEventListener("animationend", koedbenReset);
}

function clickTeddy() {
  console.log("clickTeddy");

  //start teddyForsvind-animation
  document.querySelector("#teddy").classList.remove("bounce_1");
  document.querySelector("#teddy").classList.add("forsvinder");
  document
    .querySelector("#teddy_container")
    .addEventListener("animationend", teddyReset);

  //få et point
  //skriv point ud ved siden af Teddy
  addPoint();
  printPoints();
}

// Funktion der tilføjer et point
function addPoint() {
  point = point + 1;
  if (point > 9) {
    stopSpillet();
  }
}

function printPoints() {
  document.querySelector("#score_board").textContent = point;
}

function teddyReset() {
  console.log("teddyReset");
  //vis element igen
  document.querySelector("#teddy").classList = "";
  document.querySelector("#teddy_container").classList = "";
  document.querySelector("#teddy").offsetHeight;

  //Ny random position
  rndNumber = Math.floor(Math.random() * 5) + 1;
  document.querySelector("#teddy_container").classList.add("pos_" + rndNumber);

  //Genstart bouncing -animation
  document.querySelector("#teddy").classList.add("bounce_22");
  document
    .querySelector("#teddy_container")
    .addEventListener("click", clickTeddy);
}

function clickKoedben() {
  console.log("clickKoedben");

  //afspil lyd bad

  //start koedbenForsvind-animation
  document.querySelector("#koedben").classList.remove("bounce_2");
  document.querySelector("#koedben").classList.add("forsvinder");
  document
    .querySelector("#koedben_container")
    .addEventListener("animationend", koedbenReset);

  //mist et liv
  //vis antal liv
  liv = liv - 1;
  console.log(liv);
  document.querySelector("#life_board").textContent = liv;
  if (liv === 0) {
    stopSpillet();
  }
}

function koedbenReset() {
  console.log("koedbenReset");

  //vis element igen
  document.querySelector("#koedben").classList = "";
  document.querySelector("#koedben_container").classList = "";
  document.querySelector("#koedben").offsetHeight;

  //Ny random position
  rndNumber = Math.floor(Math.random() * 5) + 1;
  document
    .querySelector("#koedben_container")
    .classList.add("pos_" + rndNumber);

  //Genstart bouncing -animation
  document.querySelector("#koedben").classList.add("bounce_22");
  document
    .querySelector("#koedben_container")
    .addEventListener("click", clickKoedben);
}

function stopSpillet() {
  console.log("stopSpillet");
  // Vundet eller tabt
  if (liv === 0) {
    gameOver();
  } else {
    levelComplete();
  }

  if (point > 9) {
    levelComplete();
  } else {
    gameOver();
  }

  // Fjern alle animationer
  // Fjern alle eventlistener
  document.querySelector("#koedben").classList = "";
  document.querySelector("#koedben_container").classList = "";

  document.querySelector("#teddy").classList = "";
  document.querySelector("#teddy_container").classList = "";

  document.querySelector("#maelk").classList = "";
  document.querySelector("#time_container").classList = "";
}

function gameOver() {
  console.log("gameOver");

  // Vis game-over skærm
  hideAllScreens();
  document.querySelector("#game_over").classList.remove("skjul");

  //Få knapperne til at pulsere
  document.querySelector("#spil_igen").classList.add("pulse");
  document.querySelector("#afslut_spil").classList.add("pulse");

  //Når man klikker på spil_igen, så bliver man ført til startSpillet
  document.querySelector("#spil_igen").addEventListener("click", startSpillet);

  //Når man klikker på afslut_spil, så bliver man ført tilbage til forsiden
  document.querySelector("#afslut_spil").addEventListener("click", sidenVises);
}

function levelComplete() {
  console.log("levelComplete");

  // Vis level-complete skærm
  hideAllScreens();
  document.querySelector("#level_complete").classList.remove("skjul");
}

function hideAllScreens() {
  // Tilføjer animationen skjul til alle skærmene
  document.querySelector("#game_over").classList.add("skjul");
  document.querySelector("#level_complete").classList.add("skjul");
  document.querySelector("#start").classList.add("skjul");
  document.querySelector("#info").classList.add("skjul");
}

// function windowResize(){
//     console.log("windowResize");

//     let widthScreen = document.querySelector("#game_background").clientWidth;

//     let myFontInProcent = 2.6;
// }
