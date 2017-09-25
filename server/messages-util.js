"use strict";
//adding two arrays to the global variable Babble 
var Babble = {
    serverCounter: 0,
    lastMsgId: 0,
    usersList: [],
    messagesList: []
}


//you can know the values of the room stats by the length of each array above using: Babble.users.length;

function addMessage(message) {    //the function return Number(id)
    Babble.serverCounter = Babble.serverCounter + 1;
    var gravatar;
    //get the image of the user
    if (message.email === "" || message.email === undefined) {
        gravatar = "/client/images/anonymous.png";
    } else {
        var userIndex = Babble.usersList.findIndex(function (element) {
            return element.email === message.email;
        });
        gravatar = Babble.usersList[userIndex].gravatar;
    }
    
    /*newMessage = {
        name: message.name,
        email: message.email,
        gravatar: gravatar,
        message: message.message,
        timestamp: message.timestamp,
        id: Babble.serverCounter
    }*/
    //should use only this:
    message.gravatar = gravatar;
    message.id = Babble.serverCounter
    
    Babble.messagesList.push(message);
    Babble.lastMsgId = Math.max.apply(Math, Babble.messagesList.map(function (o) { return o.id; })); //will return the newst id number 
    return Babble.serverCounter;
}
function getMessages(counter) {
    var messages = [];

    messages = Babble.messagesList.filter(function (element) {
        return element.id > counter;
    });
    //console.log("msgs : " + JSON.stringify(messages));
    return messages;
}
function deleteMessage(id) {  //pay attention,id is string***********
    var idIndex = Babble.messagesList.findIndex(function (element) {
        return element.id == id;
    });
    console.log("idIndex : " + idIndex);
  //  if (idIndex >= 0) {
        Babble.messagesList.splice(idIndex, 1);
    //}
    Babble.lastMsgId = Math.max.apply(Math, Babble.messagesList.map(function (o) { return o.id; })); //will return the newst id number 
}
module.exports = { Babble, addMessage, getMessages, deleteMessage };

