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
    var query = "select * from TB_Students";
    //console.log(query);
    executeQuery(query, res);
});

router.get('/:Rollid',function(req,res){
    var query = "select * from TB_Students where Std_RollNo = " + req.params.Rollid;
    //console.log(query);
    executeQuery(query,res);
});

router.post('/AddStudent',function(req,res){
var query="Insert into TB_Students (Std_Name,Std_DOB,Std_PlacOfBirth,Std_FatherName,Std_FNIC,Std_Address,Std_PermenantAddress,Std_Contact,Std_DOJ,Class_Id,Std_Fees,Std_Image) Values('"+req.body.Name+"','"+req.body.DOB+"','"+req.body.POB+"','"+req.body.Fname+"','"+req.body.FNIC+"','"+req.body.Address+"','"+req.body.Paddress+"','"+req.body.contact+"','"+req.body.DOJ+"','"+req.body.ClassID+"','"+req.body.Fess+"','"+req.body.ImagePath+"')";
    executeQuery(query,res);
});


router.put('/:id',function(req,res){

var query="Update TB_Students Set Std_Name='"+req.body.Name+"',Std_DOB='"+req.body.DOB+"',Std_PlacOfBirth='"+req.body.POB+"',Std_FatherName='"+req.body.Fname+"',Std_FNIC='"+req.body.FNIC+"',Std_Address='"+req.body.Address+"',Std_PermenantAddress='"+req.body.Paddress+"',Std_Contact='"+req.body.contact+"',Std_DOJ='"+req.body.DOJ+"',Class_Id='"+req.body.ClassID+"',Std_Fees='"+req.body.Fess+"',Std_Image='"+req.body.ImagePath+"' where Std_RollNo="+req.params.id;
executeQuery(query,res);
});

router.delete('/:id',function(req,res){

    var query="Delete from TB_Students where Std_RollNo =" +req.params.id;
    executeQuery(query,res);

});

module.exports=router;