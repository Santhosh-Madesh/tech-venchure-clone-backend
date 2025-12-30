import express from "express"
import mysql from "mysql2"
import cors from "cors"
import dontenv from "dotenv"

dontenv.config();

const app = express();

app.use(cors());
app.use(express.json())


const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
})

app.post("contact-form/", (req, res)=>{

    const { name, email, subject, message } = req.body;

    const sql = "INSERT INTO contactform (name, email, subject, message) VALUES (?, ?, ?, ?)";

    db.query(sql, [name, email, subject, message], (err)=>{
        if(err){
            console.log(err);
        }
    })
})


app.listen(5000, ()=>{
    console.log("Server is up & running")
})