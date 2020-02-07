class Helper {
  static 	setCharsAt(str,index,chr) {      
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+chr.length);
  }
}

class Invader {
  constructor(appearance, knock, explodeTime, id) { /* constructor initialisiert Objekte */
    this.appearance = appearance; /* Aussehen der Invader */
    this.id = id; 
    this.knock = knock; /* Zustand der Invader */
    this.explodeTime = explodeTime; /* Explosionszeit */
}

  shootBullet() {
    console.log("Invader " +this.id+" bullet shot")
  }

  explode() {
    
    this.appearance =
     ["     _______      ",
      "   (  -_    _).   ",
      " ( ~       )   )  ",
      "( )  (    )  ()  )",   /* Aussehen der Explosion nachdem der Invader getroffen wird. ASCII ART Regeln beachten! */
      "(.   )) (       ) ",
      "   ``..     ..``  ",
      "       | |        ",
      "     (=| |=)      ",
      "       | |        ",
      "   (../( )\.))   "];
  }
}

class InvaderRow {
  constructor(posX, posY, width, height, invaders, id) { /* weitere Eigenschaften der InvaderRow */
    this.id = id;
    this.posX = posX; /* X-Position */
    this.posY = posY; /* Y-Position */
    this.width = width; /* Breite der Row */
    this.height = height; /* Höhe der Row */
    this.invaders = invaders; 
  }

  step(direction) {
    if (direction == 1) {  /* InvaderRow verläuft in die angegebene Richtung automatisch */
      this.posX += 1; /* Position */
    }
    if (direction == -1) { /* andere Richtung. Wechselt automatisch */
      this.posX -=1; /* eine Reihe nach unten bei Richtungswechsel */
    }
    if (direction == "down") {
      this.posY += 1;
    }
  }

  static generateInvader(width, height) { /* allgemeines Generieren der Invader */
    let currentInvader = [];
    for (let y = 0; y < height; y++) {
      currentInvader[y] = " ".repeat(width*2+1);
      for (let x = 0; x < width; x++) {
        let randomNumber = Math.random();
        if (randomNumber >= 0.5) {
          currentInvader[y] = (Helper.setCharsAt(currentInvader[y], x,'▓'));
          currentInvader[y] = (Helper.setCharsAt(currentInvader[y], 2 * width - x,'▓'));
        }
      }
    }
    return currentInvader;
  }
  
  static generateInvaderRow(invaderWidth, invaderHeight) {
    let currentInvaders = [];
    let rowWidth = Math.floor(cols*0.5); /* Allgemeine Breite der Invaders auf dem Screen */
    let wholeInvader = invaderWidth * 2; /* Größe des Invaders * 2 da Objekt gespiegelt dargestellt wird */
    let spacerWidth = invaderWidth/3; /* Abstand zwischen Invaders */ 
    let numInvaders = Math.floor((rowWidth / ((wholeInvader+spacerWidth))));
    let invaderAppearance = InvaderRow.generateInvader(invaderWidth, invaderHeight); /* Berechnung Summe der Invader */
    //let numInvaders = Math.floor(spacing);
			for(let i = 0; i < numInvaders ; i++) { // gerundet(x = ((breite - breite*0,2) / invaderbreite) + (x - 1) * invaderbreite/2 ))
        let newInv = new Invader(invaderAppearance, false, 0, i);
        currentInvaders.push(newInv);
			}
		return currentInvaders;
  }
}