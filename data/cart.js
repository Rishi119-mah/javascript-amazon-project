let cartRender = ' ';

const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

cartItems.forEach((cartItem) => {
    cartRender = cartRender + ` 
    <div class="cart-item-container">
        <div class="delivery-date">
            Delivery date: "${cartItem.delDate}"
        </div>

        <div class="cart-item-details-grid">
            <img class="product-image"
            src="${cartItem.image}">

            <div class="cart-item-details">
            <div class="product-name">
                ${cartItem.name}
            </div>
            <div class="product-price">
                $${(cartItem.priceCents/100).toFixed(2)}
            </div>
            <div class="product-quantity">
                <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary">
                    Update
                </span>
                <span class="delete-quantity-link link-primary">
                    Delete
                </span>
            </div>
            </div>

            <div class="delivery-options">
            <div class="delivery-options-title">
                Choose a delivery option:
            </div>

            <div class="delivery-option">
                <input type="radio" class="delivery-option-input"
                name="delivery-option-2" value="Tuesday, June 21" data-shipping-cost="0">
                <div>
                <div class="delivery-option-date">
                    Tuesday, June 21
                </div>
                <div class="delivery-option-price">
                    FREE Shipping
                </div>
                </div>
            </div>
            <div class="delivery-option">
                <input type="radio" checked class="delivery-option-input"
                name="delivery-option-2" value="Wednesday, June 13" data-shipping-cost="4.99">
                <div>
                <div class="delivery-option-date">
                    Wednesday, June 13
                </div>
                <div class="delivery-option-price">
                    $4.99 - Shipping
                </div>
                </div>
            </div>
            <div class="delivery-option">
                <input type="radio" class="delivery-option-input"
                    name="delivery-option-2" value="Monday, June 10" data-shipping-cost="9.99">
                <div>
                <div class="delivery-option-date">
                    Monday, June 10
                </div>
                <div class="delivery-option-price">
                    $9.99 - Shipping
                </div>
                </div>
            </div>
            </div>
            </div>
        </div>`;

});


document.querySelector('.order-summary').innerHTML = cartRender; 



const divEls = document.querySelectorAll(".cart-item-container");

divEls.forEach((divEl,index) => {
    const upBtn = divEl.querySelector(".update-quantity-link");
    const delBtn = divEl.querySelector(".delete-quantity-link");
 
    let cartItem = cartItems[index];

    upBtn.addEventListener("click", () => {
        cartItem.quantity += 1;

        divEl.querySelector(".quantity-label").textContent =
        cartItem.quantity;

        localStorage.setItem("cartItems", JSON.stringify(cartItems));

    });

    let pId = cartItem.id;

    delBtn.addEventListener("click" , () => { 

        const result = cartItems.findIndex((item) => {
            return item.id === pId;
        });

        cartItem.quantity -= 1;

        if(cartItem.quantity === 0){
            if(result != -1){
                cartItems.splice(result,1);
                divEl.remove();
            }  
        }else{
            divEl.querySelector(".quantity-label").textContent = cartItem.quantity;
        }
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    });





    const dateRes = divEl.querySelectorAll(".delivery-option-input");
    dateRes.forEach((dateRe) => {
        dateRe.addEventListener("change", () => {

            divEl.querySelector(".delivery-date").textContent =
            `Delivery date: ${dateRe.value}`;

            cartItem.delDate = dateRe.value;
            cartItem.delPrice = dateRe.dataset.shippingCost;

            localStorage.setItem("cartItems", JSON.stringify(cartItems));

            updateSummary();
        });
    });

});
    


function updateSummary() {
    let itemsTotal = 0;
    let shippingTotal = 0;
    let itemCount = 0;

    cartItems.forEach((cartItem) => {
        itemsTotal += (cartItem.priceCents / 100) * cartItem.quantity;
        itemCount += cartItem.quantity;

        let shipping = 4.99;
        if (cartItem.delPrice !== undefined) {
            shipping = Number(cartItem.delPrice);
        }
        shippingTotal += shipping;
    });

    const beforeTax = itemsTotal + shippingTotal;
    const tax = beforeTax * 0.1;
    const orderTotal = beforeTax + tax;

    document.querySelector(".js-items-label").textContent = `Items (${itemCount}):`;
    document.querySelector(".js-items-total").textContent = "$" + itemsTotal.toFixed(2);
    document.querySelector(".js-shipping-total").textContent = "$" + shippingTotal.toFixed(2);
    document.querySelector(".js-subtotal").textContent = "$" + beforeTax.toFixed(2);
    document.querySelector(".js-estimated-tax").textContent = "$" + tax.toFixed(2);
    document.querySelector(".js-order-total").textContent = "$" + orderTotal.toFixed(2);
}

updateSummary();


