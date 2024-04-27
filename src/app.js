const express=require('express')
const path=require('path')
const hbs=require('hbs')
const request=require('request')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')
const app=express()

app.set('view engine','hbs')
app.use(express.static(publicDirectoryPath))
app.set('views',viewsPath)
hbs.registerPartials(partialPath)
app.get('',(req,res)=>{
    res.render('index',{
        title:"weather-website",
        developer:"Pardeep"
    })
})
app.get('/products',(req,res)=>{
  
   res.send( {products:[]})
})
app.get('/weather',(req,res)=>{
    
    geocode(req.query.address,(error,{latitude,longitude}={})=>{
        if(error){
            return res.send({error})
        }
       forecast(latitude,longitude,(error,forecastData)=>{
        if(error){
            return res.send({error})
        }
        res.send({
            forecast:forecastData,
            address:req.query.address

        })
       })
    })
})
app.get('*',(req,res)=>{
    res.send('my 404 page')})
app.listen(3000,()=>{
    console.log("server started at port 3000");
})