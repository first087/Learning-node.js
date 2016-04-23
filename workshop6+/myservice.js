var express = require('express');
var app = express();

require('rootpath')();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', function (req, res) {
    console.log("Hello Express!");
    res.send("Hello Express");
    // console.log(x.length);   // ทดสอบการเกิด Exception
})

app.post('/crm/contacts/add', function (req, res) {
    var contactBiz = require('biz/contactBiz');
    contactBiz.add(req.body, function (result) {
        res.send(result);
        delete contactBiz;
    })
});

app.listen(3000);
console.log("My Service is listening to port 3000.");

// code ด้านล่าง เป็นการป้องกัน Process ตาย
// node version ใหม่ ๆ ไม่มีปัญหาเรื่องการเกิด Exception แล้ว Process ตายแล้ว
// process.on('uncaughtException', function (errors) {
//     console.error((new Date()).toISOString() + 'uncaughtException:', errors.message);
// })