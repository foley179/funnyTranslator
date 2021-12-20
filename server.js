import express from "express"
import axios from "axios"

const PORT = process.env.PORT || 3000
const app = express()

app.set("view engine", "ejs")
app.set("views", process.env.PWD + "/views")
app.use(express.static("views"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/", (req, res) => {
    const contents = {
        text: "Example: Hello, I am hungry!",
        translated: "Example: Bello, ka am con a banana!",
        translation: "Example: Minion"
    }
    res.render("index", {contents})
})

app.post("/translate", async (req, res) => {
    try {
        const component = encodeURIComponent(req.body.toTranslate)
        const url = `https://api.funtranslations.com/translate/${req.body.language}.json?text=${component}`
        const response = await axios.post(url)
        res.render("index", {contents: response.data.contents})
    } catch (error) {
        res.render("error", {message: "An error occured, please try again."})
        console.log(error.message)
    }
})

app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`)
})
