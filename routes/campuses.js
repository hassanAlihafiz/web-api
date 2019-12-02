const express =require("express");
const app=express();
const router = express.Router();
const bodyParser=require('body-parser');
const cors=require('cors');
const sql=require('mssql/msnodesqlv8');


app.use(bodyParser.json(),cors());
//create database configuration
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
    var query="select * from TB_Campuses";
    executeQuery(query,res);
});


router.get('/:id',function(req,res){
    var query="select * from TB_Campuses where Camp_Id = " +req.params.id;
    executeQuery(query,res);
});

router.post('/AddCampuse',function(req,res){

    var query ="insert into TB_Campuses (Camp_Name,Camp_Date,Camp_Code,Camp_Location) values('"+req.body.campus_Name+"','"+req.body.date+"','"+req.body.code+"','"+req.body.location+"')";
    executeQuery(query,res);

});

router.put('/:id',function(req,res){

    var query="update TB_Campuses set Camp_Name='"+req.body.campus_Name+"',Camp_Date= '"+req.body.date+"',Camp_Code='"+req.body.code+"' ,Camp_Location='"+req.body.location+"' where Camp_Id =" +req.body.id;
    executeQuery(query,res);
});

module.exports=router;