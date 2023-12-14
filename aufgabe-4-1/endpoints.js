const express = require("express")
const fs = require("fs")
const app = express()


//Aktuelle Zeit

app.get("/now", (req,res) => {
    const date = new Date()
    date.setHours(date.getHours() + 1);
    const chDate = date.toLocaleString()
    res.send(`Die aktuelle Zeit ist ${chDate}`)
})
app.get("/zli", (req, res) => {
    res.redirect("https://www.zli.ch/")
})

// Zufällige Namen
const names = ["Mia", "Liam","Sophia","Noah","Olivia","Ethan","Ava","Jackson","Emma","Aiden",
"Isabella","Lucas","Harper","Mason","Abigail","Oliver","Chloe" ,"Caleb ","Amelia","Benjamin"]
app.get("/name", (req, res) => {
    const random = names[Math.floor(Math.random() * names.length)];
    res.send(`Willkommen auf dieser Webseite ${random}`)
})
app.use(express.urlencoded({extended: true}))

app.post("/names", (req, res) => {
    console.log(req.body.name);
    names.push(req.body.name);
    console.log(names);
    res.send(JSON.stringify(names));
});


// Static.html öffnen
app.get("/html", (req, res) => {
    res.sendFile(__dirname + "/static.html")
})

// Zli.png öffnen
app.get("/image", (req, res) => {
    res.sendFile(__dirname + "/zli.png")
})

// Status 418 anzeigen (I'm a Teapot)
app.get("/teapot", (req, res) => {
    res.sendStatus(418)
})

// User-agent aus request auslesen und ausgeben
app.get("/user-agent", (req,res) => {
    const user = req.headers["user-agent"]
    res.send(user)
})

// Status 403 anzeigen (Forbidden)
app.get("/secret", (req, res) => {
    res.sendStatus(403)
})

app.get("/secret2", (req, res) => {
    const authorization = req.headers["authorization"];
    if(authorization === "Basic aGFja2VyOjEyMzQ="){
        res.sendStatus(200)
    } else{
        res.sendStatus(401)
    }
})

// example.xml öffnen
app.get("/xml", (req, res) => {
    res.sendFile(__dirname + "/example.xml")
})

// JSON-Objekt zurückgeben
const me = [{
    firstname: "Jonas",
    name: "Svay",
    age: 16,
    domicile: "Volketswil",
    color: "brown"
}]
app.get("/me", (req, res) => {
    res.send(me)
})


app.listen(3400)