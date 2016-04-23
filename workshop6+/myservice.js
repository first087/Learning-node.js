var express = require('express');
var app = express();

// Workshop 10
require('rootpath')();
var bodyParser = require('body-parser');
app.use(bodyParser.json());

// // Workshop 7
// app.get('/', function (req, res) {
//     console.log("Hello Express!");
//     res.send("Hello Express");
//     // console.log(x.length);   // ทดสอบการเกิด Exception
// })

// // Workshop 10
// app.post('/crm/contacts/add', function (req, res) {
//     var contactBiz = require('biz/contactBiz');
//     contactBiz.add(req.body, function (result) {
//         res.send(result);
//         delete contactBiz;
//     });
// });

// // Workshop 11
// app.get('/crm/contacts/getAll', function (req, res) {
//     var contactBiz = require('biz/contactBiz');
//     contactBiz.getAll(function (result) {
//         res.send(result);
//         delete contactBiz;
//     });    
// });

// // Workshop 12
// app.put('/crm/contacts/update', function (req, res) {
//     var contactBiz = require('biz/contactBiz');
//     contactBiz.update(req.body, function (result) {
//         res.send(result);
//         delete contactBiz;
//     });
// });

// // Workshop 13
// app.delete('/crm/contacts/delete', function (req, res) {
//     var contactBiz = require('biz/contactBiz');
//     contactBiz.delete(req.body, function (result) {
//        res.send(result);
//        delete contactBiz; 
//     });
// });

// Workshop 14 - Routing Center
function execGet(req, res, next) {
    var params = req.params[0].split('/');
    console.log('params', params);
    //[0]- empty,[1]-module,[2]-object,[3]-function,[4-n] params..n
    if (params.length < 4)
        res.send({code:530,status:"error",message:"Invalid parameters!"});
    else {
        var obj = require('api/'+params[1]+'/' +params[2]);
        obj = new obj(app);
        var func = obj[params[3]];
        var inputs = [];
        for (var i=4; i<params.length; i++) {
            if (params[i])
                inputs.push(params[i]);
        }

        console.log('inputs:', inputs);
        func(inputs, function(result) {
            res.send(result);
        });
    }
}

function execPost(req, res, next) {
    var params = req.params[0].split('/');
    console.log('params', params);
    //[0]- empty,[1]-module,[2]-object,[3]-function,[4-n] params..n
    if (params.length < 4)
        res.send({code:530,status:"error",message:"Invalid parameters!"});
    else {
        try {
            var obj = require('api/' + params[1] + '/' + params[2]);
            obj = new obj(app);
            var func = obj[params[3]];
            func(req.body, function(result) {
                console.log('result', result);
                res.send(result);
            });
        } catch (err) {
            res.send({code:500,status:"error",message:JSON.stringify(err)});
        }
    }
}

function executeApi(req, res, next) {
    switch (req.method) {
        case "GET":
            execGet(req, res, next);
        break;
        case "POST":
            execPost(req, res, next);
        break;
        case "PUT":
            execPost(req, res, next);
        break;
        case "DELETE":
            execPost(req, res, next);
        break;
    }
}

app.all('*', executeApi);

app.listen(3000);
console.log("My Service is listening to port 3000.");

// code ด้านล่าง เป็นการป้องกัน Process ตาย
// node version ใหม่ ๆ ไม่มีปัญหาเรื่องการเกิด Exception แล้ว Process ตายแล้ว
// process.on('uncaughtException', function (errors) {
//     console.error((new Date()).toISOString() + 'uncaughtException:', errors.message);
// })