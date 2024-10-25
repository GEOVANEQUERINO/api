const productList = document.getElementById('product-list');
const addProductButton = document.getElementById('add-product');

const API_URL = 'http://localhost:3001/products';

// Função para carregar a lista de produtos
const loadProducts = async () => {
  const response = await fetch(API_URL);
  const products = await response.json();
  productList.innerHTML = '';
  products.forEach(product => {
    const li = document.createElement('li');
    li.textContent = `${product.title} - ${product.description} (Quantity: ${product.quantity})`;
    productList.appendChild(li);
  });
};

// Função para adicionar um novo produto
addProductButton.addEventListener('click', async () => {
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const quantity = parseInt(document.getElementById('quantity').value);

  if (!title || !description || isNaN(quantity)) {
    alert('Por favor, preencha todos os campos');
    return;
  }

  const newProduct = { id: Date.now(), title, description, quantity };

  console.log(newProduct); // Verifica o que está sendo enviado

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    });

    if (!response.ok) {
      throw new Error('Erro ao adicionar o produto');
    }

    loadProducts(); // Recarrega a lista de produtos
  } catch (error) {
    console.error(error);
    alert('Ocorreu um erro ao adicionar o produto');
  }
});

// Carrega os produtos ao iniciar a página
loadProducts();
