var express = require('express');
var pdf = require('html-pdf');
var http = require('http');

var app = express();

app.get('/', function (req, res) {

    var pdfSourceUrl = req.query.url;
    var options = {
      host: 'google.com',
      port: '80',
      path: '/'
    };

    var request = http.request(options, function (response) {
        var htmldata = '';
        response.on('data', function (chunk) {
            htmldata += chunk.toString('utf8');
        });

        response.on('end', function () {
            console.log(htmldata);
            pdf.create(htmldata).toStream(function (err, stream) {
                res.setHeader('Content-disposition', 'attachment; filename=theDocument.pdf');
                res.setHeader('Content-type', 'application/x-pdf');
                stream.pipe(res);
            });
        });
    });
    request.on('error', function (e) {
        console.log(e.message);
    });
    request.end();
});

app.listen(4000, function () {
    console.log('app listening on port 4000!');
})