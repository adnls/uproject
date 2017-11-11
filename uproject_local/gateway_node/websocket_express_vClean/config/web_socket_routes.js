var myEmitter = require("./eventEmitter");

module.exports = (io) => {
    // This is what the socket.io syntax is like, we will work this later
    io.on('connection', socket => {
        console.log('New client connected');
        
        // just like on the client side, we have a socket.on method that takes a callback function
        socket.on('myEvent1', (randomVar) => {
            // once we get a 'change color' event from one of our clients, we will send it to the rest of the clients
            // we make use of the socket.emit method again with the argument given to use from the callback function above
            console.log('Lancement de mon premier event: ', randomVar);
            io.sockets.emit('myEvent1', randomVar);
        });

         myEmitter.on('microserviceSendMessage', (whichOne, data) => {
            console.log('un microservice a envoyé une requette http sur la route : *******  /' + whichOne);
            console.log('l event est recu dans mon eventlistener');
            io.sockets.emit('myEvent1', "hotpink");
            io.sockets.emit('myEvent2', data);
        });

        myEmitter.on('uBotNewInsertEvent', (whichOne, monJson) => {
            console.log('un microservice a envoyé une requette http sur la route : *******  /' + whichOne);
            console.log('l event est recu dans mon eventlistener');
            io.sockets.emit('myEvent1', monJson);
        });

        // disconnect is fired when a client leaves the server
        socket.on('disconnect', () => {
            console.log('user disconnected');
        })

        // Requete http envoyé par un microservice recu 
    });
}