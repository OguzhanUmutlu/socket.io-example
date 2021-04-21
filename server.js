const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    socket.on('results', msg => {
        io.emit('results', msg);
    });
    socket.on('filetext', msg => {
        io.emit('filetext', msg);
    });
});

function addText(a) {
    io.emit("results", a);
}
function setFileText(a) {
    io.emit("filetext", a);
}

app.get("/test", (req,res) => {
    addText("If your screen is on i should be in your screen.<br>");
    res.send("Check screen!");
})

http.listen(3000, () => {
    console.log(`Socket.IO server running at http://localhost:3000/`);
    setInterval(function(){
        let file = require("fs").readFileSync("./some_folder/somefile.txt");
        setFileText(file.toString());
    }, 100)
});
