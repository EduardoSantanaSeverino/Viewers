const express = require('express');
const app = express();
const port = 3099;

app.get('/', (req, res) => {
  res.send('Index page....');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.use('/dicom/*', function(req, res) {
  console.log("Enter to custom proxy.");
  console.log("Headers");
  console.log(req.headers);
  console.log("Url: " + req.url);
  console.log("baseUrl: " + req.baseUrl);
  console.log("Method: " + req.method);
  res.send('Enter to custom proxy.');
});
