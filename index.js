//npm run dev to start

const express = require("express");

const { MongoClient, ObjectId } = require("mongodb") //module de mongodb, testa moongoose depois
// const url = "mongodb://localhost:27017";
const url = "mongodb+srv://admin:nTysUGjtNo4vzH3t@cluster0.ckdcow5.mongodb.net";
const databaseName = "crud_gabriel";

 async function main() {
  const client = await MongoClient.connect(url); //Conexão com client
  const database = client.db(databaseName); // Obtém acesso ao database
  const collection = database.collection("agents"); //Acesso a collection

const app = express();

let userName = "Gabriel";
const agents = ["Omen", "Phoenix", "Sage"];

app.use(express.json()); //Sinaliza que está sendo usado JSON no Body

app.get("/", function (req, res) {
  res.send(`Hello ${userName}`);  //Função básica para ínicio de página
});

app.listen(process.env.PORT || 3000, function() { //Função para acionar a port: 3000
  console.log(`Server running at port https://localhost:3000/`) 
});

// Endpoint [GET] /agents Read All; Irá imprimir todos os itens presentes no array "agents"
 app.get("/agents", async function (req, res) {
   const documents = await collection.find().toArray(); //Le documentos da collection
    res.send(documents); //Envia como resposta
 });

 //Endpoint [POST] /agents - CREATE; Irá adicionar novos itens ao array agents
app.post("/agents", async function (req, res){
  const agent = req.body; //Variável criada para definir um novo item no array agents;
  await collection.insertOne(agent); //Método para "empurrar" um valor para o array
  res.send(`Agent ${JSON.stringify(agent.name)} added`) //Confirmação 
})

//Endpoint [GET] /agents/:id - Read by ID
app.get("/agents/:id", async function (req, res){   
  const id = req.params.id; 
  const agent = await collection.findOne({
    _id: new ObjectId(id), 
  }); //findOne busca somente um item do collection 
  
  res.send(agent);
})

//Endpoint [PUT] /agents/:id - update by id atualizar id
app.put("/agents/:id", async function (req, res){
  const id = req.params.id; //Pega o parametro do id
  const agent = req.body; //Pega o nome enviado no body
  await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: agent },
  ) // Atualiza o novo item
  res.send(`Item atualizado`)
})

//Endpoint [DELETE] 
 app.delete("/agents/:id", async function (req, res){
  const id = req.params.id;
  await collection.deleteOne({
    _id: new ObjectId(id),
  })
  res.send(`Agent removido`) //Fazer o nome do agente removido ser lido
 })

 app.get("/oi", function (req, res){
   res.send(`Oi ${userName}`)
 })
 
}

 main();
