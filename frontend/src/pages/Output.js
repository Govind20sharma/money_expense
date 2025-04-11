const express=require("express");
const app=express()
const mongoose = require("mongoose");


mongoose.connect("mongodb://localhost:27017/myDatabase")
.then(()=>console.log("mongodb connected"))
.catch(err=>console.log(err))


const userSchema=new mongoose.Schema({
  name:String,
  description:String
}

)

const oitem=mongoose.model('user',userSchema)


app.post("/items",async(req,res)=>{
  try{
    const newItem=Item(req.body)
    await newItem.save()
    res.status(201).json(newItem)
  }
  catch(err){
    res.status(400).json({message:err})
  }
})


app.get("items",async(req,res)=>{
  const readItem=await Item.find()
  res.json()
})

app.put("/items:/id",async(req,res)=>{
  const Item=await Items.findByIdAndDelete(req.param.id,req.body)
  res.status(201).json()
})
