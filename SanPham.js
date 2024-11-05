const productsPerPage = 16; // Số sản phẩm mỗi trang
let currentPage = 1; // Trang hiện tại
let products = []; // Biến để lưu danh sách sản phẩm

// Hàm tải dữ liệu từ file JSON
async function loadProducts() {
  try {
    const response = await fetch("products.json");
    products = await response.json();

    // Kiểm tra localStorage và lấy trang hiện tại
    const savedPage = localStorage.getItem("currentPage");
    currentPage = savedPage ? parseInt(savedPage) : 1;

    displayProducts(currentPage); // Hiển thị sản phẩm lần đầu
  } catch (error) {
    console.error("Lỗi khi tải dữ liệu sản phẩm:", error);
  }
}

// Hàm hiển thị sản phẩm theo trang hiện tại
function displayProducts(page) {
  currentPage = page; // Cập nhật trang hiện tại
  localStorage.setItem("currentPage", currentPage); // Lưu trang hiện tại vào localStorage
  const productList = document.getElementById("productList");
  productList.innerHTML = ""; // Xóa sản phẩm cũ

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const paginatedProducts = products.slice(startIndex, endIndex);

  paginatedProducts.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");
    productCard.innerHTML = `
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}" style="width:100%">
        </div>
        <div class="product-info">
          <h4>${product.name}</h4>
          <p class="price">${formatPrice(product.price)}</p>
          <div class="storage-capacity">
            ${product.size ? `<span>${product.size}</span>` : ""}
            ${product.storage ? `<span>${product.storage}</span>` : ""}
            ${product.capacity ? `<span>${product.capacity}</span>` : ""}
          </div>
          <div class="promotion">${product.promotion}</div>
          <div class="rating-favorite">
            <div class="rating">
              ${createRatingStars(product.rating)}
            </div>
            <div class="favorite">
              <span>Yêu thích</span>
              <i class="fa-${
                product.isFavorite ? "solid" : "regular"
              } fa-heart" id="heart-icon"></i>
            </div>
          </div>
        </div>
      `;
    productList.appendChild(productCard);

    // Thêm class 'visible' với một chút trễ để tạo hiệu ứng trượt
    setTimeout(() => {
      productCard.classList.add("visible");
    }, 100);
  });

  setupPagination(products.length);
  window.scrollTo(0, 0);
}

// Hàm tạo nút điều hướng trang
function setupPagination(totalProducts) {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = ""; // Xóa nút phân trang cũ

  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const maxVisiblePages = 20; // Số nút điều hướng tối đa hiển thị

  // Tính toán trang bắt đầu và kết thúc
  let startPage, endPage;

  if (totalPages <= maxVisiblePages) {
    // Nếu tổng số trang ít hơn hoặc bằng 10, hiển thị tất cả
    startPage = 1;
    endPage = totalPages;
  } else {
    // Nếu tổng số trang lớn hơn 10, chỉ hiển thị một phần
    startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Điều chỉnh lại startPage nếu endPage không đủ 10
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
  }

  // Tạo nút điều hướng
  for (let i = startPage; i <= endPage; i++) {
    const pageButton = document.createElement("div");
    pageButton.setAttribute("class", "page page-num");
    pageButton.innerText = i;

    // Kiểm tra nếu nút là trang hiện tại
    if (i === currentPage) {
      pageButton.disabled = true; // Vô hiệu hóa nút
      pageButton.classList.add("active"); // Thêm class để tạo kiểu cho nút hiện tại
    } else {
      pageButton.onclick = () => {
        displayProducts(i); // Gọi hàm hiển thị sản phẩm với trang đã chọn
      };
    }
    pagination.appendChild(pageButton);
  }
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

// Gọi hàm loadProducts để tải và hiển thị sản phẩm
loadProducts();

// Đổi màu icon heart
// function changeColorIcon() {
//   const heartIcon = document.getElementById("heart-icon");

//   heartIcon.addEventListener("click", () => {
//     heartIcon.classList.toggle("active");
//   });
// }
