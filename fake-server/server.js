const url = require('url');
const express = require('express');
const proxy = require('express-http-proxy');
const app = express();
const port = 3099;

app.get('/', (req, res) => {
  res.send('Index page....');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

var array1 = [
  {
    urlPrefix: '/api/accounts/v1/',
    forwardTo: 'https://accounts.google.com'
  },
  {
    urlPrefix: '/api/jsonplaceholder/v1/',
    forwardTo: 'http://jsonplaceholder.typicode.com'
    //: 'http://localhost:3099/api/jsonplaceholder/v1/'
  },
  {
    urlPrefix: '/api/healthcare/v1/',
    forwardTo: 'https://healthcare.googleapis.com'
    //: 'http://localhost:3099/api/healthcare/v1/'
  }
];

array1.forEach((element) => {

  app.use(element.urlPrefix + '*', proxy(element.forwardTo, {
    forwardPath: (req) => {
      return url.parse(req.baseUrl.replace(element.urlPrefix, "/")).path;
    }
  }));

});