const fs = require('fs');
const lineReader = require('line-reader');
const express = require('express');
const app = express();
const setup =require("./setup.json");
let messageFile=setup.messageFile;
let usersFile=setup.usersFile;
let conversationFile=setup.conversationFile;
let array =[];
let conversation=[];
let users=[];
let message=[];
function verif(id,Value1,Value2){
     switch(id){
        case 0:
             for(let i=0;i<users.length;i++){
                 if(users[i].tagU==Value1){
                     return users[i].name
                 }
             }
        break;
        case 1:
            for(let i=0;i<users.length;i++){
                if(users[i].login==Value1){
                    return true
                }
            }
        break;
        case 2:
            for(let i=0;i<users.length;i++){
                if(users[i].login==Value1 && users[i].password==Value2){
                    return users[i];
                }
            }
            return "error login";
        case 3:
             for(let i=0;i<conversation.length;i++){
                 if(conversation[i].tagC==Value1){
                     return conversation[i];
                 }
             }
        break;
        case 4:
            for(let i=0;i<conversation.length;i++){
                if(conversation[i].tagC==Value1){
                    return i;
                }
            }
        break;
        case 5:
            for(let i=0;i<conversation[Value2].member.length;i++){
                if(conversation[Value2].member[i].tag==Value1){
                    return true;
                }
            }
        break;
        case 6:
            let returnedData=[];
            console.log(message);
            for(let i=0;i<message.length;i++){
                if(message[i].tagC==Value1){
                    returnedData.push(message[i]);
                }
            }
            return returnedData;
        //break;
     }
     return false;
 }


