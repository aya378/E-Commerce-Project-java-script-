slider_img=document.querySelector('.slider-img');
var imgs=['1.jpg','3.jpg','4.jpg','8.jpg','9.jpg','10.jpg','11.jpg','12.jpg','13.jpg','2.png','5.jpg','6.jpg'];
var i=0;

myInterval = setInterval(function () {
    if(i >= imgs.length-1) i = -1;
        i++;
        setImg();
        }, 2000 );

function next(){
    if(i>= imgs.length-1) i=-1;
    i++;
    return setImg();
}

function prev(){
    if(i<=0) i=imgs.length;
    i--;
    return setImg();
}

function setImg(){
    return slider_img.setAttribute('src',"images/"+imgs[i]);
}
///////////////////////////////////////////get products////////////////////////////////////////////////////////////

var Productsarray = [];
const productsContainer = document.getElementById("products-container");
var xhr = new XMLHttpRequest();
xhr.open("GET", "https://dummyjson.com/products");
xhr.send("");

xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
        if (xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            Productsarray = response.products;
            display(Productsarray);
        }
    }
};

function display(products) {
    productsContainer.innerHTML = "";  
    for (var i = 0; i < products.length; i++) {
        var title = products[i].title;
        var image = products[i].images[0];
        var price = products[i].price;
        var category = products[i].category;

        var productElement = document.createElement("div");
        productElement.classList.add("product");

        var imageElement = document.createElement("img");
        imageElement.src = image;
        imageElement.alt = title;

        var titleElement = document.createElement("h3");
        titleElement.textContent = title;
        titleElement.style.whiteSpace = "normal"; 
        titleElement.style.height = "40px";
        titleElement.style.overflow = "hidden"; 
        titleElement.style.textOverflow = "ellipsis"; 

        var priceElement = document.createElement("h3");
        priceElement.textContent = `Price is: ${price} $`;

        var addButton = document.createElement("button");
        addButton.innerHTML = 'Add to Cart';
        addButton.id = "addButton";
        addButton.classList.add('btn', 'btn-primary');

        addButton.addEventListener('click', (function(index) {
            return function() {
                addToCart(Productsarray[index]);
            };
        })(i));

        productElement.appendChild(imageElement);
        productElement.appendChild(titleElement);
        productElement.appendChild(priceElement);
        productElement.appendChild(addButton);

        productsContainer.appendChild(productElement);
    }
}

function filterCategory(category) {
    console.log('Clicked category:', category);

    var filteredProducts;

    if (category === 'all') {
        display(Productsarray);  
    } else {
        filteredProducts = Productsarray.filter(product => {
            console.log('Product category:', product.category);
            return product.category.toLowerCase() === category.toLowerCase();
        });
        console.log('Filtered products:', filteredProducts);
        display(filteredProducts);
    }
}


var allButton = document.getElementById('allButton');
var skincareButton = document.getElementById('skincareButton');
var jewelleryButton = document.getElementById('labtobButton');
var smartButton = document.getElementById('smartButton');
var FragrancesButton = document.getElementById('FragrancesButton');
var homeButton = document.getElementById('homeButton');


allButton.addEventListener('click', function () {
    filterCategory('all');
});

skincareButton.addEventListener('click', function () {
    filterCategory('skincare');
});

labtobButton.addEventListener('click', function () {
    filterCategory('laptops');
});

FragrancesButton.addEventListener('click', function () {
    filterCategory('fragrances');
});

homeButton.addEventListener('click', function () {
    filterCategory('home-decoration');
});

smartButton.addEventListener('click', function () {
    filterCategory('smartphones');
});

var cart=[];

function updateCartButton() {
    
    var cartButton = document.getElementById('cartButton');
    var totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    cartButton.textContent = `Cart (${totalQuantity})`;
}
 

function addToCart(product) {
    var existingProduct = cart.find(item => item.title === product.title);

    if (existingProduct) {
        
        existingProduct.quantity++;
    } else {
        cart.push({
            images: product.images,
            title: product.title,
            price: product.price,
            description: product.description,
            discountPercentage:product.discountPercentage,
            rating:product.rating,
            stock:product.stock,
            brand:product.brand,
            quantity: 1
        });
        updateCartButton();

        localStorage.setItem('cart', JSON.stringify(cart));
    
        console.log('Cart after adding item:', cart);
    }
 
    updateCartButton();

    localStorage.setItem('cart', JSON.stringify(cart));

    console.log('Cart:', cart);
}

document.addEventListener('DOMContentLoaded', function () {
    var cartButton = document.getElementById('cartButton');

    cartButton.addEventListener('click', function () {
        var cartWindow = window.open('cart.html', '_blank');
        cartWindow.localStorage.setItem('cart', JSON.stringify(cart));
        cartWindow.onload = function () {
            window.close();
            
        };

       
    });
});





