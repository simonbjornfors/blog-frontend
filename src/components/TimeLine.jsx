import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./TimeLine.css"

function BlogPosts() {
    const url = `https://nyazeeland-blog-backend.ey.r.appspot.com/api/posts?_sort=id:ASC&_limit=1&populate=media`;

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
  
    const fetchData = () => {
      fetch(url)
        .then((response) => response.json())
        .then((apiData) => {
          setPosts(apiData.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setError(true);
          setLoading(false);
        });
    };
  
    const [sortOrder, setSortOrder] = useState("ASC");

    const handleSort = (order) => {
      setSortOrder(order);
    }
    
    useEffect(() => {
      fetchData();
    }, [sortOrder]);

    // Sort the posts based on sortOrder
const sortedPosts = sortOrder === "ASC" ? posts.sort((a, b) => new Date(a.attributes.publishedAt) - new Date(b.attributes.publishedAt)) : posts.sort((a, b) => new Date(b.attributes.publishedAt) - new Date(a.attributes.publishedAt));
  
  return (
    <div>
            <button onClick={() => handleSort("ASC")}>Oldest to Newest</button>
    <button onClick={() => handleSort("DESC")}>Newest to Oldest</button>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>There was an error</div>
      ) : posts.length > 0 ? (
         posts.map((post, index) => {
            return (
                <div className='post blur' key={index}>
                    <img src={post.attributes.media.data[0].attributes.formats.medium.url} alt={post.attributes.media.data[0].attributes.alternativeText} />
                    <h2>{post.attributes.title}</h2>
                    <p>{post.attributes.body}</p>
                </div>
            );
        })
      ) : (
        <div>There are no posts to display</div>
      )}
    </div>
  );
}
export default BlogPosts;
