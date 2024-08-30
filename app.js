let allProducts = [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];
function loadProducts() {
    fetch('https://fakestoreapi.com/products')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            allProducts = data;
            displayProducts(allProducts);
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
}

function displayProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Clear the list before displaying new items

    products.forEach(product => {
        
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');

        productItem.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3 class="clamped-text1">${product.title}</h3>
            <p class="clamped-text">${product.description}</p>
            <hr>
            <p>$${product.price}</p>
            <hr>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
            <button onclick="viewProductDetails(${product.id})">Details</button>
        `;

        productList.appendChild(productItem);
    });
}
// const headerPart=document.querySelectorAll('header');
// const homePart=document.getElementById('Home');
// const imagePart=document.getElementById('image');
// const sectionPart=document.getElementById('section2');
// const productsPart=document.getElementById('Products');

// homePart.addEventListener('click',(button)=>{
//     // const target=button.target.
//     if(homePart==Home){
//         imagePart.style.display='block';
//         sectionPart.style.display='block';
//         headerPart.style.display='block';
//         productsPart.style.display='block';

//     }

// })
 

function filterProducts(category) {
    if (category === 'all') {
        displayProducts(allProducts);
    } else {
        const filteredProducts = allProducts.filter(product => product.category === category);
        displayProducts(filteredProducts);
    }
}
loadProducts();
updateCartCount();