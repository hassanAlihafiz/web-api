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

router.get('/', (req, res, next) => {
    var query = "select * from TB_Gas";
    //console.log(query);
    executeQuery(query, res);
});

router.get('/:id',function(req,res){
    var query = "select * from TB_Gas where Gas_Id = " + req.params.id;
    //console.log(query);
    executeQuery(query,res);
});

router.post('/AddGasBill',function(req,res){
var query="Insert into TB_Gas (Gas_Month,Gas_PaidDate,Gas_Ammount) values('"+req.body.Month+"','"+req.body.PaidDate+"','"+req.body.Amount+"')";
    executeQuery(query,res);
});


router.put('/:id',function(req,res){

var query="Update TB_Gas Set Gas_Month='"+req.body.Month+"',Gas_PaidDate='"+req.body.PaidDate+"',Gas_Ammount='"+req.body.Amount+"' where Gas_Id="+req.params.id;
executeQuery(query,res);
});

router.delete('/:id',function(req,res){

    var query="Delete from TB_Gas where Gas_Id =" +req.params.id;
    executeQuery(query,res);

});

module.exports=router;