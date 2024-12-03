// let user = [
//   {
//     userName: "Nguyễn Văn A",
//     password: "123",
//     email: "nguyenvana@gmail.com",
//     loaiKhachHang: "Khách hàng",
//     soLuongGiaoDich: 1,
//     tongTien: 12000000,
//     ngayTao: "2023-01-10",
//     status: "active",
//     accountType: "user",
//   },
//   {
//     userName: "Trần Thị B",
//     password: "123",
//     email: "tranthib@gmail.com",
//     loaiKhachHang: "Khách hàng",
//     soLuongGiaoDich: 1,
//     tongTien: 5750000,
//     ngayTao: "2023-01-15",
//     status: "active",
//     accountType: "user",
//   },
//   {
//     userName: "lekien",
//     password: "123",
//     email: "kienlt@gmail.com",
//     loaiKhachHang: "Khách hàng",
//     soLuongGiaoDich: 1,
//     tongTien: 30400000,
//     ngayTao: "2023-02-20",
//     status: "lock",
//     accountType: "user",
//   },
//   {
//     userName: "Phạm Văn C",
//     password: "123",
//     email: "phamvanc@gmail.com",
//     loaiKhachHang: "Khách hàng",
//     soLuongGiaoDich: 1,
//     tongTien: 23583000,
//     ngayTao: "2023-03-05",
//     status: "active",
//     accountType: "user",
//   },
//   {
//     userName: "Đỗ Thị D",
//     password: "123",
//     email: "dothid@gmail.com",
//     loaiKhachHang: "Khách hàng",
//     soLuongGiaoDich: 1,
//     tongTien: 6100000,
//     ngayTao: "2023-04-10",
//     status: "active",
//     accountType: "user",
//   },
//   {
//     userName: "Nguyễn Văn E",
//     password: "123",
//     email: "nguyenvane@gmail.com",
//     loaiKhachHang: "Khách hàng",
//     soLuongGiaoDich: 1,
//     tongTien: 18000000,
//     ngayTao: "2023-05-12",
//     status: "lock",
//     accountType: "user",
//   },
//   {
//     userName: "Trần Văn F",
//     password: "123",
//     email: "tranvanf@gmail.com",
//     loaiKhachHang: "Khách hàng",
//     soLuongGiaoDich: 1,
//     tongTien: 20300000,
//     ngayTao: "2023-06-18",
//     status: "active",
//     accountType: "user",
//   },
//   {
//     userName: "Lê Văn G",
//     password: "123",
//     email: "levang@gmail.com",
//     loaiKhachHang: "Khách hàng",
//     soLuongGiaoDich: 1,
//     tongTien: 15200000,
//     ngayTao: "2023-07-22",
//     status: "active",
//     accountType: "user",
//   },
//   {
//     userName: "Phạm Thị H",
//     password: "123",
//     email: "phamthih@gmail.com",
//     loaiKhachHang: "Khách hàng",
//     soLuongGiaoDich: 1,
//     tongTien: 12500000,
//     ngayTao: "2023-08-25",
//     status: "lock",
//     accountType: "user",
//   },
//   {
//     userName: "Đỗ Văn I",
//     password: "123",
//     email: "dovani@gmail.com",
//     loaiKhachHang: "Khách hàng",
//     soLuongGiaoDich: 1,
//     tongTien: 17800000,
//     ngayTao: "2023-09-28",
//     status: "active",
//     accountType: "user",
//   },
// ];
// ĐẨY DỮ LIỆU LÊN LOCAL STORAGE
// localStorage.setItem("users", JSON.stringify(user));
// LẤY DỮ LIỆU XUỐNG TỪ LOCAL STORAGE
// let arrayUser = JSON.parse(localStorage.getItem("users"));
// console.log("mang nguoi dung luc nay: ", arrayUser.length);

// BIẾN LƯU TRẠNG THÁI ĐĂNG NHẬP

// BIẾN LƯU TRẠNG THÁI ĐĂNG NHẬP
let loginStatus = JSON.parse(localStorage.getItem("loginStatus")) || false;
if (loginStatus) {
  // Lấy thông tin người dùng hiện tại từ localStorage
  let currentuser = JSON.parse(localStorage.getItem("currentUser"));

  // Kiểm tra xem currentuser có tồn tại và có thuộc tính userName không
  if (currentuser && currentuser.userName) {
    // Cập nhật nội dung của nút userBtn
    const userBtn = document.getElementById("userBtn");
    userBtn.innerHTML = `<i class="bi bi-person"></i> ${currentuser.userName}`;
  }
}

