const shippingCost = 50;
const taxRate = 0.10;

const products = document.querySelectorAll('.container.row.border.border-bottom');

function updateTotal(quantityElement, priceElement, totalElement) {
    let quantity = parseInt(quantityElement.textContent);
    let price = parseFloat(priceElement.textContent.replace('$', ''));
    let total = (quantity * price).toFixed(2);
    totalElement.textContent = `$${total}`;
}

function updateAllTotals() {
    let subtotal = 0;

    products.forEach(product => {
        const priceElement = product.querySelector('.price');
        const quantityElement = product.querySelector('.quantity');
        const totalElement = product.querySelector('.total');

        updateTotal(quantityElement, priceElement, totalElement);

        subtotal += parseFloat(totalElement.textContent.replace('$', ''));
    });

    const cardSubTotal = subtotal.toFixed(2);
    const ecoTax = (subtotal * taxRate).toFixed(2);
    const totalCost = (subtotal + parseFloat(ecoTax) + shippingCost).toFixed(2);

    document.querySelector('#subtotal').textContent = `Card Sub Total: $${cardSubTotal}`;
    document.querySelector('.eco-tax').textContent = `Eco Tax: $${ecoTax}`;
    document.querySelector('.shipping-cost').textContent = `Shipping Cost: $${shippingCost}`;
    document.querySelector('.total1').textContent = `Total: $${totalCost}`;
}

products.forEach(product => {
    const decreaseButton = product.querySelector('.decrease');
    const increaseButton = product.querySelector('.increase');
    const quantityElement = product.querySelector('.quantity');

    decreaseButton.addEventListener('click', () => {
        let quantity = parseInt(quantityElement.textContent);
        if (quantity > 1) {
            quantity--;
            quantityElement.textContent = quantity;
            updateTotal(quantityElement, product.querySelector('.price'), product.querySelector('.total'));
            updateAllTotals();
        }
    });

    increaseButton.addEventListener('click', () => {
        let quantity = parseInt(quantityElement.textContent);
        quantity++;
        quantityElement.textContent = quantity;
        updateTotal(quantityElement, product.querySelector('.price'), product.querySelector('.total'));
        updateAllTotals();
    });
});

updateAllTotals();
