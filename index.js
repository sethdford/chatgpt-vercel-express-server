import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai'

dotenv.config()

const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express()
app.use(cors())
app.use(express.json())

app.options('*', cors())

app.get('/', cors(), async (req, res) => {
    res.status(200).send({
      message: 'Hello from chat-gpt-express-server !!'
    })
  })

app.post('/', cors(), async (req, res) => {
    try {
      const prompt = req.body.prompt;
  
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${prompt}`, // The prompt is the text that the model will use to generate a response.
        temperature: 0, // Higher values means the model will take more risks.
        max_tokens: 3000, // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
        top_p: 1, // alternative to sampling with temperature, called nucleus sampling
        frequency_penalty: 0.5, // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
        presence_penalty: 0, // Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
      });
  
      res.status(200).send({
        bot: response.data.choices[0].text
      });
  
    } catch (error) {
      console.error(error)
      res.status(500).send(error || 'Sorry, something went wrong. Please try again later.');
    }
})

const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  //res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  return await fn(req, res)
}

const handler = (req, res) => {
  const d = new Date()
  res.end(d.toString())
}

module.exports = allowCors(handler)

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
