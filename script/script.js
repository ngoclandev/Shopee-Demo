const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const optionBar = $(".search__option-bar");
const optionHeader = $(".option-header");
const optionHeaderContent = $(".option-header__content");
const optionHeaderClose = $(".option-header__close");
const optionHeaderOverlay = $(".option-header__overlay");

const modal = $(".modal");
const modalOverlay = $(".modal__overlay");
const userForms = $$(".user-form");
const registerForm = $("#register-form");
const loginForm = $("#login-form");
const switchToRegisterFormBtn = $(".user-form__switch--register");
const switchToLoginFormBtn = $(".user-form__switch--login");

const registerBtn = $("#register");
const loginBtn = $("#login");

const productContainer = $("#product-container");
const cartContainer = $(".search__cart-list");
const cartList = $(".search__cart-product-list");
const cartNotice = $(".search__cart-notice");
const cartIcon = $(".search__cart-icon-wrap");

const searchBtn = $(".search__search-form-icon");
const searchFormMobile = $(".search-sm__form");

let product = `
      <div class="col l-2-4 m-4 c-6">
          <a href="#" class="product">
            <div
              class="product__img"
              style="
                background-image: url('https://down-vn.img.susercontent.com/file/3b2317b0d653a0f3cfde5f5189c9ac2e_tn');
              "
            ></div>
            <h4 class="product__name">
              Combo Simple Tẩy trang 200ml + Sữa rửa mặt 150ml + Nước
              hoa hồng 200ml
            </h4>
            <div class="product__price">
              <span class="product__old-price">399.000đ</span>
              <span class="product__current-price">215.000đ</span>
            </div>
            <div class="product__action">
              <!-- add class product__like--liked when custom click like -->
              <span class="product__like">
                <i class="fa-regular fa-heart product__like-normal"></i>
                <i class="fa-solid fa-heart product__like-clicked"></i>
              </span>
              <span class="product__rating">
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
              </span>
              <span class="product__sold">88 đã bán</span>
            </div>
            <div class="product__origin">
              <span class="product__brand">Simple</span>
              <span class="product__made-in">Poland</span>
            </div>
            <div class="product__favorite">
              <i class="fa-solid fa-check"></i>
              <span>Yêu thích</span>
            </div>
            <div class="product__sale-off">
              <span class="product__sale-off-percent">10%</span>
              <span class="product__sale-off-label">GIẢM</span>
            </div>
          </a>
        </div>
      `;

const temp = product;
const cartProducts = [
  {
    img: "./assets/img/product-cart-1.jfif",
    name: "Sữa rửa mặt Simple 150ml",
    price: 162,
    description: "150ml",
    quantity: 2,
  },
  {
    img: "./assets/img/product-cart-2.jfif",
    name: "Sữa rửa mặt Simple Purifying",
    price: 279,
    description: "mini size",
    quantity: 2,
  },
  {
    img: "./assets/img/product-cart-3.jfif",
    name: "Nước Tẩy Trang Dịu Nhẹ Simple",
    price: 194,
    description: "200ml",
    quantity: 2,
  },
];

//  ================================ Function =================================

function init() {
  showProduct();
  renderCardProduct(cartProducts);
}

function showProduct() {
  for (let i = 0; i < 9; i++) {
    product += temp;
  }
  productContainer.innerHTML = product;
}

function showForm(form) {
  modal.style.display = "flex";
  form.style.display = "block";
}

function hideAboveElement(container, aboveElement) {
  container.style.display = "none";
  aboveElement.style.display = "none";
}

function switchForm(currentForm, switchForm) {
  currentForm.style.display = "none";
  switchForm.style.display = "block";
}

function setStyle(element, styles = {}) {
  Object.assign(element.style, styles);
}

function renderCardProduct(products) {
  const html = products
    .map((product) => {
      const priceFormat = new Intl.NumberFormat("vi", {
        style: "currency",
        currency: "VND",
        minimumFractionDigits: 3,
        maximumFractionDigits: 3,
      });
      return `
    <li class="search__cart-product-item">
        <img
        src="${product.img}"
        alt="${product.name}"
        class="search__cart-product-img"
        />
        <div class="search__cart-product-info">
        <div class="search__cart-product-head">
            <h3 class="search__cart-product-name">
            ${product.name}
            </h3>
            <div class="search__cart-product-price-wrap">
            <span class="search__cart-product-price"
                >${priceFormat.format(product.price)}</span
            >
            <span class="search__cart-product-multiple">x</span>
            <span class="search__cart-product-quantity">${
              product.quantity
            }</span>
            </div>
        </div>
        <div class="search__cart-product-body">
            <span class="search__cart-product-description"
            >Phân loại: ${product.description}</span
            >
            <span class="search__cart-product-remove">Xoá</span>
        </div>
        </div>
    </li>
    `;
    })
    .join("");

  cartNotice.innerText = products.length;

  products.length > 0
    ? (cartList.innerHTML = html)
    : cartContainer.classList.add("search__cart-list--none");
}

function toggleActive(container) {
  container.classList.toggle("active");
}

function handleToggleActive(node, container) {
  node.onclick = () => {
    toggleActive(container);
  };
}

// ================ Events ================

productContainer.onclick = (e) => {
  const heart = e.target.closest(".product__like");

  if (!heart) return;
  e.preventDefault();
  console.log(heart);
  heart.classList.toggle("product__like--liked");
};

if (registerBtn) registerBtn.onclick = () => showForm(registerForm);

if (loginBtn) loginBtn.onclick = () => showForm(loginForm);

modalOverlay.onclick = (e) => {
  e.stopPropagation();
  const formShowing = Array.from(userForms).find(
    (form) => form.style.display !== "none"
  );

  if (!formShowing) return;

  hideAboveElement(modal, formShowing);
};

handleToggleActive(optionBar, optionHeader);
handleToggleActive(optionHeaderOverlay, optionHeader);
handleToggleActive(optionHeaderClose, optionHeader);
handleToggleActive(searchBtn, searchFormMobile);

const anchorTags = Array.from(document.getElementsByTagName("a"));
anchorTags.forEach(
  (anchor) =>
    (anchor.onclick = function (e) {
      e.preventDefault();
    })
);
// ================================ Initial App =================================
init();
