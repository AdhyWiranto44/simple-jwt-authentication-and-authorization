const express = require('express')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
var cookieParser = require('cookie-parser')
const PORT = 4000
const SECRET = "asdbasbodbaoisdoiu3209ue0239jud0p9jw02de9u0239je09j32"

const app = express()

app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
app.set("view engine", "ejs")

app.get("/", (req, res) => {
  const token = req.cookies["X-ADHY-TOKEN"]
  
  if (!token) return res.redirect("/login")

  try {
    jwt.verify(token, SECRET)
    res.render("index")
  } catch (err) {
    res.redirect("/logout")
  }
})

app.get("/login", (req, res) => {
  if (!req.cookies["X-ADHY-TOKEN"]) {
    res.render("login")
  } else {
    res.redirect("/")
  }
})

app.get("/logout", (req, res) => {
  res.clearCookie("X-ADHY-TOKEN")
  res.redirect("/login")
})

app.post("/login", (req, res) => {
  const username = req.body.username
  const password = req.body.password

  if (username === "admin" && password === "admin") {
    const payload = {
      "uid": crypto.randomBytes(16).toString('hex'),
      "username": username,
    }
    const encoded = jwt.sign(payload, SECRET)
    res.cookie(
      "X-ADHY-TOKEN", 
      encoded, 
      {
        expires: new Date(Date.now() + 30000),
        httpOnly: true
      })
    res.redirect("/")
  } else {
    res.redirect("/login")
  }
})

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})