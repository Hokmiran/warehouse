const express = require('express');
const { db } = require('./config/db');
const cors = require("cors");



require('dotenv').config();

db.connect();

const app = express();
app.use(cors());
app.use(express.json());

app.listen(3001);