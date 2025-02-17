const fetchCareers = async () => {
  try {
    const response = await fetch("http://localhost:3000/career", {
      method: "GET",
    });

    const data = await response.json();
    const careerData = data.data;
    displayCareers(careerData); // Updated function name
    attachEventListeners(); // Attach event listeners after displaying the careers
  } catch (error) {
    console.error(error.message);
  }
};

const displayCareers = (careerData) => {
  const careerContainer = document.getElementById("career-container");

  // Clear existing careers
  careerContainer.innerHTML = "";

  careerData.forEach((career) => {
    const careerElement = document.createElement("div");
    careerElement.classList.add("card", "fundraise-item");
    const imageUrl = career.images || "images/default.jpg";

    careerElement.innerHTML = `
      <img class="card-img-top" src="${imageUrl}" alt="Image placeholder">
      <div class="card-body">
        <h3>${career.title}</h3>
        <p>Location: ${career.location}</p>
        <p>Experience: ${career.experience}</p>
        <p>Skills: ${career.skills}</p>
          <button class="btn btn-success apply-btn" data-job="${career.title}"> Apply Now </button>
      </div>
    `;

    careerContainer.appendChild(careerElement);
  });

  // Reinitialize the carousel after adding new cards
  $(".nonloop-block-11").owlCarousel("destroy"); // Destroy existing carousel
  $(".nonloop-block-11").owlCarousel({
    loop: false,
    margin: 30,
    nav: true,
    items: 3,
    navText: [
      "<span class='ion-md-arrow-back'></span>",
      "<span class='ion-md-arrow-forward'></span>",
    ], // Custom nav buttons
    responsive: {
      0: {
        items: 1,
        nav: false,
      },
      600: {
        items: 2,
        nav: false,
      },
      1000: {
        items: 3,
        nav: true,
        loop: false,
      },
    },
  });
};

const attachEventListeners = () => {
  document.querySelectorAll(".apply-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const job = button.getAttribute("data-job");
      document.getElementById("job").value = job;
      document
        .getElementById("application-form")
        .scrollIntoView({ behavior: "smooth" }); // Updated to correct ID
    });
  });
};

// Fetch careers when the page loads
document.addEventListener("DOMContentLoaded", fetchCareers);
