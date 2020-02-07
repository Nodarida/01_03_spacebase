# 01_03_spacebase
Space Invaders Beta

# Space Invaders, IoT 1
# Marius Schairer, Noah Mantel

Unser erstes Projekt im Fach Programmiersprachen (Dozent: Florian Geiselhart) war ein Space-Invaders-Game zu programmieren. 

Ziel der Aufgabe war es:

1. fortlaufende sowie sichtbare Space Invaders welche sich auf dem Screen bewegen einfügen
2. Spaceship soll einzelne Invaders treffen können
3. Invaders wenn getroffen, explodieren und verschwinden lassen

Wir haben dem gesamten Game noch eigene persönliche Ziele hinzugefügt:

1. Musik und andere Soundeffects
2. Stylesheet erstellen
3. funktionales Scoreboard




# Usage

Um unsere Version des Space Invaders benutzen zu können, benötigt man zunächst einen der drei aufgelisteten Internet-Browser:

- Safari
- Mozilla Firefox
- Google Chrome

Anschließend downloadet man einfach unsere ZIP-Datei aus der GitHub Repo. Natürlich mit allen Soundfiles! In der ZIP-Datei befindet sich eine Index.html Datei welche man nun über den Browser öffnen kann. Wurde jeder der bisher gennanten Schritte beachtet so gelangt man nun auf unser entwickeltes Spiel.

Der User hat anschließend die Möglichkeit folgende Bedienelemente zu nutzen:

- Space (Keycode 32) = Spaceship schießt 
- Pfeil rechts (Keycode 39) = Spaceship bewegt sich nach rechts
- Pfeil links (Keycode 37) = Spaceship bewegt sich nach links

# Structure

Soundeffekte + Musik: 

Um unserem Spiel etwas mehr Ambiente zu liefern entschieden wir uns dafür eine geeignete Musik sowie deren Sound Effekte hinzuzufügen. 

Unsere gewählte Musik: https://www.youtube.com/watch?v=F2lGJMrUUHw&t=6s
(Soundeffektlink ist leider verloren gegangen)



Um die Musik in unserem Game miteinbauen zu können downloadeten wir zunächst die MP3 Version auf YouTube. Da die verwendeten Browser das Dateiformat MP3 unterstützt müssen wir es also nicht mehr konvertieren. Zunächst fügten wir die Musik in Form einer "id" in unseren Code ein. Die Quelle (src) war dabei der Dateiname von unserer Musik. Wichtig ist, dass alle verwendete Audiospuren im selben Ordner sind wie der eigentliche Code des Spiels.

<audio id="audioplayer" src="PlayerONE.mp3" autoplay></audio> <!-- fügt das Hintergrundlied zu -->
	<audio id="audioeffects" src="shoot.mp3"></audio> <!-- fügt den Audioeffekt hinzu -->

Um die Lautstärke und das Eintreten der Musik regulieren zu können schrieben wir eine Funktion zum Abspielen der Musik (function play() (Zeile 54)). Diese Funktion ermöglichte es uns die Lautstärke individuell einzustellen und den Startpunkt der Musik zu wählen.Dasselbe gilt natürlich für den Soundeffekt. Diesen Soundeffect hinterlegten wir der Taste "Space" (KeyCode = 32). Beim Schießen wird also automatisch ein "Shoot"-Sound abgespielt. 

	function playMusic() { /* Funktion zum Apspielen der Musik */

			audioplayer = document.getElementById("audioplayer");
			audiplayer.volume = 0.5; /* Lautstärke Musik */
			audioplayer.play();

		}

		function playEffect() { /* Funktion zum Abspielen der Soundeffekte */
			audioplayer = document.getElementById("audioeffects");
			audioplayer.volume = 0.5;
			audioplayer.play();

		}


Spielerinteraktionen:

Mit dem .addEventListener lassen sich verschiedene Spieler Interaktionen im Spiel bearbeiten und erstellen. 

//Spieler-Interaktionen verschicken
				document.addEventListener('keydown', (event) => {
					const keyCode = event.keyCode;

					if (keyCode === 37) {
						//Linke Pfeiltaste - Spaceship nach links bewegen
						spaceshipPos = Math.max(0, spaceshipPos - 1);
					} else if (keyCode === 39) {
						//Rechte Pfeiltaste - Spaceship nach rechts bewegen
						spaceshipPos = Math.min(cols - 7, spaceshipPos + 1);
					} else if (keyCode === 32) {
						//Leertase - Feuer!
						firebullet(); /* bei gedrückter Leertaste Soundeffekt erscheint */
						playEffect();
						playMusic();
					}
				}, false);

Mit Hilfe der Scrip Source importieren wir unsere erstellen Klassen über die Eigenschaften der Invader in das Spiel

<script src="classes.js"></script>

Im Script werden die Werte unserer Objekte definiert

let startPosX = 1; /* x-Position der Invaders */
		let startPosY = 1; /* y-Position der Invaders */
		let invaders = [];
		let renderStr = ""; /* String der Charaktere wird auf dem Screen dargestellt */
		let rows = 50; /* Höhe des Screens */
		let cols = 140; /* Breite des Screens */
		let cnt = 0;
		let spaceshipPos = Math.round(cols / 2); /* Positioniert das Spaceship */
		let currentBullets = []; /* sichtbare Munition */
		let objects = []; 
		let run = 0; /* Variable zum Rendern */
		let invaderDirection = 1;
		let invaderRow = [];
		let rowId = 0; /* Array sichert Invaders */
		let kills = 0; /* Kills beginnen bei 0 */
		const gameSpeed = 10; /* Schnelligkeit des Games */
		const invaderWidth = 5; /* Breite des Invaders */
		const invaderHeight = 10; /* Höhe des Invaders */


