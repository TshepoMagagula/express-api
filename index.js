import express from 'express';

const app = express();

//app.use(express.urlencoded({ extended: }))


/* app.get('/', function(req, res) {
    res.send('Hello from my API!')
})

app.get('/api/greet', function(req, res) {
    console.log(req.query);
    const username = req.query.username;
    res.json({
        message: `Hello, ${username}`
    })
}) */

app.use(express.json())

app.use(express.static('public'));

const greetings = {
    'english': 'Hello',
    'zulu': 'Sawubona'
}

//call the api like this - http:loca
app.get('/api/greet', function(req, res) {
    const username = req.query.username;
    const language = req.query.language;

    if(!greetings[language]) {
        return res.json({
            error: `Invalid language supplied:  ${language}`
        })
    }

    const greeting = greetings[language];
    res.json({
        message: `${greeting}, ${username}`
    })
});

app.post('/api/greet', function(req, res){

    //add an entry to our greeting map
    const language = req.body.language;
    greetings[language] = req.body.greeting

    res.json({
        status: 'success',
        message: `Added a greeting for ${language}`
    });

});

/* app.get('/api/greet/:username', function(req, res) {
    console.log(req.params);
    const username = req.params.username;
    res.json({
        message: `Hello, ${username}`
    })
}) */

const PORT = 4009;

app.listen(PORT, function () {
    console.log(`app started ${PORT}`)
})