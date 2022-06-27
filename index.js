
const express = require('express')
const app = express()
const port = process.env.PORT || 4000

// bring in body-parser. A library that will parse the request coming in and convert the data into a json format.
let bodyParser = require("body-parser");
const { users } = require('./state')

/* BEGIN - create routes here */

// Able to let our app utitlize body parser
app.use(bodyParser.json());

// this returns this list of users and occupations
// this gives our server the ability to respond to a GET request with a path "/users" and return the users array from state.js
app.get("/users", function (req, res) {
  console.log("GET /users");

  // we show results with the for loop which will list the id, name, and occupation. 
  let results = [];
  for (let i = 0; i < users.length; i++) {
      let item = users[i];
      let copy = {};
      copy.id = item.id;
      copy.name = item.name;
      copy.occupation = item.occupation;
      //reults will push the copy here
      results.push(copy);
  }
  // We're sending json back.
  res.json(results);
});

// ====================

//  We give our server the ability to respond to a GET request with a path "/users/1" and return the first user object from the users array from state.js
app.get("/users/:id", function (req, res) {
  console.log("/GET/users/", req.params.id)
  let found;
 // Variable found will go through a for loop to go through an id at a time to check if it is the id that was sent 
 // if equal then we're going to set found = id
 // then we break the for loop
  for (let i = 0; i < users.length; i++) {
      let item = users[i];
      if (item.id == req.params.id) {
          found = item;
          break;
      }
  }
  // Found is true we want to send json back if not send the status code 404
  if (found) {
      res.json(found);
  } else {
      res.sendStatus(404);
  }
});

// ===============================================

// Gives our  server the ability to respond to a POST request with a path "/users" and add a hard coded user object to the users array from state.js.
app.post("/users", function (req, res) {
  console.log("POST /users");
  // Json that was brought it
  let json = req.body;
  // We're just printing out the json so we can view it
  console.log("body = ", json);
  // we are generating the items that came in
  let newItem = {};
  newItem.id = json.id;
  newItem.name = json.name;
  newItem.occupation = json.occupation;
  newItem.avatar = json.avatar;
  // here we're pusing the newItem
  users.push(newItem);

  // we send the json back
  res.json(newItem);
});

// =====================================


app.put("/users/:id", function (req, res) {
  console.log("PUT /users/", req.params.id);
  // how we get our json
  let json = req.body;

  // find our item we want to update with our for loop and exit our for loop
  let found;
  for (let i = 0; i < users.length; i++) {
      let item = users[id];
      if (item.id == req.params.id) {
          found = item;
          break;
      }
  }
 // If the item is found we want to up date if not send our status code 404
  if (found) {
      found.name = json.name;
      found.occupation = json.occupation;
      res.json(found);

  } else {
      res.sendStatus(404);
  }
});

// ==================

// This gives our server the ability to respond to a DELETE request with a path "/users/1" and remove the first item from the users array.

app.delete("/users/:id", function (req, res) {
  console.log("DELETE /users/", req.params.id);

// Loop the array until I find the id and once I do we want to splice the id out.
  let index;
  let found;


  for (let i = 0; i < users.length; i++) {
      let item = users[i];
      if (item.id == req.params.id) {
          found = item;
          index = i;
          break;
      }
  }

  if (found) {
      users.splice(index, 1);
  }
  res.json(found);
});

/* END - create routes here */
app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))