var express = require('express');
var app = express();

// Workshop 10
require('rootpath')();
var bodyParser = require('body-parser');
app.use(bodyParser.json());

// Workshop 7
app.get('/', function (req, res) {
    console.log("Hello Express!");
    res.send("Hello Express");
    // console.log(x.length);   // ทดสอบการเกิด Exception
})

// Workshop 10
app.post('/crm/contacts/add', function (req, res) {
    var contactBiz = require('biz/contactBiz');
    contactBiz.add(req.body, function (result) {
        res.send(result);
        delete contactBiz;
    });
});

// Workshop 11
app.get('/crm/contacts/getAll', function (req, res) {
    var contactBiz = require('biz/contactBiz');
    contactBiz.getAll(function (result) {
        res.send(result);
        delete contactBiz;
    });    
});

// Workshop 12
app.put('/crm/contacts/update', function (req, res) {
    var contactBiz = require('biz/contactBiz');
    contactBiz.update(req.body, function (result) {
        res.send(result);
        delete contactBiz;
    });
});

// Workshop 13
app.delete('crm/contacts/delete', function (req, res) {
    var contactBiz = require('biz/contactBiz');
    contactBiz.delete(req.body, function (result) {
       res.send(result);
       delete contactBiz; 
    });
});

app.listen(3000);
console.log("My Service is listening to port 3000.");

// code ด้านล่าง เป็นการป้องกัน Process ตาย
// node version ใหม่ ๆ ไม่มีปัญหาเรื่องการเกิด Exception แล้ว Process ตายแล้ว
// process.on('uncaughtException', function (errors) {
//     console.error((new Date()).toISOString() + 'uncaughtException:', errors.message);
// })