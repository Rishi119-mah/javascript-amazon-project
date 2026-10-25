let productHTML = ' ';

products.forEach((product) => {
  productHTML = productHTML + `
  
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"  value="${product.id}">
            Add to Cart
          </button>
        </div>
      `;
});


document.querySelector('.js-producs-grid').innerHTML = productHTML;

const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
let cartBtns = document.querySelectorAll('.js-add-to-cart');

  
  cartBtns.forEach((cartBtn) => {
    cartBtn.addEventListener('click' , () => {
    
      let cartQuantity = 1;
      let pId = cartBtn.value;

      const selectedProduct = products.find((product) => {
        return product.id === pId;
      });

      const result = cartItems.find((cartItem) => {
        return cartItem.id === pId;
      });

      if(result){
        result.quantity += 1;
      }else{
        const cartItem = {
        ...selectedProduct,
        quantity: cartQuantity
      };

      cartItems.push(cartItem);
      }

      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    });
  });
 




const searchBar = document.querySelector(".search-bar");
