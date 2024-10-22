// Importa as dependências
const express = require('express');
const fs = require('fs');
const Joi = require('joi');
const cors = require('cors'); // Permite que o front-end consuma a API
const path = require('path');

const app = express(); // Inicializa o app Express
app.use(express.json()); // Permite que a API receba JSON no corpo das requisições
// Serve a pasta "public" como conteúdo estático
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint básico para testar a API
app.get('/api', (req, res) => {
  res.json({ message: 'API funcionando!' });
});

// Serve o arquivo index.html por padrão
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
app.use(cors()); // Permite requisições de outros domínios

const dataFilePath = './api/data.json'; // Caminho para o arquivo de persistência de dados

// Função para ler o arquivo JSON que contém os produtos
const readData = () => {
  if (fs.existsSync(dataFilePath)) {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data); // Converte o conteúdo do arquivo em objeto JavaScript
  }
  return []; // Retorna array vazio se o arquivo não existir
};

// Função para salvar os dados no arquivo JSON
const saveData = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2)); // Salva o array de dados como JSON
};

// Esquema de validação com Joi para garantir a integridade dos dados
const productSchema = Joi.object({
  id: Joi.number().integer().required(),         // id é obrigatório e deve ser um número inteiro
  title: Joi.string().min(3).required(),         // title deve ter ao menos 3 caracteres
  description: Joi.string().min(10).required(),  // description deve ter ao menos 10 caracteres
  quantity: Joi.number().integer().min(1).required() // quantity deve ser um número inteiro maior que 0
});

// Middleware de validação que será usado nas rotas POST e PUT
const validateProduct = (req, res, next) => {
  const { error } = productSchema.validate(req.body); // Valida os dados enviados no corpo da requisição
  if (error) {
    return res.status(400).json({ message: error.details[0].message }); // Retorna um erro de validação se houver
  }
  next(); // Passa para o próximo middleware/rota
};

// Rota para listar todos os produtos
app.get('/products', (req, res) => {
  const products = readData(); // Lê os dados do arquivo JSON
  res.json(products); // Retorna os produtos
});

// Rota para adicionar um novo produto
app.post('/products', validateProduct, (req, res) => {
  const products = readData(); // Lê os produtos existentes
  const newProduct = req.body; // Pega o produto enviado no corpo da requisição
  products.push(newProduct); // Adiciona o novo produto ao array
  saveData(products); // Salva o array atualizado no arquivo JSON
  res.status(201).json(newProduct); // Retorna o produto criado com status 201
});

// Rota para atualizar um produto existente
app.put('/products/:id', (req, res) => {
  const products = readData(); // Lê os produtos existentes
  const productIndex = products.findIndex(p => p.id === parseInt(req.params.id)); // Procura o produto pelo id

  if (productIndex !== -1) { // Se o produto existir
    products[productIndex] = { ...products[productIndex], ...req.body }; // Atualiza o produto com os novos dados
    saveData(products); // Salva o array atualizado no arquivo JSON
    res.json(products[productIndex]); // Retorna o produto atualizado
  } else {
    res.status(404).json({ message: 'Product not found' }); // Retorna erro 404 se o produto não for encontrado
  }
});

// Rota para deletar um produto
app.delete('/products/:id', (req, res) => {
  const products = readData(); // Lê os produtos existentes
  const newProducts = products.filter(p => p.id !== parseInt(req.params.id)); // Remove o produto pelo id
  saveData(newProducts); // Salva o array atualizado no arquivo JSON
  res.json({ message: 'Product deleted' }); // Retorna uma mensagem de sucesso
});

// Inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
