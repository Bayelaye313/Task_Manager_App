const express = require('express')

const app = express();
const PORT = 3000

app.get('/', (req, res) =>{

        res.send('hello you')
})


app.listen(PORT, ()=>{
    console.log(`Serveur démarré sur http://localhost:${PORT}`)
})