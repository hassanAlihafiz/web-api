const express=require("express")

const app=express();
const sql = require('mssql/msnodesqlv8')
// config for your database
var config = {
    driver: 'msnodesqlv8',
    server: 'DESKTOP-4BCGPKP',
    database: 'SMSTECH' ,
    options: {
        trustedConnection: true
    }
};

sql.connect(config, function (err) {
    if (err) {
      
      console.log(JSON.stringify(err)+'..............') }
    else 
     
        console.log('Connected')

    });
module.exports = config;