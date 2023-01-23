const express = require("express");
const app = express();
const product = require("./api/product");

app.use(express.json({ extended: false }));

app.use("/api/product", product);

app.get('/', async (req, res) => {
    res.status(200).send({
      message: 'Hello from chat-gpt-express-server !!'
    })
  })

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
