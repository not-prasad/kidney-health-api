const express = require("express");

const app = express();

var users = [{
    name:"John",
    kidneys : [{healthy: true},
        {healthy : false}]
}]

app.use(express.json());

app.get("/" , function(req , res ){
    const kidneysOfJohn = users[0].kidneys;
    const numberOfKidneys = kidneysOfJohn.length;
    let noOfHealthyKidneys = 0;
    for( let i = 0 ; i <numberOfKidneys ; i++){

        if(kidneysOfJohn[i].healthy){
            noOfHealthyKidneys =noOfHealthyKidneys + 1;
        }
    }
    const noOfUnHealthyKidneys = numberOfKidneys - noOfHealthyKidneys;
        
        res.json({
            numberOfKidneys,
            noOfHealthyKidneys,
            noOfUnHealthyKidneys
        })
})

app.post("/" , function(req , res){
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy : isHealthy
    })
    res.json({
        msg : "Done !"
    })

})

app.put("/" , function(req , res){
    for( let i = 0 ; i <users[0].kidneys.length ; i++){
        users[0].kidneys[i].healthy = true;

    }
    res.json({  message: "All kidneys updated to healthy",
        updatedKidneys: users[0].kidneys})

})

app.delete("/" , function(req , res){
    if(isThereUnhealthyKidney()){
        const newKidney = [];
        for( let i = 0 ; i <users[0].kidneys.length ; i++){
        if(users[0].kidneys[i].healthy){
            newKidney.push({
                healthy : true
            })
        }

    }
    users[0].kidneys = newKidney;
    res.json({  message: "done ! "
        })

    }
    else{
        res.status(411).json({
            msg : "You have no bad Kidneys "
        })
    }
    

})

function isThereUnhealthyKidney(){
    let atleastOneUnhealthy = false;
    for( let i = 0 ; i <users[0].kidneys.length ; i++){
        if(!users[0].kidneys[i].healthy){
            atleastOneUnhealthy = true;

        }
    }
    return atleastOneUnhealthy;
}
app.listen(3001);