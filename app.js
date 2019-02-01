var fs = require('fs'),
    path = require('path'),
    instagrammar = require("instagrammar");

var express = require('express');
var app = express();

if( typeof process.env.PORT == 'undefined'){
    process.env.PORT = 8080
}
console.log('Listen on port '+process.env.PORT)
//var filePath = path.join(__dirname, argv.grammar);

app.listen(process.env.PORT, () => {
    app.get('/grammar/:grammar', function (req, res) {
        console.log(path.join(__dirname, req.params.grammar+'.instagrammar'));
        fs.readFile(path.join(__dirname, req.params.grammar+'.instagrammar'), 'utf8', (err, data) => {
            var parsedOutput;
            res.setHeader('Content-Type', 'application/json');
            if (err) {
                res.send( JSON.stringify( 'Error' ) );
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

