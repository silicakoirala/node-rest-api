require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const productRoute = require('./routes/productRoute.js');
const errorMiddleware = require('./middleware/errorMiddleware');
const cors = require("cors");
const {PORT,MONGO_URL, ALLOWED_ORIGINS} = require('./config.js');


const app = express();

const corsOptions = {
    origin: ALLOWED_ORIGINS, 
    optionsSuccessStatus: 200 
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extened: false }));

//routes 
app.use('/api/products', productRoute);

mongoose.set("strictQuery", false);

mongoose.connect(MONGO_URL).then(() => {
    console.log('connected to MongoDB')
    app.listen(PORT, () => {
        console.log(`Node API app is running on port ${PORT}`);
    });
}).catch((error) => {
    console.log(error);
})
