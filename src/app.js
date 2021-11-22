const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPaths = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPaths)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))



app.get('',(req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Kunal Negi'
    })
})

app.get('/about',(req,res) => {
    res.render('about' , {
        title: 'About',
        name: 'Kunal Negi'
    })
})

app.get('/help', (req,res) => {
    res.render('help',{
        HelpText: 'This is a helpful text.',
        title: 'Help',
        name: 'Kunal Negi'
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Kunal Negi',
        errorMessage: 'Help article not found.'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }

    geocode(req.query.address, (error , { latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

/*
    res.send({
        forecast: 'It is raining',
        location: 'Delhi',
        address: req.query.address
    })
*/    
})

app.get('/products', (req,res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('*', (req,res) => {
    res.render('', {
        title: '404',
        name: 'Kunal Negi',
        errorMessage: 'Page not found'
    })
})
app.listen(3000,() => {
    console.log('Server is up on port 3000')
})

