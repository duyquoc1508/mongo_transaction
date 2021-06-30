const mongoose = require('mongoose');
// for currency calculation handling
const $ = require('currency.js'); 

const init = require('./init');
const UserModel = require('./models/UserModel')

async function handleMoneyTransfer(senderAccountId, receiverAccountId, amount) {
  // init data
  await init();
  
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // always pass session to find queries when the data is needed for the transaction session
    const sender = await UserModel.findOne({ accountId: senderAccountId }).session(session);
    // calculate the updated sender balance
    sender.balance = $(sender.balance).subtract(amount);
    
    // if funds are insufficient, the transfer cannot be processed
    if (sender.balance < 0) {
      throw new Error(`User - ${sender.name} has insufficient funds`);
    }
    
    // save the sender updated balance
    // do not pass the session here
    // mongoose uses the associated session here from the find query return
    // more about the associated session ($session) later on
    await sender.save();
    console.log('sender', sender)
    
    const receiver = await UserModel.findOne({ accountId: receiverAccountId }).session(session);
    
    receiver.balance = $(receiver.balance).add(amount);
    
    await receiver.save();
    console.log('receiver', receiver)
    
    // commit the changes if everything was successful
    await session.commitTransaction();
  } catch (error) {
    // if anything fails above just rollback the changes here
  
    // this will rollback any changes made in the database
    await session.abortTransaction();
    
    // logging the error
    console.error(error);
    
    // rethrow the error
    throw error;
  } finally {
    // ending the session
    session.endSession();
  }
}

module.exports = {
  handleMoneyTransfer
}