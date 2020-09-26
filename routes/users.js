var express = require('express');
var router = express.Router();

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://mongoDbUser:3TQSsmEEfTQdnbd@cluster0-mte9s.gcp.mongodb.net?retryWrites=true&w=majority";


router.post('/create',async function (req, res, next) {

  let username = req.body.username;
  let password = req.body.password;

  try {
    let client = await MongoClient.connect(uri);
    let db = client.db("usercrud");
    let insertedUser = await db.collection("users").insertOne({
      "username": username,
      "password": password
    });
    client.close();
    console.log("successfully inserted user");
    res.send("successfully inserted user");
  } catch (err) {
    console.log(err);
    res.send(err);
  }

});

router.get('/getAll',async function (req, res, next) {

  try {
    let client = await MongoClient.connect(uri);
    let db = client.db("usercrud");
    let users = await db.collection("users").find().toArray();
    client.close();
    console.log("successfully retrieved all users");
    res.send({
      "users":users
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }

});

router.put('/update',async function (req, res, next) {
  
  let username = req.body.username;
  let password = req.body.password;

  try {
    let client = await MongoClient.connect(uri);
    let db = client.db("usercrud");
    let updatedUser = await db.collection("users").findOneAndUpdate(
      { "username": username },
      { $set: { "password": password } }
    );
    client.close();
    console.log("successfully updated user");
    res.send("successfully updated user");
  } catch (err) {
    console.log(err);
    res.send(err);
  }

});

router.delete('/delete/:username',async function (req, res, next) {
  
  let username = req.params.username;

  try {
    let client = await MongoClient.connect(uri);
    let db = client.db("usercrud");
    let deletedUser = await db.collection("users").deleteOne({
      "username": username
    });
    client.close();
    console.log("successfully deleted user");
    res.send("successfully deleted user");
  } catch (err) {
    console.log(err);
    res.send(err);
  }

});

module.exports = router;
