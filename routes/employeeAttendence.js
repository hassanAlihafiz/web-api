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
    var query = "select * from TB_EmpAttendance";
    //console.log(query);
    executeQuery(query, res);
});

router.get('/:id',function(req,res){
    var query = "select * from TB_EmpAttendance where Attendance_Id = " + req.params.id;
    //console.log(query);
    executeQuery(query,res);
});

router.post('/AddEmpAttend',function(req,res){
        //var empid=parseInt(req.body.emp_id);
var query="Insert into TB_EmpAttendance (DailyBase,Presence,Emp_Id) values('"+req.body.dailyBase+"','"+req.body.presence+"','"+req.body.emp_id+"')";
    executeQuery(query,res);
});


router.put('/:id',function(req,res){
var query="Update TB_EmpAttendance Set DailyBase='"+req.body.dailyBase+"',Presence='"+req.body.presence+"',Emp_Id='"+req.body.emp_id+"' where Attendance_Id="+req.params.id;
executeQuery(query,res);
});

router.delete('/:id',function(req,res){

    var query="Delete from TB_EmpAttendance where Attendance_Id =" +req.params.id;
    executeQuery(query,res);

});

module.exports=router;