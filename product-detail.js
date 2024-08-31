let allProducts = [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];

document.addEventListener('DOMContentLoaded', () => {
    const productId = localStorage.getItem('selectedProduct');
    loadProducts(productId);
    updateCartCount();
});

function loadProducts(selectedProductId) {
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => {
            allProducts = data;
            const selectedProduct = allProducts.find(prod => prod.id == selectedProductId);
            displayProductDetails(selectedProduct);
            displayRelatedProducts(selectedProduct.category);
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
}

function displayProductDetails(product) {
    const productDetail = document.getElementById('product-details');
    productDetail.innerHTML = `
        <img src="${product.image}" alt="${product.title}" height="150px" width="150px">
        <h3>${product.title}</h3>
        <p>${product.description}</p>
        <p>$${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
}

function displayRelatedProducts(category) {
    const relatedProducts = allProducts.filter(product => product.category === category && product.id != localStorage.getItem('selectedProduct'));
    const relatedProductList = document.getElementById('related-product-list');

    relatedProductList.innerHTML = ''; 

    relatedProducts.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('related-product-item');

        productItem.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h4>${product.title}</h4>
            <p>$${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;

        relatedProductList.appendChild(productItem);
    });
}

function addToCart(productId) {
    const product = allProducts.find(prod => prod.id === productId);
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.length;
}