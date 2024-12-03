// thêm 2/12/2024: file script.js
document.getElementById("userBtn").addEventListener("click", () => {
  window.location.href = "account.html";
});

let loginStatus = JSON.parse(localStorage.getItem("loginStatus")) || false;
if (loginStatus) {
  // Lấy thông tin người dùng hiện tại từ localStorage
  let currentuser = JSON.parse(localStorage.getItem("currentUser"));

  // Kiểm tra xem currentuser có tồn tại và có thuộc tính userName không
  if (currentuser && currentuser.userName) {
    // Cập nhật nội dung của nút userBtn
    const userBtn = document.getElementById("userBtn");
    userBtn.innerHTML = `<i class="bi bi-person"></i> <span>${currentuser.userName}</span>`; // ở đây thêm thẻ span
  }
}

let selectedItems = [];
const params = new URLSearchParams(window.location.search);
let button = params.get("button");
// localStorage.removeItem("bills")
document.addEventListener("DOMContentLoaded", function () {
  let bills = JSON.parse(localStorage.getItem("bills"));
  console.log(bills);
  let currentuser = JSON.parse(localStorage.getItem("currentUser"));
  let cart =
    JSON.parse(localStorage.getItem(`cart_${currentuser.userName}`)) || [];
  console.log(cart);
  // Lấy thông tin sản phẩm từ localStorage
  let htmlContent = "";
  const blockProductItem = document.querySelector(".block-product-item-outer");
  // Duyệt qua từng sản phẩm trong giỏ hàng
  for (let i = 0; i < cart.length; i++) {
    const product = cart[i];
    //console.log(cart[i].name)
    // Tạo HTML cho từng sản phẩm và cộng dồn vào htmlContent
    htmlContent += `
                        <div class="block-product-item">
                            <div class="check-box-product">
                                <div class="select-product-action">
                                    <input type="checkbox" value="true" id="product-checkbox" class="custom-control-input">
                                </div>
                                <label class="custom-control-label" for="__BVID__32">
                                    <img src="${
                                      product.image
                                    }" style="width: 150px;" alt="${
      product.name
    }">
                                </label>
                            </div>
                            <div class="product-info">
                                <div class="product-info-head">
                                    <a href="#" class="product-name">
                                         ${product.name}
                                    </a>
                                    <button class="remove-item" fdprocessedid="vabses">
                                            <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M13.9999 4H10.6666V2.88666C10.6509 2.45988 10.4667 2.0567 10.1543 1.76553C9.84188 1.47435 9.42675 1.31893 8.99992 1.33333H6.99992C6.57309 1.31893 6.15796 1.47435 5.84554 1.76553C5.53312 2.0567 5.34889 2.45988 5.33325 2.88666V4H1.99992C1.82311 4 1.65354 4.07024 1.52851 4.19526C1.40349 4.32028 1.33325 4.48985 1.33325 4.66666C1.33325 4.84348 1.40349 5.01305 1.52851 5.13807C1.65354 5.26309 1.82311 5.33333 1.99992 5.33333H2.66659V12.6667C2.66659 13.1971 2.8773 13.7058 3.25237 14.0809C3.62744 14.456 4.13615 14.6667 4.66659 14.6667H11.3333C11.8637 14.6667 12.3724 14.456 12.7475 14.0809C13.1225 13.7058 13.3333 13.1971 13.3333 12.6667V5.33333H13.9999C14.1767 5.33333 14.3463 5.26309 14.4713 5.13807C14.5963 5.01305 14.6666 4.84348 14.6666 4.66666C14.6666 4.48985 14.5963 4.32028 14.4713 4.19526C14.3463 4.07024 14.1767 4 13.9999 4ZM6.66659 2.88666C6.66659 2.78 6.80659 2.66666 6.99992 2.66666H8.99992C9.19325 2.66666 9.33325 2.78 9.33325 2.88666V4H6.66659V2.88666ZM11.9999 12.6667C11.9999 12.8435 11.9297 13.013 11.8047 13.1381C11.6796 13.2631 11.5101 13.3333 11.3333 13.3333H4.66659C4.48977 13.3333 4.32021 13.2631 4.19518 13.1381C4.07016 13.013 3.99992 12.8435 3.99992 12.6667V5.33333H11.9999V12.6667Z" fill="#212B36">
                                            </path> 
                                            <path d="M5.99992 11.3333C6.17673 11.3333 6.3463 11.2631 6.47132 11.1381C6.59635 11.013 6.66658 10.8435 6.66658 10.6667V8C6.66658 7.82319 6.59635 7.65362 6.47132 7.5286C6.3463 7.40357 6.17673 7.33334 5.99992 7.33334C5.82311 7.33334 5.65354 7.40357 5.52851 7.5286C5.40349 7.65362 5.33325 7.82319 5.33325 8V10.6667C5.33325 10.8435 5.40349 11.013 5.52851 11.1381C5.65354 11.2631 5.82311 11.3333 5.99992 11.3333Z" fill="#212B36">
                                            </path>
                                            <path d="M9.99992 11.3333C10.1767 11.3333 10.3463 11.2631 10.4713 11.1381C10.5963 11.013 10.6666 10.8435 10.6666 10.6667V8C10.6666 7.82319 10.5963 7.65362 10.4713 7.5286C10.3463 7.40357 10.1767 7.33334 9.99992 7.33334C9.82311 7.33334 9.65354 7.40357 9.52851 7.5286C9.40349 7.65362 9.33325 7.82319 9.33325 8V10.6667C9.33325 10.8435 9.40349 11.013 9.52851 11.1381C9.65354 11.2631 9.82311 11.3333 9.99992 11.3333Z" fill="#212B36">
                                            </path>
                                        </svg>
                                    </button>
                                </div>
                                <div style="display: flex; justify-content: space-between;">
                                    <!---->
                                    <div class="block-box-price">
                                        <!----> <!----> 
                                        <span class="title-price" style="display: none;">
                                    </span>
                                        <div class="box-info__box-price">
                                            <p class="product__price--show">
                                             ${product.price.toLocaleString(
                                               "vi-VN"
                                             )}
                                            </p>
                                        <!---->
                                        </div>
                                    </div>
                                    <div class="action">
                                        <span class="minus ">
                                                -
                                        </span>
                                        <input style="text-align: center;height: 30px;width: 30px;border: none;" type="text" value="1" readonly="readonly" fdprocessedid="vwcdc6">
                                        <span class="plus">
                                                +
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
        `;
  }
  blockProductItem.innerHTML = htmlContent;
  updateCartDisplay();
  //--------------------MuaNgay Nothing---------------------------------------
  function updateCartDisplay() {
    const productContainer = document.querySelector(
      ".block-product-item-outer"
    );
    const listItemSuperCart = document.getElementById("ListItemSuperCart");
    const priceTemp = document.querySelector(".price-temp");
    const buyNowButton = document.getElementById("buy-now-button");
    const nothingCart = document.getElementById("nothingCart");
    const backButton = document.getElementById("nothing-back");
    const SMember = document.querySelector(".SMember");
    //console.log(backButton)

    // Kiểm tra xem có sản phẩm nào trong giỏ hàng không
    const hasProducts = productContainer.children.length > 0;

    if (!hasProducts) {
      // Nếu không còn sản phẩm nào, ẩn các phần tử liên quan đến giỏ hàng
      listItemSuperCart.style.display = "none";
      priceTemp.style.display = "none";
      buyNowButton.style.display = "none";
      SMember.style.display = "none";
      // Hiển thị phần tử thông báo giỏ hàng rỗng và nút quay về trang chủ
      nothingCart.style.display = "flex";
      backButton.style.display = "block";
    } else {
      // Nếu còn sản phẩm, hiển thị lại các phần tử liên quan đến giỏ hàng
      listItemSuperCart.style.display = "block";
      priceTemp.style.display = "flex";
      buyNowButton.style.display = "inline-block";
      SMember.style.display = "inline-block";

      // Ẩn phần tử thông báo giỏ hàng rỗng và nút quay về trang chủ
      nothingCart.style.display = "none";
    }
  }

  // Gọi hàm updateCartDisplay() ngay khi tải trang để kiểm tra trạng thái ban đầu

  // ---------------------------DeleteProduct----------------------------------
  document.querySelectorAll(".remove-item").forEach(function (button) {
    button.addEventListener("click", function () {
      const ItemList = document.querySelector(".view-list-wrapper");
      let currentuser = JSON.parse(localStorage.getItem("currentUser"));
      // Lấy div cha chứa sản phẩm
      var productItem = this.closest(".block-product-item");

      // Lấy tên sản phẩm từ div này
      var productName = productItem
        .querySelector(".product-name")
        .textContent.trim();
      console.log(productName.trim());
      // Lấy giỏ hàng từ localStorage
      let cart =
        JSON.parse(localStorage.getItem(`cart_${currentuser.userName}`)) || [];

      // Kiểm tra nếu có giỏ hàng và sản phẩm
      if (cart.length > 0) {
        // Loại bỏ sản phẩm khỏi giỏ hàng
        cart = cart.filter((product) => product.name !== productName);
        // Cập nhật lại giỏ hàng trong localStorage
        localStorage.setItem(
          `cart_${currentuser.userName}`,
          JSON.stringify(cart)
        );
      }

      // Xóa sản phẩm khỏi danh sách view-list-wrapper
      const viewListItems = ItemList.querySelectorAll(".item");
      viewListItems.forEach(function (viewItem) {
        const viewItemName = viewItem
          .querySelector(".item__name")
          .textContent.trim();
        if (viewItemName === productName) {
          viewItem.remove(); // Xóa div trong View List
        }
      });

      // Xóa sản phẩm trên giao diện chính
      productItem.remove();

      // Cập nhật hiển thị giỏ hàng và tổng tạm tính
      updateCartDisplay();
      updateTemporaryTotal();
    });
  });
  // ---------------------------------SelectALl------AddItemtoPayMent------------------------------
  document.getElementById("select-all").addEventListener("change", function () {
    // Lấy tất cả checkbox sản phẩm
    const checkboxes = document.querySelectorAll(
      '.block-product-item input[type="checkbox"]'
    );
    const selectAllChecked = this.checked; // Lưu trạng thái của checkbox "Chọn tất cả" vào một biến
    checkboxes.forEach(function (checkbox) {
      checkbox.checked = selectAllChecked; // Đặt trạng thái checkbox sản phẩm bằng trạng thái của checkbox "Chọn tất cả"

      const itemDiv = checkbox.closest(".block-product-item"); // Thay `this` bằng `checkbox`
      if (selectAllChecked) {
        // Thêm `itemDiv` vào mảng nếu chưa có
        if (!selectedItems.includes(itemDiv)) {
          selectedItems.push(itemDiv);
        }
      } else {
        // Loại bỏ `itemDiv` khỏi mảng nếu đã bỏ chọn
        const index = selectedItems.indexOf(itemDiv);
        if (index > -1) {
          selectedItems.splice(index, 1);
        }
      }
    });
    console.log(selectedItems);
  });

  var checkboxes = document.querySelectorAll(
    '.block-product-item input[type="checkbox"]'
  );
  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", function () {
      var allChecked = true;
      checkboxes.forEach(function (cb) {
        if (!cb.checked) {
          allChecked = false;
        }
      });
      // Cập nhật trạng thái của checkbox "Chọn tất cả"
      document.getElementById("select-all").checked = allChecked;
      //Chọn vào Block div thêm mảng
      const itemDiv = this.closest(".block-product-item");

      // Kiểm tra xem checkbox đã được chọn hay chưa
      if (this.checked) {
        // Thêm `itemDiv` vào mảng nếu chưa có
        if (!selectedItems.includes(itemDiv)) {
          selectedItems.push(itemDiv);
        }
      } else {
        // Loại bỏ `itemDiv` khỏi mảng nếu đã bỏ chọn
        const index = selectedItems.indexOf(itemDiv);
        if (index > -1) {
          selectedItems.splice(index, 1);
        }
      }
      console.log(selectedItems);
    });
  });
  // -------------------------------UpdateCount----------------------
  document.querySelectorAll(".plus").forEach(function (button) {
    button.addEventListener("click", function () {
      var quantityInput = this.previousElementSibling; // Lấy input số lượng
      var quantity = parseInt(quantityInput.value); // Chuyển đổi giá trị sang số
      quantityInput.value = quantity + 1; // Cộng 1 vào số lượng
    });
  });

  document.querySelectorAll(".minus").forEach(function (button) {
    button.addEventListener("click", function () {
      var quantityInput = this.nextElementSibling; // Lấy input số lượng
      var quantity = parseInt(quantityInput.value); // Chuyển đổi giá trị sang số
      if (quantity > 1) {
        quantityInput.value = quantity - 1; // Trừ 1 nếu số lượng lớn hơn 1
        updateTemporaryTotal();
      }
    });
  });
  //--------------------UpdateMoney---------------------------------------
  // Hàm cập nhật tổng tiền cho sản phẩm
  const buyNowButton = document.getElementById("buy-now-button");
  buyNowButton.disabled = true; // Không cho phép nhấn nút
  buyNowButton.style.backgroundColor = "gray"; // Chuyển sang màu xám
  function updateTemporaryTotal() {
    const productItems = document.querySelectorAll(".block-product-item");
    let total = 0;
    let hasChecked = false; // Biến để kiểm tra xem có checkbox nào được chọn không

    productItems.forEach((item) => {
      // Lấy giá tiền của sản phẩm
      const priceElement = item.querySelector(".product__price--show");
      const price = parseFloat(
        priceElement.textContent.replace(/\./g, "").replace("đ", "").trim()
      );

      // Lấy số lượng sản phẩm
      const quantityInput = item.querySelector('input[type="text"]');
      const quantity = parseInt(quantityInput.value);

      // Lấy checkbox
      const checkbox = item.querySelector('input[type="checkbox"]');

      // Nếu checkbox được đánh dấu, cộng tổng vào
      if (checkbox.checked) {
        total += price * quantity;
        hasChecked = true; // Có ít nhất một checkbox được chọn
      }
    });

    // Cập nhật hiển thị tạm tính
    const totalElement = document.getElementById("temporary-total");
    totalElement.textContent = total.toLocaleString("vi-VN") + "đ";

    const buyNowButton = document.getElementById("buy-now-button");
    if (hasChecked) {
      buyNowButton.disabled = false; // Cho phép nhấn nút
      buyNowButton.style.backgroundColor = ""; // Hoặc thiết lập lại màu sắc
    } else {
      buyNowButton.disabled = true; // Không cho phép nhấn nút
      buyNowButton.style.backgroundColor = "gray"; // Chuyển sang màu xám
    }
  }

  // Gán sự kiện cho checkbox và input số lượng
  document.querySelectorAll(".custom-control-input").forEach((checkbox) => {
    checkbox.addEventListener("change", updateTemporaryTotal);
  });

  document.querySelectorAll('input[type="text"]').forEach((input) => {
    input.addEventListener("change", updateTemporaryTotal);
  });

  document.querySelectorAll(".plus").forEach((button) => {
    button.addEventListener("click", function () {
      const quantityInput = this.previousElementSibling; // lấy input số lượng
      let quantity = parseInt(quantityInput.value);
      updateTemporaryTotal(); // cập nhật tổng tiền
    });
  });

  document.querySelectorAll(".minus").forEach((button) => {
    button.addEventListener("click", function () {
      const quantityInput = this.nextElementSibling; // lấy input số lượng
      let quantity = parseInt(quantityInput.value);
      if (quantity > 1) {
        // đảm bảo số lượng không âm
        updateTemporaryTotal(); // cập nhật tổng tiền
      }
    });
  });

  if (button === "buynow") {
    console.log("Button 1 được bấm");
    const product = JSON.parse(localStorage.getItem("product"));
    var Cart = document.querySelector("#cart");
    var info = document.querySelector("#info");
    var backtocart = document.querySelector(".go-back");
    var ListItemSuperCart = document.querySelector(".ListItemSuperCart");
    var BlockInfo = document.querySelector(".block-info");
    const Nothing = document.getElementById("nothingCart");
    Nothing.setAttribute("style", "display: none !important;");
    console.log(Nothing);
    BlockInfo.style.display = "block";
    ListItemSuperCart.style.display = "none";
    backtocart.innerHTML = `
    <a href="" id="back-to-Cart">
        <svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 8.5L1 8.5M1 8.5L8 1M1 8.5L8 16" stroke="#121219" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
    <p class="title" style="display: '';" id="info">Thông Tin</p>
`;
    // Nếu giỏ hàng đang hiển thị, ẩn nó và hiển thị thông tin
    if (Cart.style.display !== "none") {
      Cart.style.display = "none";
      info.style.display = "";
    } else {
      // Ngược lại, ẩn thông tin và hiển thị giỏ hàng
      Cart.style.display = "";
      info.style.display = "none";
    }
    let cartData = [];
    const image = product.image;
    const name = product.name;
    const priceText = product.price;
    const price = parseFloat(priceText.replace(/\./g, "").replace("₫", ""));
    const quantity = 1;

    // Đưa sản phẩm vào danh sách cartData
    cartData.push({
      image: image,
      name: name,
      price: price,
      quantity: quantity,
    });
    // Lưu danh sách sản phẩm vào localStorage
    localStorage.setItem("cartData", JSON.stringify(cartData));
    renderItemsFromLocalStorage();
  }
});

