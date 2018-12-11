var path = require('path')
var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var signaling = require('./signaling')

app.use(bodyParser.urlencoded({
	extended: true
}))
app.use(bodyParser.json())
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "/views"))

app.get("/", (req, res) => {
	res.render('login')
})

app.use("/chat", ({ body: { id, password } }, res, next) => {
	if (auth(id, password)) {
		next()
		return
	}
	res.status("403")
	res.send("Forbidden")
})
app.post('/chat', (req, res) => {
	const port = signaling()
	res.render('chat', { port })
})

app.listen(3000, () => {
	console.log("-- server listening on 3000 --")
});

function auth (id, password) {
	const users = [
		{
			id: "tarou",
			password: "maru"
		},
		{
			id: "jirou",
			password: "maru"
		},
		{
			id: "gorou",
			password: "maru"
		}
	]
	return users.some(u => {
		return u.id === id && u.password === password
	})
}