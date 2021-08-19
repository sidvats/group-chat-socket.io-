const express=require('express');
const app=express();
const fs=require('fs');
const port=process.env.PORT || 4201;

const html=fs.readFileSync('chatfrontend.html');        


app.get('/',(req,res)=>{                  
    res.send(html.toString());
});   

var server=app.listen(port,(err)=>{
    if(err) throw err;
});
const io=require('socket.io')(server);
const users={};

io.on('connection',(socket)=>{
    socket.emit('active-users',users);
    // var activeusers=io.sockets.sockets;     
    socket.on('new-user-joined',name=>{
        users[socket.id]=name;
        socket.emit('init');           
        socket.broadcast.emit('user-joined',name);     
    });
    socket.on('send',(data)=>{
        socket.broadcast.emit('receive',data);   
    })     
});