// =======================================Alert=========================================
function showCustomAlert(message) {
  var alertElement = document.getElementById("customAlert");
  var alertMessage = document.getElementById("alertMessage");

  // Cập nhật nội dung thông báo và hiển thị lại
  alertMessage.innerHTML = message;
  alertElement.style.display = "block";
  alertElement.classList.add("show");

  // Tự động đóng thông báo sau 2 giây
  var closeButton = document.getElementById("closeAlert");
  setTimeout(function () {
    alertElement.classList.remove("show");
    alertElement.style.display = "none"; // Đặt `alertElement` về `none` thay vì `alertMessage`
  }, 2000);

  // Đóng khi nhấn nút "X"
  closeButton.onclick = function () {
    alertElement.style.display = "none";
    alertElement.classList.remove("show");
  };
}

// ========================================Email Bottom==================================
const emailInput = document.getElementById("emailInput");
const customerBottom = document.getElementById("customerBottom");
// Lắng nghe sự kiện khi người dùng nhập vào ô email
emailInput.addEventListener("input", function () {
  if (emailInput.value.trim() !== "") {
    customerBottom.classList.add("visible"); // Thêm lớp để hiện div mượt mà
  } else {
    customerBottom.classList.remove("visible"); // Xóa lớp để ẩn div mượt mà
  }
});
// =============================Phone select======================================
document
  .getElementById("phoneInput")
  .addEventListener("input", function (event) {
    // Chỉ cho phép các ký tự là số
    if (this.value.length > 0 && this.value.charAt(0) !== "0") {
      this.value = "0" + this.value.slice(1); // Thêm '0' vào đầu nếu ký tự đầu tiên không phải là '0'
    }
    this.value = this.value.replace(/\D/g, ""); // Loại bỏ tất cả các ký tự không phải số
  });

