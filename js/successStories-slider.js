let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function showSlide(index) {
  // Adjust index if out of bounds
  if (index >= totalSlides) {
    slideIndex = 0;
  } else if (index < 0) {
    slideIndex = totalSlides - 1;
  } else {
    slideIndex = index;
  }

  // Move the slider
  document.querySelector('.slider').style.transform = `translateX(${-slideIndex * 100}%)`;
}

// Initialize the first slide
showSlide(slideIndex);

// Auto-slide every 30 seconds
let autoSlideInterval = setInterval(() => {
  showSlide(slideIndex + 1);
}, 10000);

// Next and Previous Button Event Listeners
document.querySelector('.next').addEventListener('click', function() {
  clearInterval(autoSlideInterval);
  showSlide(slideIndex + 1);
  // Restart the auto-slide
  autoSlideInterval = setInterval(() => {
    showSlide(slideIndex + 1);
  }, 10000);
});

document.querySelector('.prev').addEventListener('click', function() {
  clearInterval(autoSlideInterval);
  showSlide(slideIndex - 1);
  // Restart the auto-slide
  autoSlideInterval = setInterval(() => {
    showSlide(slideIndex + 1);
  }, 10000);
});


