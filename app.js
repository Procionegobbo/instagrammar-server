var fs = require('fs'),
    path = require('path'),
    instagrammar = require("instagrammar");

var express = require('express');
var app = express();

//var filePath = path.join(__dirname, argv.grammar);

app.listen(3000, () => {
    app.get('/grammar/:grammar', function (req, res) {
        console.log(path.join(__dirname, req.params.grammar+'.instagrammar'));
        fs.readFile(path.join(__dirname, req.params.grammar+'.instagrammar'), 'utf8', (err, data) => {
            var parsedOutput;
            if (err) {
                res.send( 'Error' );
            }else {
                parsedOutput = generateKobold(data);
            }
            //console.log(data);
            //console.log(parsedOutput);
            res.send(parsedOutput);
        });
    });
});

function generateKobold(grammar) {
    var ig = new instagrammar.InstaGrammar(grammar);
    var parsed = ig.generate();
    //console.log(parsed);
    return parsed.replace(/\\"/g, '"');
}

