import {Server} from 'socket.io'
const io = new Server(8000,{cors:true})
console.log("Server Started on Port: 8000");

const emailToSocketIdMap = new Map();
const socketIdToEmailMap = new Map();


io.on('connection', socket => {
    console.log("Socket Connected",socket.id)
    socket.on('room:join',(data)=>{
        console.log("Room Join")
        const {email,roomNo} = data;
        emailToSocketIdMap.set(email,socket.id);
        socketIdToEmailMap.set(socket.id,email);
        io.to(roomNo).emit('room:joined',{email,id:socket.id});
        socket.join(roomNo);
        io.to(socket.id).emit('room:joined',data);
    });
    socket.on('user:call',(data)=>{
        console.log("User Call")
        const {to,offer} = data;
        io.to(to).emit('incomming:call',{from:socket.id,offer});
    });
    socket.on('call:accepted',(data)=>{
    const {to,ans}=data;
    console.log("Ans in backed");
    io.to(to).emit('call:accepted',{from:socket.id,ans});
    });

    socket.on('peer:nego:needed',(data)=>{  
        console.log("Peer nego needed");
        const {to,offer} = data;
        io.to(to).emit('peer:nego:needed',{from:socket.id,offer});
    });

    socket.on('peer:nego:done',({to,ans})=>{
        console.log("Peer nego done");
        io.to(to).emit('peer:nego:final',{from:socket.id,ans});
    });
});