// tout d'abord, on commence par la fin HAHA!
//donc reset button (mais space bar) il fait excatement ça, il reset tout a l'aide de la function ResetGame --plus bas--
document.addEventListener('keydown', function (event) {
   if (event.code === 'Space') {
      resetGame();
   }
});

//---------------CONFIG INITIAL DU JEU
//lien entre cartes et images + variables pour la suive du jeu
const totalCards = 12;
const availableCards = ['A', 'K', 'Q', 'J', 'X','V'];
const cardImages = {
   'A': '1.jpg',
   'K': '2.jpg',
   'Q': '3.jpg',
   'J': '4.jpg',
   'X': '5.jpg',
   'V': '6.jpg',
};
let cards = [];
let selectedCards = [];
let valuesUsed = [];
let currentMove = 0;
let currentAttempts = 0;

//cardTemplate pour creer dynamiquement les cartes en JS
let cardTemplate = '<div class="card"><div class="back"></div><div class="face"><img src="" alt="Card"></div></div>';


//------------------on commence a s'amuser ici avec les bons Fonctions, ah oui!

//Function déclenchée qd on clique sur une carte. Gére les sélections de cartes, verifie les "match" et verifie si le joueur a gagné
function activate(e) {
   if (currentMove < 2) {
      
      if ((!selectedCards[0] || selectedCards[0] !== e.target) && !e.target.classList.contains('active')) {
         e.target.classList.add('active');
         selectedCards.push(e.target);

         if (++currentMove == 2) {

            currentAttempts++;
            document.querySelector('#stats').innerHTML = 'Nombre de coups : ' + currentAttempts;

            if (selectedCards[0].querySelectorAll('.face img')[0].alt == selectedCards[1].querySelectorAll('.face img')[0].alt) {
               selectedCards = [];
               currentMove = 0;
               checkWin();
            }
            else {
               setTimeout(() => {
                  selectedCards[0].classList.remove('active');
                  selectedCards[1].classList.remove('active');
                  selectedCards = [];
                  currentMove = 0;
               }, 600);
            }
         }
      }
   }
}

//function randomvalue pour generer les valeurs des cartes, sans repetition
function randomValue() {
   let rnd = Math.floor(Math.random() * totalCards * 0.5);
   let values = valuesUsed.filter(value => value === rnd);
   if (values.length < 2) {
      valuesUsed.push(rnd);
   }
   else {
      randomValue();
   }
}

//function pour convertir la valeur d'une carte en sa représentation visuelle, à l'aide du tableau "availableCards" et sa respective image
function getFaceValue(value) {
   let rtn = value;
   if (value < availableCards.length) {
      rtn = availableCards[value];
   }
   return rtn;
}

//captain obvious, checker si t'as gagné
function checkWin() {
   const matchedPairs = document.querySelectorAll('.card.active').length / 2;
   if (matchedPairs === totalCards / 2) {
      alert('YES! YOU WON!');
   }
}

//ah...le gentil boucle "for"

for (let i = 0; i < totalCards; i++) {  //iteration sur le nombre de cartes pour les creer
   let div = document.createElement('div'); //creation de l'element div a "injecter" dans le html
   div.innerHTML = cardTemplate; //ajouter le contenu de la carte dans le div
   cards.push(div); //ajouter le div creé dans le array "cards"
   document.querySelector('#game').append(cards[i]); //et bim! magie!!! on "inject" la carte dans le tableau
   randomValue();
   let cardValue = getFaceValue(valuesUsed[i]); //obtenir la representation visuel de la carte
   cards[i].querySelectorAll('.face img')[0].src = cardImages[cardValue]; //configurer l'image de la carte
   cards[i].querySelectorAll('.face img')[0].alt = cardValue;
   cards[i].querySelectorAll('.card')[0].addEventListener('click', activate); //activer la carte avec un click
}

//function pour reset le jeu, appelée tout en haut!
function resetGame() {
   // fermer les cards
   document.querySelectorAll('.card').forEach(card => {
      card.classList.remove('active');
   });
   // reset variables et tableau
   selectedCards = [];
   valuesUsed = [];
   currentMove = 0;
   currentAttempts = 0;
   document.querySelector('#stats').innerHTML = '0 coups';

   // reset cards
   document.querySelector('#game').innerHTML = '';

   // recharger les cards et ajouter les eventlisteners
   for (let i = 0; i < totalCards; i++) {
      let div = document.createElement('div');
      div.innerHTML = cardTemplate;
      cards.push(div);
      document.querySelector('#game').append(cards[i]);
      randomValue();
      let cardValue = getFaceValue(valuesUsed[i]);
      cards[i].querySelectorAll('.face img')[0].src = cardImages[cardValue];
      cards[i].querySelectorAll('.face img')[0].alt = cardValue;
      cards[i].querySelectorAll('.card')[0].addEventListener('click', activate);
   }
}