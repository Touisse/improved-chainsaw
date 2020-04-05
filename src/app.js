const express = require('express')
const path = require('path')
const hbs =require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app =  express()
const publicdir = path.join(__dirname,'../public')
app.use(express.static(publicdir))


const viewspath = path.join(__dirname,'../templates/views')
const partialspath = path.join(__dirname,'../templates/partials')



app.set('view engine','hbs')
app.set('views',viewspath)
hbs.registerPartials(partialspath)


app.get('/weather', (req,res) =>{
    if(!req.query.address){
        return res.send({
        error:'you should type your Address'
        
        })


    } geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req,res) =>{
    res.send({
        products:[]
    })
})

app.get('', (req,res) =>{
    res.render('index',{
        title:'Weather',
        name:'Yassine Touisse'
    })
})
app.get('/about', (req,res) =>{
    res.render('about',{
        title:'About me',
        name:'Yassine Touisse'
    
})
})
app.get('/help', (req,res) =>{
    res.render('help',{
        title:'Help',
        name:'Yassine Touisse'
    
})
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000,()=>{
    console.log('app listening on port 3000')
})