const { set } = require("express/lib/application");
var jsrecommender = require("js-recommender");
const Place = require("../model/Place");
const TravelerPlaces = require('../model/TravelerPlaces');
var recommender = new jsrecommender.Recommender();
// var recommender = new jsrecommender.Recommender({
//   alpha: 0.01, // learning rate
//   lambda: 0.0, // regularization parameter
//   iterations: 500, // maximum number of iterations in the gradient descent algorithm
//   kDim: 2 // number of hidden features for each movie
// });
   
const recommendeCollaborativeFilterin = async (req, res) => {
  console.log("query", req.query)
  
  TravelerPlaces.find({travelerMail:req.query.travelerMail},{ travelerMail: 1, placeId: 1,travelerPlaceRating: 1,_id: 0 })
  .then(resTravelerPlaces=>{

    TravelerPlaces.find({tripDestination:req.query.tripDestination},{ travelerMail: 1, placeId: 1,travelerPlaceRating: 1,tripDestination:1, _id: 0 })
      .then(resUsersPlacesInDes=>{
        const placeInDes = new  Set()
        for(const k in resUsersPlacesInDes){
          placeInDes.add(resUsersPlacesInDes[k].placeId)
        }
        const places= new Set()
        for(const i in resTravelerPlaces){
          if(!placeInDes.has(resTravelerPlaces[i])){
            places.add(resTravelerPlaces[i].placeId)
          }
        }
        TravelerPlaces.find({placeId:{$in:Array.from(places)}},{ travelerMail: 1, placeId: 1,travelerPlaceRating: 1, _id: 0 })
        .then(resUsersPlaces=>{
        var table = new jsrecommender.Table();
        // table.setCell('[place-id]', '[traveler mail]', [score]);
        for(const j in resUsersPlaces){
          table.setCell(resUsersPlaces[j].placeId , resUsersPlaces[j].travelerMail, resUsersPlaces[j].travelerPlaceRating);
        }
        for(const i in resUsersPlacesInDes){
          table.setCell(resUsersPlacesInDes[i].placeId , resUsersPlacesInDes[i].travelerMail, resUsersPlacesInDes[i].travelerPlaceRating);
        }
        console.log(table)
        
        var model = recommender.fit(table);
        console.log(model);
        
        predicted_table = recommender.transform(table);
        
        console.log(predicted_table);
       var recommendPlace=[]
        for (var i = 0; i < predicted_table.columnNames.length; ++i) {
            var user = predicted_table.columnNames[i];
            if(user== req.query.travelerMail){
              console.log('For user: ' + user);
              for (var j = 0; j < predicted_table.rowNames.length; ++j) {
                  var movie = predicted_table.rowNames[j];
                  if( Number.isNaN(Math.round(table.getCell(movie, user)))){
                  console.log('Movie [' + movie + '] has actual rating of ' + Math.round(table.getCell(movie, user)));
                  console.log('Movie [' + movie + '] is predicted to have rating ' + Math.round(predicted_table.getCell(movie, user)));
                  var x= Math.round(predicted_table.getCell(movie, user))
                  if(x>3){
                    recommendPlace.push(movie)
                  }
                  }
              }
          }
        }
        Place.find({placeId:{$in:Array.from(recommendPlace)}})
        .then(result=>{
          res.send(result)
        })
        .catch(err=>{
          res.send('false')
        })

      })
      .catch(err=>{
        res.send('false')
      })
     
    })
    .catch(err=>{
      res.send('false')
    })
   
  })
  .catch(err=>{
    res.send('false')
})
}

module.exports ={recommendeCollaborativeFilterin}