const fetchPost = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    try {
      const response = await fetch(`http://localhost:3000/posts/${postId}`, {
        method: 'GET'
      });
  
      if (response.ok) {
        console.log(`Fetch Successful: ${response.status}`);
      } else {
        throw new Error(`Fetch Failed: ${response.status}`);
      }
      const data = await response.json();
      const post = data.data;
      console.log(post);
      
      displayPost(post);
    } catch (error) {
      console.error(error.message);
    }
  };
  
  const displayPost = (post) => {
    const blockContainer  =document.getElementById('blockContainer')
    const postContainer = document.getElementById('blog');
    const imageUrl = post.images || 'images/default.jpg'; // Use a default image URL if undefined
    
    postContainer.innerHTML = `
      <div class="container">
        <div class="row">
          <div class="col-md-8">
          <h2 class="mb-3 mt-5">${post.title}</h2>
          <p class="mb-4">
          <img src="${imageUrl}" alt="${post.title}" class="img-fluid" />
          </p>
         <span class="date mb-4 d-block text-muted">${new Date(post.date).toLocaleDateString()}</span>
            <p>${post.descriptionHtml}</p>
          </div>
        </div>
      </div>
    `;

    blockContainer.innerHTML = `
       <div
          class="block-30 block-30-sm item"
          style="background-image: url(${imageUrl})"
          data-stellar-background-ratio="0.5"
        >
          <div class="container">
            <div
              class="row align-items-center justify-content-center text-center"
            >
              <div class="col-md-12">
                <span class="text-white text-uppercase">${post.date}</span>
                <h2 class="heading mb-5">
                  ${post.title}
                </h2>
              </div>
            </div>
          </div>
        </div>
      `
  };
  
  fetchPost();
  