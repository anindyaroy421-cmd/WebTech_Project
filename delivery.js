document.getElementById("delivery-form").addEventListener("submit",
function(event) {

    let isValid = true;

    // Clear previous errors
    document.getElementById("nameError").textContent = "";
    document.getElementById("phoneError").textContent = "";
    document.getElementById("vehicleError").textContent = "";
    document.getElementById("cityError").textContent = "";

    // 1. Name Check
    let name = document.getElementById("name").value.trim();

    if (name === "") {
        document.getElementById("nameError").textContent =
        "Name is required.";

        isValid = false;
    }

    // 2. Phone Check
    let phone = document.getElementById("Phone").value.trim();

    if (phone === "") {
        document.getElementById("phoneError").textContent =
        "Phone number required.";
        isValid = false;
    }
    else if (phone.length !== 11) {
        document.getElementById("phoneError").textContent =
        "Phone number must be 11 digits.";
        isValid = false;
    }

    // 3. Vehicle Check
    let vehicle = document.getElementById("vehicle").value;

    if (vehicle === "") {
        document.getElementById("vehicleError").textContent =
        "Vehicle name required.";

        isValid = false;
    }

    // 4. City Check
    let city = document.getElementById("address").value.trim();

    if (city === "") {
        document.getElementById("cityError").textContent =
        "City is required.";

        isValid = false;
    }

    // Stop submission if invalid
    if (!isValid) {
        event.preventDefault();
    }

});