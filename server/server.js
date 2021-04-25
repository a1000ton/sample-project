const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

async function main() {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        
        console.log('mongodb is connected yeeeeey');
    } catch(e) {
        console.log(`Deu ruim demais!!! ${e}}`)
    } finally {
        await client.close();
        console.log('client fechou kkkkk')
    }
}

main().catch(console.error)

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})