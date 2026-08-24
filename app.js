import express from 'express';
import 'dotenv/config';

const app = express();
const PORT = process.env.MIPUERTO || process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('API Rest Full con express ES module');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo con ES Modules en el puerto ${PORT}`);
});