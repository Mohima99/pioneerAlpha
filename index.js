const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const fs = require("fs-extra");
require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static("services"));
app.use(fileUpload());

const port = 7000;
const uri = `mongodb+srv://mongoreact:mongoreact@cluster0.rzejs.mongodb.net/test?retryWrites=true&w=majority`;


const client = new MongoClient(uri, {useNewUrlParser: true,useUnifiedTopology: true,});
client.connect((err) => {
  const productsCollection = client.db("test").collection("asd");
  //const customersCollection = client.db("pos-system").collection("customers");
  //const ordersCollection = client.db("pos-system").collection("orders");
  // const adminsCollection = client.db("pos-system").collection("admins");

//  app.post("/addnews", (req, res) => {
//    const name = req.body.name;
  //   const description = req.body.description;
    
  //   productsCollection
  //     .insertOne({ name, description })
  //     .then((result) => {
  //       res.send(result.insertedCount > 0);
  //     });
  // });

  app.post('/addnews', (req, res) => { 
    productsCollection(req.body) 
    .then(result => { }) 
  .catch(error => console.error(error)) 
  })
  
 app.get("/news", (req, res) => {
     productsCollection.find({}).toArray((err, documents) => {
       res.send(documents);
     });
   });




  // app.post("/addAdmin", (req, res) => {
  //   const admin = req.body;
  //   adminsCollection.insertOne(admin).then((result) => {
  //     res.send(result.insertedCount > 0);
  //   });
  // });
  //
  // app.post("/isAdmin", (req, res) => {
  //   const email = req.body.email;
  //   adminsCollection.find({ email: email }).toArray((err, admins) => {
  //     res.send(admins.length > 0);
  //   });
  // });
});

app.get("/", (req, res) => {
  res.send("Working!!");
  res.end();
});
// console.log(process.env.PORT || port)
app.listen(process.env.PORT || port);
