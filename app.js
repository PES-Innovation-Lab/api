const { GoogleSpreadsheet } = require('google-spreadsheet');
require('dotenv').config();

var docStatus = 0; // 0 - not ready 1 - ready

// spreadsheet key is the long id in the sheets URL
const doc = new GoogleSpreadsheet(process.env.SHEET_ID);
doc.useServiceAccountAuth({
    client_email: process.env.CLIENT_EMAIL,
    private_key: process.env.CLIENT_KEY.replace(/\\n/gm, '\n'),
}).then(() =>{
    docStatus = 1;
}).catch(()=> console.error(" Error at clearServiceAccountAuth"));

const express = require('express');
var cors = require('cors');
const { in_array } = require('./helper');
const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req,res) => {
    return res.status(200).send("Ohaiyo!");
});

app.get("/stats", (req,res)=>{
    if (docStatus === 1){
        doc.loadInfo().then(() => {
            const sheet = doc.sheetsByIndex[2];
            sheet.getRows().then((result)=>{
                const data = result[0];
                const headers = data._sheet.headerValues;
                const rawdata = data._rawData;
                let output = {};
                for (let index in headers){
                    output[headers[index]] = rawdata[index];
                }
                return res.status(200).send(output);
            });
        });
    }else{
        return res.status(500).send({"error":"Sheet is not ready"});
    }
});

app.get("/members", (req,res)=>{
    if (docStatus === 1){
        doc.loadInfo().then(() => {
            const sheet = doc.sheetsByIndex[1];
            sheet.getRows().then((result)=>{
                let output = {};
                for (let item in result){
                    let inner_dict = {}
                    const data = result[item];
                    const headers = data._sheet.headerValues;
                    const rawdata = data._rawData;
                    
                    for (let index in headers){
                        inner_dict[headers[index]] = rawdata[index];
                    }
                    if (output[inner_dict.batch] === undefined){
                        output[inner_dict.batch] = {"members":[inner_dict],"length":1};
                    }else{
                        output[inner_dict.batch].members.push(inner_dict);
                        output[inner_dict.batch].length += 1;
                    }
                }
                
                return res.status(200).send(output);
            });
        });
    }else{
        return res.status(500).send({"error":"Sheet is not ready"});
    }
});

app.get("/projects", (req,res)=>{
    if (docStatus === 1){
        doc.loadInfo().then(() => {
            const sheet = doc.sheetsByIndex[0];
            sheet.getRows().then((result)=>{
                let output = {};
                for (let item in result){
                    let inner_dict = {}
                    const data = result[item];
                    const headers = data._sheet.headerValues;
                    const rawdata = data._rawData;
                    
                    for (let index in headers){
                        inner_dict[headers[index]] = rawdata[index];
                    }
                    if (output[inner_dict.year] === undefined){
                        output[inner_dict.year] = {"projects":[inner_dict],"length":1};
                    }else{
                        output[inner_dict.year].projects.push(inner_dict);
                        output[inner_dict.year].length += 1;
                    }
                }
                
                return res.status(200).send(output);
            });
        });
    }else{
        return res.status(500).send({"error":"Sheet is not ready"});
    }
});

app.get("/about", (req,res)=>{
    if (docStatus === 1){
        doc.loadInfo().then(() => {
            const sheet = doc.sheetsByIndex[3];
            sheet.getRows().then((result)=>{
                let output = [];
                for (let item in result){
                    let inner_dict = {}
                    const data = result[item];
                    const headers = data._sheet.headerValues;
                    const rawdata = data._rawData;
                    for(let index in headers){
                        inner_dict[headers[index]] = rawdata[index];
                    }
                    output.push(inner_dict);
                }
                return res.status(200).send(output);
            });
        });
    }else{
        return res.status(500).send({"error":"Sheet is not ready"});
    }
});

