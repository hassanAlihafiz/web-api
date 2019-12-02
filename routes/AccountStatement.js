const express=require("express");
const app=express();
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const sql = require('mssql/msnodesqlv8');


app.use(bodyParser.json(),cors());
// config for your database
var config = {
    driver: 'msnodesqlv8',
    server: 'DESKTOP-4BCGPKP',
    database: 'SMSTECH' ,
    options: {
        trustedConnection: true
    }
};
var executeQuery = function(req, res){             
    sql.connect(config, function (err) {
        if (err) {   
            console.log("Error while connecting database :- " + err);
            res.send(err);
        }
        else {
          // create Request object
          var request = new sql.Request();
          // query to the database
          request.query(req, function (err, response) {
            if (err) {
              console.log("Error while querying database :- " + err);
              res.send(err);
              }
              else {
               console.log(response);
               res.send(JSON.stringify(response.recordsets));
              }
          });
        }
    });           
}



router.get('/',function(req,res){

    var query="select * from TB_AccountStatement";
    executeQuery(query,res);
});


router.get('/:id',function(req,res){
    var query="select * from TB_AccountStatement where Account_Id = "+req.params.id;
    executeQuery(query,res);  
});

router.post('/AddStatement',function(req,res){

    var query="insert into TB_AccountStatement (Account_Name,Account_Date,Account_Month,Account_TotalAmount) values('"+req.body.Aname+"','"+req.body.Adate+"','"+req.body.Amonth+"','"+req.body.totalAmount+"') ";
    executeQuery(query,res);
});

router.put('/:id',function(req,res){

    var query="update TB_AccountStatement set  Account_Name='"+req.body.Aname+"',Account_Date='"+req.body.Adate+"',Account_Month='"+req.body.Amonth+"',Account_TotalAmount='"+req.body.totalAmount+"' where Account_Id ="+ req.params.id;
    executeQuery(query,res);

});








module.exports=router;
