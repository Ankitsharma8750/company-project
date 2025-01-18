import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";
import { marked } from "marked";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/posts", async (req, res) => {
  try {
    const response = await axios.get(
      `${process.env.STRAPI_API_URL}/api/blogs?populate=*`,
      {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
      }
    );

    const modifiedData = response.data.data.map((post) => {
      // Access the first image in the images array
      const imageUrl =
        post.images?.length > 0 ? post.images[0].formats?.medium?.url : null;
      return {
        id: post.id,
        documentId: post.documentId,
        title: post.title,
        content: post.content,
        publishDate: post.date,
        images: imageUrl ? `${process.env.STRAPI_API_URL}${imageUrl}` : null,
        descriptionHtml: marked(post.description || ""),
        views: post.views,
      };
    });

    res.json({ data: modifiedData });
  } catch (error) {
    console.error(
      "Error fetching posts: ",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.get("/posts/:id", async (req, res) => {
  const postId = req.params.id;
  try {
    const response = await axios.get(
      `${process.env.STRAPI_API_URL}/api/blogs/${postId}?populate=*`,
      { headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` } }
    );
    const post = response.data.data;

    // Access the first image in the images array
    const imageUrl =
      post.images?.length > 0 ? post.images[0].formats?.medium?.url : null;
    post.images = imageUrl ? `${process.env.STRAPI_API_URL}${imageUrl}` : null;
    post.descriptionHtml = marked(post.description || "");

    res.json({ data: post });
  } catch (error) {
    console.error(
      "Error fetching post: ",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.get("/images", async (req, res) => {
  const imagePath = req.query.path;
  try {
    const response = await axios.get(
      `${process.env.STRAPI_API_URL}${imagePath}`,
      {
        responseType: "stream",
        headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` },
      }
    );
    response.data.pipe(res);
  } catch (error) {
    console.error(
      "Error fetching image: ",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.post("/posts/:id/view", async (req, res) => {
  const postId = req.params.id;
  try {
    console.log(`Incrementing views for post ID: ${postId}`);
    const response = await axios.get(
      `${process.env.STRAPI_API_URL}/api/blogs/${postId}`,
      { headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` } }
    );
    const post = response.data.data;
    const currentViews = post.views || 0;
    const updatedViews = currentViews + 1;
    console.log(
      `Current views: ${currentViews}, Updated views: ${updatedViews}`
    );
    await axios.put(
      `${process.env.STRAPI_API_URL}/api/blogs/${postId}`,
      { data: { views: updatedViews } },
      { headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` } }
    );
    res.json({ views: updatedViews });
  } catch (error) {
    console.error(
      "Error updating views: ",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ error: "Something went wrong" });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