app.get("/publications", (req,res)=>{
    if (docStatus === 1){
        doc.loadInfo().then(() => {
            const sheet = doc.sheetsByIndex[4];
            sheet.getRows().then((result)=>{
                let output = [];
                for (let item in result){
                    let inner_dict = {}
                    const data = result[item];
                    const headers = data._sheet.headerValues;
                    const rawdata = data._rawData;
                    for(let index in headers){
                        inner_dict[headers[index]] = rawdata[index];
                    }
                    output.push(inner_dict);
                }
                return res.status(200).send(output);
            });
        });
    }else{
        return res.status(500).send({"error":"Sheet is not ready"});
    }
});

app.get("/events/:event", (req,res)=>{
    let event;
    //Map event to index
    const eventName = req.params.event;
    switch (eventName){
        case 'hashcode':{event = 5; break;}
        case 'incito':{event = 6; break;}
        case 'internship':{event = 7; break;}
        case 'roadshow':{event = 8;break;}
        default:{
            res.status(400).send();
            return;
        }
    }
    if (docStatus === 1){
        doc.loadInfo().then(() => {
            const sheet = doc.sheetsByIndex[event];
            sheet.getRows().then((result)=>{
                let output = [];
                for (let item in result){
                    let inner_dict = {}
                    const data = result[item];
                    const headers = data._sheet.headerValues;
                    const rawdata = data._rawData;
                    for(let index in headers){
                        if (rawdata[index] === undefined){
                            inner_dict[headers[index]] = "";
                        }else{
                            inner_dict[headers[index]] = rawdata[index];
                        }
                    }
                    if (inner_dict["image_links"] !== undefined && inner_dict["image_links"] !== ""){
                        inner_dict["image_links"] = inner_dict["image_links"].replace(/[\r\n]+/gm,"").split(",");
                    }else{
                        inner_dict["image_links"] = [];
                    }
                    output.push(inner_dict);
                }
                return res.status(200).send(output);
            });
        });
    }else{
        return res.status(500).send({"error":"Sheet is not ready"});
    }
});

app.post("/projects/student", (req, res, next)=>{
    try {
        req.body.studentName = req.body.studentName.toLowerCase();
        const regex = /^[a-zA-Z ]{2,90}$/;
        if ( !regex.test(req.body.studentName) ){
            throw "invalid";
        }
    } catch (error) {
        return res.status(400).send({"error":"Student name is not present or invalid"});   
    }
    next();
}, (req, res)=>{
    const { studentName } = req.body;
    if (docStatus === 1){
        doc.loadInfo().then(() => {
            const sheet = doc.sheetsByIndex[0];
            sheet.getRows().then((result)=>{
                let output = {
                    mentor: [],
                    intern: []
                };
                for (let item in result){
                    let inner_dict = {}
                    const data = result[item];
                    const headers = data._sheet.headerValues;
                    const rawdata = data._rawData;

                    for(let index in headers){
                        inner_dict[headers[index]] = rawdata[index];
                    }
                    
                    const { interns, mentors } = inner_dict;

                    if (  in_array( interns , studentName ) ){
                        output.intern.push( inner_dict );
                    }

                    if (  in_array( mentors , studentName ) ){
                        output.mentor.push( inner_dict );
                    }
                }
                return res.status(200).send(output);
            });
        });
    }else{
        return res.status(500).send({"error":"Sheet is not ready"});
    }
});

app.get("/articles", (req,res)=>{
    if (docStatus === 1){
        doc.loadInfo().then(() => {
            const sheet = doc.sheetsByIndex[9];
            sheet.getRows().then((result)=>{
                let output = [];
                for (let item in result){
                    let inner_dict = {}
                    const data = result[item];
                    const headers = data._sheet.headerValues;
                    const rawdata = data._rawData;
                    for(let index in headers){
                        inner_dict[headers[index]] = rawdata[index];
                    }
                    output.push(inner_dict);
                }
                return res.status(200).send(output);
            });
        });
    }else{
        return res.status(500).send({"error":"Sheet is not ready"});
    }
});

const port = process.env.PORT || 3000;

app.listen(port, () =>{
    console.log(`PES Innovation Lab API running on port ${port}!!`);
});
