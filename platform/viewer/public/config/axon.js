window.config = {
  // default: '/'
  routerBasename: '/',
  extensions: [],
  showStudyList: true,
  servers: {
    dicomWeb: [
      {
        name: 'AXONPROXY',
        wadoUriRoot: 'http://localhost:3000/dicom-web',
        qidoRoot: 'http://localhost:3000/dicom-web',
        wadoRoot: 'http://localhost:3000/dicom-web',
        qidoSupportsIncludeField: true,
        imageRendering: 'wadors',
        thumbnailRendering: 'wadors',
        enableStudyLazyLoad: true,
        studyInstanceUids:
          '1.2.392.200046.100.14.233464500781184654070685667316508464174',
        requestOptions: {
          auth: function(o) {
            console.log('inner log message! 1 0 1 0 ');
            return 'inside-value-funct';
          },
        },
      },
    ],
  },
};
