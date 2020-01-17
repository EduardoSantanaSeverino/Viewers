const url = require('url');
const express = require('express');
const { GoogleToken } = require('gtoken');
const proxy = require('express-http-proxy');
const app = express();
const port = 3030;

const gtoken = new GoogleToken({
  keyFile: '/home/eduardosantana/configFiles/centennial-dev-899dd298b8db.json',
  scope: ['https://www.googleapis.com/auth/cloud-platform'], // or space-delimited string of scopes
});

let currentLocalToken = '';

app.get('/', (req, res) => {
  res.send('Index page....');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

var array1 = [
  {
    urlPrefix: '/dicom-web',
    forwardTo: 'https://healthcare.googleapis.com', // "https://healthcare.googleapis.com/v1beta1"
  },
];

function getParentUrlFromUserId(userId) {
  // some logic to get parent url from userId
  let parent =
    'v1beta1/projects/PROJECT_ID/locations/LOCATION/datasets/DATASET_ID/dicomStores/DICOM_STORE_ID/dicomWeb';
  let item = {
    projectId: 'centennial-dev',
    location: 'northamerica-northeast1',
    datasetId: 'AxonDataset7',
    dicomStoreId: 'DataStore7',
  };

  let retVal = parent
    .replace('PROJECT_ID', item.projectId)
    .replace('LOCATION', item.location)
    .replace('DATASET_ID', item.datasetId)
    .replace('DICOM_STORE_ID', item.dicomStoreId);
  console.log(retVal);
  return retVal;
}

array1.forEach(element => {
  app.use(
    element.urlPrefix + '*',
    proxy(element.forwardTo, {
      proxyReqPathResolver: req => {
        let _forwardPath =
          '/' +
          getParentUrlFromUserId(1) +
          req.baseUrl.replace(element.urlPrefix, '');

        return url.parse(_forwardPath).path;
      },
      proxyReqOptDecorator: function(proxyReqOpts, srcReq) {
        proxyReqOpts.headers['Authorization'] = currentLocalToken;
        return proxyReqOpts;
      },
    })
  );
});

gtoken.getToken((err, tokens) => {
  if (err) {
    console.log(err);
    return;
  }
  currentLocalToken = tokens.token_type + ' ' + tokens.access_token;
});
