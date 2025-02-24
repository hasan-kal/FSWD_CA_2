require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express() ;

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 4000 ;
const MONGO_URI = process.env.MONGO_URI ;

mongoose
.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> console.log ("MongoDB Connected"))
.catch((err)=> console.error("MongoDB Connection Failed"))
