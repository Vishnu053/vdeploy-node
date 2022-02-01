const express = require('express')
const app = express()
const port = 3000

app.get('/exec', (req, res) => {
    // req.query.c
    console.log(execCommand())
    res.send("output:",execCommand())
})
function execCommand(callback) {
    var exec = require('child_process').exec;
    exec("git config --global user.name",
        function (error, stdout, stderr) {
            if(stdout){
           console.log('stdout: ' + stdout);
           return stdout;
            }
           if (stderr !== null) {
               console.log('exec error: ' + stderr);
               return stderr;
           }
        });
};
app.listen(port, () => console.log(`Example app listening on port ${port}!`))