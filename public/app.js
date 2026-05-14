async function sendMessage(){

const input=document.getElementById("userInput");
const messages=document.getElementById("messages");

const userText=input.value.trim();

if(!userText) return;

messages.innerHTML+=`<p><b>Tú:</b> ${userText}</p>`;

input.value="";

try{

const response=await fetch("/chat",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
model:"meta-llama/llama-3-8b-instruct",
messages:[
{
role:"system",
content:"Eres un asistente experto en cuidado de mascotas (perros, gatos, aves y peces)."
},
{
role:"user",
content:userText
}
]
})
});

const data=await response.json();

if(!response.ok){
messages.innerHTML+=`<p>Error: ${data.error?.message || "Error API"}</p>`;
return;
}

const reply=data.choices[0].message.content;

messages.innerHTML+=`<p><b>PetCare Bot:</b> ${reply}</p>`;

messages.scrollTop=messages.scrollHeight;

}catch(error){

console.error(error);
messages.innerHTML+=`<p>Error de conexión</p>`;

}

}