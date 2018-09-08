var io=require('socket.io')(process.env.PORT || 8080);
var shortid=require('shortid');
console.log('server started');

//Animal a=new Animal('omar');
var playercount=0;
var players = new Array();
players[0] = { id: shortid.generate(), turn: 0, speed: 0, x: 5, y: 0, z: 0 };
players[1] = { id: shortid.generate(), turn: 0, speed: 0, x: 20, y: 0, z: 0 };
players[2] = { id: shortid.generate(), turn: 0, speed: 0, x: 30, y: 0, z: 0 };
players[3] = { id: shortid.generate(), turn: 0, speed: 0, x: 40, y: 0, z: 0 };
players[4] = { id: shortid.generate(), turn: 0, speed: 0, x: 40, y: 0, z: 0 };
var playerconnect = new Array();
var caincrementt = false;

io.on('connection', function (socket) {
    playerconnect[playercount] = players[playercount];
    var thisclientId = playerconnect[playercount].id; 
    caincrementt = true;
    console.log(thisclientId);
    // console.log(socket.);
    // console.log(players.length);
    // console.log(socket.data.length);
    //  console.log(socket.data);

    //var index = players.indexOf (players.find ((id)=>id.id===data.playerId));

    //if(index==-1){
    //players.push({id:data.playerId,left:0,right:0,speed:0,x:0,y:0,z:0});}
    //  console.log(players.length);
    /*if(players.length>=2){
console.log('player id is',players.length);
        io.sockets.emit('users_count',players.length);
    }*/
   
   
    
    var body = "";
   
  
   
  /*  io.emit('chat', {
        body: socket.playerId,

    },
        console.log(body),
    );*/
   

    //var jsonobj = JSON.parse(body);
    
    //var thisclientId=shortid.generate();
    socket.emit('spawall', { "players": playerconnect });
    if (playerconnect.length >= playercount + 1) {

        socket.emit("fuckme", { "player": playerconnect[playercount] });
         socket.broadcast.emit('spawn', { "player": playerconnect[playercount] });
        
}
      
    if (caincrementt == true) {
        playercount++ ,
            console.log(caincrementt);
        caincrementt = false;
    }
   

  
  // players.push ({id:thisclientId,x:0,y:0,z:0});
    
    
    
    //console.log('client connected id:',thisclientId);
    
    
    //playercount++;
  /*  for(i=0; i<playercount; i++)
        {
            socket.emit('spawn');
            console.log('sending spawn to new player');
        }*/
    
    socket.on('move',function(data){
       
        data.playerId=thisclientId;
        //var index = players.indexOf(playerconnect.find((x) => x.id === data.id));
        console.log(data.playerId);
        var index = playerconnect.indexOf(playerconnect.find((id) => id.id === data.playerId));
        playerconnect[index] = data;
        socket.broadcast.emit('move', { "player": playerconnect[index] });
        console.log('client moved', JSON.stringify(playerconnect[index]));
       /* var index = players.indexOf (players.find ((x)=>x.id===data.id));
        
        players [index]=data;
       
        socket.broadcast.emit('move',data);*/
       // console.log(JSON.stringify(data));
        
    });
    
    socket.on('disconnect',function(){
       // data.id=thisclientId;
        //socket.broadcast.emit('d',{id:thisclientId});
         //var index = players.indexOf (players.find ((x)=>x.id===thisclientId));
        
        
        //players.splice (index,1);
       // console.log(index);
        
    });
   

})