function checkLoginStatus() {
  const loginStatus = localStorage.getItem("loginStatus");

  if (loginStatus === "true") {
    // Lưu ý rằng localStorage chỉ lưu trữ giá trị dưới dạng chuỗi
    console.log("đang trạng thái đăng nhập");
    document.getElementById("userBtn").addEventListener("click", () => {
      window.location.href = "account.html";
    });
  }
}

// //localStorage.setItem("loginStatus", loginStatus);
// console.log(loginStatus);
// // Gọi hàm khi DOM đã được tải
// const userBtn = document.getElementById("userBtn"); // Nút User
// const loginModal = document.getElementById("loginModal");
// // Khi người dùng click vào nút User, hiển thị modal
// userBtn.addEventListener("click", function () {
//   if (!loginStatus) {
//     // Nếu chưa đăng nhập, hiển thị modal
//     loginModal.show();
//   } else {
//     window.location.href = "account.html"; // Chuyển đến trang tài khoản
//   }
// });

// Gọi hàm khi DOM đã được tải
document.addEventListener("DOMContentLoaded", checkLoginStatus);

// Biến trạng thái Đăng Nhập hoặc Đăng Ký
let isRegistering = false;

// Chuyển đổi giao diện giữa Đăng Nhập và Đăng Ký
document
  .getElementById("toggle-login")
  .addEventListener("click", function togglelogin() {
    isRegistering = !isRegistering;

    if (isRegistering) {
      document.getElementById("left-title").textContent =
        "Bạn đã có tài khoản?";
      document.getElementById("left-text").textContent =
        "Vui lòng đăng nhập tài khoản để có trải nghiệm tốt nhất";
      document.getElementById("toggle-login").textContent = "Đăng Nhập";
      document.getElementById("submit-button").textContent = "Đăng Ký";
      document.getElementById("right-title").textContent =
        "Tạo Tài Khoản Ngay!";
      document
        .getElementById("confirm-password-group")
        .classList.remove("d-none");
      document.querySelector(
        "#confirm-password-group #confirm-password"
      ).required = true;
      document.getElementById("userName-group").classList.remove("d-none");
      document.querySelector("#userName-group #userName").required = true;
      document.getElementById("email").value = "";
      document.getElementById("password").value = "";
    } else {
      // document.getElementById("left-title").textContent =
      //   "Mới đến cửa hàng của chúng tôi?";
      // document.getElementById("left-text").textContent =
      //   "Vui lòng đăng ký tài khoản để có trải nghiệm tốt nhất";
      // document.getElementById("toggle-login").textContent = "Đăng Ký";
      // document.getElementById("submit-button").textContent = "Đăng Nhập";
      // document.getElementById("right-title").textContent = "Chào Mừng Trở Lại!";
      // document.getElementById("confirm-password-group").classList.add("d-none");
      // document.getElementById("userName-group").classList.add("d-none");
      // document.getElementById("userName-group").value = "";
      // document.getElementById("email").value = "";
      // document.getElementById("password").value = "";
      // document.getElementById("confirm-password").value = "";
      document.getElementById("left-title").textContent =
        "Mới đến cửa hàng của chúng tôi?";
      document.getElementById("left-text").textContent =
        "Vui lòng đăng ký tài khoản để có trải nghiệm tốt nhất";
      document.getElementById("toggle-login").textContent = "Đăng Ký";
      document.getElementById("submit-button").textContent = "Đăng Nhập";
      document.getElementById("right-title").textContent = "Chào Mừng Trở Lại!";

      // Ẩn các trường không cần thiết khi đăng nhập
      document.getElementById("confirm-password-group").classList.add("d-none");
      document.getElementById("userName-group").classList.add("d-none");

      // Xóa giá trị các trường khi chuyển sang chế độ đăng nhập
      document.getElementById("userName").value = "";
      document.getElementById("email").value = "";
      document.getElementById("password").value = "";
      document.getElementById("confirm-password").value = "";

      // Loại bỏ thuộc tính required khi không cần thiết
      document.querySelector(
        "#confirm-password-group #confirm-password"
      ).required = false;
      document.querySelector("#userName-group #userName").required = false;
    }
  });

