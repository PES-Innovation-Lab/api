const { GoogleSpreadsheet } = require('google-spreadsheet');
require('dotenv').config();

var docStatus = 0; // 0 - not ready 1 - ready

// spreadsheet key is the long id in the sheets URL
const doc = new GoogleSpreadsheet(process.env.SHEET_ID);
doc.useServiceAccountAuth({
    client_email: process.env.CLIENT_EMAIL,
    private_key: process.env.CLIENT_KEY.replace(/\\n/gm, '\n'),
}).then(() =>{
    doc.loadInfo().then(() => {
        docStatus = 1;
    });
});

const express = require('express');

const app = express();

app.get("/", (req,res) => {
    return res.status(200).send("Ohaiyo!");
});

app.get("/stats", (req,res)=>{
    if (docStatus === 1){
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
    }else{
        return res.status(500).send({"error":"Sheet is not ready"});
    }
});

app.get("/members", (req,res)=>{
    if (docStatus === 1){
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
                if (!output[inner_dict.batch]){
                    output[inner_dict.batch] = {"members":[inner_dict],"length":1};
                }else{
                    output[inner_dict.batch].members.push(inner_dict);
                    output[inner_dict.batch].length += 1;
                }
            }
            
            return res.status(200).send(output);
        });
    }else{
        return res.status(500).send({"error":"Sheet is not ready"});
    }
});

app.get("/projects", (req,res)=>{
    if (docStatus === 1){
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
                if (!output[inner_dict.year]){
                    output[inner_dict.year] = {"projects":[inner_dict],"length":1};
                }else{
                    output[inner_dict.year].members.push(inner_dict);
                    output[inner_dict.year].length += 1;
                }
            }
            
            return res.status(200).send(output);
        });
    }else{
        return res.status(500).send({"error":"Sheet is not ready"});
    }
});

app.listen(process.env.PORT, () =>{
    console.log(`PES Innovation Lab API running on port ${process.env.PORT}!!`);
});