let listProducts = [];
let probybrand = [];
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
  probybrand = [];
  for (let i = 0; i < listProducts.length; i++) {
    if (listProducts[i].brandId == obj.id) {
      probybrand.push(listProducts[i]);
    }
  }
  display(probybrand);
  console.log(probybrand);
}

function display(list) {
  var s = "";
  for (let i = 0; i < list.length; i++) {
    s += `
        <a href="detail.html?id=${list[i].id}">
          <div class="product-card">
            <div class="product-img">
              <img src="${list[i].image}" alt="${
      list[i].name
    }" style="width:100%">
            </div>
            <div class="product-info">
              <h4>${list[i].name}</h4>
              <p class="price">${formatPrice(list[i].price)}</p>
            <div class="storage-capacity">
                ${list[i].size ? `<span>${list[i].size}</span>` : ""}
                ${list[i].storage ? `<span>${list[i].storage}</span>` : ""}
                ${list[i].capacity ? `<span>${list[i].capacity}</span>` : ""}
              </div>
              <div class="promotion">${list[i].promotion}</div>
              <div class="rating-favorite">
                <div class="rating">
                  ${createRatingStars(list[i].rating)}
                </div>
                <div class="favorite">
                  <span>Yêu thích</span>
                  <i class="fa-${
                    list[i].isFavorite ? "solid" : "regular"
                  } fa-heart" id="heart-icon"></i>
                </div>
              </div>
            </div>
          </div>
        </a>
      `;
  }
  document.getElementById("productList").innerHTML = s;
}

// Hàm sắp xếp sản phẩm theo giá
function sortProducts(order) {
  if (order === "inc") probybrand.sort((a, b) => a.price - b.price);
  else probybrand.sort((a, b) => b.price - a.price);
}

// hàm hiện thị sản phẩm theo giá
function displayByPrice(obj) {
  alert(obj.id);
  sortProducts(obj.id);
  display(probybrand);
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
        <div class="parameter">
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
        <div class="offer">
          <h4>Ưu đãi dành cho khách hàng</h4>
          <hr />
          <p>
            <b>Giảm Giá Đặc Biệt:</b> <span>Các dòng điện thoại mới nhất giảm giá lên đến 30%, giúp bạn sở hữu thiết bị yêu thích với mức giá vô cùng hợp lý.</span> <br />
            <b>Trả Góp 0% Lãi Suất:</b> <span>Dễ dàng chia nhỏ khoản thanh toán với chương trình trả góp lãi suất 0% qua thẻ tín dụng, giúp bạn sở hữu điện thoại mà không lo về tài chính.</span> <br />
            <b>Quà Tặng Kèm Hấp Dẫn:</b> <span>Khi mua điện thoại, nhận ngay phụ kiện độc quyền như tai nghe Bluetooth, sạc nhanh, ốp lưng bảo vệ, và nhiều phần quà giá trị khác.</span> <br />
            <b>Miễn Phí Giao Hàng:</b> <span>Giao hàng nhanh chóng và miễn phí toàn quốc, đảm bảo sản phẩm đến tay bạn một cách an toàn và tiện lợi.</span> <br />
          </p>  
        </div>
        <div class="advertisement">
          <h4>Mô tả</h4>
          <hr />
          <p>
            <span>
              Khám phá các dòng điện thoại hiện đại – Công nghệ đỉnh cao trong tầm tay! Điện thoại ngày nay không chỉ là công cụ liên lạc, mà còn là trợ thủ đắc lực trong cuộc sống. Với thiết kế tinh tế, hiệu năng mạnh mẽ, và camera sắc nét, các dòng sản phẩm mới mang đến trải nghiệm mượt mà và phong cách thời thượng. Dù bạn yêu thích chụp ảnh, cần thiết bị cho công việc hay muốn khẳng định phong cách cá nhân – chúng tôi đều có chiếc điện thoại dành cho bạn!
            </span>
          </p>
        </div>
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
