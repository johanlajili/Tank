var soundManager = new NLSounds("sons/");
soundManager.channels = 7;
var musicList = [
["funky", "Funky"]
];

var soundsList = [
["shoot", "shoot"]
];
soundManager.pushSounds(musicList, "music");
soundManager.pushSounds(soundsList, "shoot");