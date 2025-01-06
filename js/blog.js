
// STRAPI_API_TOKEN = 639e6cd8002114b9e3488837016e0824e392280263179baa06a5d57de70fde6ffd074e8dbfa4920d703e20e9c961e6d7963a38404732d50d0fbb9ece8cec4427d2946ac4d376f068acefca4f9f2a259070e3935aea4156a0dd488070cae17158d2119aea3982b7eb0dda73466b27657a49b8decbd1704a29c0f3512fbfc7081f

async function fetchBlogPosts() {
    const response = await fetch(
        `http://localhost:1337/api/blogs?populate=*`
    );
   const data = await response.json();
   const posts = data.data; // Strapi API response structure
   console.log(posts);
   const blogContainer = document.getElementById("blog-container");
   blogContainer.innerHTML = ""; // Clear existing content
   posts.forEach((post) => {
     const postElement = document.createElement("div");
     postElement.classList.add(
       "col-12",
       "col-sm-6",
       "col-md-6",
       "col-lg-4",
       "mb-4",
       "mb-lg-0"
     );
     postElement.innerHTML = ` <div class="post-entry">
               <a href="blog-single.html?id=${post.slug}" class="mb-3 img-wrap"> 
                <img src="${
                    "http://localhost:1337"+ post.images.formats.medium.url
                }" alt="Image placeholder" class="img-fluid" /> </a>
               <h3><a href="blog-single.html">${post.title}</a></h3>
                <span class="date mb-4 d-block text-muted">${new Date(
                  post.publishedAt
                ).toLocaleDateString()}</span> <p>${post.description.substring(
       0,
       100
     )}...</p> <p><a href="blog-single.html" class="link-underline">Read More</a></p> </div> `;
     blogContainer.appendChild(postElement);
   });
 }
 fetchBlogPosts();
