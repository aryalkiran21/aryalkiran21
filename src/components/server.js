const express = require ("express")
const app = express()
const cors = require ("cors")
app. use(
cors({
origin: "http://localhost:5173",
})
)
app.get("/data", (req, res) => {
res. json({ name: "Kiran", favoriteFood: "Rice"})
})
app.listen(3000)