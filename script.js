const robot = document.getElementById('robot');
const terrain = document.getElementById('terrain');
const boutonHaut = document.getElementById('haut');
const boutonGauche = document.getElementById('gauche');
const boutonDroite = document.getElementById('droite');
const boutonBas = document.getElementById('bas');
const boutonVitesse = document.getElementById('vitesse');
const compteur = document.getElementById('compteur');

const transitionInitiale = robot.style.transition;

boutonHaut.addEventListener('click', haut);
boutonGauche.addEventListener('click', gauche);
boutonDroite.addEventListener('click', droite);
boutonBas.addEventListener('click', bas);
boutonVitesse.addEventListener('input', changeVitesse);
document.addEventListener('keydown', appuiTouche);
window.addEventListener('resize', resizeRobot)

let mtop = 0;
let mleft = 0;
changeVitesse();

function dimensionsMax() {
    let styleTerrain = window.getComputedStyle(terrain);
    let largeurTerrain = parseInt(styleTerrain.width, 10);
    let hauteurTerrain = parseInt(styleTerrain.height, 10);
    return {
        largeur: largeurTerrain - 50,
        hauteur : hauteurTerrain - 50
    };
}

function resizeRobot() {
    robot.style.transition = 'none';
    deplaceRobot(false);
}

function deplaceRobot(alerte) {
    const coordMax = dimensionsMax();
    let limiteAtteinte = false;

    if (mtop > coordMax['hauteur']) {
        mtop = coordMax['hauteur'];
        limiteAtteinte = true;
    }
    else if (mtop < 0) {
        mtop = 0;
        limiteAtteinte = true;
    }
    if (mleft > coordMax['largeur']) {
        mleft = coordMax['largeur'];
        limiteAtteinte = true;
    }
    else if (mleft < 0) {
        mleft = 0;
        limiteAtteinte = true;
    }

    if (alerte && limiteAtteinte) {
        debutAlerteLimite();
    }

    robot.style.left = mleft + 'px';
    robot.style.top = mtop + 'px';
}

function finAlerteLimite() {
    robot.classList.remove('alerte-limite');
}

function debutAlerteLimite() {
    robot.classList.add('alerte-limite');
    setTimeout(finAlerteLimite, 300);
}

function changeVitesse() {
    vitesse = parseInt(boutonVitesse.value);
    compteur.textContent = vitesse;
}

function bas() {
    robot.style.transition = transitionInitiale;
    mtop += vitesse;
    deplaceRobot(true);
}

function haut() {
    robot.style.transition = transitionInitiale;
    mtop -= vitesse;
    deplaceRobot(true);
}

function gauche() {
    robot.style.transition = transitionInitiale;
    mleft -= vitesse;
    deplaceRobot(true);
}

function droite() {
    robot.style.transition = transitionInitiale;
    mleft += vitesse;
    deplaceRobot(true);
}

function appuiTouche(evt) {
    let touche = evt.code;
    if (touche == 'ArrowUp') {
        haut();
    }
    else if (touche == 'ArrowDown') {
        bas();
    }
    else if (touche == 'ArrowLeft') {
        gauche();
    }
    else if (touche == 'ArrowRight') {
        droite();
    }
    else if ( (touche == 'NumpadAdd') || (touche == 'Equal') ) {
        boutonVitesse.value = vitesse + 1;
        changeVitesse();
    }
    else if ( (touche == 'NumpadSubtract') || (touche == 'Digit6') ) {
        boutonVitesse.value = vitesse - 1;
        changeVitesse();
    }
}