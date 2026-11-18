/* Seller form validation (simple DOM code) */

// small helper: true if the text has a number (0-9) inside
function hasDigit(text) {
  for (let i = 0; i < text.length; i++) {
    if (text[i] >= "0" && text[i] <= "9") {
      return true;
    }
  }
  return false;
}

// small helper: true if the text has only numbers (0-9)
function onlyDigits(text) {
  for (let i = 0; i < text.length; i++) {
    if (text[i] < "0" || text[i] > "9") {
      return false;
    }
  }
  return true;
}

// small helper: true if the same character comes many times in a row (like 7777777)
function hasRepeat(text, times) {
  let count = 1;
  for (let i = 1; i < text.length; i++) {
    if (text[i] === text[i - 1]) {
      count++;
      if (count >= times) {
        return true;
      }
    } else {
      count = 1;
    }
  }
  return false;
}

// small helper: count the words in the text
function countWords(text) {
  let words = 0;
  let inWord = false;
  for (let i = 0; i < text.length; i++) {
    if (text[i] !== " " && text[i] !== "\n") {
      if (!inWord) {
        words++;
        inWord = true;
      }
    } else {
      inWord = false;
    }
  }
  return words;
}

document.getElementById("sellerForm").addEventListener("submit", function (event) {

  // stop the page from reloading
  event.preventDefault();

  let isValid = true;

  // Clear previous errors
  document.getElementById("shopError").textContent = "";
  document.getElementById("ownerError").textContent = "";
  document.getElementById("emailError").textContent = "";
  document.getElementById("phoneError").textContent = "";
  document.getElementById("cityError").textContent = "";
  document.getElementById("websiteError").textContent = "";
  document.getElementById("categoryError").textContent = "";
  document.getElementById("aboutError").textContent = "";
  document.getElementById("termsError").textContent = "";
  document.getElementById("msg").textContent = "";

  // 1. Shop name check (3 to 40 characters)
  let shop = document.getElementById("shop").value.trim();
  if (shop === "") {
    document.getElementById("shopError").textContent = "Please enter your shop name.";
    isValid = false;
  } else if (shop.length < 3) {
    document.getElementById("shopError").textContent = "Shop name must have at least 3 characters.";
    isValid = false;
  } else if (shop.length > 40) {
    document.getElementById("shopError").textContent = "Shop name must be 40 characters or less.";
    isValid = false;
  }

  // 2. Owner name check (no numbers, first name + last name)
  let owner = document.getElementById("owner").value.trim();
  if (owner === "") {
    document.getElementById("ownerError").textContent = "Please enter the owner name.";
    isValid = false;
  } else if (hasDigit(owner)) {
    document.getElementById("ownerError").textContent = "Owner name cannot have numbers.";
    isValid = false;
  } else if (!owner.includes(" ")) {
    document.getElementById("ownerError").textContent = "Please enter first name and last name.";
    isValid = false;
  }

  // 3. Email check (@ and a dot after it)
  let email = document.getElementById("email").value.trim();
  if (email === "") {
    document.getElementById("emailError").textContent = "Please enter your email.";
    isValid = false;
  } else if (email.includes(" ")) {
    document.getElementById("emailError").textContent = "Email cannot have spaces.";
    isValid = false;
  } else if (!email.includes("@")) {
    document.getElementById("emailError").textContent = "Email must have '@'.";
    isValid = false;
  } else if (email.indexOf("@") === 0) {
    document.getElementById("emailError").textContent = "Write something before '@'.";
    isValid = false;
  } else if (email.lastIndexOf(".") < email.indexOf("@") || email.endsWith(".")) {
    document.getElementById("emailError").textContent = "Email needs a dot after '@', like name@example.com.";
    isValid = false;
  }

  // 4. Phone check (11 numbers, starts with 01, third number 3 to 9)
  let phone = document.getElementById("phone").value.trim();
  if (phone === "") {
    document.getElementById("phoneError").textContent = "Please enter your phone number.";
    isValid = false;
  } else if (phone.includes(" ")) {
    document.getElementById("phoneError").textContent = "Phone number cannot have spaces.";
    isValid = false;
  } else if (!onlyDigits(phone)) {
    document.getElementById("phoneError").textContent = "Phone number can have only numbers (no +, - or letters).";
    isValid = false;
  } else if (phone.length < 11) {
    document.getElementById("phoneError").textContent = "Phone number is missing " + (11 - phone.length) + " digit(s). It must be 11 digits.";
    isValid = false;
  } else if (phone.length > 11) {
    document.getElementById("phoneError").textContent = "Phone number has " + (phone.length - 11) + " extra digit(s). It must be 11 digits.";
    isValid = false;
  } else if (!phone.startsWith("01")) {
    document.getElementById("phoneError").textContent = "Phone number must start with 01.";
    isValid = false;
  } else if (phone[2] < "3") {
    document.getElementById("phoneError").textContent = "The third digit must be 3 to 9 (013 to 019).";
    isValid = false;
  } else if (hasRepeat(phone, 7)) {
    document.getElementById("phoneError").textContent = "This phone number looks fake. Please check it.";
    isValid = false;
  }

  // 5. City check (no numbers)
  let city = document.getElementById("city").value.trim();
  if (city === "") {
    document.getElementById("cityError").textContent = "Please enter your city.";
    isValid = false;
  } else if (city.length < 2) {
    document.getElementById("cityError").textContent = "City name is too short.";
    isValid = false;
  } else if (hasDigit(city)) {
    document.getElementById("cityError").textContent = "City name cannot have numbers.";
    isValid = false;
  }

  // 6. Website check (starts with http:// or https:// and has a dot)
  let website = document.getElementById("website").value.trim();
  if (website === "") {
    document.getElementById("websiteError").textContent = "Please enter your website.";
    isValid = false;
  } else if (website.includes(" ")) {
    document.getElementById("websiteError").textContent = "Website cannot have spaces.";
    isValid = false;
  } else if (!website.startsWith("http://") && !website.startsWith("https://")) {
    document.getElementById("websiteError").textContent = "Website must start with http:// or https://";
    isValid = false;
  } else if (!website.includes(".")) {
    document.getElementById("websiteError").textContent = "Website needs a dot, like https://myshop.com";
    isValid = false;
  }

  // 7. Category check (dropdown)
  let category = document.getElementById("category").value;
  if (category === "") {
    document.getElementById("categoryError").textContent = "Please choose a category.";
    isValid = false;
  }

  // 8. About your shop check (20 to 300 characters, at least 4 words, real words)
  let about = document.getElementById("about").value.trim();
  if (about === "") {
    document.getElementById("aboutError").textContent = "Please tell us about your shop.";
    isValid = false;
  } else if (about.length < 20) {
    document.getElementById("aboutError").textContent = "Write at least 20 characters. You need " + (20 - about.length) + " more.";
    isValid = false;
  } else if (countWords(about) < 4) {
    document.getElementById("aboutError").textContent = "Write at least 4 words. Add " + (4 - countWords(about)) + " more.";
    isValid = false;
  } else if (onlyDigits(about.split(" ").join(""))) {
    document.getElementById("aboutError").textContent = "Write about your shop in words, not only numbers.";
    isValid = false;
  } else if (hasRepeat(about, 5)) {
    document.getElementById("aboutError").textContent = "Please do not repeat the same character again and again.";
    isValid = false;
  } else if (about.length > 300) {
    document.getElementById("aboutError").textContent = "Keep it under 300 characters. Remove " + (about.length - 300) + " characters.";
    isValid = false;
  }

  // 9. Checkbox check
  let terms = document.getElementById("terms").checked;
  if (!terms) {
    document.getElementById("termsError").textContent = "You must agree to the seller terms.";
    isValid = false;
  }

  // Everything is fine: show thank you message and empty the form
  if (isValid) {
    let firstName = owner.split(" ")[0];
    document.getElementById("msg").textContent = "Thank you, " + firstName + "! " + shop + " is registered.";
    document.getElementById("sellerForm").reset();
  }
});