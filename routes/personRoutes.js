const express = require('express');
const router = express.Router();
const person = require('./../models/person.js');


//Post rote to adda person
router.post('/',async(req,res)=>{
    try{
    const data = req.body // Assuning the requiest body contains the person data

    //Creat a new person document using the mongoose model
    const newPerson = new person(data);

    //save the new person to the database
    const response = await newPerson.save();
    console.log('data saved');
    res.status(200).json(response);
}
 catch(err){
    console.log(err);
    res.status(500).json({error:'internal server Error'});      
    }
})


//GET method to get person
router.get('/',async(req,res)=>{
    try{
        const data = await person.find();
        console.log('data fetched');
    res.status(200).json();
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'internal server Error'});      
        }

})


//worktype rout

router.get('/:workType',async(req,res)=>{
    try{
        const worktype = req.params.workType;
        if(worktype == 'chef' || worktype == 'manager' || worktype =='waiter'){
            const response = await person.find({work: worktype});
            res.status(200).json(response);
        }else{
            res.status(404).json({error: 'invalid work type'});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error:'internal server Error'});
    }
})

//mongodb id to update route
router.put('/:id', async (req, res)=>{
    try{
        const personId = req.params.id; //extract the id from the url parameter
        const updatedPersonData = req.body; //updated data for the person

        const responce = await person.findByIdAndUpdate(personId, updatedPersonData,{
            new:true, //return the update document
            runValidators: true, // run Mongoose validation
        })

        if (!responce) {
            return res.status(404).json({error:'person not found'});
        }
        console.log('data update');
        res.status(200).json(responce);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'internal server Error'});
    }
})




//delete route

router.delete('/:id', async (req, res) => {
    try{
        const personId = req.params.id;

        const response = await person.findByIdAndDelete(personId);
        if (!response){
            return res.status(404).json({error:'person not found'});
        }
        console.log('data delete');
        res.status(200).json({message:'person deleted Successfully'});

    }catch(err){
        console.log(err);
        res.status(500).json({error:'internal server Error'});
    }
})


module.exports = router;

