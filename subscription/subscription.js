var subForm = document.getElementById("subscription-form");
var subBody = document.getElementById("subscriberBody");
var subCount = document.getElementById("subscriberCount");

function padSerial(number) {
  return number < 10 ? "0" + number : "" + number;
}

function emailExists(email) {
  var rows = subBody.querySelectorAll("tr");
  for (var i = 0; i < rows.length; i++) {
    var cellEmail = rows[i].cells[2].textContent.trim().toLowerCase();
    if (cellEmail === email.toLowerCase()) {
      return true;
    }
  }
  return false;
}

function setSubError(inputId, errorId, message) {
  document.getElementById(errorId).textContent = message;
  document.getElementById(inputId).classList.toggle("invalid", message !== "");
}

function checkSubscription() {
  var isValid = true;
  var name = document.getElementById("subName").value.trim();
  var email = document.getElementById("subEmail").value.trim();

  if (name === "") {
    setSubError("subName", "subNameError", "Full name is required.");
    isValid = false;
  } else if (name.length < 3) {
    setSubError("subName", "subNameError", "Name must be at least 3 characters.");
    isValid = false;
  } else {
    setSubError("subName", "subNameError", "");
  }

  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === "") {
    setSubError("subEmail", "subEmailError", "Email is required.");
    isValid = false;
  } else if (!emailPattern.test(email)) {
    setSubError("subEmail", "subEmailError", "Enter a valid email, like name@gmail.com.");
    isValid = false;
  } else if (emailExists(email)) {
    setSubError("subEmail", "subEmailError", "This email is already subscribed.");
    isValid = false;
  } else {
    setSubError("subEmail", "subEmailError", "");
  }

  return isValid;
}

function addSubscriber(name, email, plan) {
  var serial = subBody.querySelectorAll("tr").length + 1;

  var row = document.createElement("tr");
  row.className = "new-row";

  var serialCell = document.createElement("td");
  serialCell.textContent = padSerial(serial);

  var nameCell = document.createElement("td");
  nameCell.textContent = name;

  var emailCell = document.createElement("td");
  emailCell.textContent = email;

  var planCell = document.createElement("td");
  var badge = document.createElement("span");
  badge.className = "plan-badge " + plan.toLowerCase();
  badge.textContent = plan;
  planCell.appendChild(badge);

  row.appendChild(serialCell);
  row.appendChild(nameCell);
  row.appendChild(emailCell);
  row.appendChild(planCell);
  subBody.appendChild(row);

  subCount.textContent = serial;

  setTimeout(function () {
    row.classList.remove("new-row");
  }, 3000);
}

subForm.addEventListener("submit", function (event) {
  event.preventDefault();

  if (!checkSubscription()) {
    return;
  }

  var name = document.getElementById("subName").value.trim();
  var email = document.getElementById("subEmail").value.trim();
  var plan = document.getElementById("subPlan").value;
  var payment = document.getElementById("subPayment").value;

  addSubscriber(name, email, plan);
  showToast("Subscribed to the " + plan + " plan with " + payment + "!");
  this.reset();
});

document.getElementById("subName").addEventListener("input", function () {
  setSubError("subName", "subNameError", "");
});
document.getElementById("subEmail").addEventListener("input", function () {
  setSubError("subEmail", "subEmailError", "");
});
