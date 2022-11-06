
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http,{
  cors:{
    origin:"http://localhost:3000"
  },
  allowEIO3: true
});
const port = process.env.PORT || 3000;
const mongoose=require('mongoose');
app.use(express.static(__dirname + '/public'));
let users=[];
function onConnection(socket){
  let curr;
  socket.on('user-connected',(data)=>{
    console.log("connection");
    users.push(data.user);
    curr=data.user;
    console.log(users);
    io.emit("user-connected",{users});
  });
  socket.on('disconnect',()=>{
    console.log("Disconnect");
    let newArr=new Array;
    for(let i=0;i<users.length;i++)
    {
      console.log(users[i]);
      console.log(curr);
      if(users[i]===curr)
      {
        
      }
      else{
        newArr.push(users[i]);
      }
    }
    users=newArr;
    io.emit("user-connected",{users});
    console.log(users);
  })
  socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));
}

io.on('connection', onConnection);

http.listen(port, () => console.log('listening on port ' + port));