- function newGame(): startet ein neues Game und lässt die Invader spawnen.


- function renderBackground: generiert den Hintergrund des Spiels. Lässt dabei in Abständen Sterne über den Screen laufen.

Um das Aussehen des Spaceships definieren zu können erstellten wir eine Variable. Die ASCII Zeichen sollten nach Regeln importiert werden sonst funktionieren sie nicht.

function renderSpaceship(posX, posY)
let spaceship = ["◄▀▀████▀▀►"]

- function renderBullets(): mit dieser Funktion schaffen wir es unter anderem die Kugeln, welche am oberen Rand des Screens angekommen sind zu entfernen. Hierbei benötigten wir ein wenig Hile. Ziel der abgebildeten Funktionen war es hauptsächlich die Bewegung der Bullets sowie die Detection der Treffer herauszufinden. 

function renderBullets() {
					//Kugeln entfernen die am oberen Rand angekommen sind ohne Treffer
					currentBullets = currentBullets.filter(bullet => bullet.y > 1);
					//Kugeln einen Schritt weiter bewegen, dann rendern
					currentBullets.forEach((bullet) => {
						bullet.y -= 1;
						if (renderStr[xyToStringPos(bullet.x, bullet.y - 1)] == '▓') {
							let currentId = 0;
							for (let invaderPos = invaders[rowId].posX; invaderPos <= invaders[rowId].posX + 5 * (invaderWidth * 2 + /* wird geprüft ob Invader getroffen wurde */
									invaderWidth / 2); invaderPos = invaderPos + invaderWidth * 2 + invaderWidth / 2) {
								if (bullet.x > invaderPos && bullet.x < invaderPos + invaderWidth * 2 + invaderWidth) {
									invaders[rowId].invaders[currentId].knock = true; /* ermittelt ob getroffen wurde */
									invaders[rowId].invaders[currentId].explode();
									kills++;
									break;

                  
 um anschließend die getroffenen Invader löschen zu können. Dies gilt natürlich auch für die Objekte der getroffenen Invader. Zu guter Letzt bestimmten wir das Symbol der einzelnen Bullets. 

 		currentBullets = currentBullets.filter(currentBullet => currentBullet != bullet); /* Invader getroffen? - anschließend gelöscht */
						}
						if (renderStr[xyToStringPos(bullet.x, bullet.y - 1)] == '=') {
							currentBullets = currentBullets.filter(currentBullet => currentBullet != bullet); /* Bullets werden gelöscht wenn Objekt getroffen wird */
						}
						renderStr = Helper.setCharsAt(renderStr, xyToStringPos(bullet.x, bullet.y), "💣"); /* Bullet Zeichen bestimmen*/
					})
				}                

# Stylesheet

Um dem Spiel ein schönes Design zu geben erstellten wir ein Stylesheet. CSS Stylesheets werden in HTML verwendet um das Layout der Seite zu gestalten.

- pre: wird eingesetzt sobald die Formatierung von Texten benötigt wird. Hier wurde die Größe des Game-Screens definiert. 
Die Fläche bekam zusätzlich einen Rand von 5px.

pre {
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform:
 translate(-50%, -50%); 
			transform: translate(-50%, -50%);
			border: 5px solid rgb(57, 255, 14);
}

Mit "body" wurde die Farbe, Hintergrundfarbe und die Schriftart im Screen definiert.

body {
  color: yellowgreen; 
  background-color: black; 
  font-family: 'press start 2P'; 
  }

  Mit der class ".title" erstellten wir die Eigenschaften der Überschrift. Diese class wurde in der HTML Datei importiert. In dieser Klasse wurde die Schriftart, Textfarbe, Textgröße sowie Textposition bestimmt. 

.title {
    font-family: 'Press Start 2P'; 
    color:purple; 
    font-size: 30px; 
    text-align: center; 
  }

Mit einer weiteren class gestalteten wir auch das Scoreboard. Dasselbe Prinzip nur zusätzlich die Positionsangaben mit vh.

  .scoreboard {
    font-family: 'Press Start 2P', cursive;
    color: purple;
    font-size: 20px;
    position: absolute; /* Textposition */
    top: 10vh; /* Position von oben */
  }



# ToDo's

Natürlich werden wir unsere Space Invader Version versuchen zu überarbeiten.

Hier eine kleine Liste von Dingen die wir noch gerne im Game hätten:

* Start/Pause/Reset-Funktion
* Mehr Soundeffects
* Zurückschießende Invader
* ausführlicheres Scoreboard 
* (Welcome Screen)

# Fazit

Als Fazit hat uns dieses Projekt sehr Spaß gemacht. Wir lernten viele Grundlagen von JS und konnten mit dem Projekt des Space Invader - Game verschiedene Anwendungsmöglichkeiten in Javascript üben und ausprobieren. Auch wenn es nicht immer einfach war die verschiedenen Anwendunsvorgänge auf den ersten Anhieb zu verstehen (oder eine Klammer zu vergessen). Letztlich denken wir aber dass es für beide von uns eine gute Übung war und wir einiges mitnehmen konnten.
Danke natürlich an unseren Dozenten Florian Geiselhart der uns bei dem Coding-Prozess geholfen hat.



