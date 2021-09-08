import express from "express"
import router from "./routes/router"
const app = express()
app.use('/api/v1', router)


export default app