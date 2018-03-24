var io=require('socket.io')(process.env.PORT || 3000);
var shortid=require('shortid');
console.log('server started');

var playercount=0;
var players=new Array();
console.log(shortid.generate());
io.on('connection',function(socket){
    var thisclientId=shortid.generate();
    socket.emit ('spawall',{"players":players});
   players.push ({id:thisclientId,x:0,y:0,z:0});
    console.log('client connected id:',thisclientId);
    
    socket.broadcast.emit('spawn',{id:thisclientId});
    playercount++;
  /*  for(i=0; i<playercount; i++)
        {
            socket.emit('spawn');
            console.log('sending spawn to new player');
        }*/
    
    socket.on('move',function(data){
        data.id=thisclientId;
        console.log(thisclientId);
        var index = players.indexOf (players.find ((x)=>x.id===data.id));
        
        players [index]=data;
        console.log('client moved',JSON.stringify(players[index]));
        socket.broadcast.emit('move',data);
    });
    
    socket.on('disconnect',function(){
       // data.id=thisclientId;
        socket.broadcast.emit('d',{id:thisclientId});
         var index = players.indexOf (players.find ((x)=>x.id===thisclientId));
        
        
        players.splice (index,1);
        
        
    });
   
})

