let carts = document.querySelectorAll('.addcart');

let products = [
    {
        name: "mobile",
        brand: "realme",
        price: 150,
        incart: 0,
        tag: "realme"
    },
    {
        name: "mobile",
        brand: "apple",
        price: 350,
        incart: 0,
        tag: "apple"
    },
    {
        name: "mobile",
        brand: "one plus",
        price: 180,
        incart: 0,
        tag: "oneplus"
    },
    {
        name: "mobile",
        brand: "motorola",
        price: 200,
        incart: 0,
        tag: "motorola"
    }
];

// Add event listeners to all "add to cart" buttons
for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumber(products[i]);
        totalCost(products[i]);
    });
}

// Load cart number on page load
function onLoadCartNumber() {
    let productNumbers = localStorage.getItem('cartNumber');
    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

// Update cart number in localStorage and on the page
function cartNumber(product) {
    let productNumbers = localStorage.getItem('cartNumber');
    productNumbers = parseInt(productNumbers);

    if (productNumbers) {
        localStorage.setItem('cartNumber', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumber', 1);
        document.querySelector('.cart span').textContent = 1;
    }
    setItem(product);
}

// Store product details in localStorage
function setItem(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {
        if (cartItems[product.tag] === undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            };
        }
        cartItems[product.tag].incart += 1;
    } else {
        product.incart = 1;
        cartItems = {
            [product.tag]: product
        };
    }

    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

// Calculate total cost and store it in localStorage
function totalCost(product) {
    let cartCost = localStorage.getItem('totalCost');
    cartCost = cartCost ? parseInt(cartCost) : 0;

    localStorage.setItem('totalCost', cartCost + product.price);
}

// Update product quantity
function updateQuantity(productTag, action) {
    let cartItems = JSON.parse(localStorage.getItem('productsInCart'));
    let cartCost = parseInt(localStorage.getItem('totalCost'));
    let productNumbers = parseInt(localStorage.getItem('cartNumber'));

    if (cartItems && cartItems[productTag]) {
        let item = cartItems[productTag];

        if (action === "increase") {
            item.incart += 1;
            cartCost += item.price;
            productNumbers += 1;
        } else if (action === "decrease" && item.incart > 1) {
            item.incart -= 1;
            cartCost -= item.price;
            productNumbers -= 1;
        }

        // Update localStorage
        localStorage.setItem('productsInCart', JSON.stringify(cartItems));
        localStorage.setItem('totalCost', cartCost);
        localStorage.setItem('cartNumber', productNumbers);

        // Update UI
        document.querySelector('.cart span').textContent = productNumbers;
        display();
    }
}

// Remove an item from the cart
function removeItem(productTag) {
    let cartItems = JSON.parse(localStorage.getItem('productsInCart'));
    let cartCost = parseInt(localStorage.getItem('totalCost'));
    let productNumbers = parseInt(localStorage.getItem('cartNumber'));

    if (cartItems && cartItems[productTag]) {
        let item = cartItems[productTag];

        // Update totals
        cartCost -= item.price * item.incart;
        productNumbers -= item.incart;

        // Remove item from cart
        delete cartItems[productTag];

        // Update localStorage
        localStorage.setItem('productsInCart', JSON.stringify(cartItems));
        localStorage.setItem('totalCost', cartCost);
        localStorage.setItem('cartNumber', productNumbers);

        // Update UI
        document.querySelector('.cart span').textContent = productNumbers;
        display();
    }
}

// Display cart items on the page
function display() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);

    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');

    if (cartItems && productContainer) {
        productContainer.innerHTML = ''; // Clear the container first
        Object.values(cartItems).forEach(item => {
            productContainer.innerHTML += `
            <div class="flex">
                <div class="product">
                    <i class="fa-sharp fa-solid fa-xmark remove-item" data-tag="${item.tag}"></i>
                    <img src="./images/${item.tag}.jpg" alt="${item.name}">
                </div>
                <div class="price">$${item.price}.00</div>
                <div class="quantity">
                    <i class="fa-solid fa-caret-left decrease" data-tag="${item.tag}"></i>
                    <span>${item.incart}</span>
                    <i class="fa-solid fa-caret-right increase" data-tag="${item.tag}"></i>
                </div>
                <div class="total"> $${item.price * item.incart}.00</div>
                <div class="brand"> ${item.brand}</div>
            </div>`;
        });

        productContainer.innerHTML += `
        <div class="baskettotalcontainer">
            <h4 class="baskettotaltitle">Basket Total</h4>
            <h4 class="baskettotal">$${cartCost}.00</h4>
        </div>`;
    }

    // Add event listeners for quantity buttons
    let increaseButtons = document.querySelectorAll('.increase');
    let decreaseButtons = document.querySelectorAll('.decrease');

    increaseButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            let productTag = e.target.dataset.tag;
            updateQuantity(productTag, "increase");
        });
    });

    decreaseButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            let productTag = e.target.dataset.tag;
            updateQuantity(productTag, "decrease");
        });
    });

    // Add event listeners for remove buttons
    let removeButtons = document.querySelectorAll('.remove-item');
    removeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            let productTag = e.target.dataset.tag;
            removeItem(productTag);
        });
    });
}

// Initialize cart display
onLoadCartNumber();
display();
