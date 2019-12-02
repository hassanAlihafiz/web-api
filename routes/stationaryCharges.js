const express=require("express");
const app=express();
const router=express.Router();
const bodyParser = require('body-parser');
const cors=require("cors");

const sql=require("mssql/msnodesqlv8");

app.use(bodyParser.json(),cors());

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

    var query="select * from TB_StationaryCharges";
    executeQuery(query,res);
});


router.get('/:id',function(req,res){

    var query="select * from TB_StationaryCharges where ST_Id  = " + req.params.id;
    executeQuery(query,res);
});

router.post('/AddCharges',function(req,res){

    var query="insert into TB_StationaryCharges (ST_Item,ST_ExpenceDate,ST_Ammount) Values('"+req.body.item+"','"+req.body.expenceDate+"','"+req.body.amount+"') ";
    executeQuery(query,res);
});

router.put('/:id',function(req,res){

    var query="update TB_StationaryCharges set ST_Item='"+req.body.item+"',ST_ExpenceDate='"+req.body.expenceDate+"',ST_Ammount='"+req.body.amount+"' where ST_Id = " + req.params.id;
    executeQuery(query,res);
});

router.delete('/:id',function(req,res){

    var deleteQuery="Delete from TB_StationaryCharges where ST_Id  = " + req.params.id;
    executeQuery(deleteQuery,res);
});


module.exports=router;