// ====================================Dicsrict Select==========================

// Danh sách các quận/huyện có sẵn
const districts = [
  "Huyện Bình Chánh",
  "Huyện Cần Giờ",
  "Huyện Hóc Môn",
  "Huyện Nhà Bè",
  "Huyện Củ Chi",
  "Quận 1",
  "Quận 2",
  "Quận 3",
  "Quận 4",
  "Quận 5",
  "Quận 6",
  "Quận 7",
  "Quận 8",
  "Quận 9",
  "Quận 10",
  "Quận 11",
  "Quận 12",
  "Quận Bình Tân",
  "Quận Bình Thạnh",
  "Quận Tân Phú",
  "Quận Gò Vấp",
  "Quận Phú Nhuận",
  "Quận Tân Bình",
]; // Thêm danh sách đầy đủ tại đây

// Hiển thị dropdown khi click vào input và cập nhật placeholder
document
  .getElementById("box-select-district")
  .addEventListener("click", function () {
    const input = document.getElementById("box-select-district");
    const dropdown = document.getElementById("districtDropdown");

    // Kiểm tra nếu input đã có giá trị trước đó
    if (input.value) {
      input.setAttribute("placeholder", input.value); // Đặt placeholder là giá trị hiện tại
      input.setAttribute("autocomplete", "off"); // Tắt autocomplete từ trình duyệt
      input.value = "";
    }

    dropdown.classList.toggle("Dropdownvisible"); // Toggle hiển thị dropdown
    filterDistricts(""); // Hiển thị tất cả các mục khi người dùng mở dropdown
  });

// Lọc và cập nhật kết quả khi người dùng gõ vào input
document
  .getElementById("box-select-district")
  .addEventListener("input", function () {
    const input = document
      .getElementById("box-select-district")
      .value.toLowerCase();
    filterDistricts(input); // Gọi hàm lọc với giá trị hiện tại
  });

// Hàm để lọc và hiển thị các quận/huyện phù hợp
function filterDistricts(query) {
  const dropdown = document.getElementById("districtDropdown");
  dropdown.innerHTML = ""; // Xóa nội dung cũ của dropdown

  const filteredDistricts = districts.filter((district) =>
    district.toLowerCase().includes(query)
  );

  if (filteredDistricts.length > 0) {
    // Hiển thị các quận/huyện phù hợp
    dropdown.innerHTML = ""; // Xóa nội dung cũ của dropdown
    filteredDistricts.forEach((district) => {
      const item = document.createElement("div");
      item.classList.add("dropdown__item");
      item.innerHTML = `<span>${district}</span>`;
      item.addEventListener("click", function () {
        const wardInput = document.getElementById("box-select-ward");
        if (
          document.getElementById("box-select-district").placeholder != district
        ) {
          wardInput.value = "";
        }
        document.getElementById("box-select-district").value = district; // Điền tên quận/huyện vào input
        document
          .getElementById("box-select-district")
          .removeAttribute("placeholder"); // Xóa placeholder
        dropdown.classList.remove("Dropdownvisible"); // Ẩn dropdown
      });
      dropdown.appendChild(item);
    });
  } else {
    // Hiển thị thông báo khi không tìm thấy kết quả
    const noResultItem = document.createElement("div");
    noResultItem.classList.add("dropdown__item");
    noResultItem.innerHTML = "<span>Không tìm thấy Quận/huyện</span>";
    dropdown.appendChild(noResultItem);
  }

  // Hiển thị dropdown nếu có kết quả, ẩn nếu không
  if (query || filteredDistricts.length > 0) {
    dropdown.classList.add("Dropdownvisible");
  } else {
    dropdown.classList.remove("Dropdownvisible");
  }
}

// Đóng dropdown nếu người dùng click vào bất kỳ vị trí nào ngoài input hoặc dropdown
document.addEventListener("click", function (event) {
  var input = document.getElementById("box-select-district");
  var dropdown = document.getElementById("districtDropdown");

  if (!input.contains(event.target) && !dropdown.contains(event.target)) {
    dropdown.classList.remove("Dropdownvisible"); // Ẩn dropdown khi click bên ngoài
    input.setAttribute("placeholder", ""); // Đặt placeholder là giá trị hiện tại
  }
});

