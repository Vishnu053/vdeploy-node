const express = require('express')
const app = express()
const port = 3000

var mongoose = require('mongoose');
var db=require('./mongodb')
db.connect();
// db connection
// var mongoose = require('mongoose');
// module.exports.connect = function() {
// 	mongoose.connect('mongodb://localhost:27017/vdeploy');
// 	var db = mongoose.connection;
// 	db.on("error", console.error.bind(console, "connection error"));
// 	db.once("open", function(callback){
// 	  console.log("Connection Succeeded");
// 	});
// 	return db;
// }

app.get('/exec', (req, res) => {
    // req.query.c
    // console.log(execCommand())
    execCommand(req.query.c).then(r=>res.status(200).send(r)) 
})
function execCommand(req) {
    return new Promise((resolve, reject) => {
        var exec = require('child_process').exec;
    exec(req,
        function (error, stdout, stderr) {
            if(stdout){
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