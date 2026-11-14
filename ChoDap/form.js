let cart = JSON.parse(
    localStorage.getItem("chodapCart")
) || [];

function displayCart() {

    let cartItems = document.getElementById("cartItems");

    let emptyCart = document.getElementById("emptyCart");

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        emptyCart.style.display = "block";

    }

    else {

        emptyCart.style.display = "none";

        for (let i = 0; i < cart.length; i++) {

            let productTotal =
                cart[i].price * cart[i].quantity;

            cartItems.innerHTML += `

                <div class="product_item">

                    <div>

                        <h3>${cart[i].name}</h3>

                        <p>
                            RM${cart[i].price.toFixed(2)}
                            / ${cart[i].unit}
                        </p>

                        <p class="cart_product_total">
                            Total: RM${productTotal.toFixed(2)}
                        </p>

                    </div>

                    <div class="cart_controls">

                        <input
                            type="number"
                            min="1"
                            max="50"
                            value="${cart[i].quantity}"
                            onchange="updateQuantity(${i}, this.value)"
                        >

                        <button
                            type="button"
                            onclick="removeProduct(${i})"
                        >
                            Remove
                        </button>

                    </div>

                </div>

            `;

        }

    }

    calculateTotal();

}

function updateQuantity(index, quantity) {

    quantity = Number(quantity);

    if (
        !Number.isInteger(quantity) ||
        quantity < 1 ||
        quantity > 50
    ) {

        alert("Please enter a quantity between 1 and 50!");

        displayCart();

        return;

    }

    cart[index].quantity = quantity;

    localStorage.setItem(
        "chodapCart",
        JSON.stringify(cart)
    );

    displayCart();

}

function removeProduct(index) {

    let confirmRemove = confirm(
        "Are you sure you want to remove this product?"
    );

    if (confirmRemove) {

        cart.splice(index, 1);

        localStorage.setItem(
            "chodapCart",
            JSON.stringify(cart)
        );

        displayCart();

    }

}

function calculateTotal() {

    let subtotal = 0;

    let totalItems = 0;

    for (let i = 0; i < cart.length; i++) {

        subtotal +=
            cart[i].price * cart[i].quantity;

        totalItems += cart[i].quantity;

    }

    let deliveryFee = Number(
        document.getElementById("delivery").value
    );

    let total = subtotal + deliveryFee;

    document.getElementById("totalItems").textContent =
        totalItems;

    document.getElementById("subtotal").textContent =
        "RM" + subtotal.toFixed(2);

    document.getElementById("deliveryFee").textContent =
        "RM" + deliveryFee.toFixed(2);

    document.getElementById("total").textContent =
        "RM" + total.toFixed(2);

}

function displayOrderSummary() {

    let orderDetails = "";

    for (let i = 0; i < cart.length; i++) {

        let productTotal =
            cart[i].price * cart[i].quantity;

        orderDetails +=

            cart[i].name +

            " x " + cart[i].quantity +

            " = RM" + productTotal.toFixed(2) +

            "\n";

    }

    return orderDetails;

}

function submitOrder(event) {

    event.preventDefault();

    let message = document.getElementById("order_message");

    let name = document.getElementById("customerName").value;

    if (cart.length === 0) {

        message.style.color = "red";

        message.textContent =
            "Your cart is empty! Please select some chocolates first.";

    }

    else {

        let subtotal = 0;

        for (let i = 0; i < cart.length; i++) {

            subtotal +=
                cart[i].price * cart[i].quantity;

        }

        let deliveryFee = Number(
            document.getElementById("delivery").value
        );

        let total = subtotal + deliveryFee;

        let payment = document.querySelector(
            'input[name="payment"]:checked'
        ).value;

        let orderDetails = displayOrderSummary();

        message.style.color = "#815C48";

        message.style.backgroundColor = "#FFF5E9";

        message.style.border = "1px solid #E8D5C4";

        message.style.whiteSpace = "pre-line";

        message.textContent =

            "Thank you, " + name + "! ♡\n\n" +

            "Your order has been received!\n\n" +

            "YOUR ORDER DETAILS\n" +

            orderDetails + "\n" +

            "Subtotal: RM" + subtotal.toFixed(2) + "\n" +

            "Delivery Fee: RM" + deliveryFee.toFixed(2) + "\n" +

            "Payment Method: " + payment + "\n\n" +

            "TOTAL PAYMENT: RM" + total.toFixed(2) + "\n\n" +

            "Thank you for choosing ChoDap! ♡";

        cart = [];

        localStorage.removeItem("chodapCart");

        displayCart();

    }

}

document.getElementById("delivery").addEventListener(
    "change",
    calculateTotal
);

displayCart();

function updateCartCount() {

    let cart = JSON.parse(
        localStorage.getItem("chodapCart")
    ) || [];

    let totalItems = 0;

    for (let i = 0; i < cart.length; i++) {

        totalItems += Number(cart[i].quantity);

    }

    document.getElementById("cartCount").textContent = totalItems;

}

updateCartCount();