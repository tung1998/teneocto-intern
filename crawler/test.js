const express = require('express');
const app = express();
const fs =require("fs");
const request = require('request');


app.get("/",(req,res)=>{
    // let toFind =req.query.toFind;
    // console.log(toFind);
    let obj =[];
    // res.send(toFind);
    for (let i=0 ; i<288; i++) {
        setTimeout(function(){
            console.log(i);
            getData(i,obj, res);
        },i*150)
    }
})

async function getData(i,obj,res) {
    request(`http://www.wordcount.org/dbquery.php?toFind=${i}&method=SEARCH_BY_INDEX`,(error, response, body)=>{
        renderData(i,body,obj);
        if(i==287){
            // console.log(i)
            fs.writeFile('myjsonfile.json', JSON.stringify(obj), 'utf8');
            res.send({data:obj.length})
        }
    });
}
async function renderData(i,body,obj) {
    let data = body.split("&word");
    data.splice(0,2);
    let num=0;
    data.forEach(function (item) {
        let newWord = {};
        let word = item.split("&freq");
        data = word[0].split("=");
        newWord.index= i*301+num;
        newWord.word = data[1];
        newWord.freq = word[1].split("=")[1];
        obj.push(newWord)
        num++;
        // console.log(i,num,i+num)
        // console.log(i);
    })
}

const server = app.listen(3000, (err) => {
    if (err) throw err;
    const host = server.address().address;
    const port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port);
});
