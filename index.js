const mongoose = require('mongoose');
const express = require('express');
const database = require('./database');
const app = express();
const PORT = 3000;
const MongooseTransaction = require('./mongoose_transactions')

app.get('/', (req, res) => {
  res.json({
    message: 'Hello world'
  })
})

/**
 * @dev API demo transaction
 */
app.get('/demo_mongo_transaction', async (req, res) => {
  try {
    await MongooseTransaction.handleMoneyTransfer('ACC001', 'ACC002', 10);
    return res.json({message: 'Thành công'})
  } catch (error) {
    throw error
  }
})

mongoose
  .connect(database.name, {
    replicaSet: 'rs',
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connected to database'))
  .catch((error) => console.log(error));

  
app.listen(PORT, () => {
  console.log(`App running at ${PORT}`)
})