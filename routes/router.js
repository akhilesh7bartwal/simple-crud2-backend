const express = require('express');

const router = express.Router();
const users= require('../model/userSchema');

// router.get('/', (req,res) =>{
//     console.log('connected');
// });


//register user

router.post('/register',async (req,res)=>{
    const {name,email, age, mobile, work, address, desc} = req.body;

    if(!name || !email || !age || !mobile || !work || !address || !desc){
        console.log(res.data);
        res.status(404).json("Data is not fully filled. please fill it again");
    }

    try{
        const preUser= await users.findOne({email:email});
        if(preUser){
            res.status(404).json("User already registerd")
        }
        else{
            const newUser = new users({name,email, age, mobile, work, address, desc});
            await newUser.save();
            res.status(201).json(newUser);
        }
    }
    catch(error){
        res.status(404).json(error)
    };

});


//show users in home page

router.get('/getusers',async (req,res) =>{
    try{
        const userdata= await users.find()
        //console.log(userdata);
        res.status(201).send(userdata);
    }
    catch(error){
        res.status(404).send(error.message);
        console.log(error.message);
    }
})

//show details of user

router.get('/getuser/:id', async (req,res) =>{

    try{
        //const {id} = req.params;
        const userdata = await users.findById({_id:req.params.id});
        res.status(201).send(userdata)
    }
    catch(error){
        res.status(404).send(error);
        console.log(error.message);
    }
})

//update details of user

router.patch('/updateuser/:id', async (req,res)=>{

    try{
        const updateddata= await users.findByIdAndUpdate(req.params.id, req.body,{
            new:true
        });
    
        //console.log(updateddata);
        res.status(201).send(updateddata);
    }
    catch(error){
        res.status(404).send(error)
        //console.log(error);
    }

})

//delete api

router.delete('/deleteuser/:id', async (req,res)=>{
    try{
        await users.findByIdAndDelete({_id: req.params.id});
        res.status(201).send('successfully deleted');
    }
    catch(error){
        res.status(404).send(error);
    }
})

module.exports = router;