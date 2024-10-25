# API de Gestão de Produtos

Este projeto é uma API simples construída com **Node.js** e **Express** que realiza operações CRUD (Create, Read, Update, Delete) em produtos. O objetivo do projeto é servir como uma prática para manipulação de arquivos com **fs**, persistência de dados e validação de entradas, além de integrar o front-end com o back-end servindo um arquivo estático `index.html`.

## Funcionalidades

- **API de produtos**: Operações CRUD para produtos (criação, leitura, atualização e exclusão).
- **Validação de dados**: Validações de campos obrigatórios e consistência dos dados.
- **Persistência em arquivo**: Os dados dos produtos são salvos em um arquivo JSON para garantir que sejam persistidos entre as reinicializações do servidor.
- **Serviço de arquivos estáticos**: O front-end é servido por meio de arquivos HTML estáticos usando Express.

## Tecnologias Utilizadas

- **Node.js**: Plataforma utilizada para rodar o JavaScript no back-end.
- **Express.js**: Framework minimalista para criação de servidores web.
- **Joi**: Biblioteca usada para a validação de dados.
- **Cors**: Middleware para permitir requisições de diferentes origens.
- **Fs**: Módulo nativo do Node.js para leitura e escrita de arquivos.

## Estrutura do Projeto

```bash
api/
├── app.js               # Arquivo principal que contém a lógica do servidor Express
├── products.json        # Arquivo que armazena os dados dos produtos
├── public/              # Diretório para os arquivos estáticos
│   └── index.html       # Página inicial do front-end
├── package.json         # Gerenciamento de dependências do projeto
└── README.md            # Documentação do projeto

## Instalação
Clone o repositório:
git clone https://github.com/GEOVANEQUERINO/api

Navegue até o diretório do projeto:
cd api

Instale as dependências:
npm install

Inicie o servidor:
npm start

Abra no navegador:
Acesse `http://localhost:3001

## Endpoints

Base URL: http://localhost:3001/api

1. Listar todos os produtos
Rota:/api/products
Método: GET
Descrição: Retorna todos os produtos armazenados.
Resposta de sucesso:
json
Copiar código
[
  {
    
   
"id": 1,
    
   
"name": "Produto 1",
    "price": 100,
    "description": "Descrição do produto 1"
  
 
}
]
2. Obter um produto específico
Rota: /api/products/:id
Método: GET
Descrição: Retorna um produto com base no ID fornecido.
Parâmetros:
id: ID do produto (numérico).
Resposta de sucesso:
json
Copiar código
{
  "id": 1,
  "name": "Produto 1",
  "price": 100,
  "description": "Descrição do produto 1"
}
3. Criar um novo produto
Rota: /api/products
Método: POST
Descrição: Cria um novo produto e o salva no arquivo JSON.
Corpo da Requisição:
json
Copiar código
{
  "name": "Novo Produto",
  "price": 150,
  "description": "Descrição do novo produto"
}
Resposta de sucesso:
json
Copiar código
{
  "message": "Produto criado com sucesso",
  "product": {
    "id": 2,
    "name": "Novo Produto",
    "price": 150,
    "description": "Descrição do novo produto"
  }
}
4. Atualizar um produto existente
Rota: /api/products/:id
Método: PUT
Descrição: Atualiza os dados de um produto existente com base no ID fornecido.
Parâmetros:
id: ID do produto (numérico).
Corpo da Requisição:
json
Copiar código
{
  "name": "Produto Atualizado",
  "price": 200,
  "description": "Nova descrição"
}
Resposta de sucesso:
json
Copiar código
{
  "message": "Produto atualizado com sucesso",
  "product": {
    "id": 1,
    "name": "Produto Atualizado",
    "price": 200,
    "description": "Nova descrição"
  }
}
5. Deletar um produto
Rota: /api/products/:id
Método: DELETE
Descrição: Remove um produto com base no ID fornecido.
Parâmetros:
id: ID do produto (numérico).
Resposta de sucesso:
json
Copiar código
{
  "message": "Produto deletado com sucesso"
}
Validações de Entrada
name: Obrigatório, deve ser uma string com no mínimo 3 caracteres.
price: Obrigatório, deve ser um número maior que 0.
description: Opcional, se fornecido deve ser uma string.
Como Contribuir
Fork o repositório
Crie uma nova branch para sua feature (git checkout -b feature/nome-da-feature)
Commit suas alterações (git commit -m 'Adiciona nova feature')
Push para a branch (git push origin feature/nome-da-feature)
Abra um Pull Request
Licença
Este projeto está licenciado sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

perl
Copiar código

Este conteúdo em Markdown pode ser colocado diretamente no arquivo `README.md` do seu repositório. A formatação é compatível com a maioria dos visualizadores de Markdown, incluindo o GitHub.













