var botResponses = require('./botResponses')
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 1337;
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
 
app.listen(port, function () {
});

app.post('/', (req, res) => {
    doWork(req.body, res);
});


function doWork(q, res){
   if(q.text){
        let userText = q.text;
        let botResponse = botResponses[userText.toLowerCase()];

        //text that user sent is not in botResponses
        if(!botResponse){
            let data = {
                response_type: 'in_channel',
                text: "not sure, 'all' for all keywords"
            };
            res.json(data);
        }

        // text that user sent is in botResponses
        let data = {
            response_type: 'in_channel',
            text: botResponse,
            unfurl_links: true
        };

        // send the payload
        res.json(data);
    }
}

