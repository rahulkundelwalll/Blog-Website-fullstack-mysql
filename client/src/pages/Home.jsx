import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from "axios";
axios.defaults.withCredentials = true;

export default function Home() {
  const [posts, setPosts] = useState([]);

  const cat = useLocation().search;

  const getText = (html, wordCount) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    const textContent = doc.body.textContent;
    const words = textContent.split(' ');
    const truncatedText = words.slice(0, wordCount).join(' ');
    return truncatedText + (words.length > wordCount ? '...' : '');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('process.env.LINK'+`/api/posts/${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  return (
    <div className='home'>
      <div className="posts">
        {posts.map((post) => (
          <div className='post' key={post.id}>
            <div className='img'>
              <img src={`../upload/${post.img}`} alt="" />
            </div>
            <div className="content">
              <Link className='link' to={`/post/${post.id}`}>
                <h1>{post.title}</h1>
              </Link>
              <p>{getText(post.desc, 100)}</p>
              <button>Read More</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
