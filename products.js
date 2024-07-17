document.addEventListener('DOMContentLoaded', function() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    const totalSlides = slides.length;

    function showSlide(index) {
        if (index >= totalSlides) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = totalSlides - 1;
        } else {
            currentSlide = index;
        }
        const newTransformValue = -currentSlide * 100;
        document.querySelector('.carousel-container').style.transform = `translateX(${newTransformValue}%)`;
    }

    document.querySelector('.carousel-button.next').addEventListener('click', function() {
        showSlide(currentSlide + 1);
    });

    document.querySelector('.carousel-button.prev').addEventListener('click', function() {
        showSlide(currentSlide - 1);
    });

    setInterval(function() {
        showSlide(currentSlide + 1);
    }, 5000); // Cambiar imagen cada 5 segundos
});

// Función para añadir productos al carrito
let cart = [];
const cartButton = document.getElementById('cart-button');
const cartWindow = document.getElementById('cart-window');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');

function addToCart(productName, productPrice) {
    const product = { name: productName, price: productPrice };
    cart.push(product);
    updateCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function updateCart() {
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach((product, index) => {
        const item = document.createElement('li');
        item.textContent = `${product.name} - $${product.price}`;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Eliminar';
        removeButton.addEventListener('click', () => removeFromCart(index));
        item.appendChild(removeButton);
        cartItems.appendChild(item);
        total += product.price;
    });
    cartTotal.textContent = total;
    cartButton.innerHTML = `Carrito <i class="fas fa-shopping-cart"></i> (${cart.length})`;
}

function openCart() {
    cartWindow.style.display = 'block';
}

function closeCart() {
    cartWindow.style.display = 'none';
}

// Función para comprar producto desde el carrito
function checkout() {
    openPayment();
    addToCart(productName, productPrice);
}

// Función para comprar producto individualmente
function buyProduct(productName, productPrice) {
    addToCart(productName, productPrice);
    openPayment();  // Abre directamente la ventana de pago
}

const paymentWindow = document.getElementById('payment-window');
const paymentForm = document.getElementById('payment-form');
const paymentDetails = document.getElementById('payment-details');

function openPayment() {
    paymentWindow.style.display = 'block';
}

function closePayment() {
    paymentWindow.style.display = 'none';
}

paymentForm.addEventListener('submit', function(event) {
    event.preventDefault();
    showSuccess();
    closePayment();
});

const paymentMethod = document.getElementById('payment-method');

paymentMethod.addEventListener('change', function() {
    const method = paymentMethod.value;
    if (method === 'credit-card') {
        paymentDetails.innerHTML = `
            <label for="card-number">Número de Tarjeta:</label>
            <input type="text" id="card-number" name="card-number" required>
            <label for="expiry-date">Fecha de Expiración:</label>
            <input type="text" id="expiry-date" name="expiry-date" required>
            <label for="cvv">CVV:</label>
            <input type="text" id="cvv" name="cvv" required>
        `;
    } else if (method === 'paypal') {
        paymentDetails.innerHTML = `
            <label for="paypal-email">Correo Electrónico de PayPal:</label>
            <input type="email" id="paypal-email" name="paypal-email" required>
        `;
    } else if (method === 'yappy') {
        paymentDetails.innerHTML = `
            <label for="yappy-phone">Número de Teléfono de Yappy:</label>
            <input type="text" id="yappy-phone" name="yappy-phone" required>
        `;
    } else {
        paymentDetails.innerHTML = '';
    }
});

const successMessage = document.getElementById('success-message');
const invoiceElement = document.getElementById('invoice');

function showSuccess() {
    successMessage.style.display = 'block';
    generateInvoice();
}

function closeSuccess() {
    successMessage.style.display = 'none';
}

function generateInvoice() {
    let invoiceHTML = '<strong>Factura de Compra:</strong><br>';
    let total = 0;
    cart.forEach(product => {
        invoiceHTML += `${product.name} - $${product.price}<br>`;
        total += product.price;
    });
    invoiceHTML += `<br><strong>Total: $${total}</strong>`;
    invoiceElement.innerHTML = invoiceHTML;
    cart = []; // Vaciar carrito después de la compra
    updateCart(); // Actualizar interfaz del carrito
}
