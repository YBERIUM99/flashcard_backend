import express from "express"
import dotenv from "dotenv"
dotenv.config()

const app = express()
const PORT = process.env.PORT || 4005

app.listen(PORT, () => {
    console.log("App is runnig");
})

app.get("/api/v1", (req, res) => {
    res.send("Welcom to sqi flashcard")
})

    