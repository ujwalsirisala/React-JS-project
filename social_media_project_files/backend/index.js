//const express = require('express');
import  express  from "express";//server side framework
import bodyParser from "body-parser";//to parse data from the forms
import mongoose from "mongoose";//Mongodb Database Work
import cors from "cors";//To send Request from one server to another Server
import dotenv from "dotenv";//To Work with environment file and that related  variable
import multer from "multer";//To Work with File Uploads
import helmet from "helmet";//To provide Security to the Request
import morgan from "morgan";//To Work with Logging
import path from "path";//To Work with paths in the Application
import {fileURLToPath} from "url";//To Get a File from the URL
import User from "./models/User.js";
import Post from "./models/Post.js";
import { users, posts } from "./data/index.js";
import authRoutes from './routes/auth.js';
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { register } from './controllers/auth.js';
import { createPost } from './controllers/posts.js';
/* Configurations */ 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
/* To Utilize Imported Packages in Express Framework We need to use " app.use() " method */
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors({
    credentials:true,
    origin:["http://localhost:3000"]
}));
app.use("/assets",express.static(path.join(__dirname,"public/assets")));

/* File Storage */ 

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"public/assets")
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
});
const upload = multer({storage});
/* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", upload.single("picture"), createPost);
/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
const PORT = 6001;

mongoose.connect("mongodb+srv://rameshonlinetrainer23:9SFUCIl7IvuJoqWo@cluster0.s5cipda.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true}
    ).then(()=>{
    app.listen(PORT,()=>console.log(`server is Running on port: ${PORT}`));
	//User.insertMany(users);
	//Post.insertMany(posts);
}).catch((error)=>{
    console.log(`${error} unable to connect with the server`);
});