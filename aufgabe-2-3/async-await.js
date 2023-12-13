function simuliereVerzoegerung(ms) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}
async function addiereNachVerzoegerung(a, b, ms){
    console.log("Start")
    await simuliereVerzoegerung(ms)
    console.log("Ende")
    return console.log("Das Ergebnis ist:  " + (a + b));
}
addiereNachVerzoegerung(5, 5, 2000)

/* 

const rechne = await addiereNachVerzoegerung(5, 5, 2000)
console.log(rechne)

NUR MIT .mjs
*/


