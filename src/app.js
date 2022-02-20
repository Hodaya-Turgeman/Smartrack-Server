const express = require('express')
const app = express()
const path=require('path');
const dotenv=require('dotenv')
const isProd = process.env.APP_ENV === 'prod'
if(!isProd)
    dotenv.config({path:'.env'})
const bodyParser=require('body-parser')
const mongoose=require('mongoose')


const apiPlanTrip = require('./route/apiPlanTrip');
const apiTraveler = require('./route/apiTraveler');
// const Joi = require('joi');
// const { date } = require('joi');
// Joi.objectId = require('joi-objectid')(Joi);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.urlencoded({ extended: true }))
app.use(express.json());


// app.use(express.static('public'))
app.set('view engine', 'ejs')



const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect("mongodb+srv://smartrack:smartrack@smartrack.pt0ms.mongodb.net/Smartrack?retryWrites=true&w=majority", connectionParams)
    .then(() => {
        console.log('connected');

    }).catch((err) => {
        console.log(`error connecting ${err}`);
})
app.get('/', (req,res) => {
    res.render('homePage');
});




// app.use('/css', express.static(__dirname + 'public/css'));
// app.use('/js', express.static(__dirname + 'public/js'));
// app.use('/imgages', express.static(__dirname + 'public/imgages'));

// app.get('/', (req,res) => {
//     res.render('contractorSignUp');        
// });


app.use('/plantrip',apiPlanTrip)
app.use('/traveler',apiTraveler)


const port =  process.env.PORT || 4000
app.listen(port, () => {    
    console.log(`\nserver is up and running at: http://127.0.0.1:${port}\n` )
})
