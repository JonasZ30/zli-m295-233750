const express = require("express")
const fs = require("fs")
const app = express()



app.get("/now", (req,res) => {
    const date = new Date()
    date.setHours(date.getHours() + 1);
    const chDate = date.toLocaleString()
    res.send(`Die aktuelle Zeit ist ${chDate}`)
})
app.get("/zli", (req, res) => {
    res.redirect("https://www.zli.ch/")
})

const names = ["Mia", "Liam","Sophia","Noah","Olivia","Ethan","Ava","Jackson","Emma","Aiden",
"Isabella","Lucas","Harper","Mason","Abigail","Oliver","Chloe" ,"Caleb ","Amelia","Benjamin"]
app.get("/name", (req, res) => {
    const random = names[Math.floor(Math.random() * names.length)];
    res.send(`Willkommen auf dieser Webseite ${random}`)
})
app.get("/html", (req, res) => {
    res.sendFile(__dirname + "/static.html")
})
app.get("/image", (req, res) => {
    res.sendFile(__dirname + "/zli.png")
})
app.get("/teapot", (req, res) => {
    res.sendStatus(418)
})
app.get("/user-agent", (req,res) => {
    const user = req.headers["user-agent"]
    res.send(user)
})
app.get("/secret", (req, res) => {
    res.sendStatus(403)
})
app.get("/xml", (req, res) => {
    res.sendFile(__dirname + "/example.xml")
})

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