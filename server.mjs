import express from 'express';

import bodyParser from 'body-parser';
import userRouter from './routes/userRoutes.mjs';
const app = express();
const PORT = 3000;
app.use(bodyParser.urlencoded({extended:true}))
app.use((req,res,next)=>{

  const time = new Date();
  console.log(`${time} : Recieved ${req.method} request to ${req.url}`)
  console.log(`${JSON.stringify(req.body)}`)
  next();
});




app.use(express.static('public'))

app.use('/api/user',userRouter);


app.get('/',(req,res)=>{

  res.render('register.ejs')

});
app.get('/loginForm',(req,res)=>{

  res.render('loginForm.ejs')

});


app.use((req, res) => {
  res.status(404);
  res.json({ error: "Resource Not Found" });
});
app.listen(PORT,()=>{
  console.log(`Listening to port ${PORT}`)
})