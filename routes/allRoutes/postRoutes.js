
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Add middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Define route to handle form submission
app.post('/post-data', (req, res) => {
  // Get the user input from the request body
  const formData = req.body;

  // Do something with the form data (e.g. save to database)

  // Send a response back to the client
  res.status(200).send('Your data was successfully posted!');
});

// Serve the HTML form
app.get('/', (req, res) => {
  res.send(`
    <form id="form-id" action="/post-data" method="POST">
      <label for="name">Name:</label>
      <input type="text" id="name" name="name">
      <br>
      <label for="email">Email:</label>
      <input type="email" id="email" name="email">
      <br>
      <button type="submit" id="submit-button">Submit</button>
    </form>
  `);
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
