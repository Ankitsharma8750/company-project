// Function to set the amount in the input field
function setAmount(amount) {
  document.getElementById('amount').value = amount;
}

document.getElementById("payment-method")
  .addEventListener("change", function () {
    const paymentMethods = document.querySelectorAll(".payment-details");
    paymentMethods.forEach((method) => (method.style.display = "none"));
    const selectedMethod = document.getElementById(this.value + "-details");
    if (selectedMethod) {
      selectedMethod.style.display = "block";
    }
  });
