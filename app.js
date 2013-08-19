express = require('express')
expressio = require('express.io')()
app = expressio.http().io()
app.use(express.static(__dirname + '/public'));



// Setup the ready route, and emit talk event.
app.io.route('ready', function (req) {


    function device(useragent) {
        if (/iPhone/.test(useragent)) {
            return 'iPhone';
        }
        else if (/Android 4/.test(useragent)) {
            return 'android';
        }
        else {
            return 'unknow'
        }

    }

    var device = device(req.data);
    req.io.emit('newUser', {
        device: device
    })
    req.io.broadcast('newUser', {
        device: device
    })
})

// Send the client html.
app.get('/', function (req, res) {
    res.sendfile(__dirname + '/views/index.html')
})

app.listen(3000)



