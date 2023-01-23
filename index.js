
import * as dotenv from 'dotenv'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai'

const express = require("express");
const app = express();
const product = require("./api/product");
dotenv.config()

const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});

const openai = new OpenAIApi(configuration);

app.use(cors())
app.use(express.json())

app.use("/api/product", product);

app.get('/', async (req, res) => {
    res.status(200).send({
      message: 'Hello from chat-gpt-express-server !!'
    })
  })

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
