document
  .getElementById("payment-method")
  .addEventListener("change", function () {
    const paymentMethods = document.querySelectorAll(".payment-details");
    paymentMethods.forEach((method) => (method.style.display = "none"));
    const selectedMethod = document.getElementById(this.value + "-details");
    if (selectedMethod) {
      selectedMethod.style.display = "block";
    }
  });