// Lấy các phần tử cần thiết
const passwordInput = document.getElementById("password");
const togglePasswordButton = document.getElementById("toggle-password");
const passwordIcon = document.getElementById("password-icon");

// Thêm sự kiện click vào nút toggle
togglePasswordButton.addEventListener("click", function () {
  // Kiểm tra trạng thái hiện tại của input mật khẩu
  const isPasswordHidden = passwordInput.type === "password";

  // Đổi kiểu input giữa password và text
  passwordInput.type = isPasswordHidden ? "text" : "password";

  // // Đổi biểu tượng của nút
  passwordIcon.classList.toggle("bi-eye-slash", !isPasswordHidden);
  passwordIcon.classList.toggle("bi-eye", isPasswordHidden);
});

// hàm xử lý đăng nhập và đăng ký
document
  .getElementById("auth-form")
  .addEventListener("submit", function handleForm(event) {
    if (event) event.preventDefault();

    let arrayUser = JSON.parse(localStorage.getItem("users"));

    let userLogin = document.getElementById("userName").value.trim();
    let emailLogin = document.getElementById("email").value.trim();
    let passLogin = document.getElementById("password").value.trim();
    let passConfirmLogin = document
      .getElementById("confirm-password")
      .value.trim();

    console.log("ten:", userLogin);
    console.log("mk: ", passLogin);
    console.log("mail: ", emailLogin);
    console.log("mk nhap lai: ", passConfirmLogin);

    let currentUser;
    console.log("trạng thái hiện tại đăng nhập hay đăng ký: ", isRegistering);
    if (!isRegistering) {
      // xử lý trạng thái đăng nhập

      for (let user of arrayUser)
        if (user.email === emailLogin && user.password === passLogin)
          currentUser = user;

      console.log("người dùng vừ tìm thấy; ", currentUser);

      if (!currentUser) {
        alert("Thông tin đăng nhập không chính xác.");
        return;
      }

      if (currentUser.status !== "active") {
        alert("Tài khoản này đã bị khóa !");
        return;
      }

      alert("Đăng nhập thành công !");
      console.log("Tài khoản vừa đăng nhập: ", currentUser);
      loginStatus = localStorage.getItem("loginStutus");
      loginStatus = true;
      localStorage.setItem("loginStatus", loginStatus);
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      let hasError = false;

      // Kiểm tra lỗi nhập liệu
      if (!passLogin || passLogin.length < 5) {
        console.log(`sai o mk`);
        hasError = true;
      }
      if (passConfirmLogin !== passLogin) {
        console.log("sai o mk nhap lai");
        hasError = true;
      }

      if (hasError) {
        alert("Vui lòng kiểm tra lại thông tin.");
        return;
      }

      // Lưu tài khoản
      // let accounts = JSON.parse(localStorage.getItem("accounts")) || [];
      for (let user of arrayUser) {
        console.log(`Kiểm tra: ${user.userName} - ${user.email}`);
        if (user.userName === userLogin || user.email === emailLogin) {
          alert("Tên người dùng hoặc email đã tồn tại !");
          return;
        }
      }

      arrayUser.push({
        userName: userLogin,
        password: passLogin,
        email: emailLogin,
        loaiKhachHang: "Khách hàng",
        tongTien: 0,
        ngayTao: new Date().toISOString(),
        status: "active",
        accountType: "user",
      });

      currentUser = arrayUser[arrayUser.length - 1];
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      localStorage.setItem("users", JSON.stringify(arrayUser));
      alert("Đăng ký thành công!");
      console.log("Tài khoản vừa đăng ký: ", arrayUser[arrayUser.length - 1]);
    }

    window.location.href = "account.html";
  });

function searchProduct(event) {
  event.preventDefault(); // Ngăn form reload trang
  const searchBox = document.getElementById("search-box");
  const query = searchBox.value.trim(); // Lấy giá trị từ ô tìm kiếm
  if (query) {
    // Điều hướng sang trang SanPham.html với từ khóa tìm kiếm
    window.location.href = `SanPham.html?search=${encodeURIComponent(query)}`;
  }
}

document.getElementById("historybutton").addEventListener("click", function () {
  window.location.href = `HistoryCart.html`;
});

document.getElementById("cart-poiter").addEventListener("click", function () {
  window.location.href = "Nhom55.html";
});
