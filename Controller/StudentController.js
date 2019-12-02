var express = require('express');
var router = express.Router();
const sqlInstance=require("mssql/msnodesqlv8");
// config for your database
// var config = {
//     driver: 'msnodesqlv8',
//     server: 'DESKTOP-4BCGPKP',
//     database: 'SMSTECH' ,
//     options: {
//         trustedConnection: true
//     }
// };
// sqlInstance.connect(config,function(err){
//     if(err)
//     console.log(err);
//     else
//     console.log("Connected");

// });




// function executeDatabaseActions() {
// sqlInstance.connect(config).then(function () {

//             new sqlInstance.Request().query("select * from TB_Students").then(function (dbData) {
//          if (dbData == null || dbData.length === 0)
//             return;
//          console.dir('Students');
//             console.dir(dbData);
//             })
//          .catch(function (error) {
//             console.dir(error);
//         });
//     });
// }
// executeDatabaseActions();





















  var db=  sqlInstance.connect(config).then(function(){
        var sqlQuery="SELECT * From TB_Students";
        var req=new sqlInstance.Request();
        req.query(sqlQuery).then(function(record){
            res.json(record.record);
            sqlInstance.close()
        })
        .catch(function(err){
            sqlInstance.close();
            res.status(400).send("ERRor of datatbase");

        });
    })
    .catch(function(err){
        sqlInstance.close();
            res.status(400).send("ERRor of Function");
    })

























