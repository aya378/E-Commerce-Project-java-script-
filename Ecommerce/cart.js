document.addEventListener('DOMContentLoaded', function () {
    var cartContainer = document.getElementById('cartContainer');
    cartContainer.innerHTML = 'Loading...';

    var savedCart = localStorage.getItem('cart');
    var cart = savedCart ? JSON.parse(savedCart) : [];

    if (cart.length > 0) {
        setTimeout(function () {
            renderCart(cart, cartContainer);

            var purchaseButton = document.getElementById('purchaseButton');
            var backToHomeButton = document.getElementById('backToHomeButton');

            purchaseButton.classList.add('show');
            backToHomeButton.classList.add('show');
        }, 200); 
    } else {
        cartContainer.innerHTML = 'Your cart is empty.';
    }

    var purchaseButton = document.getElementById('purchaseButton');
    var backToHomeButton = document.getElementById('backToHomeButton');

    purchaseButton.addEventListener('click', function () {
        handlePurchase(cart);
    });
});



function deleteCartItem(index) {
    var savedCart = localStorage.getItem('cart');
    var cart = savedCart ? JSON.parse(savedCart) : [];
    cart.splice(index, 1);

    var cartContainer = document.getElementById('cartContainer'); 
    renderCart(cart, cartContainer);

    localStorage.setItem('cart', JSON.stringify(cart));
}

function renderCart(cart, container) {
    container.innerHTML = '';
    var total = 0; 

    for (let i = 0; i < cart.length; i++) {
        var cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        var itemInfo = document.createElement('div');
        itemInfo.classList.add('item-info');
        itemInfo.innerHTML = `
            <span>${cart[i].title}</span>
            <span>Price: $${cart[i].price}</span>
        `;
        cartItem.appendChild(itemInfo);

        var details = document.createElement('div');
        details.innerHTML = `
            <div>
                <span></span>
                <img src="${cart[i].images[0]}" alt="${cart[i].title}">
            </div>
            <div><span>Description:</span> ${cart[i].description}</div>
            <div><span>Discount Percentage:</span> ${cart[i].discountPercentage}%</div>
            <div><span>Rating:</span> ${cart[i].rating}</div>
            <div><span>Stock:</span> ${cart[i].stock}</div>
            <div><span>Brand:</span> ${cart[i].brand}</div>
            <div class="quantity">Quantity: ${cart[i].quantity}</div>
        `;
        cartItem.appendChild(details);

        total += cart[i].price * cart[i].quantity;

        var deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.innerHTML = 'Delete';
        deleteButton.addEventListener('click', (function (index) {
            return function () {
                deleteCartItem(index);
            };
        })(i));

        cartItem.appendChild(deleteButton);
        container.appendChild(cartItem);
    }

    
    var totalElement = document.createElement('div');
    totalElement.innerHTML = `<div class="total">Total Price: $${total.toFixed(2)}</div>`;
    container.appendChild(totalElement);
}

console.log(localStorage.getItem('cart'))

function handlePurchase(cart) {
    if (cart.length === 0) {
        alert('Your cart is empty. Add items before making a purchase.');
        return;
    }

    var confirmation = confirm('Are you sure you want to make a purchase?');

    if (confirmation) {
        alert('Thank you for your purchase!');
        window.location.replace('thank-you.html');
    } else {
        alert('Purchase canceled. Your items are still in the cart.');
    }
}

function clearCart() {
    localStorage.removeItem('cart');
    renderCart([]);
}