class messageD{
    constructor(sender,mData,tagC){
        this.tagC=tagC;
        this.sender=sender;
        this.date=new Date();
        this.mData=mData;
    }
}
class conversationD{
    member=[];
    constructor(creator,name,tagC){
        this.name=name;
        this.creator=creator;
        this.tagC=tagC;
        this.member.push({tag:creator,name:""});
        this.date=new Date();
    }
}
class userD{
    constructor(tagU,name,login,password){
        this.tagU=tagU;
        this.name=name;
        this.login=login;
        this.password=password;
    }
}
//server
app.use(express.json())
app.post('/',(req, res) => {
    array=require("./server");
    conversation=array[2];
    users=array[1];
    message=array[0];
    let returned=[];
    let oldConv;
    switch(req.body.id){
        case 0:
            if(verif(1,req.body.login,"")==false){
                let Ttag=0;
                do{
                    Ttag=Math.floor(Math.random()*10000);
                }while(verif(0,Ttag,"")==true);
                let tempUsers=new userD(Ttag,req.body.name,req.body.login,req.body.password);
                users.push(tempUsers);
                res.json({return:tempUsers});
                fs.appendFile(usersFile,"\n"+JSON.stringify(tempUsers), (err) => {if (err) {console.log(err);}});
            }
            else{
                res.json({return:"this login is already used"});
            }
            
        break;
        case 1:
            res.json({verif:verif(2,req.body.login,req.body.password)});
        break;
        case 2:
            if(verif(2,req.body.login,req.body.password)!=false){
                let Ttag=0;
                do{
                    Ttag=Math.floor(Math.random()*10000);
                }while(verif(0,Ttag,"")==true);
                let tempConversation =new conversationD(req.body.creator,req.body.name,Ttag);
                conversation.push(tempConversation);
                let tI=verif(4,Ttag,"");
                for(let i=0;i<req.body.member.length;i++){
                    if(verif(0,req.body.member[i].tag,"")!=false){
                        conversation[tI].member.push({tag:req.body.member[i].tag,name:""});
                    }
                }
                res.json({return:conversation[tI]});
                fs.appendFile(conversationFile,"\n"+JSON.stringify(conversation[tI]), (err) => {if (err) {console.log(err);}});
            }
            else{
                res.json({return:"error login"});
            }
        break;
        case 3:
            if(verif(2,req.body.login,req.body.password)!=false){
                tI=verif(4,req.body.tagC,"");
                if(tI!=false){
                    if(verif(5,req.body.tag,tI)!=false){
                        let tempMessage=new messageD(req.body.tag,req.body.data,req.body.tagC)
                        message.push(tempMessage);
                        fs.appendFile(messageFile,"\n"+JSON.stringify(tempMessage), (err) => {if (err) {console.log(err);}});
                        res.json({return:"ok message sent"})
                    }
                    else{
                        res.json({return:"this users is not a member"});
                    }
                }
                else{
                    res.json({return:"this channel doesn't exist"});
                }
            }
            else{
                res.json({return:"error login"});
            }
        break;
        case 4:
            let returnedC;
            if(verif(2,req.body.login,req.body.password)!=false){
                for(let i=0;i<conversation.length;i++){
                    if(verif(5,req.body.tag,i)==true){
                        returnedC=conversation[i];
                        for(let a=0;a<returnedC.member.length;a++){
                            let TempName=verif(0,returnedC.member[a].tag,"");
                            if(TempName!=false){
                                returnedC.member[a].name=TempName;
                            }
                        }
                        returned.push(returnedC);
                    }
                    else{
                        res.json({return:"this users is not a member"});
                    }
                }
            res.json({return:returned});
            }
            else{
                res.json({return:"error login"});
            }
        break;
        case 5:
            returned=[];
            let Ttag=verif(2,req.body.login,req.body.password);
            if(Ttag!=false){
                let tI=verif(4,req.body.tagC,);
                if(tI!=false){
                    if(verif(5,Ttag.tagU,tI)){
                        res.json({return:verif(6,req.body.tagC,"")});
                    }
                    else{
                        res.json({return:"this users is not a member"});
                    }
                       
                }
                else{
                    res.json({return:"this channel doesn't exist"});
                }
            }
            else{
                res.json({return:"error login"});
            }
        break;
        case 6:
            if(verif(2,req.body.login,req.body.password)!=false){
                tI=verif(4,req.body.tagC,"");
                if(tI!=false){
                    if(verif(5,req.body.tag,tI)==true){
                        if(verif(5,req.body.tagU,tI)==false){
                            oldConv=JSON.stringify(conversation[tI]);
                            if(verif(0,req.body.tagU,"")!=false){
                                conversation[tI].member.push({tag:req.body.tagU,name:""});
                                var data = fs.readFileSync(conversationFile, 'utf-8');
                                var newConv = data.replace(oldConv, JSON.stringify(conversation[tI]));
                                console.log(conversation[tI]);
                                fs.writeFileSync(conversationFile, newConv, 'utf-8');
                                res.json({return:"user was added"});
                            }
                            else{
                                res.json({return:"this user does not exist"});
                            }
                        }
                        else{
                            res.json({return:"this user was already added"});
                        }
                    }
                    else{
                        res.json({return:"this users is not a member"});
                    }
                }
                else{
                    res.json({return:"this channel doesn't exist"});
                }
            }
            else{
                res.json({return:"error login"});
            }
        break;
        case 7:
            if(verif(2,req.body.login,req.body.password).tagU==req.body.tag){
                tI=verif(4,req.body.tagC,"");
                if(tI!=false){
                    if(verif(5,req.body.tag,tI)==true){
                        oldConv=JSON.stringify(conversation[tI]);   
                        conversation[tI].member.splice(conversation[tI].member.indexOf({tag:req.body.tag,name:""}),1);
                        var data = fs.readFileSync(conversationFile, 'utf-8');
                        console.log(conversation[tI]);
                        var newConv = data.replace(oldConv, JSON.stringify(conversation[tI]));
                        fs.writeFileSync(conversationFile, newConv, 'utf-8');
                        res.json({return:"user was removed"});
                    }
                    else{
                        res.json({return:"this users is not a member"});
                    }
                }
                else{
                    res.json({return:"this channel doesn't exist"});
                }
                
            }
            else{
                res.json({return:"error login"});
            }
        break;
        default:
            res.json({return:"unknow id"});
        break;
    }
    res.status("200");
});
module.exports =app;
