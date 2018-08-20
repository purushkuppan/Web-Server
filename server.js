const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

var port = process.env.PORT || 5000
var app = express();

app.set( 'hbs' )

hbs.registerPartials(__dirname+'/views/partials')
hbs.registerHelper('copyRight', () =>{
    return new Date().getFullYear();
})

hbs.registerHelper('upper', (text) =>{
    return text.toUpperCase();
})
app.use((req, res, next)=> {
    var log = `${new Date().toString()}`+`${req.method}`+
        `${req.url}`+`\n`
    fs.appendFile('server.log', `${log}`, (err) => {
        if(err)
            console.log('Unable to load', err)
    })

    next()
})
app.get('/', (req, res)=> {
    res.render('home.hbs', {
        name : "Purush",
        wrk : ['Infra', 'Infosys']
    })
})

app.listen(port,() => {
    console.log('App started');
})