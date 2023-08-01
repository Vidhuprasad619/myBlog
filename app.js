const express=require('express');
const app=express();
const path=require('path');
const hbs=require('hbs');
const user=require('./routes/user');
const admin=require('./routes/admin');
const connectDB=require('./config/dbConfig')

connectDB();

app.set('view-engine','hbs');
app.set("views",path.join(__dirname,'pages'));

app.use(express.static(path.join(__dirname,'/public')));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use('/',user);
app.use('/admin',admin);


app.listen(5000,()=>{
    console.log("server started at port 5000");
})
