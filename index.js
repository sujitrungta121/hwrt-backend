const express=require("express");
const dotenv=require("dotenv");

const app=express();
const cors = require("cors");
dotenv.config();

const port =8000;
app.use(cors());

const uploadImageRouter=require("./routes/uploadImage")


app.get("/api/home",async (req,res)=>{
    res.json("Hello world!")
})


app.use('/upload-image',uploadImageRouter)

app.listen(port,()=>{
    console.log("app listening on hte port ",port)
})