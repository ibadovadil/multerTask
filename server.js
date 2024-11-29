import express from "express";
import cors from "cors"
import connectdb from "./config/connection.js";
import studentRoute from './routes/studentRoute.js';
import facultyRoute from './routes/facultyRoute.js';
import universityRoute from './routes/universityRoute.js';

const app = express();
app.use(cors());
app.use(express.json());


app.get('/', async (req, res) => {
    res.status(200).send("Ok")
});
app.use('/student', studentRoute);
app.use('/faculty', facultyRoute);
app.use('/university', universityRoute);
connectdb();

app.listen(3001, async () => {
    console.log("Server is running on port 3001");
});