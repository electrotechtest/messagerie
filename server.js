const http = require('http');
const express = require('express');
const app = require('./index');
const setup = require("./setup.json")
const lineReader = require('line-reader');
const fs = require('fs');

let users=[];
let conversation=[];
let message=[];
let array=[];

function setupServe(){
    let port=setup.port;
    let host=setup.host;
    const server = http.createServer(app);
    server.listen(port, host, () => {
        console.log(`Server is running on http://${host}:${port}`);
    }); 
}
lineReader.eachLine(setup.messageFile,(line,last)=>{
    message.push(JSON.parse(line));
    if (last==true){
        lineReader.eachLine(setup.usersFile,(line,last)=>{
            users.push(JSON.parse(line));
            if (last==true){
                lineReader.eachLine(setup.conversationFile,(line,last)=>{
                    conversation.push(JSON.parse(line));
                    if (last==true){
                        array.push(message);
                        array.push(users);
                        array.push(conversation);
                        setupServe();
                    }});
        }});
}});
module.exports = array;