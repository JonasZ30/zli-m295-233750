const fs = require("fs");

function leseDateiInhalt(filepath) {
    return fs.readFile(filepath, "utf-8");
}

leseDateiInhalt('beispiel.txt')
    .then(inhalt => {
        console.log('Die Länge des Dateiinhalts beträgt:', inhalt.length);
    })
    .catch(err => {
        console.error('Fehler beim Lesen der Datei:', err);
    });
