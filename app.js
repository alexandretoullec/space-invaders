const container = document.querySelector('.grille');
const affichage = document.querySelector('h3');
let resultats = 0;
let toutesLesDivs;
let alienInvaders = [];
let tireurPos = 229;
let direction = 1;
let width = 20;

function creationGrilleAlien () {

    let indexAttr = 0;

    for(let i = 0 ; i < 240 ; i++){
        if(indexAttr === 0 ){
            const bloc = document.createElement('div')
            bloc.setAttribute('data-left', 'true');
            container.append(bloc);
            indexAttr++;
        }else if (indexAttr === 19){
            const bloc = document.createElement('div')
            bloc.setAttribute('data-right', 'true');
            container.append(bloc);
            indexAttr=0;
        }
        
        else {
            const bloc = document.createElement('div')
            
            container.append(bloc);
            indexAttr++;
           
        }
    }
    for(i=1 ; i<53;i++){
        if(i === 13){
            i = 21;
            alienInvaders.push(i);
        }else if (i=== 33) {
            i=41;
            alienInvaders.push(i);
        }else {
            alienInvaders.push(i);
        }
    }

    toutesLesDivs = document.querySelectorAll('.grille div');
    alienInvaders.forEach(invader => {
        toutesLesDivs[invader].classList.add('alien')
    })

    toutesLesDivs[tireurPos].classList.add('tireur')
}

creationGrilleAlien();

function deplacerTireur (e) {
    toutesLesDivs[tireurPos].classList.remove('tireur');

    if(e.keyCode === 37){
        if(tireurPos > 220){
            tireurPos -= 1;
        }
    }
    if(e.keyCode === 39){
        if(tireurPos < 239){
            tireurPos += 1;
        }
    }
    toutesLesDivs[tireurPos].classList.add('tireur')
}

document.addEventListener('keydown',deplacerTireur)

//bouger les aliens

let descendreRight = true;
let descendreLeft = true;

function bougerLesAliens(){
    

    for(let i = 0; i < alienInvaders.length; i++){

       if(toutesLesDivs[alienInvaders[i]].getAttribute('data-right') === 'true') {

        if(descendreRight){
            direction = 20;
            setTimeout(() => {
                descendreRight = false;
            }, 50);
        }
        else if (descendreRight === false){
             direction = -1;
        }
        descendreLeft = true;

       } else if(toutesLesDivs[alienInvaders[i]].getAttribute('data-left') === 'true'){

        if(descendreLeft){
            direction = 20;
            setTimeout(() => {
                descendreLeft = false;
            }, 50);
        }
        else if (descendreLeft === false){
             direction = 1;
        }
        descendreRight = true;


       }

    }



    for(let i = 0; i < alienInvaders.length; i++){
        toutesLesDivs[alienInvaders[i]].classList.remove('alien');
    }
    for(let i = 0; i < alienInvaders.length; i++){
        alienInvaders[i] += direction;
    }
    for(let i = 0; i < alienInvaders.length; i++){
        toutesLesDivs[alienInvaders[i]].classList.add('alien');
    }


  if(toutesLesDivs[tireurPos].classList.contains('alien', 'tireur')){
      affichage.textContent ="Game-over!!"
      toutesLesDivs[tireurPos].classList.add('boom');
      clearInterval(invaderId);
  }

  for (i=0 ; i< alienInvaders.length ; i++) {
      
      if(alienInvaders[i]> toutesLesDivs.length - width){
          affichage.textContent = "Gamer-over!!"
          clearInterval(invaderId);
      }
  }


}
invaderId = setInterval(bougerLesAliens, 100);


function tirer(e) {
    let laserId;
    let laserEnCours = tireurPos;
    
    function deplacementLaser(){

        toutesLesDivs[laserEnCours].classList.remove('laser');
        laserEnCours -= width;
        toutesLesDivs[laserEnCours].classList.add('laser');


        if(toutesLesDivs[laserEnCours].classList.contains('alien')){
            toutesLesDivs[laserEnCours].classList.remove('laser');
            toutesLesDivs[laserEnCours].classList.remove('alien');
            toutesLesDivs[laserEnCours].classList.add('boom');

            alienInvaders = alienInvaders.filter(el => el !== laserEnCours )

            setTimeout(()=>{
                toutesLesDivs[laserEnCours].classList.remove('boom');
            },250)
            clearInterval(laserId);

            resultats++;
            if(resultats === 36 ){
                affichage.textContent = "Bravo vous avez gagné!!!!";
                clearInterval(invaderId);
            }else{
                affichage.textContent = `Score : ${resultats}`
            }

        }

        if(laserEnCours < width){
            clearInterval(laserId);
            setTimeout(()=>{
                toutesLesDivs[laserEnCours].classList.remove('laser')
            },100)
        }

    }

    if(e.keyCode === 32){
        laserId = setInterval(()=>{
            deplacementLaser();
        },100)
    }
}

document.addEventListener('keyup',tirer);