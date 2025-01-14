const fetchBlogs = async () => {
  try {
    const response = await fetch("http://localhost:3000/posts", {
      method: "GET",
    });

    if (response.ok) {
      console.log(`Authentication Successful: ${response.status}`);
    } else {
      throw new Error(`Authentication Failed: ${response.status}`);
    }

    const data = await response.json();
    const blogData = data.data;
    displayFetchBlogs(blogData);
  } catch (error) {
    console.error(error.message);
  }
};

const displayFetchBlogs = (postData) => {
  const blogContainer = document.getElementById("blog-container");
  blogContainer.innerHTML = ""; // Clear existing posts
  postData.forEach((post) => {
    const imageUrl = post.images || "images/default.jpg";     
    const postElement = document.createElement("div");
    postElement.className = "col-12 col-sm-6 col-md-6 col-lg-4 mb-4 mb-lg-0";
    postElement.innerHTML = `
        <div class="post-entry">
          <a href="blog-single.html?id=${post.documentId}" class="mb-3 img-wrap">
            <img src="${imageUrl}" alt="blog_image" class="img-fluid" />
          </a>
          <h3><a href="blog-single.html?id=${post.documentId}">${post.title}</a></h3>
          <span class="date mb-4 d-block text-muted">${new Date(post.publishDate).toLocaleDateString()}</span>
          <p>${post.descriptionHtml.substring(0, 100)}...</p>
          <p><a href="blog-single.html?id=${post.documentId}" class="link-underline">Read More</a></p>
        </div>
      `;

    blogContainer.appendChild(postElement);
  });
};

fetchBlogs();

