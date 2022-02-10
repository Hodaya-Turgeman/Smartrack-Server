const express = require('express');
const router = express.Router();
const KmeansLib = require('kmeans-same-size');

const sameSizeKMeans = async (req, res) => {

    var kmeans = new KmeansLib();
    const k = req.query['numDayTrip']; // Groups Number
    const size = 3 // Group size
    console.log("query", req.query)
    // let vectors = [
    // { x: -1.10, y: -1.10 },
    // { x: -1.20, y: -1.20 },
    // { x: -1.30, y: -1.30 },
    // { x: -1.40, y: -1.40 },
    // { x: -1.50, y: -1.50 },
    // { x: -1.60, y: -1.60 },
    // { x: -1.70, y: -1.70 },
    // { x: -1.80, y: -1.80 },
    // { x: -1.90, y: -1.90 },
    // ]
    // let vectors = [
    //     { x: 32.106497, y: 34.81188100000001 },
    //     { x: 32.0747169, y: 34.79148800000001 },
    //     { x: 32.0962934, y: 34.7726703 },
    //     { x: 51.5478302, y: -0.1512823 },
    //     { x: 51.5061267, y: 0.0170173 },
    //     { x: 51.5763589, y: -0.2236956 },
    //     { x: 34.008576, y: -118.498101 },
    //     { x: 34.13696960000001, y: -118.3541763 },
    //     { x: 34.13869049999999, y: -118.35644 },
    //     ]
    kmeans.init({k: k, runs: size, equalSize: true, normalize: false });
    let arrTrip = req.query['t']
    let vectors = []
    for (const i in arrTrip){
        var temp= arrTrip[i].split(",")
        console.log(temp)
        var dict ={}
        dict['x'] = temp[0]
        dict['y'] = temp[1]
        vectors.push(dict)
    }
    
    const sum = kmeans.calc(vectors);
    console.log(vectors);
    result=""
    for(const j in vectors){
        result+="t"+j+"="+vectors[j]['k']+","
    }
    return res.send(result)
}


module.exports ={sameSizeKMeans}


