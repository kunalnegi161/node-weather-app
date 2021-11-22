const request =  require('request')

const forecast = (latitude,longitude,callback) => {
     const url = 'http://api.weatherstack.com/current?access_key=0eed954f72d01bcb09cd0eeef1c9f16d&query='+latitude+','+longitude

     request({url, json: true}, (error,{ body}) => {
        //  console.log(response.body.current)
        if(error){
            callback('Unable to connect to the weather services!',undefined)
        }else if(body.error){
            callback('Unable to find location!',undefined)
        }else{
            callback(undefined, body.current.weather_descriptions[0]+'. It is currently '+body.current.temperature+' degrees out. Feels Like '+body.current.feelslike)
        }
    })
}

module.exports = forecast