// ===================================Ward Select============================
// Giả sử bạn có danh sách phường/xã cho các quận/huyện
let wardsByDistrict = {
  "Quận 1": [
    "Phường Bến Nghé",
    "Phường Bến Thành",
    "Phường Cô Giang",
    "Phường Cầu Kho",
    "Phường Đa Kao",
    "Phường Nguyễn Cư Trinh",
    "Phường Nguyễn Thái Bình",
    "Phường Phạm Ngũ Lão",
    "Phường Tân Định",
    "Phường Thủ Thiêm",
  ],
  "Quận 2": [
    "Phường An Khánh",
    "Phường An Lợi Đông",
    "Phường An Phú",
    "Phường Bình An",
    "Phường Bình Khánh",
    "Phường Cát Lái",
    "Phường Thạnh Mỹ Lợi",
    "Phường Thủ Thiêm",
    "Phường Tân Phú",
    "Phường Xuân Thạnh",
  ],
  "Quận 3": [
    "Phường 1",
    "Phường 2",
    "Phường 3",
    "Phường 4",
    "Phường 5",
    "Phường 6",
    "Phường 7",
    "Phường 8",
    "Phường 9",
    "Phường Võ Thị Sáu",
  ],
  "Quận 4": [
    "Phường 1",
    "Phường 2",
    "Phường 3",
    "Phường 4",
    "Phường 5",
    "Phường 6",
    "Phường 7",
    "Phường 8",
    "Phường 9",
    "Phường 10",
    "Phường 11",
  ],
  "Quận 5": [
    "Phường 1",
    "Phường 2",
    "Phường 3",
    "Phường 4",
    "Phường 5",
    "Phường 6",
    "Phường 7",
    "Phường 8",
    "Phường 9",
    "Phường 10",
    "Phường 11",
  ],
  "Quận 6": [
    "Phường 1",
    "Phường 2",
    "Phường 3",
    "Phường 4",
    "Phường 5",
    "Phường 6",
    "Phường 7",
    "Phường 8",
    "Phường 9",
    "Phường 10",
  ],
  "Quận 7": [
    "Phường Tân Kiểng",
    "Phường Tân Hưng",
    "Phường Tân Phong",
    "Phường Tân Thuận Đông",
    "Phường Tân Thuận Tây",
    "Phường Phú Mỹ",
    "Phường Bình Thuận",
    "Phường Hưng Thạnh",
    "Phường Phú Thuận",
    "Phường Xuân Thủy",
  ],
  "Quận 8": [
    "Phường 1",
    "Phường 2",
    "Phường 3",
    "Phường 4",
    "Phường 5",
    "Phường 6",
    "Phường 7",
    "Phường 8",
    "Phường 9",
    "Phường 10",
    "Phường 11",
    "Phường 12",
    "Phường 13",
    "Phường 14",
    "Phường 15",
  ],
  "Quận 9": [
    "Phường Hiệp Phú",
    "Phường Long Bình",
    "Phường Long Thạnh Mỹ",
    "Phường Phú Hữu",
    "Phường Tân Phú",
    "Phường Trường Thạnh",
    "Phường Tam Bình",
    "Phường Linh Đông",
    "Phường Linh Xuân",
    "Phường An Phú",
    "Phường Bình An",
  ],
  "Quận 10": [
    "Phường 1",
    "Phường 2",
    "Phường 3",
    "Phường 4",
    "Phường 5",
    "Phường 6",
    "Phường 7",
    "Phường 8",
    "Phường 9",
    "Phường 10",
  ],
  "Quận 11": [
    "Phường 1",
    "Phường 2",
    "Phường 3",
    "Phường 4",
    "Phường 5",
    "Phường 6",
    "Phường 7",
    "Phường 8",
    "Phường 9",
    "Phường 10",
  ],
  "Quận 12": [
    "Phường An Phú Đông",
    "Phường Đông Hưng Thuận",
    "Phường Hiệp Thành",
    "Phường Tân Chánh Hiệp",
    "Phường Tân Hưng Thuận",
    "Phường Tân Thới Nhất",
    "Phường Tân Thới Hiệp",
    "Phường Thạnh Lộc",
    "Phường Thạnh Xuân",
    "Phường Trung Mỹ Tây",
  ],
  "Huyện Bình Chánh": [
    "Xã Bình Hưng",
    "Xã Bình Lợi",
    "Xã Bình Tân",
    "Xã Hưng Long",
    "Xã Lê Minh Xuân",
    "Xã Phạm Văn Hai",
    "Xã Tân Kiên",
    "Xã Tân Quý Tây",
    "Xã Vĩnh Lộc A",
    "Xã Vĩnh Lộc B",
    "Thị trấn Tân Túc",
  ],
  "Quận Bình Tân": [
    "Phường Bình Hưng Hòa",
    "Phường Bình Hưng Hòa A",
    "Phường Bình Hưng Hòa B",
    "Phường Bình Trị Đông",
    "Phường Bình Trị Đông A",
    "Phường Bình Trị Đông B",
    "Phường An Lạc",
    "Phường An Lạc A",
    "Phường An Lạc B",
    "Phường Tân Tạo",
    "Phường Tân Tạo A",
    "Phường Tân Tạo B",
  ],
  "Huyện Cần Giờ": [
    "Thị trấn Cần Thạnh",
    "Xã Bình Khánh",
    "Xã An Thới Đông",
    "Xã Cần Thạnh",
    "Xã Long Hòa",
    "Xã Tam Thôn Hiệp",
    "Xã Phú Mỹ",
  ],
  "Huyện Củ Chi": [
    "Trung Lập Hạ",
    "Thị trấn Củ Chi",
    "Xã Phước Hiệp",
    "Xã Phước Vĩnh An",
    "Xã Tân An Hội",
    "Xã Tân Phú Trung",
    "Xã Nhuận Đức",
    "Xã Bình Mỹ",
    "Xã Hòa Phú",
    "Xã An Nhơn Tây",
    "Xã Trung An",
    "Xã Tân Thạnh Tây",
    "Xã Tân Thông Hội",
    "Xã Lê Minh Xuân",
  ],
  "Huyện Hóc Môn": [
    "Thị trấn Hóc Môn",
    "Xã Bà Điểm",
    "Xã Đông Thạnh",
    "Xã Nhị Bình",
    "Xã Tân Hiệp",
    "Xã Tân Thới Nhì",
    "Xã Tân Xuân",
    "Xã Xuân Thới Sơn",
    "Xã Xuân Thới Thượng",
  ],
  "Huyện Nhà Bè": [
    "Thị trấn Nhà Bè",
    "Xã Hiệp Phước",
    "Xã Long Thới",
    "Xã Phước Kiển",
    "Xã Nhơn Đức",
    "Xã Tân Quý Tây",
    "Xã An Phú",
    "Xã Phước An",
  ],
  "Quận Gò Vấp": [
    "Phường 1",
    "Phường 2",
    "Phường 3",
    "Phường 4",
    "Phường 5",
    "Phường 6",
    "Phường 7",
    "Phường 8",
    "Phường 9",
    "Phường 10",
    "Phường 11",
    "Phường 12",
  ],
  "Quận Tân Phú": [
    "Phường Tân Quý",
    "Phường Tân Thới Nhất",
    "Phường Phú Thọ Hòa",
    "Phường Sơn Kỳ",
    "Phường Tân Sơn Nhì",
    "Phường Hiệp Tân",
    "Phường Hòa Thạnh",
    "Phường Tây Thạnh",
    "Phường Phú Trung",
    "Phường Nguyễn Sơn",
  ],
  "Quận Phú Nhuận": [
    "Phường 1",
    "Phường 2",
    "Phường 3",
    "Phường 4",
    "Phường 5",
    "Phường 7",
    "Phường 9",
    "Phường 10",
    "Phường 11",
    "Phường 12",
  ],
  "Quận Tân Bình": [
    "Phường 1",
    "Phường 2",
    "Phường 3",
    "Phường 4",
    "Phường 5",
    "Phường 6",
    "Phường 7",
    "Phường 8",
    "Phường 9",
    "Phường 10",
    "Phường 11",
    "Phường 12",
  ],
  "Quận Bình Thạnh": [
    "Phường 1",
    "Phường 2",
    "Phường 3",
    "Phường 4",
    "Phường 5",
    "Phường 6",
    "Phường 7",
    "Phường 8",
    "Phường 9",
    "Phường 10",
    "Phường 11",
    "Phường 12",
    "Phường 13",
    "Phường 14",
    "Phường 15",
  ],
  // Thêm các quận/huyện và danh sách phường/xã tương ứng
};

document
  .getElementById("box-select-ward")
  .addEventListener("focus", function () {
    const districtInput = document.getElementById("box-select-district").value;
    const input = document.getElementById("box-select-ward");
    const wardDropdown = document.getElementById("wardDropdown");

    // Kiểm tra nếu ô `box-select-district` không có dữ liệu
    if (!districtInput) {
      wardDropdown.innerHTML =
        "<div class='dropdown__item'>Vui lòng chọn Quận/huyện trước</div>";
      wardDropdown.classList.add("Dropdownvisible");
    } else {
      // Nếu đã có dữ liệu trong `box-select-district`, hiển thị danh sách phường/xã tương ứng
      wardDropdown.innerHTML = ""; // Xóa nội dung cũ
      const wards = wardsByDistrict[districtInput] || [];
      if (input.value) {
        input.setAttribute("placeholder", input.value); // Đặt placeholder là giá trị hiện tại
        input.value = "";
      }

      // Kiểm tra có phường/xã nào cho quận/huyện đã chọn
      if (wards.length > 0) {
        wards.forEach((ward) => {
          const item = document.createElement("div");
          item.classList.add("dropdown__item");
          item.innerHTML = `<span>${ward}</span>`;
          item.addEventListener("click", function () {
            document.getElementById("box-select-ward").value = ward; // Điền tên phường/xã vào input
            wardDropdown.classList.remove("Dropdownvisible"); // Ẩn dropdown
          });
          wardDropdown.appendChild(item);
        });
      } else {
        wardDropdown.innerHTML =
          "<div class='dropdown__item'>Không tìm thấy Phường/Xã</div>";
      }

      wardDropdown.classList.add("Dropdownvisible");
    }
  });

// Đóng dropdown khi click ra ngoài
document.addEventListener("click", function (event) {
  const wardDropdown = document.getElementById("wardDropdown");
  const wardInput = document.getElementById("box-select-ward");

  if (
    !wardInput.contains(event.target) &&
    !wardDropdown.contains(event.target)
  ) {
    wardDropdown.classList.remove("Dropdownvisible");
    wardInput.setAttribute("placeholder", "");
  }
});

// ========================================Payment method===========================================
const paymentQuoteMain = document.querySelector(".payment-quote__main");
const paymentQuoteTitle = paymentQuoteMain.querySelector(
  ".payment-main__title"
);
const paymentQuoteImg = paymentQuoteMain.querySelector(".payment-main__img ");

document
  .querySelector(".payment-quote__main")
  .addEventListener("click", function () {
    document.querySelector(".payment-quote__modal").style.display = "block";
  });
document
  .getElementById("pament-modal-head_exit")
  .addEventListener("click", function () {
    document.querySelector(".payment-quote__modal").style.display = "none";
    const selectedItem = document.querySelector(".list-payment__item.selected");
    if (!selectedItem) {
      paymentQuoteImg.innerHTML = `<image src="/asset/img/Payment.png" width="100%" height="100%" alt=""></image>`;
      paymentQuoteTitle.innerHTML = `<p>Chọn phương thức thanh toán</p><span>Giảm thêm tới 1.000.000đ</span>`;
    }
  });
// Chọn tất cả các phần tử có class 'payment-item'
const paymentItems = document.querySelectorAll(".list-payment__item");

// Chọn nút "Xác nhận"
const confirmButton = document.querySelector(".payment-modal_bottom .btn");
let paymentMethodTitle;
// Lặp qua từng phần tử 'payment-item' và thêm sự kiện click
paymentItems.forEach((item) => {
  item.addEventListener("click", () => {
    const isSelected = item.classList.contains("selected"); // Kiểm tra nếu đã có class 'selected'

    // Nếu phần tử đã được chọn (có class 'selected'), hủy chọn
    if (isSelected) {
      item.classList.remove("selected"); // Xóa class 'selected'
      const hasSelected =
        document.querySelector(".list-payment__item.selected") !== null;
      if (!hasSelected) {
        confirmButton.setAttribute("disabled", "disabled");
      }
    } else {
      // Thay đổi con trỏ chuột của nút "Xác nhận"
      confirmButton.removeAttribute("disabled");

      // Đảm bảo chỉ có một phần tử được chọn (thêm class highlight cho chọn hiện tại)
      paymentItems.forEach((el) => el.classList.remove("selected"));
      item.classList.add("selected");
      paymentMethodTitle = item.querySelector(
        ".payment-item__title p"
      ).textContent;
    }
  });
});
let PaymentCart = {
  NameCart: "",
  cartnumber: "",
  cartholder: "",
  expirydate: "",
  cvv: "",
};
confirmButton.addEventListener("click", () => {
  const selectedItem = document.querySelector(".list-payment__item.selected");
  if (selectedItem) {
    const selectImg = selectedItem.querySelector("img").getAttribute("src");
    // Cập nhật thông tin về phương thức thanh toán đã chọn vào div 'payment-quote__main'
    paymentQuoteTitle.innerHTML = `<p> ${selectedItem.textContent}</p><span>Giảm thêm tới 1.000.000đ</span>`;
    paymentQuoteImg.innerHTML = `<image src="${selectImg}" width="100%" height="100%" alt=""></image>`;
    // Ẩn hoặc thay đổi thông tin khác trong phần 'payment-quote__main' nếu cần
    paymentQuoteMain.classList.add("show");
  }
  document.querySelector(".payment-quote__modal").style.display = "none";
  if (!paymentMethodTitle.includes("Thanh toán khi nhận hàng")) {
    createPaymentForm();
  }
});
// ====================================PaymentTag // InfoTag // Continue===========================
// Lấy các phần tử

