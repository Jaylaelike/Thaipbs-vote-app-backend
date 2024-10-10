const io = require('socket.io')(8000,{cors: {origin:"*"}});

let totalVotes = 0;
let votingPolls = {
    'html': 0,
    'css': 0,
    'javascript': 0,
    'react': 0,
    'python': 0,
    'nodejs': 0,
    'express': 0,
    'mongodb': 0,
    'sql': 0,
    'php': 0,
    'laravel': 0,
    'ruby': 0,
    'rails': 0,
    'django': 0,
    'flask': 0,
    'docker': 0,
    'kubernetes': 0,
   
    
}

io.on('connection',socket =>{

    //Send Current Data of Votes to user when visited the site
    socket.emit('update',{votingPolls,totalVotes})

    socket.on('send-vote',voteTo =>{
        totalVotes += 1;
        console.log(voteTo)
        votingPolls[voteTo] += 1;
        socket.broadcast.emit('receive-vote',{votingPolls,totalVotes});
        socket.emit('update',{votingPolls,totalVotes})
    })
})