import * as dotenv from 'dotenv'
import { Configuration, OpenAIApi } from 'openai'
import express from 'express'
import cors from 'cors'

dotenv.config()

const configuration = new Configuration({
  apiKey: process.env.API_KEY,
  organization: "org-ShuX8L2JRNB0wQnwoxYcHsYG"
});

const headers = {
  'Authorization': `Bearer ${apiKey}`,
  'Content-Type': 'application/json'
};

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
      req.headers(headers);

      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Hello world`, // The prompt is the text that the model will use to generate a response.
        temperature: 0, // Higher values means the model will take more risks.
        max_tokens: 3000, // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
        top_p: 1, // alternative to sampling with temperature, called nucleus sampling
        frequency_penalty: 0.5, // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
        presence_penalty: 0, // Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
        stream: false,
        logprobs: null,
      stop: "\n"
      });
  
      res.status(200).send({
        bot: response.data.choices[0].text
      });
  
    } catch (error) {
      console.error(error)
      res.status(500).send(error || 'Sorry, something went wrong. Please try again later.');
    }
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
