const express = require('express')
const app = express()
const port = 3000

// var mongoose = require('mongoose');
var db = require('./mongodb')
db.connect();
var Snippets = require("../models/snippet");
// Fetch all snippets
app.get('/snippets', (req, res) => {
    Snippets.find(
        {Id:"1"},
        'Id Name Author ExecutionCommand Description TagNames CreatedOn LastUsedOn CanBeLinkedToAProject HasDependency DependsOn Searchable RequirePasswordToExecute Status LastDeletedOn',
        function (error, snippets) {
            if (error) { console.error(error); }
            res.send({
                snippets: snippets
            })
        }).sort({ _id: -1 })
})

app.get('/exec', (req, res) => {
    // req.query.c
    // console.log(execCommand())
    execCommand(req.query.c).then(r => res.status(200).send(r))
})
function execCommand(req) {
    return new Promise((resolve, reject) => {
        var exec = require('child_process').exec;
        exec(req,
            function (error, stdout, stderr) {
                if (stdout) {
                    console.log('stdout: ' + stdout);
                    resolve(stdout);
                }
                if (stderr) {
                    console.log('exec error: ' + stderr);
                    resolve(stderr);
                }
            });
    })

};
app.listen(port, () => console.log(`v-deploy listening on port ${port}!`))