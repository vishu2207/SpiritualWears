
function displayCart() {
    let cartList = document.getElementById("cartItems");
    cartList.innerHTML = "";

    cart.forEach(function(item) {
        let li = document.createElement("li");
        li.textContent = item;
        cartList.appendChild(li);
    });
}

function shopNow(){
    window.open("shop.html");
}

function orderNow() {
    window.open("https://wa.me/917600914012?text=I want to order Black T-Shirt");
}

let cart = JSON.parse(localStorage.getItem("cart")) || [];
const price = 499;

function addToCart() {
    let size = document.getElementById("size").value;
    let quantity = parseInt(document.getElementById("quantity").value);

    if(size === "") {
        alert("Please select size");
        return;
    }

    cart.push({
        name: "Black T-Shirt",
        size: size,
        quantity: quantity,
        price: price
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

function displayCart() {
    let cartList = document.getElementById("cartItems");
    let total = 0;
    cartList.innerHTML = "";

    cart.forEach((item, index) => {
        let li = document.createElement("li");
        let itemTotal = item.price * item.quantity;
        total += itemTotal;

        li.innerHTML = 
            item.name + " - Size " + item.size + 
            " (x" + item.quantity + ") ₹" + itemTotal +
            ` <button onclick="removeItem(${index})">Remove</button>`;

        cartList.appendChild(li);
    });

    document.getElementById("totalPrice").textContent = total;
}

function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

function checkout() {
    if(cart.length === 0) {
        alert("Cart is empty");
        return;
    }

    let message = "Order Details:%0A";
    let total = 0;

    cart.forEach(item => {
        let itemTotal = item.price * item.quantity;
        total += itemTotal;
        message += item.name + 
            " - Size " + item.size + 
            " x" + item.quantity + 
            " = ₹" + itemTotal + "%0A";
    });

    message += "Total: ₹" + total;

    window.open("https://wa.me/917600914012?text=" + message);

    cart = [];
    localStorage.removeItem("cart");
    displayCart();
}

displayCart();