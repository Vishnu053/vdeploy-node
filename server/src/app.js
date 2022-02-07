const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');
app.use(cors());

// get snippets list
app.get('/vdeploy/master/Snippet/List', (req, res) => {
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost:27017/vdeploy', function (err, db) {
        if (err) throw err;

        var coll = db.collection('Snippets');

        coll.find({}).toArray(function (err, result) {
            if (err) {
                res.send(err);
            } else {

                res.send(JSON.stringify(result));
            }
        })

    });
})

// execute command
app.get('/api/vdeploy/home/ExecuteCommand', (req, res) => {
    execCommand(req.query.command).then(r => res.status(200).send(r)).catch(e => res.status(500).send(e))
})

function execCommand(req) {
    return new Promise((resolve, reject) => {
        var exec = require('child_process').exec;
        exec(req,
            function (error, stdout, stderr) {
                if (stdout) {
                    resolve(stdout);
                }
                if (stderr) {
                    reject(stderr);
                }
            });
    })

};

app.listen(port, () => console.log(`v-deploy listening on port ${port}!`))