if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}
const { log } = console;

function ready() {
  const removeCartButtons = document.getElementsByClassName("cart-items-remove");
  for (let i = 0; i < removeCartButtons.length; i++) {
    let removeCartButton = removeCartButtons[i];
    removeCartButton.addEventListener("click", removeCartItem);
  }

  const inputCartElements = document.getElementsByClassName("cart-items-qty");
  for (let i = 0; i < inputCartElements.length; i++) {
    const inputCartElement = inputCartElements[i];
    inputCartElement.addEventListener("change", inputChanged);
  }

  const addToCartButtons = document.getElementsByClassName(
    "collection-items-btn"
  );
  for (let i = 0; i < addToCartButtons.length; i++) {
    const addToCartButton = addToCartButtons[i];
    addToCartButton.addEventListener("click", addToCartClicked);
  }

  document
    .getElementsByClassName("cart-item-purshase")[0]
    .addEventListener("click", purchasedButtonClicked);
}

function purchasedButtonClicked(e) {
  const tbody = document.getElementsByTagName("tbody")[0];
  if (!tbody.hasChildNodes()) {
    alert("Cart is empty");
    return;
  } else {
    alert("Items purchased");
    tbody.innerHTML = "";
    updateCartTotal();
  }
}

// add to cart handler
function addToCartClicked(e) {
  const button = e.target;
  const buttonParent = button.parentElement.parentElement;
  const title = buttonParent.getElementsByClassName("collection-items-title")[0]
    .textContent;
  const price = buttonParent.getElementsByClassName("collection-items-price")[0]
    .textContent;
  const imgSrc = buttonParent.getElementsByClassName("collection-img")[0].src;

  addToCart(title, price, imgSrc);
}

function addToCart(title, price, imgSrc) {
  const tbody = document.getElementsByTagName("tbody")[0];
  const tr = document.createElement("tr");
  tr.classList.add("cart-items");
  const cart = document.getElementsByClassName("cart")[0];
  const cartItems = cart.getElementsByClassName("cart-items");
  for (let i = 0; i < cartItems.length; i++) {
    const cartItem = cartItems[i];
    const cartTitle =
      cartItem.getElementsByClassName("cart-title")[0].textContent;
    log(cartTitle);
    if (cartTitle == title) {
      alert("Item already added");
      return;
    }
  }

  const trContent = `
        <td class="cart-items-title">
        <img src=${imgSrc} alt="cart image" width="100px" height="100px">
        <span class="cart-title">${title}</span>
    </td>
    <td class="cart-items-price">${price}</td>
    <td class="class-items-qty-container">
    <input class="cart-items-qty" type="number" value='1'>
    <button class="btn cart-items-remove">REMOVE1</button>
    </td>
    `;
  tr.innerHTML = trContent;
  tbody.appendChild(tr);
  tr.getElementsByClassName("cart-items-remove")[0].addEventListener(
    "click",
    removeCartItem
  );
  tr.getElementsByClassName("cart-items-qty")[0].addEventListener(
    "change",
    inputChanged
  );
  updateCartTotal();
}

// input change handler
function inputChanged(e) {
  if (isNaN(e.target.value) || e.target.value <= 0) {
    e.target.value = 1;
  }
  updateCartTotal();
}
// remove cart handler
function removeCartItem(e) {
  const button = e.target;
  button.parentElement.parentElement.remove();
  // update cart total after removing an item
  updateCartTotal();
}

// update cart total
function updateCartTotal() {
  const cart = document.getElementsByClassName("cart")[0];
  const cartItems = cart.getElementsByClassName("cart-items");
  let sum = 0;
  for (let i = 0; i < cartItems.length; i++) {
    // single cart item in cart items
    const cartItem = cartItems[i];
    // html element of price
    const priceElement = cartItem.getElementsByClassName("cart-items-price")[0];
    // html element of quantity
    const quantityElement =
      cartItem.getElementsByClassName("cart-items-qty")[0];

    //   the price width the naira sign removed
    const price = priceElement.textContent.replace("₦", "");
    const qty = parseFloat(quantityElement.value);
    sum = sum + price * qty;
  }

  // sum = Math.round(sum * 100) /100
  sum = sum.toFixed(2);
  document.getElementsByClassName("cart-total")[0].innerHTML = `Total: ₦${sum}`;
}
