"use strict";
var Babble = {
    serverCounter: 0,
    lastMsgId: 0,
    usersList: [],
    messagesList: []
}


//you can know the values of the room stats by the length of each array above using

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
    return messages;
}
function deleteMessage(id) {  //pay attention,id is string
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

