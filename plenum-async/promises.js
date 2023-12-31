function greifeAufDatenbankZu(query) {
    return new Promise((resolve, reject) => {
      // Datenbankzugriff simulieren
      setTimeout(() => {
        const ergebnis = 'Datenbankergebnis: ' + query;
        resolve(ergebnis);
      }, 1000);
    });
  }
  
  greifeAufDatenbankZu('SELECT * FROM users')
    .then(ergebnis => {
      console.log(ergebnis);
    })
    .catch(err => {
      console.error('Fehler beim Datenbankzugriff:', err);
    })
    .finally(() => {
        console.log("Finally : ")
    })