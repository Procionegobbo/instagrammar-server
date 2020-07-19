var fs = require('fs'),
    path = require('path'),
    argv = require('minimist')(process.argv.slice(2)),
    instagrammar = require("instagrammar");
console.log(argv);

var filePath = path.join(__dirname,'grammar', argv.grammar);

function generateKobold(grammar) {
    var ig = new instagrammar.InstaGrammar(grammar);
    return ig.generate().replace(/\\"/g, '"');
}

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) throw err;
    koboldo = generateKobold(data);
    console.log(koboldo);
});
