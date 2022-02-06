const express = require('express')
const app = express()
const port = 3000

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
app.listen(port, () => console.log(`Example app listening on port ${port}!`))