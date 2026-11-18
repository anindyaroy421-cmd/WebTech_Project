var pages = document.querySelectorAll(".page");
var navLinks = document.querySelectorAll("[data-page]");
var cartCount = document.getElementById("cartCount");
var searchInput = document.getElementById("searchInput");
var productCards = document.querySelectorAll(".product-card");
var noResults = document.getElementById("noResults");
var toast = document.getElementById("message");

var cart = 0;

function showMessage(message) {
  message.textContent = message;
  message.classList.add("show");
  setTimeout(function () {
    message.classList.remove("show");
  }, 2000);
}

function showPage(pageId) {
  for (var i = 0; i < pages.length; i++) {
    pages[i].hidden = true;
  }

  document.getElementById(pageId).hidden = false;

  var menuLinks = document.querySelectorAll(".nav-links a");
  for (var j = 0; j < menuLinks.length; j++) {
    menuLinks[j].classList.remove("active");
    if (menuLinks[j].dataset.page === pageId) {
      menuLinks[j].classList.add("active");
    }
  }

  window.scrollTo(0, 0);
}

for (var i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener("click", function (event) {
    event.preventDefault();
    showPage(this.dataset.page);
    document.getElementById("navLinks").classList.remove("open");
  });
}

document.getElementById("menuToggle").addEventListener("click", function () {
  document.getElementById("navLinks").classList.toggle("open");
});

var cartButtons = document.querySelectorAll(".add-to-cart");
for (var k = 0; k < cartButtons.length; k++) {
  cartButtons[k].addEventListener("click", function () {
    cart = cart + 1;
    cartCount.textContent = cart;
    showToast("Item added to cart!");
  });
}

document.getElementById("cartBtn").addEventListener("click", function () {
  showToast("You have " + cart + " item(s) in your cart.");
});

searchInput.addEventListener("input", function () {
  var text = searchInput.value.toLowerCase();
  var found = 0;

  showPage("home");
  for (var i = 0; i < productCards.length; i++) {
    var cardText = productCards[i].textContent.toLowerCase();
    if (cardText.includes(text)) {
      productCards[i].style.display = "block";
      found = found + 1;
    } else {
      productCards[i].style.display = "none";
    }
  }

  noResults.hidden = found > 0;
});

function goToProducts() {
  document.getElementById("products").scrollIntoView({ behavior: "smooth" });
}
document
  .getElementById("startShopping")
  .addEventListener("click", goToProducts);
document.getElementById("shopNow").addEventListener("click", goToProducts);

function checkForm(form) {
  var isValid = true;
  var fields = form.querySelectorAll("input, select, textarea");

  for (var i = 0; i < fields.length; i++) {
    var field = fields[i];
    var value = field.value.trim();
    var errorBox = field.nextElementSibling;
    var message = "";

    if (value === "") {
      message = "This field is required.";
    } else if (
      field.type === "email" &&
      (!value.includes("@") || !value.includes("."))
    ) {
      message = "Enter a valid email.";
    } else if (field.type === "password" && value.length < 6) {
      message = "Password must be at least 6 characters.";
    } else if (field.name === "confirm_password") {
      var password = form.querySelector("[name='password']").value;
      if (value !== password) {
        message = "Passwords do not match.";
      }
    } else if (field.type === "tel" && (isNaN(value) || value.length < 10)) {
      message = "Enter a valid phone number (digits only, at least 10).";
    }

    errorBox.textContent = message;
    if (message !== "") {
      isValid = false;
    }
  }

  return isValid;
}

var forms = document.querySelectorAll("form");
for (var f = 0; f < forms.length; f++) {
  forms[f].addEventListener("submit", function (event) {
    event.preventDefault();
    if (checkForm(this)) {
      showToast("Form submitted successfully!");
      this.reset();
    }
  });
}

var infoLinks = document.querySelectorAll(".info-link");
for (var m = 0; m < infoLinks.length; m++) {
  infoLinks[m].addEventListener("click", function (event) {
    event.preventDefault();
    showToast(this.textContent + " page coming soon.");
  });
}
