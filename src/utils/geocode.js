const request=require('request')
const geocode=(address,callback)=>{
    const url="http://api.weatherapi.com/v1/current.json?key=d5872b5fd2014468b4c80624243103&q="+address
    request({url:url,json:true},(error,{body})=>{
        if(error){
            callback("error while fetching the request",undefined)
        }
        else if(body.error){
            callback(body.error.message,undefined)
        }
        else{
            callback(undefined,{latitude:body.location.lat,
            longitude:body.location.lon})
            
        }
    })
}
module.exports=
geocode
