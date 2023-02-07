// open cart notif
const cartNotifContent = document.querySelector(".cart-notif-content");
const cartIcon = document.querySelector("#cart-icn");

cartIcon.addEventListener("click", () => {
  if (cartNotifContent.style.transform === "translateX(-200%)") {
    cartNotifContent.style.transform = "translateX(0)";
  } else {
    cartNotifContent.style.transform = "translateX(-200%)";
  }
});

// close cart notif
const btnClose = document.querySelector("#btn-close");

btnClose.addEventListener("click", () => {
  cartNotifContent.style.transform = "translateX(-200%)";
});

cartNotifContent.addEventListener("click", (event) => {
  if (event.target.classList.contains("cart-notif-content")) {
    cartNotifContent.style.transform = "translateX(-200%)";
  }
});

// add products to cart
const addCart = document.getElementsByClassName("add-cart");
const productRow = document.getElementsByClassName("product-row");

const addItemToCart = (price, imageSrc) => {
  var productRow = document.createElement("div");
  productRow.classList.add("product-row");
  var productsRow = document.getElementsByClassName("products-row")[0];
  var cartImage = document.getElementsByClassName("cart-image");

  for (var i = 0; i < cartImage.length; i++) {
    if (cartImage[i].src == imageSrc) {
      alert("This item has already been added to the cart");
      return;
    }
  }

  var cartRowItems = `
    <div class="product-row">
      <img class="cart-image" src="${imageSrc}">
      <span class ="cart-price">${price}</span>
      <input class="product-quantity" type="number" value="1">
      <button class="remove-btn">Remove</button>
    </div>
      `;
  productRow.innerHTML = cartRowItems;
  productsRow.append(productRow);
  productRow
    .getElementsByClassName("remove-btn")[0]
    .addEventListener("click", removeItem);
  productRow
    .getElementsByClassName("product-quantity")[0]
    .addEventListener("change", changeQuantity);
  updateCartPrice();
};

const addCartClicked = (event) => {
  button = event.target;
  var cartItem = button.parentElement;
  var imageSrc = cartItem.getElementsByClassName("image")[0].src;
  var price = cartItem.getElementsByClassName("price")[0].innerText;

  addItemToCart(price, imageSrc);
  updateCartPrice();
};

for (var i = 0; i < addCart.length; i++) {
  button = addCart[i];
  button.addEventListener("click", addCartClicked);
}

// Remove products from cart
const removeBtn = document.getElementsByClassName("remove-btn");
const removeItem = (event) => {
  btnClicked = event.target;
  btnClicked.parentElement.parentElement.remove();
  updateCartPrice();
};

for (var i = 0; i < removeBtn.length; i++) {
  button = removeBtn[i];
  button.addEventListener("click", removeItem);
}

// update quantity input
var quantityInput = document.getElementsByClassName("product-quantity");

const changeQuantity = (event) => {
  var input = event.target;
  if (input.value <= 0) {
    input.value = 1;
  }
  updateCartPrice();
};

for (var i = 0; i < quantityInput.length; i++) {
  input = quantityInput[i];
  input.addEventListener("change", changeQuantity);
}

// update total price
const updateCartPrice = () => {
  var total = 0;
  for (var i = 0; i < productRow.length; i += 2) {
    cartRow = productRow[i];
    var priceElement = cartRow.getElementsByClassName("cart-price")[0];
    var quantityElement = cartRow.getElementsByClassName("product-quantity")[0];
    var price = parseFloat(priceElement.innerText.replace("$", ""));
    var quantity = quantityElement.value;
    total = total + price * quantity;
  }
  document.getElementsByClassName("purchase-price")[0].innerText = "$" + total;
  document.getElementsByClassName("cart-quantity")[0].textContent = i /= 2;
};

// purchase items
const purchaseBtn = document.querySelector(".purchase-btn");

const closeCartModal = document.querySelector(".cart-notif");

purchaseBtn.addEventListener("click", purchaseBtnClicked);

function purchaseBtnClicked() {
  alert("Thank you for your purchase");
  cartNotifContent.style.transform = "translateX(-100%)";
  var cartItems = document.getElementsByClassName("products-row")[0];
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }
  updateCartPrice();
}