const infoTab = document.getElementById("infoTab");
const paymentTab = document.getElementById("paymentTab");
const nothingBackButton = document.getElementById("continue");
const viewList = document.querySelector(".view-list");
const blockCustomer = document.querySelector(".block-customer");
const blockpayment = document.querySelector(".block-payment");
const stickbar = document.querySelector(".block-info .stickyBottomBar");
const listpayment = document.querySelector(".payment-quote__modal");

const infopayment = document.querySelector(".info-payment");
const paymentquote = document.querySelector(".payment-quote");
const checkpolicy = document.querySelector(".check-policy");
const bottombar_main = document.querySelector(".bottom-bar_main");

// viewList.style.display = 'none';
// blockCustomer.style.display = 'none';
// blockpayment.style.display = 'none';
// stickbar.style.display ='none';
// listpayment.style.display ='none';

infopayment.style.display = "none";
paymentquote.style.display = "none";
checkpolicy.style.display = "none";
bottombar_main.style.display = "none";
infoTab.classList.add("active");
infoTab.classList.remove("disabled");
paymentTab.classList.add("disabled");
paymentTab.classList.remove("active");
// paymentTab.classList.add("active");
// paymentTab.classList.remove("disabled");
// infoTab.classList.add("disabled");
// infoTab.classList.remove("active");
// Thêm sự kiện click cho các tab
infoTab.addEventListener("click", function () {
  if (
    paymentTab.classList.contains("active") &&
    infoTab.classList.contains("disabled")
  ) {
    paymentTab.classList.remove("active");
    paymentTab.classList.add("disabled");
    infoTab.classList.remove("disabled");
    infoTab.classList.add("active");
    //đóng
    infopayment.style.display = "none";
    paymentquote.style.display = "none";
    checkpolicy.style.display = "none";
    bottombar_main.style.display = "none";
    //hiển thị
    viewList.style.display = "block";
    blockCustomer.style.display = "block";
    blockpayment.style.display = "block";
    stickbar.style.display = "block";
    listpayment.style.display = "block";
  }
});
paymentTab.addEventListener("click", function () {
  if (
    nameInput.value &&
    phoneInput.value &&
    districtInput.value &&
    wardInput.value &&
    addressInput.value
  ) {
    infoTab.classList.add("disabled");
    infoTab.classList.remove("active");
    paymentTab.classList.remove("disabled"); // Vô hiệu hóa tab "Thanh Toán"
    paymentTab.classList.add("active"); // Vô hiệu hóa tab "Thanh Toán"
    viewList.style.display = "none";
    blockCustomer.style.display = "none";
    blockpayment.style.display = "none";
    stickbar.style.display = "none";
    listpayment.style.display = "none";

    infopayment.style.display = "block";
    paymentquote.style.display = "block";
    checkpolicy.style.display = "block";
    bottombar_main.style.display = "block";
  }
});
// Thêm sự kiện cho nút "Tiếp tục"
nothingBackButton.addEventListener("click", function () {
  if (loginStatus === true) {
    const nameInput = document.getElementById("nameInput");
    const phoneInput = document.getElementById("phoneInput");
    const districtInput = document.getElementById("box-select-district");
    const wardInput = document.getElementById("box-select-ward");
    const addressInput = document.getElementById("box-select-address");
    // console.log(nameInput,phoneInput,districtInput,wardInput,addressInput)
    if (
      nameInput.value &&
      phoneInput.value &&
      districtInput.value &&
      wardInput.value &&
      addressInput.value
    ) {
      infoTab.classList.add("disabled");
      infoTab.classList.remove("active");
      paymentTab.classList.remove("disabled");
      paymentTab.classList.add("active"); // Vô hiệu hóa tab "Thanh Toán"
      viewList.style.display = "none";
      blockCustomer.style.display = "none";
      blockpayment.style.display = "none";
      stickbar.style.display = "none";
      listpayment.style.display = "none";

      infopayment.style.display = "block";
      paymentquote.style.display = "block";
      checkpolicy.style.display = "block";
      bottombar_main.style.display = "block";
      // Lấy danh sách sản phẩm
      const productListWrapper = document.querySelector(
        "#product-list .view-list-wrapper"
      );
      const items = productListWrapper.querySelectorAll(".item");

      // Lấy các phần tử cần cập nhật trong info-payment
      const quantityElement = document.querySelector(
        ".quote-block_item:nth-child(1) .quote-block_value"
      );
      const subTotalElement = document.querySelector(
        ".quote-block_item:nth-child(2) .quote-block_value"
      );
      const totalElement = document.querySelector(
        ".info-quote_bottom .quote-bottom_value"
      );

      // Tính toán thông tin
      let totalQuantity = 0;
      let subTotal = 0;

      items.forEach((item) => {
        // Lấy số lượng
        const quantityText = item
          .querySelector(".item__price p span.text-danger")
          .textContent.trim();
        const quantity = parseInt(quantityText, 10) || 0;

        // Lấy giá sản phẩm
        const priceText = item
          .querySelector(".product__price--show")
          .textContent.trim();
        const price = parseInt(priceText.replace(/[^\d]/g, ""), 10) || 0;

        // Tính tổng số lượng và tổng giá trị tạm tính
        totalQuantity += quantity;
        subTotal += price * quantity;
      });

      // Hiển thị thông tin vào info-payment
      quantityElement.textContent = totalQuantity; // Số lượng sản phẩm
      subTotalElement.textContent = subTotal.toLocaleString("vi-VN") + "₫"; // Tiền hàng (tạm tính)
      totalElement.textContent = subTotal.toLocaleString("vi-VN") + "₫"; // Tổng tiền
      const buttonQuote = document.getElementById("viewListItemInQuote-btn");
      const List = document.querySelectorAll(".view-list .item");
      buttonQuote.innerHTML = `Kiểm tra danh sách sản phẩm ( ${List.length})`;
    } else {
      if (!nameInput.value) {
        showCustomAlert("Vui lòng điền tên người nhận.");
      } else if (!phoneInput.value)
        showCustomAlert("Vui lòng điền số điện thoại người nhận");
      else if (!districtInput.value)
        showCustomAlert("Vui lòng chọn quận/ huyện");
      else if (!wardInput.value) showCustomAlert("Vui lòng chọn ấp/ xã");
      else if (!addressInput.value) showCustomAlert("Vui lòng nhập địa chỉ");
      // infoTab.classList.add("disabled");
      // infoTab.classList.remove("active");
      // paymentTab.classList.remove("disabled"); // Vô hiệu hóa tab "Thanh Toán"
      // paymentTab.classList.add("active"); // Vô hiệu hóa tab "Thanh Toán"
    }
    //========================= Lấy thông tin từ các input trong payment-main_shipping
    const receiverName = document.getElementById("nameInput").value.trim();
    const receiverPhone = document.getElementById("phoneInput").value.trim();
    const city = document.getElementById("box-select-city").value.trim();
    const district = document
      .getElementById("box-select-district")
      .value.trim();
    const ward = document.getElementById("box-select-ward").value.trim();
    const address = document.getElementById("box-select-address").value.trim();
    const note = document.getElementById("box-input-note").value.trim();
    const receiverEmail = document.getElementById("emailInput").value.trim();
    // Ghép thông tin địa chỉ đầy đủ
    const fullAddress = `${address}, ${ward}, ${district}, ${city}`;

    // Lấy các phần tử cần cập nhật trong address-quote__main
    const customerNameElement = document.querySelector(
      ".address-quote__item:nth-child(1) .address-quote__value"
    );
    const customerPhoneElement = document.querySelector(
      ".address-quote__item:nth-child(2) .address-quote__value"
    );
    const customerEmailElement = document.querySelector(
      ".address-quote__item:nth-child(3) .address-quote__value"
    );
    const deliveryAddressElement = document.querySelector(
      ".address-quote__item:nth-child(4) .address-quote__value"
    );
    const receiverElement = document.querySelector(
      ".address-quote__item:nth-child(5) .address-quote__value"
    );

    // Cập nhật thông tin vào address-quote__main
    customerEmailElement.textContent = receiverEmail || "Chưa nhập email";
    customerNameElement.textContent =
      receiverName || "Chưa nhập tên người nhận";
    customerPhoneElement.textContent =
      receiverPhone || "Chưa nhập số điện thoại";
    deliveryAddressElement.textContent = fullAddress || "Chưa nhập địa chỉ";
    receiverElement.textContent =
      `${receiverName} - ${receiverPhone}` || "Chưa nhập người nhận";

    // Kiểm tra nếu có ghi chú khác
    if (note) {
      const boxNoteElement = document.querySelector(".box-note");
      boxNoteElement.textContent = `Ghi chú: ${note}`;
    } else {
      document.querySelector(".box-note").textContent = "";
    }
    // ===============================================================
    // Lấy phần tử chứa giá tiền từ div với class 'quote-bottom_value'
    const totalElement = document.querySelector(
      ".info-quote_bottom .quote-bottom_value"
    );

    // Lấy phần tử span cần cập nhật
    const totalSpan = document.querySelector(".total-box .total");

    // Nếu cả hai phần tử đều tồn tại
    if (totalElement && totalSpan) {
      // Lấy giá trị văn bản của tổng tiền (bao gồm ký tự đ và dấu chấm)
      let totalPrice = totalElement.textContent.trim();

      // Cập nhật giá trị vào span.total
      totalSpan.textContent = totalPrice;
    } else {
      console.error("Không tìm thấy phần tử chứa giá hoặc nơi cần cập nhật!");
    }
  } else {
    showCustomAlert("Vui lòng đăng nhập trước khi mua hàng !");
  }
});

