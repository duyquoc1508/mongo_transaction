const UserModel = require('./models/UserModel');

async function init() {
  // creating two users
  await UserModel.create([
    { accountId: 'ACC001', name: 'John', balance: 50.00 }, 
    { accountId: 'ACC002', name: 'Jane', balance: 50.00 }
  ]);
}

module.exports = init;