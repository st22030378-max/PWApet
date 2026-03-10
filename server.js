
import express from "express";
import fetch from "node-fetch";

const app=express();

app.use(express.json());
app.use(express.static("public"));

app.post("/chat",async(req,res)=>{

try{

const response=await fetch("https://openrouter.ai/api/v1/chat/completions",{
method:"POST",
headers:{
"Authorization":`Bearer ${process.env.OPENROUTER_KEY}`,
"Content-Type":"application/json"
},
body:JSON.stringify(req.body)
});

const data=await response.json();

res.json(data);

}catch(error){

res.status(500).json({error:"Error en servidor"});

}

});

const PORT=process.env.PORT || 3000;

app.listen(PORT,()=>{
console.log("Servidor corriendo en puerto "+PORT);
});