//--------------------BackToTop---------------------------------------
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

// Hiển thị hoặc ẩn nút khi cuộn
window.onscroll = function () {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
};

// Cuộn lên đầu trang khi nhấn nút
scrollToTopBtn.onclick = function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // Cuộn mượt
  });
};

const btn = document.querySelectorAll(".product-item button");
btn.forEach(function (button, index) {
  button.addEventListener("click", function (event) {
    {
      var btnItem = event.target;
      var product = btnItem.parentElement;
      var productImg = product.querySelector("img").src;
      var productName = product.querySelector("h1").innerText;
      var productCost = product.querySelector("span").innerText;
      //    console.log(productCost,productName,productImg)
      addCart(productCost, productName, productImg);
    }
  });
});
function addCart(productCost, productName, productImg) {
  var addtr = document.createElement("tr");
  var cartItem = document.querySelectorAll("tbody tr");
  for (var i = 0; i < cartItem.length; i++) {
    var productT = document.querySelectorAll(".title");
    if (productT[i].innerHTML == productName) {
      alertE = "Sản phẩm của bạn đã có ở trong giỏ hàng";
      alert("Sản phẩm của bạn đã có ở trong giỏ hàng");
      return;
    }
  }
  var trcontent =
    '<tr><td style="display: flex;align-items: center;"><img style="width: 100px; " src=" ' +
    productImg +
    '" alt=""><span class="title">' +
    productName +
    '</span></td><td><p><span class="price">' +
    productCost +
    '</span><sup>đ</sup></p></td><td><input class="tbody-tr-td-input" type="number" value="1" min="1"></td><td style="cursor: pointer;"><span class="cart-delete">Xóa</span></td></tr>';
  addtr.innerHTML = trcontent;
  var cartTable = document.querySelector("tbody");
  //    console.log(cartTable)
  cartTable.append(addtr);
  cartTotal();
  deleteCart();
}
//----------------------------------price Total-------------------------------------
function cartTotal() {
  var cartItem = document.querySelectorAll("tbody tr");
  //    console.log(cartItem.length)
  var totalC = 0;
  for (var i = 0; i < cartItem.length; i++) {
    //console.log(i);
    var inputValue = cartItem[i].querySelector("input").value;
    //console.log(inputValue)
    var productCostText = cartItem[i].querySelector(".price").innerHTML;
    //console.log("Raw productCostText:", productCostText);
    var productCost = convertToNumber(productCostText);
    //console.log("Converted productCost:", productCost);
    var totalA = inputValue * productCost;
    totalC = totalC + totalA;
    //console.log(totalC)
  }
  var cartTotalA = document.querySelector(".price-total span");
  cartTotalA.innerHTML = totalC.toLocaleString("de-DE");
  inputChange();
  //console.log()
}
function convertToNumber(value) {
  // Nếu là số, trả về chính nó
  if (typeof value === "number") {
    return value;
  }

  // Nếu là chuỗi có dấu phân cách hàng nghìn (dấu chấm)
  if (typeof value === "string" && (value.match(/\./g) || []).length > 0) {
    return parseInt(value.replace(/\./g, ""), 10);
  }

  // Trường hợp khác không hợp lệ trả về null
  return null;
}
//---------------------------------Delete cart -------------------------------
function deleteCart() {
  var cartItem = document.querySelectorAll("tbody tr");
  for (var i = 0; i < cartItem.length; i++) {
    var productT = document.querySelectorAll(".cart-delete");
    productT[i].addEventListener("click", function (event) {
      var cartDelete = event.target;
      var cartItemR = cartDelete.parentElement.parentElement;
      cartItemR.remove();
      cartTotal();
      //console.log(cartItemR)
    });
  }
}
function inputChange() {
  var cartItem = document.querySelectorAll("tbody tr");
  for (var i = 0; i < cartItem.length; i++) {
    var inputValue = cartItem[i].querySelector("input");
    inputValue.addEventListener("change", function () {
      cartTotal();
    });
  }
}

// ----------------------------------------Mua Ngay ----------------------------------------
// Lắng nghe sự kiện click trên nút "Mua Ngay"
document
  .getElementById("buy-now-button")
  .addEventListener("click", function () {
    var cart = document.querySelector("#cart");
    var info = document.querySelector("#info");
    var backtocart = document.querySelector(".go-back");
    var ListItemSuperCart = document.querySelector(".ListItemSuperCart");
    var BlockInfo = document.querySelector(".block-info");
    BlockInfo.style.display = "block";
    ListItemSuperCart.style.display = "none";
    backtocart.innerHTML = `
    <a href="" id="back-to-Cart">
        <svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 8.5L1 8.5M1 8.5L8 1M1 8.5L8 16" stroke="#121219" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
    <p class="title" style="display: '';" id="info">Thông Tin</p>
`;
    // Nếu giỏ hàng đang hiển thị, ẩn nó và hiển thị thông tin
    if (cart.style.display !== "none") {
      cart.style.display = "none";
      info.style.display = "";
    } else {
      // Ngược lại, ẩn thông tin và hiển thị giỏ hàng
      cart.style.display = "";
      info.style.display = "none";
    }
    let cartData = [];
    selectedItems.forEach((productDiv) => {
      const image = productDiv.querySelector(
        "label.custom-control-label img"
      ).src;
      const name = productDiv
        .querySelector(".product-info-head .product-name")
        .textContent.trim();
      const priceText = productDiv
        .querySelector(".product__price--show")
        .textContent.trim();
      const price = parseFloat(priceText.replace(/\./g, "").replace("₫", ""));
      const quantity = parseInt(
        productDiv.querySelector('input[type="text"]').value
      );

      // Đưa sản phẩm vào danh sách cartData
      cartData.push({
        image: image,
        name: name,
        price: price,
        quantity: quantity,
      });
    });

    // Lưu danh sách sản phẩm vào localStorage
    localStorage.setItem("cartData", JSON.stringify(cartData));
    renderItemsFromLocalStorage();
  });

function renderItemsFromLocalStorage() {
  const ItemList = document.querySelector(".view-list-wrapper");
  let ContenItem = "";

  // Lấy dữ liệu giỏ hàng từ localStorage
  const cartData = JSON.parse(localStorage.getItem("cartData")) || []; // Nếu không có thì trả về mảng rỗng

  // Duyệt qua từng sản phẩm trong giỏ hàng
  cartData.forEach((product) => {
    ContenItem += `
            <div class="item">
                <img src="${product.image}" alt="${
      product.name
    }" style="width: 100px; height: 100px;">
                <div class="item__info">
                    <p class="item__name">${product.name}</p>
                    <div class="item__price">
                        <div>
                            <div class="block-box-price">
                                <span></span>
                                <div class="box-info__box-price">
                                    <p class="product__price--show">${product.price.toLocaleString()}₫</p>
                                    <p class="product__price--through"></p>
                                </div>
                            </div>
                        </div>
                        <p>Số lượng: <span class="text-danger">${
                          product.quantity
                        }</span></p>
                    </div>
                </div>
            </div>
        `;
  });

  // Chèn nội dung vào phần tử ItemList
  ItemList.innerHTML = ContenItem;
  // ======================================Ẩn List==========================================

  const productList = document.querySelector(
    "#product-list .view-list-wrapper"
  );
  const toggleButton = document.getElementById("toggle-button");

  // Ẩn toàn bộ sản phẩm ngoại trừ sản phẩm đầu tiên
  const items = productList.querySelectorAll(".item");
  items.forEach((item, index) => {
    if (index > 0) {
      item.style.display = "none";
    }
  });
  if (items.length > 1) {
    toggleButton.innerHTML = `
            và ${items.length - 1} sản phẩm khác
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="svg-inline--fa fa-angle-down"><path data-v-200e7211="" fill="currentColor" d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z" class=""></path></svg>`;
    // Theo dõi trạng thái nút (ẩn/hiện)
    let isExpanded = false;

    // Xử lý sự kiện khi nhấn nút
    toggleButton.addEventListener("click", () => {
      if (isExpanded) {
        // Thu gọn danh sách: chỉ hiển thị 1 sản phẩm
        items.forEach((item, index) => {
          if (index > 0) {
            item.style.display = "none";
          }
        });
        toggleButton.innerHTML = `
            và ${items.length - 1} sản phẩm khác
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="svg-inline--fa fa-angle-down"><path data-v-200e7211="" fill="currentColor" d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z" class=""></path></svg>`;
      } else {
        // Mở rộng danh sách: hiển thị tất cả sản phẩm
        items.forEach((item) => {
          item.style.display = "flex";
        });
        toggleButton.innerHTML = `
            Thu gọn
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-up" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="svg-inline--fa fa-angle-up"><path data-v-200e7211="" fill="currentColor" d="M177 159L320 302c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 236.4 56.6 359c-9.4 9.4-24.6 9.4-33.9 0L0 336.4c-9.4-9.4-9.4-24.6 0-33.9L143 159c9.4-9.4 24.6-9.4 34 0z" class=""></path></svg>`;
      }
      isExpanded = !isExpanded;
    });
  } else {
    toggleButton.innerHTML = ``;
  }
}

