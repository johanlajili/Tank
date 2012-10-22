CONFIG = {};
CONFIG.rImagesPath = "images/";
CONFIG.defaultTheme = "theme1";
CONFIG.resizeMode = "css ratio";
CONFIG.canvasName = "main_canvas";
CONFIG.canvasWidth = 800;
CONFIG.canvasHeight = 600;
CONFIG.resizeTimer = 100;
CONFIG.lastResize = 0;
CONFIG.widthRatio = 1;
CONFIG.heightRatio = 1;
CONFIG.debug = true;
CONFIG.wallBit = 0x0001;
CONFIG.tankBit = 0x0002;
CONFIG.bombBit = 0x0004;
CONFIG.ip = "83.157.41.20";
CONFIG.port = "1337";

CONFIG.spawns = [];
for (var i = 1; i < 15; i++){
	for (var j = 1; j < 15; j++){
		CONFIG.spawns.push({x : i * 100, y : j * 100});
	}
}

CONFIG.randomPseudos = [
	
	"Awesoman",
	"LookAtMyPseudo",
	"D4rk1ll3r",
	"SisiLaFamille",
	"QuiVeutÊtreMonAmi?",
	"ThatGameIsAwesome",
	"Pseudo",
	"Anonymousse",
	"RandomPseudo",
	"JaiPasDidee",
	"Kevin",
	"Robert",
	"Pedobear",
	"Noob",
	"IamGay",
	"Vanessa",
	"Dieu",
	"WaitForIt...",
	"LegenDaddy",
	"<Maitre du jeu>",
	"God",
	"Spiderman",
	"Superman",
	"Link",
	"Mario",
	"Bowser",
	"Peach",
	"Zelda",
	"Yoshi",
	"<(^_^<) (>^_^)>"
];

CONFIG.randomTaunt = [
	", quel mauvais.",
	", il avait qu'à pas naitre",
	", de toute façon personne l'aimait",
	", et c'est tant mieux",
	", OWNED.",
	", noob.",
	", et personne ne le pleurera",
	", il s'envole vers d'autres cieux",
	", achetez sa biographie",
	", de toute façon il était moche",
	", mais bon, on s'en fout",
	". Deux fois.",
	". Ou pas.",
	". Pour de vrai.",
	", il parait...",
	", revendez ses organes §"

];