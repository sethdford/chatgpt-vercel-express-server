const express = require('express');
const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.json());

const { OpenAIApi } = require("openai");

const openai = new OpenAIApi();



//const headers = {
// 'Authorization': `Bearer ${apiKey}`,
//  'Content-Type': 'application/json'
//};

//const response = await openai.listEngines();

console.log(process.env.API_KEY);




app.use(cors())
app.use(express.json())


app.get('/', async (req, res) => {
    res.status(200).send({
      message: 'Hello from chat-gpt-server !!'
    })
  })

  app.post('/', async (req, res) => {
    app.post('https://api.openai.com/v1/completions', async (req, res) => {
      try {
          const request_options = {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + process.env.API_KEY
              },
              body: {
                  model: req.body.model,
                  prompt: req.body.prompt,
                  max_tokens: 7,
                  temperature: 0
              }
          }

          openai.createCompletion(request_options)
              .then((response) => {
                  res.send({ response });
              })
              .catch(err => {
                  console.log(err.message);
              })
      } catch (error) {
          console.log(error);
      }
  });
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
