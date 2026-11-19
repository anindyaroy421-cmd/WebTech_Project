/* Seller form validation (simplest version)

   Every field has ONE small function.
   - Wrong value  -> returns an error message
   - Fine value   -> returns "" (empty text)
*/


/* ========== TWO HELPERS ========== */

// get the text from an input box (without spaces at the start and end)
function getValue(id) {
  return document.getElementById(id).value.trim();
}

// show a message under a field (empty text = no error)
function showError(id, message) {
  document.getElementById(id).textContent = message;
}


/* ========== ONE CHECK FUNCTION FOR EACH FIELD ========== */

function checkShop(shop) {
  if (shop === "") return "Please enter your shop name.";
  if (shop.length < 3) return "Shop name must have at least 3 characters.";
  return "";
}

function checkOwner(owner) {
  if (owner === "") return "Please enter the owner name.";
  if (!owner.includes(" ")) return "Please enter first name and last name.";
  return "";
}

function checkEmail(email) {
  if (email === "") return "Please enter your email.";
  if (!email.includes("@")) return "Email must have '@'.";
  if (!email.includes(".")) return "Email needs a dot, like name@example.com.";
  return "";
}

function checkPhone(phone) {
  if (phone === "") return "Please enter your phone number.";
  if (isNaN(phone)) return "Phone number can have only numbers.";
  if (phone.length !== 11) return "Phone number must be 11 digits.";
  if (!phone.startsWith("01")) return "Phone number must start with 01.";
  return "";
}

function checkCity(city) {
  if (city === "") return "Please enter your city.";
  return "";
}

// website is optional: empty is OK
function checkWebsite(website) {
  if (website === "") return "";
  if (!website.startsWith("http://") && !website.startsWith("https://")) {
    return "Website must start with http:// or https://";
  }
  return "";
}

function checkCategory(category) {
  if (category === "") return "Please choose a category.";
  return "";
}

function checkAbout(about) {
  if (about === "") return "Please tell us about your shop.";
  if (about.length < 20) return "Write at least 20 characters.";
  return "";
}

function checkTerms(isChecked) {
  if (!isChecked) return "You must agree to the seller terms.";
  return "";
}


/* ========== WHEN THE FORM IS SUBMITTED ========== */

document.getElementById("sellerForm").addEventListener("submit", function (event) {

  // stop the page from reloading
  event.preventDefault();

  // 1. read the values
  let shop = getValue("shop");
  let owner = getValue("owner");
  let email = getValue("email");
  let phone = getValue("phone");
  let city = getValue("city");
  let website = getValue("website");
  let category = document.getElementById("category").value;
  let about = getValue("about");
  let terms = document.getElementById("terms").checked;

  // 2. check every field (each gives "" or an error message)
  let shopMsg = checkShop(shop);
  let ownerMsg = checkOwner(owner);
  let emailMsg = checkEmail(email);
  let phoneMsg = checkPhone(phone);
  let cityMsg = checkCity(city);
  let websiteMsg = checkWebsite(website);
  let categoryMsg = checkCategory(category);
  let aboutMsg = checkAbout(about);
  let termsMsg = checkTerms(terms);

  // 3. show the messages (an empty message clears the old error)
  showError("shopError", shopMsg);
  showError("ownerError", ownerMsg);
  showError("emailError", emailMsg);
  showError("phoneError", phoneMsg);
  showError("cityError", cityMsg);
  showError("websiteError", websiteMsg);
  showError("categoryError", categoryMsg);
  showError("aboutError", aboutMsg);
  showError("termsError", termsMsg);
  showError("msg", "");

  // 4. the form is valid only if ALL messages are empty
  let allGood =
    shopMsg === "" && ownerMsg === "" && emailMsg === "" &&
    phoneMsg === "" && cityMsg === "" && websiteMsg === "" &&
    categoryMsg === "" && aboutMsg === "" && termsMsg === "";

  // 5. if all good: thank you message and empty the form
  if (allGood) {
    let firstName = owner.split(" ")[0];
    showError("msg", "Thank you, " + firstName + "! " + shop + " is registered.");
    document.getElementById("sellerForm").reset();
  }
});