// -------------------------------------------------BackToCart-----------------------------------------------------
// document.getElementById('back-to-Cart').addEventListener('click',function(){
//     var ListItemSuperCart = document.querySelector(".ListItemSuperCart")
//     var BlockInfo= document.querySelector(".block-info")
//     var BlockInfoDisplay = window.getComputedStyle(BlockInfo).display;
//     if (BlockInfoDisplay == 'none') {
//     } else{ListItemSuperCart.style.display = 'block';
//         BlockInfo.style.display = 'none';}
// })
document.getElementById("back-to-Cart").addEventListener("click", function () {
  // Lấy phần tử ListItemSuperCart và BlockInfo
  var ListItemSuperCart = document.querySelector(".ListItemSuperCart");
  var BlockInfo = document.querySelector(".block-info");

  // Lấy kiểu hiển thị của BlockInfo
  var BlockInfoDisplay = window.getComputedStyle(BlockInfo).display;

  // Kiểm tra nếu BlockInfo không bị ẩn
  if (BlockInfoDisplay !== "none") {
    ListItemSuperCart.style.display = "block"; // Hiển thị ListItemSuperCart
    BlockInfo.style.display = "none"; // Ẩn BlockInfo
  }
});
// -------------------------------------------------------------------------------------------------------
//
// -----------------=============================Add Item to Payment=======================================================

document
  .getElementById("viewListItemInQuote-btn")
  .addEventListener("click", function () {
    // Tạo modal HTML
    const modalHtml = `
        <div id="modalViewListItemInQuote___BV_modal_outer_" style="position: absolute; z-index: 1040;"><div id="modalViewListItemInQuote" role="dialog" aria-labelledby="modalViewListItemInQuote___BV_modal_title_" aria-describedby="modalViewListItemInQuote___BV_modal_body_" class="modal fade show" aria-modal="true" style="display: block;"><div class="modal-dialog modal-md modal-dialog-centered modal-dialog-scrollable"><span tabindex="0"></span><div id="modalViewListItemInQuote___BV_modal_content_" tabindex="-1" class="modal-content"><header id="modalViewListItemInQuote___BV_modal_header_" class="modal-header"><h5 id="modalViewListItemInQuote___BV_modal_title_" class="modal-title">Danh sách sản phẩm đang thanh toán</h5><button type="button" aria-label="Close" class="close" fdprocessedid="srbvi">×</button></header><div id="modalViewListItemInQuote___BV_modal_body_" class="modal-body">
            <div class="d-flex ListView-product-item">
    </div><!----></div><span tabindex="0"></span></div></div><div id="modalViewListItemInQuote___BV_modal_backdrop_" class="modal-backdrop"></div></div>
    `;
    // Chèn modal vào body
    document.body.insertAdjacentHTML("beforeend", modalHtml);
    const viewList = document.querySelectorAll(".view-list .item");

    // Lấy Modal Body
    const modalBody = document.getElementById(
      "modalViewListItemInQuote___BV_modal_body_"
    );

    // Xóa nội dung cũ trong Modal Body (nếu cần)
    modalBody.innerHTML = "";

    // Duyệt qua từng sản phẩm và thêm vào Modal Body
    viewList.forEach((item) => {
      // Lấy thông tin sản phẩm
      const imgSrc = item.querySelector("img").getAttribute("src"); // URL hình ảnh
      const productName = item.querySelector(".item__name").textContent.trim(); // Tên sản phẩm
      const productPrice = item
        .querySelector(".product__price--show")
        .textContent.trim(); // Giá sản phẩm
      const productQuantity = item
        .querySelector(".text-danger")
        .textContent.trim(); // Số lượng

      // Tạo phần tử HTML sản phẩm
      const productHTML = `
        <div class="d-flex ListView-product-item">
            <img src="${imgSrc}" alt="${productName}" loading="lazy" class="product-img">
            <div class="product-info pl-3">
                <p>${productName}</p>
                <div class="item__price d-flex justify-content-between product-price-qty">
                    <div>
                        <div class="block-box-price">
                            <div class="box-info__box-price">
                                <p class="product__price--show">${productPrice}</p>
                            </div>
                        </div>
                    </div>
                    <p>Số lượng: <span class="text-danger">${productQuantity}</span></p>
                </div>
            </div>
        </div>
    `;
      modalBody.insertAdjacentHTML("beforeend", productHTML);
    });
    document.querySelector(".close").addEventListener("click", function () {
      const modalBackdrop = document.getElementById(
        "modalViewListItemInQuote___BV_modal_outer_"
      );
      if (modalBackdrop) {
        modalBackdrop.remove(); // Xóa modal khỏi DOM
      }
    });
  });
document
  .querySelector(".button__go-next")
  .addEventListener("click", function () {
    // Lấy nội dung của phương thức thanh toán
    const paymentTitleElement = document.querySelector(
      ".payment-main__title p"
    );
    // Kiểm tra nội dung
    if (paymentTitleElement) {
      const paymentTitle = paymentTitleElement.textContent.trim();
      // console.log(paymentTitle)
      // Kiểm tra nội dung văn bản
      if (paymentTitle.includes("Chọn phương thức thanh toán")) {
        showCustomAlert("Hãy chọn phương thức thanh toán để tiếp tục.");
      } else {
        const customerName = document
          .querySelector(
            ".address-quote__item:nth-child(1) .address-quote__value"
          )
          .textContent.trim();
        const phone = document
          .querySelector(
            ".address-quote__item:nth-child(2) .address-quote__value"
          )
          .textContent.trim();
        const email = document
          .querySelector(
            ".address-quote__item:nth-child(3) .address-quote__value"
          )
          .textContent.trim();
        const deliveryLocation = document
          .querySelector(
            ".address-quote__item:nth-child(4) .address-quote__value"
          )
          .textContent.trim();
        const note = document
          .getElementById("box-input-note")
          .textContent.trim();
        const Total = document
          .querySelector(".quote-bottom_value")
          .textContent.trim();
        //product
        const items = document.querySelectorAll(".view-list-wrapper .item");
        let paymentMehod_Payment = paymentTitle;
        if (!paymentTitle.includes("Thanh toán khi nhận hàng")) {
          PaymentCart.NameCart = paymentTitle;
          paymentMehod_Payment = PaymentCart;
        }
        let products = [];
        // Duyệt qua tất cả các item và lấy thông tin
        items.forEach((item) => {
          const productName = item
            .querySelector(".item__name")
            .textContent.trim();
          let cartID = JSON.parse(localStorage.getItem("cart")) || [];
          let existingProduct = cartID.find(
            (product) =>
              product.name.toLowerCase().trim() ===
              productName.toLowerCase().trim()
          );
          let productId;
          if (existingProduct) {
            productId = existingProduct.id;
          }
          console.log(existingProduct);
          // Lấy giá sản phẩm và chuyển thành số
          const productPrice = item
            .querySelector(".product__price--show")
            .textContent.trim();
          const priceNumber = parseInt(productPrice.replace(/\D/g, ""));

          // Lấy số lượng sản phẩm
          const productQuantity = item
            .querySelector(".text-danger")
            .textContent.trim();
          const quantityNumber = parseInt(productQuantity);
          const productImage = item.querySelector("img").src;
          // Tạo đối tượng sản phẩm và đẩy vào mảng
          products.push({
            id: productId,
            name: productName,
            price: priceNumber,
            quantity: quantityNumber,
            image: productImage,
          });
        });
        const bills = JSON.parse(localStorage.getItem("bills")) || [];
        const IDbill = bills.length + 1;
        let currentuser = JSON.parse(localStorage.getItem("currentUser"));
        const bill = {
          userName: currentuser.userName,
          billID: IDbill,
          customer: {
            customerID: "001",
            name: customerName,
            email: email,
            phone: phone,
            address: deliveryLocation,
            note: note,
          },
          orderStatus: "Chờ xác nhận",
          paymentMethod: paymentMehod_Payment,
          date: new Date(),
          totalAmount: Total,
          products: [], // Khởi tạo mảng sản phẩm ở đây
        };
        bill.products.push(...products);
        createConfirmationDialog(bill);
        console.log(bill);
      }
    }
  });
