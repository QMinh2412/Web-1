// thêm 2/12/2024: file historycart.js
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

let currentuser = JSON.parse(localStorage.getItem("currentUser"));
const userEmail = currentuser.email;
const phoneElement = document.querySelector(".welcome-member__phone");

// Thay đổi nội dung phần tử thành email
phoneElement.textContent = userEmail;
console.log(currentuser);
let billsss = JSON.parse(localStorage.getItem("bills"));
console.log(billsss);
const customer = billsss ? billsss[0].customer : null;
const billss = [];
const customerAccount = {
  customer: customer,
  bills: [],
};
if (billsss !== null) {
  billsss.forEach((billTemp) => {
    if (billTemp.userName === currentuser.userName) {
      const bill = {
        time: {},
        date: {},
        note: {},
        products: [],
        orderStatus: {},
        PaymentMethod: {},
      };
      let date = new Date(billTemp.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1; // Tháng bắt đầu từ 0, nên cộng thêm 1
      const day = date.getDate();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      bill.date = `${day < 10 ? "0" + day : day}/${
        month < 10 ? "0" + month : month
      }/${year}`;
      bill.time = `${hours < 10 ? "0" + hours : hours}:${
        minutes < 10 ? "0" + minutes : minutes
      }:${seconds < 10 ? "0" + seconds : seconds}`;
      bill.note = billTemp.customer.note;
      bill.orderStatus = billTemp.orderStatus;
      bill.PaymentMethod = billTemp.paymentMethod;
      bill.products = billTemp.products;
      billss.push(bill);
    }
  });
  customerAccount.bills = billss;
  console.log(customerAccount);
}
document.addEventListener("DOMContentLoaded", () => {
  const dateRangeDiv = document.querySelector(".daterange-picker"); // Tham chiếu đến id mới
  const dateRangeElement = dateRangeDiv.querySelector(
    ".daterange-picker .form-control span"
  ); // Phần tử span chứa ngày

  // Lấy ngày hôm nay
  const today = new Date();
  const formattedToday = flatpickr.formatDate(today, "d/m/Y");
  dateRangeElement.textContent = `01/12/2020 - ${formattedToday}`;
  // Khởi tạo flatpickr
  flatpickr(dateRangeDiv, {
    dateFormat: "d/m/Y",
    defaultDate: today, // Ngày mặc định là hôm nay
    onClose: (selectedDates) => {
      if (selectedDates.length === 1) {
        const selectedDate = flatpickr.formatDate(selectedDates[0], "d/m/Y");
        if (selectedDate > formattedToday) {
          dateRangeElement.textContent = `${formattedToday} - ${selectedDate}`;
        } else {
          dateRangeElement.textContent = `${selectedDate} - ${formattedToday}`;
        }
      }
      FilterBill();
    },
  });
  const thumbItems = document.querySelectorAll(".thumb-item");
  thumbItems[0].classList.add("active");
  thumbItems.forEach((item) => {
    item.addEventListener("click", () => {
      // Xóa class 'active' khỏi tất cả các mục

      // Thêm class 'active' vào mục được click

      if (item.classList.contains("active")) {
        item.classList.remove("active");
      } else {
        thumbItems.forEach((thumb) => thumb.classList.remove("active"));
        item.classList.add("active");
      }
      var status = item.textContent.trim();
      console.log(status);
      if (status.includes("Chờ xác nhận")) {
        displayBillwithStatus(status);
      } else if (status.includes("Tất cả")) {
        displayBill();
      } else if (status.includes("Đã xác nhận")) {
        displayBillwithStatus(status);
      } else if (status.includes("Đang vận chuyển")) {
        displayBillwithStatus(status);
      } else if (status.includes("Đã giao hàng")) {
        displayBillwithStatus(status);
      } else if (status.includes("Đã hủy")) {
        displayBillwithStatus(status);
      }
    });
  });
  let currentuser = JSON.parse(localStorage.getItem("currentUser"));
  const userEmail = currentuser.email;
  const phoneElement = document.querySelector(".welcome-member__phone");
  phoneElement.textContent = userEmail;
  maskPhoneNumber(
    document.querySelector(".welcome-member__phone").textContent.trim()
  );
  let phoneconst = maskPhoneNumber(
    document.querySelector(".welcome-member__phone").textContent.trim()
  );
  // const PhoneCusDiv = document.querySelector(".welcome-member__phone");
  const PhoneCus = document
    .querySelector(".welcome-member__phone")
    .textContent.trim();
  // PhoneCusDiv.innerHTML = phoneconst;
  document.querySelector(".view-icon").addEventListener("click", function () {
    togglePhoneVisibility(phoneconst, PhoneCus);
  });
  document.querySelector(".block-icon").addEventListener("click", function () {
    togglePhoneVisibility(phoneconst, PhoneCus);
  });
  const orderContainer = document.querySelector(
    ".cps-container .block-order .order-container"
  );
  // Gán giá trị ban đầu cho top
  const initialTop = 0;
  const scrollThreshold = 450; // Mức độ cuộn mà bạn muốn thay đổi top

  // Lắng nghe sự kiện cuộn
  window.addEventListener("scroll", () => {
    if (window.scrollY > scrollThreshold) {
      orderContainer.style.position = "fixed";
      orderContainer.style.transform = "translateY(-100px)"; // Di chuyển lên trên
    } else {
      orderContainer.style.position = "sticky";
      orderContainer.style.transform = "translateY(0)"; // Quay lại vị trí ban đầu
    }
  });
  const items = document.querySelectorAll(".view-list-wrapper .item");
  displayBill();
  if (billsss !== null) {
    displayCustomerInfo();
    document.getElementsByClassName("item-content title")[0].textContent =
      totalProduct();
    document.getElementsByClassName("item-content title")[1].textContent =
      totalAccumulatedAmount().toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
  }
});

function maskPhoneNumber(phoneNumber) {
  const firstPart = phoneNumber.slice(0, 2); // Lấy 2 ký tự đầu
  const lastPart = phoneNumber.slice(-3); // Lấy 3 ký tự cuối
  const maskedPart = "*****"; // Phần bị che

  // Kết hợp các phần lại với nhau
  return firstPart + maskedPart + lastPart;
}
function togglePhoneVisibility(phoneconst, PhoneCus) {
  const phoneNumber = document.querySelector(".welcome-member__phone");
  const viewIcon = document.querySelector(".view-icon");
  const blockedIcon = document.querySelector(".block-icon");

  // Kiểm tra nếu số điện thoại hiện tại đang được ẩn
  if (phoneNumber.innerHTML === phoneconst) {
    // Hiển thị số điện thoại đầy đủ
    phoneNumber.innerHTML = PhoneCus;
    viewIcon.style.display = "none";
    blockedIcon.style.display = "block";
  } else {
    // Ẩn phần giữa số điện thoại và chỉ hiển thị số
    phoneNumber.innerHTML = phoneconst;
    viewIcon.style.display = "block";
    blockedIcon.style.display = "none";
  }
}

// =================================================================== MỚI THÊM =========================================

function displayCustomerInfo() {
  const nameElements = document.getElementsByClassName("welcome-member__name");
  const phoneElements = document.getElementsByClassName(
    "welcome-member__phone"
  );
  if (nameElements.length > 0) {
    nameElements[0].textContent = customerAccount.customer.name;
  } else {
    console.error("Không tìm thấy phần tử có class 'customer-name'");
  }

  if (phoneElements.length > 0) {
    phoneElements[0].textContent = customerAccount.customer.phone;
  } else {
    console.error("Không tìm thấy phần tử có class 'customer-phone'");
  }
}

// Hàm hiện thị chi tiết hóa đơn
function displayBill() {
  console.log(customerAccount);

  var s = "";
  var nothing = "";
  if (customerAccount.bills !== null) {
    console.log(111);
    customerAccount.bills.forEach((bill, index) => {
      console.log(1111);
      var quantity = 0;
      bill.products.forEach((product) => {
        quantity += product.quantity;
      });
      s += `
      <div class="list-order-wrapper__items">
                  <div class="view-list-wrapper">
                    ${productsInBill(bill.products, index)}
                    <div style="display: flex; justify-content: space-between;">
                    <div><p class="total-date">Ngày: <span >${
                      customerAccount.bills[index].date
                    }</span></p>
                    <p class="total-time" >Giờ: <span >${
                      bill.time
                    }</span></p> </div>
                    <div class="total-price">
                      
                      <p>Tổng sản phẩm : <span id ="totalAmount">${quantity}  </span></p>
                      <p>Tổng số tiền : <span id="totalAmount">${totalAmount(
                        bill.products
                      ).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}</span></p>
                    </div>
                    </div>
                    ${
                      bill.products.length > 1
                        ? `
                      <button class="toggleButton show-all-button" data-index="${index}">
                        Xem tất cả sản phẩm
                      </button>
                    `
                        : ""
                    }
                  </div>
                </div>
    `;
    });

    nothing += `
  <div class="no-order">
                <img src="/asset/img/Cart-empty.webp" alt="" />
                <p> Bạn không có đơn hàng nào </p>
              </div>
`;

    document.getElementsByClassName("list-order-wrapper")[0].innerHTML = s;
    if (customerAccount.bills.length == 0) {
      document.getElementsByClassName("list-order-wrapper")[0].innerHTML =
        nothing;
    }
    // Thêm sự kiện cho các nút "Xem tất cả sản phẩm" nếu có
    const toggleButtons = document.querySelectorAll(".toggleButton");
    toggleButtons.forEach((button) => {
      button.addEventListener("click", showHiddenProduct);
    });
  } else {
    nothing += `
  <div class="no-order">
                <img src="/asset/img/Cart-empty.webp" alt="" />
                <p> Bạn không có đơn hàng nào </p>
              </div>
`;
    document.getElementsByClassName("list-order-wrapper")[0].innerHTML =
      nothing;
  }
}

// Hàm hiện thị sản phẩm từng hóa đơn
function productsInBill(products, billIndex) {
  var s = "";
  for (let i = 0; i < products.length; i++) {
    const hiddenProduct = i >= 1 ? "none" : "flex";
    s += `
      <div class="item" style="display: ${hiddenProduct}" data-bill-index="${billIndex}">
                      <img
                        src="${products[i].image}"
                        alt="${products[i].name}"
                        style="width: 100px; height: 100px"
                      />
                      <div class="item__info">
                        <p class="item__name">${products[i].name}</p>
                        <div class="item__price">
                          <div>
                            <div class="block-box-price">
                              <span></span>
                              <div class="box-info__box-price">
                                <p class="product__price--show">${products[
                                  i
                                ].price.toLocaleString("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                })}</p>
                                <p class="product__price--through"></p>
                              </div>
                            </div>
                          </div>
                          <p>Số lượng: <span class="text-danger">${
                            products[i].quantity
                          }</span></p>
                        </div>
                      </div>
                    </div>
    `;
  }
  return s;
}

// Hàm hiện thị các sản phẩm đã bị ẩn
function showHiddenProduct(event) {
  const button = event.target;
  const billIndex = button.getAttribute("data-index"); // Lấy chỉ số của hóa đơn
  const items = document.querySelectorAll(`[data-bill-index='${billIndex}']`);

  // Kiểm tra trạng thái hiện tại của nút
  const isShowingAll = button.textContent === "Ẩn bớt";

  if (isShowingAll) {
    // Nếu đang ở trạng thái "Ẩn bớt", ẩn bớt các sản phẩm
    items.forEach((item, index) => {
      if (index >= 1) {
        // Chỉ ẩn từ sản phẩm thứ 3 trở đi
        item.style.display = "none"; // Ẩn sản phẩm
      }
    });
    button.textContent = "Xem tất cả sản phẩm"; // Đổi nút thành "Xem tất cả sản phẩm"
  } else {
    // Nếu không, hiển thị tất cả các sản phẩm
    items.forEach((item) => {
      item.style.display = "flex"; // Hiện tất cả sản phẩm
    });
    button.textContent = "Ẩn bớt"; // Đổi nút thành "Ẩn bớt"
  }
}

// Hàm tính tổng số tiền của 1 hóa đơn
function totalAmount(products) {
  let sum = 0;
  for (let element of products) {
    sum = sum + element.price * element.quantity;
  }
  return sum;
}

// Hàm lấy tổng số hóa đơn
function totalProduct() {
  let totalProduct = 0;
  totalProduct += customerAccount.bills.length;
  return totalProduct;
}

// Hàm tính tổng tiền tích lũy
function totalAccumulatedAmount() {
  let sum = 0;
  for (let element of customerAccount.bills) {
    sum += totalAmount(element.products);
  }
  return sum;
}
// ================================================================================================================
function displayBillwithStatus(status) {
  var s = "";
  var nothing = "";
  if (customerAccount.bills !== null) {
    customerAccount.bills.forEach((bill, index) => {
      var quantity = 0;
      if (normalizeString(bill.orderStatus) === normalizeString(status)) {
        bill.products.forEach((product) => {
          quantity += product.quantity;
        });
        s += `
      <div class="list-order-wrapper__items">
                  <div class="view-list-wrapper">
                    ${productsInBill(bill.products, index)}
                    <div class="total-price">
                      <p>Tổng sản phẩm : <span id ="totalAmount">${quantity}  </span></p>
                      <p>Tổng số tiền : <span id="totalAmount">${totalAmount(
                        bill.products
                      ).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}</span></p>
                    </div>
                    ${
                      bill.products.length > 1
                        ? `
                      <button class="toggleButton show-all-button" data-index="${index}">
                        Xem tất cả sản phẩm
                      </button>
                    `
                        : ""
                    }
                  </div>
                </div>
    `;
      }
    });

    nothing += `
    <div class="no-order">
                  <img src="/asset/img/Cart-empty.webp" alt="" />
                  <p> Không có đơn hàng nào ${status.toLowerCase()}</p>
                </div>
  `;
    console.log("s: ", s);
    document.getElementsByClassName("list-order-wrapper")[0].innerHTML = s;
    if (s === "") {
      document.getElementsByClassName("list-order-wrapper")[0].innerHTML =
        nothing;
    }
    // Thêm sự kiện cho các nút "Xem tất cả sản phẩm" nếu có
    const toggleButtons = document.querySelectorAll(".toggleButton");
    toggleButtons.forEach((button) => {
      button.addEventListener("click", showHiddenProduct);
    });
  } else {
    nothing += `
    <div class="no-order">
                  <img src="/asset/img/Cart-empty.webp" alt="" />
                  <p> Không có đơn hàng nào ${status.toLowerCase()}</p>
                </div>
  `;
    document.getElementsByClassName("list-order-wrapper")[0].innerHTML =
      nothing;
  }
}
function normalizeString(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
}
function FilterBill() {
  const dateRangeSpan =
    document.querySelector(".form-control span").textContent;
  const [startDate, endDate] = dateRangeSpan.split(" - ");
  const startDateParts = startDate.split("/");
  const endDateParts = endDate.split("/");
  const startDateObj = new Date(
    startDateParts[2],
    startDateParts[1] - 1,
    startDateParts[0]
  );
  const endDateObj = new Date(
    endDateParts[2],
    endDateParts[1] - 1,
    endDateParts[0]
  );
  const items = document.querySelectorAll(".list-order-wrapper .item");
  items.forEach((item) => {
    const dateText = item.querySelector(".total-date span").textContent;
    const [day, month, year] = dateText.split("/");
    const billDate = new Date(year, month - 1, day);
    if (billDate >= startDateObj && billDate <= endDateObj) {
      item.style.display = "flex"; // Hiển thị phần tử nếu ngày nằm trong khoảng
    } else {
      item.style.display = "none"; // Ẩn phần tử nếu ngày không nằm trong khoảng
    }
  });
}

document.getElementById("cart-poiter").addEventListener("click", function () {
  window.location.href = "Nhom55.html";
});
