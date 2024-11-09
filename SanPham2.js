let listProducts = [];
const productsPerPage = 16; // Số sản phẩm mỗi trang
let currentPage = 1; // Trang hiện tại

async function loadProducts() {
  try {
    const response = await fetch(`products.json`);
    listProducts = await response.json();
    showProductDetails();
  } catch (error) {
    console.error("Loi khi doc file json: ", error);
  }
}

loadProducts();

function displayProductByBrand(obj) {
  alert(obj.id);
  var s = "";
  for (let i = 0; i < listProducts.length; i++) {
    if (listProducts[i].brandId == obj.id) {
      s += `
        <a href="detail.html?id=${listProducts[i].id}">
          <div class="product-card">
            <div class="product-img">
              <img src="${listProducts[i].image}" alt="${
        listProducts[i].name
      }" style="width:100%">
            </div>
            <div class="product-info">
              <h4>${listProducts[i].name}</h4>
              <p class="price">${formatPrice(listProducts[i].price)}</p>
            <div class="storage-capacity">
                ${
                  listProducts[i].size
                    ? `<span>${listProducts[i].size}</span>`
                    : ""
                }
                ${
                  listProducts[i].storage
                    ? `<span>${listProducts[i].storage}</span>`
                    : ""
                }
                ${
                  listProducts[i].capacity
                    ? `<span>${listProducts[i].capacity}</span>`
                    : ""
                }
              </div>
              <div class="promotion">${listProducts[i].promotion}</div>
              <div class="rating-favorite">
                <div class="rating">
                  ${createRatingStars(listProducts[i].rating)}
                </div>
                <div class="favorite">
                  <span>Yêu thích</span>
                  <i class="fa-${
                    listProducts[i].isFavorite ? "solid" : "regular"
                  } fa-heart" id="heart-icon"></i>
                </div>
              </div>
            </div>
          </div>
        </a>
      `;
    }
  }

  document.getElementById("productList").innerHTML = s;
}

// Hàm định dạng giá tiền
function formatPrice(price) {
  return price.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
}

// Hàm tạo các ngôi sao đánh giá
function createRatingStars(rating) {
  let stars = "";
  for (let i = 0; i < 5; i++) {
    stars += `<i class="fa-solid fa-star${
      i < rating ? "" : "-half-stroke"
    }"></i>`;
  }
  return stars;
}

// hàm hiện chi tiết sản phẩm theo thẻ a
function showProductDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  console.log("URL search params:", window.location.search);
  console.log("Product ID:", productId);

  // Tìm sản phẩm với id tương ứng
  const product = listProducts.find((prod) => prod.id === parseInt(productId));

  if (product) {
    document.querySelector(".product-detail").innerHTML = `
      <div class="box-detail">
        <div class="img-transfer">
          <div class="rating-favorite">
            <div class="rating">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
            </div>
            <div class="heart">
              <i class="fa-regular fa-heart"></i>
            </div>
          </div>
          <div class="img-detail">
            <div class="main-img">
              <img src="${product.image}" alt="${
      product.name
    }" id="displayMainImg" />
            </div>
            <div class="thumnailList">
              <img src="${product.thumnailList[0].thumnail}" alt="${
      product.thumnailList[0].alt
    }" onclick="displayMainImage('${product.thumnailList[0].thumnail}')"/>
              <img src="${product.thumnailList[1].thumnail}" alt="${
      product.thumnailList[1].alt
    }" onclick="displayMainImage('${product.thumnailList[1].thumnail}')"/>
              <img src="${product.thumnailList[2].thumnail}" alt="${
      product.thumnailList[2].alt
    }" onclick="displayMainImage('${product.thumnailList[2].thumnail}')"/>
            </div>
          </div>
        </div>
        <div class="info-detail">
          <h3>${product.name}</h3>
          <p class="price">${formatPrice(product.price)}</p>
          <p class="brand">Brand: <span>${product.brandId}</span></p>
          <hr />
          <p class="desc">${product.desc}</p>
          <hr />
          <button>Mua ngay</button>
          <button>Thêm vào giỏ hàng</button>
        </div>
      </div>
      <div class="specifications">
        <h4>Thông số kỹ thuật</h4>
        <hr />
        <p>Màn hình: <span>${product.screen}</span></p>
        <p>Camera trước: <span>${product.cameratruoc}</span></p>
        <p>Camera sau: <span>${product.camerasau}</span></p>
        <p>Ram: <span>${product.ram}</span></p>
        <p>Chipset: <span>${product.chipset}</span></p>
        <p>Bộ nhớ trong: <span>${product.storage}</span></p>
        <p>Dung lượng pin: <span>${product.pin}</span></p>
        <p>Hệ điều hành: <span>${product.os}</span></p>
      </div>
    `;
  }
}

// Gọi hàm khi trang chi tiết được tải
showProductDetails();

// hàm thay đổi nguồn ảnh
function displayMainImage(src) {
  if (document.getElementById("displayMainImg").src !== src)
    document.getElementById("displayMainImg").src = src; // Thay đổi src của hình ảnh lớn
}
