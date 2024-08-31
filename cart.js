let cart = JSON.parse(localStorage.getItem('cart')) || [];

document.addEventListener('DOMContentLoaded',()=>{
    displayCartItems();
    updateCartCount();
});

function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const shippingCost=50;

    cartItemsContainer.innerHTML = '';
    // let total=0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }
    const table=document.createElement('table')
    table.innerHTML=`
        <tr>
            <th colspan="7">Item List</th>
            <hr>
           
         </tr>
    `
    let total=0;

    cart.forEach((item, index)  => {
        // const allTotal=0;
        const quantity=item.quantity || 1;
        const price=parseFloat(item.price) || 0;

        const subTotal=quantity * price;
        total += subTotal;
           
          const  row=document.createElement('tr');
          row.innerHTML=`
          <hr>
          <td><img src="${item.image}" alt="${item.title}" alt="image" height="150px" width="120px"></td>
            <td> <h3>${item.title}</h3></td>
             <td><p>$${price.toFixed(2)}</p></td>
             <td>
             <button onclick="decreaseNumber(${index})">-</button>
                   <span id="quantity-${index}">${quantity || 1}</span>
            <button onclick="increaseNumber(${index})">+</button>
            </td>
             <td><p>${quantity} * $${price.toFixed(2)}=$${subTotal.toFixed(2)}</p></td>
              <td><button onclick="removeFromCart(${item.id})">Remove</button></td>
             <hr>
             
          `;  
          table.appendChild(row)      
    });
    cartItemsContainer.appendChild(table);

    const orderDetails=document.createElement('div');
    orderDetails.classList.add('order-details');
    orderDetails.innerHTML=`
                           <h2>Order Summary</h2>
                        <table class="table1">
                           <tr><td><p>Products(${cart.length})<span class="spn">$${total.toFixed(2)}</span></p></td></tr>
                           <tr><td><p>Shipping<span class="spn1">$${shippingCost.toFixed(2)}</span></p></td></tr>
                           <tr><td><p>Total Amount <b><span class="spn">$${(total + shippingCost).toFixed(2)}</span></b></p></td></tr>
                        </table>
                        <button onclick="checkout()">GoToCheckOut</button>
    `;
    cartItemsContainer.appendChild(orderDetails);
}

    function increaseNumber(index){
        cart[index].quantity=(cart[index].quantity || 1)+1;
        localStorage.setItem('cart',JSON.stringify(cart));
        // document.getElementById(`quantity-${index}`).textContent = cart[index].quantity;
        displayCartItems();
        // console.log(cart[index]);
        updateCartCount();
    }    
    function decreaseNumber(index){
        if(cart[index].quantity>1)
            {
            cart[index].quantity-=1;
            localStorage.setItem('cart',JSON.stringify(cart));
            // document.getElementById(`quantity-${index}`).textContent = cart[index].quantity;
            displayCartItems();
            updateCartCount();

        }

    }    
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
    updateCartCount();
}

function clearCart() {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
    updateCartCount();
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    const totalItems = cart.reduce((acc, item) => acc + (item.quantity || 1), 0); 
    cartCount.textContent = totalItems;
    // cartCount.textContent = cart.length;
}
function checkout(){
    alert("processed items to checkout");
}
