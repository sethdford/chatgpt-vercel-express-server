import * as dotenv from 'dotenv'
import { Configuration, OpenAIApi } from 'openai'
import express from 'express'
import cors from 'cors'

dotenv.config()

const configuration = new Configuration({
  apiKey: process.env.API_KEY,
  organization: "org-ShuX8L2JRNB0wQnwoxYcHsYG"
});

//const headers = {
// 'Authorization': `Bearer ${apiKey}`,
//  'Content-Type': 'application/json'
//};

//const response = await openai.listEngines();

console.log(process.env.API_KEY);

const openai = new OpenAIApi(configuration);

const app = express()
app.use(cors())
app.use(express.json())


app.get('/', async (req, res) => {
    res.status(200).send({
      message: 'Hello from chat-gpt-server !!'
    })
  })

app.post('/', async (req, res) => {
    try {
      //console.log(req.body);
      //const prompt = req.body.prompt;
      //console.log(prompt);
      //req.headers(headers);

      const response = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: "Hello world",
          timeout: 20000
      });
      
      console.log(response.data.choices[0].text);

      res.status(200).send({
        bot: response.data.choices[0].text
      });
  
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
      res.status(500).send(error || 'Sorry, something went wrong. Please try again later.');
    }
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
