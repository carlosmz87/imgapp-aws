const express = require('express');
const router = express.Router();
require("dotenv").config();
const aws=require("aws-sdk");
const multer=require("multer");
const upload = multer({ dest: './uploads' })
const mysql = require('mysql2');


const mysqlCon = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    port: process.env.DATABASE_PORT,
    ssl: {
        rejectUnauthorized: false
      }
});

mysqlCon.connect((err)=>{
    if(!err){
        console.log("DATABASE CONNECTION SUCCEDED")
    }else{
        console.log("CONNECTION FAILED\n ERROR: "+JSON.stringify(err,undefined,2));
    }
})

/*
const upload1 = multer({
    storage: multerS3({
        bucket: BUCKET1,
        s3:s3,
        acl: "public-read",
        key:(req, file, cb)=>{
            cb(null, Date.now()+file.originalname);
        }
    })
}); 
*/

aws.config.update({
   secretAccessKey:process.env.ACCESS_SECRET,
   accessKeyId:process.env.ACCESS_KEY,
   region:process.env.REGION 
});

const BUCKET1 = process.env.BUCKET1

const s3= new aws.S3();


let nombres = []
router.get('/get',(req,res)=>{
    nombres = [];
    s3.listObjectsV2({Bucket:BUCKET1}, (err, data)=>{
        if(err) throw err;
        data.Contents.forEach(nom =>{
            nombres.push(nom.Key);
        });
        mysqlCon.query('SELECT * FROM imagenes',(err,rows,fields)=>{
            if(!err){
                console.log(rows);
                res.json({listS3: nombres, listSql: rows});
            }else{
                console.log(err);
                return res.status(404).send("CAN'T GET REGISTERS");
            }
        });
    });
});

router.post('/post', upload.single('file'),(req,res)=>{
    var parametros = {
        Body: req.file.path,
        Bucket: BUCKET1,
        Key: req.file.originalname
    }
    s3.putObject(parametros, function(err, data){
        if(err){
            console.log(err, err.stack)
            return res.status(404).send("CAN'T POST REGISTERS");
        } 
        else {
            console.log(data)
        }
    });
    var sql = "INSERT INTO imagenes (ID_KEY, NAME, TYPE, SIZE, LOCATION) VALUES(?,?,?,?,?)";
    mysqlCon.query(sql,[req.file.originalname, req.file.originalname, req.file.mimetype, req.file.size, req.file.path], function(err, rows, fields){
        if(err){
            console.log("ERROR WHILE INSERTING A REGISTER ON DATABASE");
            return res.status(404).send("CAN'T POST REGISTERS");
        }else{
            res.status(201).json({resS3:"FILE UPLOADED TO THE S3 SERVER",
        resRds:"FILE METADATA STORED IN RDS DATABASE"});
        }
    });
});

router.put('/put/:filename', upload.single('file'), (req,res)=>{
    const filename = req.params.filename;
    var parametros = {
        Body: req.file.path,
        Bucket: BUCKET1,
        Key: filename
    }
    s3.putObject(parametros, function(err, data){
        if(err){
            console.log(err, err.stack)
            return res.status(404).send("CAN'T PUT REGISTERS");
        }
        else{
            console.log(data)
        } 
    });
    var sql = "UPDATE imagenes SET NAME = ?, TYPE = ?, SIZE = ?, LOCATION = ? WHERE ID_KEY = ?"
    mysqlCon.query(sql, [req.file.originalname, req.file.mimetype, req.file.size, req.file.path, filename], function(err, rows, fields){
        if(err){
            console.log("ERROR WHILE INSERTING A REGISTER ON DATABASE");
            
        }else{
            res.json({resS3:"FILE UPDATED TO THE S3 SERVER ", resRds:"FILE METADATA UPDATED IN RDS DATABASE"});
        }
    });
});

router.delete('/delete/:filename', (req,res)=>{
    const filename = req.params.filename
    s3.deleteObject({Bucket:BUCKET1, Key:filename},(err,data)=>{
        if(err) throw err;
        mysqlCon.query('DELETE FROM imagenes WHERE ID_KEY = ?',[req.params.filename],(err, rows, fields)=>{
            if(!err){
                res.json({respuestaS3:"BUCKET REGITER IS DELETED", respuestaSql:"RDS REGISTER IS DELETED"});
            }
            else{
                console.log(err);
                return res.status(404).send("CAN'T DELETE REGISTERS");
            } 
            
        }); 
    });
});

module.exports = router;