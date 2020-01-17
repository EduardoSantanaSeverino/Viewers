window.config = {
  routerBasename: '/',
  rootUrl: '/',
  servers: {
    dicomWeb: [
      {
        name: 'dicomweb_server',
        wadoUriRoot: 'http://localhost:3030/dicom-web',
        qidoRoot: 'http://localhost:3030/dicom-web',
        wadoRoot: 'http://localhost:3030/dicom-web',
        qidoSupportsIncludeField: true,
        imageRendering: 'wadouri',
        thumbnailRendering: 'wadors',
        requestOptions: {
          requestFromBrowser: true,
        },
      },
    ],
  },
};
