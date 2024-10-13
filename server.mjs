import express from 'express';
import ejs from 'ejs';
import bodyParser from 'body-parser';
import userRouter from './routes/userRoutes.mjs';
const app = express();
const PORT = 3000;
app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static('public'))

app.use('/api/user',userRouter);


app.get('/',(req,res)=>{

  res.render('register.ejs')

});
app.get('/loginForm',(req,res)=>{

  res.render('loginForm.ejs')

});

app.listen(PORT,()=>{
  console.log(`Listening to port ${PORT}`)
})