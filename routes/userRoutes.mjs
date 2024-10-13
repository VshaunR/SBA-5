import express from 'express';
let router = express.Router();

import {users} from '../data/user.mjs';
import {accounts} from '../data/account.mjs';

router.post('/register',(req,res)=>{

  try{
    let name = req.body.name;
    let email = req.body.username;
    let password = req.body.password;
     if(name && email && password){
      if(users.find((u)=>u.username ==req.body.username)){
        console.log('username already exists')
        res.redirect('/');
        return;
       }
       const locals = {
        id:users.length+1,
        name:name,
        username:email,
        password:password
      };
      users.push(locals)
     }
      res.render('login.ejs')
      // console.log(req.body.name)
      
  
  
   
  }catch(err){
    console.error(err);
  }


});

router.get('/login',(req,res)=>{
  try{

    res.render('login.ejs')

  }catch(err){
    console.error(err)
  }

})
router.post('/login',(req,res)=>{

    try{
      let email = req.body.username;
      let password = req.body.password;
      if(users.find(u=>u.username ==req.body.username)){
        let user= users.find((u)=>u.username== req.body.username);
        // console.log(user.id)

        res.render('home.ejs')
      }else{
        res.send('invalid credentials')
      }
    }catch(err){
      console.log(err)
    }


})


router.get('/create',(req,res)=>{

  try{
   
    
    res.render('home.ejs')
  }catch(err){
    console.error(err)
  }

});
router.post('/create',(req,res)=>{
  try{
    const email = req.body.username;
    const type = req.body.type;
    const balance = req.body.balance;
    let id;
    let user = users.find((u)=>u.username ==email)
    // console.log(user)
    id=user.id;
    let userAcc ={
      id:accounts.length+1,
      userId:id,
      username:email,
      type:type,
      balance:balance

    }
    accounts.push(userAcc);
  // console.log(accounts)
   res.redirect(`/api/user/create/${id}`)
    // res.redirect(`/api/user/create`)
  }catch(err){
    console.error(err)
  }
})

router.get('/create/:id',(req,res)=>{

  try{
   

    let id = req.params.id;
    // console.log(id)
   
    let userAccount = accounts.find((a)=>a.userId ==id)
    console.log(userAccount);
 
    // console.log(userAccount)
    res.render('home.ejs',{accounts:accounts,id:id})
  }catch(err){
    console.error(err)
  }

});


router.get('/edit/:id',(req,res)=>{

  try{
    // console.log(req.params);
    let id= req.params.id;
    let edit = accounts.find((e)=>e.userId ==id)
    res.render('edit.ejs',{edit:edit})
  }catch(err){
    console.error(err)
  }

});




router.post('/edit/:id',(req,res)=>{

  try{
    const email = req.body.username;
    const type = req.body.type;
    const balance = req.body.balance;
    
    let user = users.find((u)=>u.username ==email)
    let id= req.params.id;
    let edit = accounts.find((e,i)=>{
      if(e.userId ==id){
      const locals = {
        id:id,
        userId:e.userId,
        username:email,
        type:type,
        balance:balance,
      };
      const index = accounts.findIndex((a)=>a.id ==id)
       accounts[index] = locals
    }
    })
   
    res.redirect(`/api/user/create/${id}`)
  
  }catch(err){
    console.error(err)
  }

});
router.get('/delete/:id',(req,res)=>{
 
    try{
      let id = req.params.id;
      let userAccount = accounts.find((a)=>a.userId ==id)
    console.log(userAccount);
 
    // console.log(userAccount)
    res.render('home.ejs',{accounts:accounts,id:id})


    }catch(err){
      console.error(err);
    }
});


router.post('/delete/:id',(req,res)=>{
  // console.log(req.params.id)
  try{
    let id = req.params.id;

    let index = accounts.findIndex((a)=>a.userId ==id)
    accounts.splice(index,1)
    res.render('home.ejs',{accounts:accounts,id:id})
  
  }catch(err){
    console.error(err)
  }

 
})





export default router;