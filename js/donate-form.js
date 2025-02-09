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



  // FUNDRAISER SLIDER

let currentIndex = 0;

function moveSlider(step) {
  const slider = document.querySelector('.fundraiser-slider');
  const totalSlides = slider.children[0].children.length;
  currentIndex += step;

  if (currentIndex < 0) {
    currentIndex = totalSlides - 1;
  } else if (currentIndex >= totalSlides) {
    currentIndex = 0;
  }

  const slideWidth = slider.children[0].children[0].offsetWidth + 20; // Card width + gap
  const offset = currentIndex * slideWidth;

  slider.style.transform = `translateX(-${offset}px)`;
}

  
//SELECT TYPE FUNDRAISERS

document.querySelectorAll('.donate-btn').forEach(button => {
  button.addEventListener('click', () => {
    const fund = button.getAttribute('data-fundraiser');
    document.getElementById('fund').value = fund;
    document.getElementById('donate-form').scrollIntoView({ behavior: 'smooth' });
  });
});
