// const http = require('http');
// const apps = require('./app');

// const express=require("express");
// var port = process.env.port || 3000;
 
// const app=express();



 
// app.listen(3000, function () {
//     var datetime = new Date();
//     var message = "Server runnning on Port:- " + port + "Started at :- " + datetime;
//     console.log(message);
// });



const http = require('http');
const app = require('./app');

const express=require("express")


const port = process.env.PORT || 3000;
const server = http.createServer(app);
console.log(port)
server.listen(port);


















// c

// app.get("/product",function(request,response)
// {
//     response.json({"Message":"Welcome to Node js"});
// });


// const sql = require('mssql/msnodesqlv8')
// // config for your database
// var config = {
//     driver: 'msnodesqlv8',
//     server: 'DESKTOP-4BCGPKP',
//     database: 'SMSTECH' ,
//     options: {
//         trustedConnection: true
//     }
// };









// var executeQuery = function(req, res){             
//     sql.connect(config, function (err) {
//         if (err) {   
//             console.log("Error while connecting database :- " + err);
//             res.send(err);
//         }
//         else {
//           // create Request object
//           var request = new sql.Request();
//           // query to the database
//           request.query(req, function (err, snapshot) {
//             if (err) {
//               console.log("Error while querying database :- " + err);
//               res.send(err);
//               }
//               else {
//                console.log("record set123443",snapshot);
//                 res.send(snapshot);
//               }
//           });
//         }
//     });           
// }

// app.get("/student", function(req, res){
//     var query = "select * from TB_Students";
//     //console.log(query);
//     executeQuery(query, res);
// });

// app.get("/student/:Rollid/",function(req,res){
//     var query = "select * from TB_Students where Std_RollNo = " + req.params.Rollid;
//     //console.log(query);
//     executeQuery(query,res);
// })



// // app.put("/api/student/:id",function(req,res){
// // var query="update TB_Students"
// // });



// app.delete("/api/student/:id",function(req,res){
// var query="Delete from TB_Students where Std_RollNo =" +req.params.id;
// executeQuery(query,res);

// });