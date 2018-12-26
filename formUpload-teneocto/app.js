const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fs = require('fs');
const formidable = require('formidable');

const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



//database
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const url = "mongodb://localhost:27017";


MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
    if (err) throw err;
    const db = client.db('formupload-teneocto');

    app.get("/", (req, res, next) => {
        db.collection("data").find({}).toArray((err, result) => {
            res.render("index", {data: result})
        });
    })

    app.post("/deleteProduct", (req, res, next) => {
        let id = req.body._id;
        let Path = path.join(__dirname,"public","images",id);
        fs.unlink(Path, (err) => {
            if (err) throw err;
            console.log('was deleted');
        });
        db.collection("data").deleteOne({_id: ObjectID(id)},(err, result) => {
            if (err) throw err;
            res.end();
        });
    })


    app.post("/editProduct", (req, res, next) => {
        let newData = req.body;
        let id = newData._id;
        delete newData._id;
        console.log(newData);
        db.collection("data").updateOne({_id: ObjectID(id)},{$set:newData},{upsert:true},(err, result) => {
            if (err) throw err;
            res.end();
        });
    })


    app.post("/uploadData", (req, res, next) => {
        let formUpload = formidable.IncomingForm();
        let UploadPath = path.join(__dirname, "public", "images");
        // console.log(UploadPath);
        formUpload.uploadDir = UploadPath;
        formUpload.parse(req, (err, field, file) => {
            if (err) throw err;
            let data = field;
            db.collection("data").insertOne(field, (err, result) => {
                if (err) console.log("loi");
                data._id=result.insertedId;
                let oldPath = file["picture"].path;
                let newPath = UploadPath+"/"+ result.insertedId;
                // console.log(oldPath,newPath);
                fs.rename(oldPath, newPath, (err) => {
                    if(err) throw err;
                    // console.log(data);
                    res.send(data)
                    res.end();
                })
            })


        })


// catch 404 and forward to error handler
        app.use(function (req, res, next) {
            next(createError(404));
        });

// error handler
        app.use(function (err, req, res, next) {
            // set locals, only providing error in development
            res.locals.message = err.message;
            res.locals.error = req.app.get('env') === 'development' ? err : {};

            // render the error page
            res.status(err.status || 500);
            res.render('error');
        });

    });
})


module.exports = app;