function createConfirmationDialog(bill) {
  // Tạo phần tử div chính
  const confirmDialog = document.createElement("div");
  confirmDialog.id = "confirmDialog";
  confirmDialog.style.position = "fixed";
  confirmDialog.style.top = "0";
  confirmDialog.style.left = "0";
  confirmDialog.style.width = "100%";
  confirmDialog.style.height = "100%";
  confirmDialog.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  confirmDialog.style.display = "flex";
  confirmDialog.style.justifyContent = "center";
  confirmDialog.style.alignItems = "center";
  confirmDialog.style.zIndex = "1000";

  // Nội dung hộp thoại
  confirmDialog.innerHTML = `
        <div class="dialog-content" style="
            background: white; 
            padding: 20px; 
            border-radius: 8px; 
            text-align: center; 
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
            width: 300px;">
            <button id="closeDialog" style="
                position: absolute; 
                top: 10px; 
                right: 10px; 
                background: transparent; 
                border: none; 
                font-size: 18px; 
                cursor: pointer;">&times;</button>
            <p style="font-size: 18px; margin-bottom: 20px;">Xác nhận đặt hàng?</p>
            <div class="dialog-buttons" style="display: flex; justify-content: space-around; gap: 10px;">
                <button id="confirmButton" style="
                    padding: 8px 16px; 
                    background-color: #28a745; 
                    color: white; 
                    border: none; 
                    border-radius: 4px; 
                    cursor: pointer;">Xác nhận</button>
                <button id="cancelButton" style="
                    padding: 8px 16px; 
                    background-color: #6c757d; 
                    color: white; 
                    border: none; 
                    border-radius: 4px; 
                    cursor: pointer;">Quay lại</button>
            </div>
        </div>
    `;

  // Thêm hộp thoại vào body
  document.body.appendChild(confirmDialog);

  // Xử lý các nút
  document.getElementById("closeDialog").onclick = function () {
    confirmDialog.remove(); // Xóa hộp thoại khỏi DOM
  };

  document.getElementById("cancelButton").onclick = function () {
    confirmDialog.remove(); // Xóa hộp thoại khi nhấn "Quay lại"
  };

  document.getElementById("confirmButton").onclick = function () {
    console.log(PaymentCart);
    const bills = JSON.parse(localStorage.getItem("bills")) || [];
    bills.push(bill);
    showCustomAlert("Đặt hàng thành công!"); // Hành động khi nhấn "Xác nhận"
    confirmDialog.remove(); // Xóa hộp thoại sau hành động
    if (button == "buynow") {
      let product = JSON.parse(localStorage.getItem("product")) || [];
      const item = document.querySelector(".view-list-wrapper .item");
      item.remove(product); // Xóa sản phẩm khỏi giao diện
      localStorage.setItem("product", JSON.stringify(product));
      localStorage.setItem("bills", JSON.stringify(bills));
      button = null;
      document.dispatchEvent(new Event("DOMContentLoaded"));
      var ListItemSuperCart = document.querySelector(".ListItemSuperCart");
      var BlockInfo = document.querySelector(".block-info");

      // Lấy kiểu hiển thị của BlockInfo
      var BlockInfoDisplay = window.getComputedStyle(BlockInfo).display;

      // Kiểm tra nếu BlockInfo không bị ẩn
      window.location.href = "Nhom55.html";
    } else {
      let cart =
        JSON.parse(localStorage.getItem(`cart${currentuser.userName}`)) || [];
      // Lấy danh sách sản phẩm từ HTML
      const productItems = document.querySelectorAll(
        ".view-list-wrapper .item"
      );

      // Duyệt qua các sản phẩm trong HTML
      productItems.forEach((item) => {
        // Lấy tên sản phẩm từ HTML
        const productName = item.querySelector(".item__name").innerText.trim();
        console.log(`Checking product: ${productName}`);

        // Lọc các mục không trùng với `productName` trong giỏ hàng
        const updatedCart = cart.filter(
          (cartItem) =>
            cartItem.name.toLowerCase().trim() !==
            productName.toLowerCase().trim()
        );

        // Cập nhật lại `cart` trong localStorage
        localStorage.setItem(
          `cart${currentuser.userName}`,
          JSON.stringify(updatedCart)
        );

        // Cập nhật biến `cart` trong JavaScript để sử dụng lại
        cart = updatedCart;
        console.log(`Updated cart:`, cart);
      });
      localStorage.setItem("bills", JSON.stringify(bills));
      document.dispatchEvent(new Event("DOMContentLoaded"));
      var ListItemSuperCart = document.querySelector(".ListItemSuperCart");
      var BlockInfo = document.querySelector(".block-info");

      // Lấy kiểu hiển thị của BlockInfo
      var BlockInfoDisplay = window.getComputedStyle(BlockInfo).display;
      window.location.reload();
    }
  };
}
function createPaymentForm() {
  // Tạo phần tử div cho biểu mẫu
  const formContainer = document.createElement("div");
  formContainer.className = "paymentCart-form";
  formContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6); /* Màu đen mờ */
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        z-index: 1000; /* Đảm bảo nằm trên tất cả các phần tử khác */
        backdrop-filter: blur(8px); /* Làm mờ nền phía sau */
    `;
  // Tiêu đề
  const title = document.createElement("h2");
  title.textContent = "Thông tin thanh toán";
  title.style.textAlign = "center";
  formContainer.appendChild(title);
  // Tạo các trường nhập liệu
  function createFormField(labelText, inputType, inputId, placeholder) {
    const formGroup = document.createElement("div");
    formGroup.style.cssText = `
        margin-bottom: 20px;
        display: flex;
        flex-direction: column;
    `;

    const label = document.createElement("label");
    label.textContent = labelText;
    label.setAttribute("for", inputId);
    label.style.cssText = `
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 8px;
        color: #333;
    `;
    formGroup.appendChild(label);

    const input = document.createElement("input");
    input.type = inputType;
    input.id = inputId;
    input.placeholder = placeholder;
    input.required = true;
    input.style.cssText = `
        width: 100%;
        padding: 12px;
        border: 2px solid #ccc;
        border-radius: 8px;
        box-sizing: border-box;
        transition: border-color 0.3s, box-shadow 0.3s;
        font-size: 14px;
    `;

    // Hiệu ứng khi focus
    input.addEventListener("focus", () => {
      input.style.borderColor = "#4A90E2";
      input.style.boxShadow = "0 0 8px rgba(74, 144, 226, 0.3)";
    });

    input.addEventListener("blur", () => {
      input.style.borderColor = "#ccc";
      input.style.boxShadow = "none";
    });

    formGroup.appendChild(input);
    formContainer.appendChild(formGroup);
  }
  createFormField("Số thẻ:", "text", "PaymentcardNumber", "Nhập số thẻ");
  createFormField(
    "Tên chủ thẻ:",
    "text",
    "PaymentcardHolder",
    "Nhập tên chủ thẻ"
  );
  createFormField(
    "Ngày hết hạn (MM/YY):",
    "text",
    "PaymentexpiryDate",
    "MM/YY"
  );
  createFormField("CVV:", "password", "Paymentcvv", "Nhập CVV");
  // Tạo nút thanh toán
  const submitButton = document.createElement("button");
  submitButton.textContent = "Thanh toán";
  submitButton.style.cssText = `
        background-color: red;
        color: white;
        padding: 10px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        width: 30%;
        font-size: 16px;
    `;
  submitButton.onclick = () => submitPayment();
  formContainer.appendChild(submitButton);

  // Thêm biểu mẫu vào body
  document.body.appendChild(formContainer);
}

// Hàm xử lý thanh toán
function submitPayment() {
  const cardNumber = document.getElementById("PaymentcardNumber").value || null;
  const cardHolder = document.getElementById("PaymentcardHolder").value || null;
  const expiryDate = document.getElementById("PaymentexpiryDate").value || null;
  const Cvv = document.getElementById("Paymentcvv").value;
  if (!cardNumber || !cardHolder || !expiryDate || !Cvv) {
    showCustomAlert("Vui lòng điền đầy đủ thông tin.");
    return;
  }
  // Kiểm tra số thẻ và CVV (cơ bản)
  if (!/^\d{16}$/.test(cardNumber)) {
    showCustomAlert("Số thẻ không hợp lệ. Vui lòng nhập 16 chữ số.");
    return;
  }
  if (!/^\d{3,4}$/.test(Cvv)) {
    showCustomAlert("CVV không hợp lệ. Vui lòng nhập 3 hoặc 4 chữ số.");
    return;
  }
  // Xử lý thanh toán (giả lập)
  PaymentCart = {
    cartnumber: cardNumber,
    cartholder: cardHolder,
    expirydate: expiryDate,
    cvv: Cvv,
  };
  console.log(PaymentCart);
  const formContainer = document.querySelector(".paymentCart-form");
  formContainer.remove();
}
// Hàm tạo từng trường nhập liệu
