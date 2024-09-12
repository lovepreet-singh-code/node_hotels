const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/Menuitem.js');


//menuitem post mathod

router.post('/',async(req,res)=>{
    try{
    const data = req.body 
    const newMenu = new MenuItem(data);
    const response = await newMenu.save();
    console.log('Menu card is here..');
    res.status(200).json(response);
}
 catch(err){
    console.log(err);
    res.status(500).json({error:'internal server Error'});      
    }
})


//Menuitem Get method
router.get('/',async(req,res)=>{
    try{
        const data = await MenuItem.find();
        console.log('okk data is here');
    res.status(200).json();
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'internal server Error'});      
        }

})

//work type menuiteam router

router.get('/:tastetype', async(req,res)=>{
    try{
        const tastetype = req.params.tastetype;
        if(tastetype == 'sweet' || tastetype == 'spicy' || tastetype =='sour'){
            const response = await MenuItem.find({taste: tastetype});
            res.status(200).json(response);
        }else{
            res.status(404).json({error: 'invalid work type'});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error:'internal server Error'});
    }
})

//Menuitem update route
router.put('/:id', async (req, res)=>{
    try{
        const menuid = req.params.id; //extract the id from the url parameter
        const updatedmenudata = req.body; //updated data for the person

        const responce = await menu.findByIdAndupdate(menuid, updatedmenudata,{
            new:true, //return the update document
            runValidators: true, // run Mongoose validation
        })

        if (!responce) {
            return res.status(404).json({error:'menu not update'});
        }
        console.log('data update')
        res.status(200).json(responce);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'internal server Error'});
    }
})

//delete route menuiteam 

router.delete('/:id', async (req, res) => {
    try{
        const menuId = req.params.id;

        const response = await menu.findByIdAndDelete(menuId);
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