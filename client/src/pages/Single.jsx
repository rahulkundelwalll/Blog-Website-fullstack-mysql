import React, { useContext, useEffect, useState } from 'react'
import Edit from '../img/edit.png'
import Delete from '../img/delete.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Menu from '../components/Menu'
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../context/authContext";



export default function single() {
  const [post, setPost] = useState({});

  const location = useLocation()
  const navigate = useNavigate();

  
  const postId = location.pathname.split("/")[2];
  // console.log(post)
  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/posts/${postId}`);
        setPost(res.data);
      }
      catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [postId]);


  const handleDelete = async ()=>{
    try {
      await axios.delete(`http://localhost:8800/api/posts/${postId}`);
      navigate("/")
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <div className='single'>
      <div className="content">
      <img src={`../upload/${post?.img}`} alt="" />
        <div className="user">
        {post.userImg && <img
            src={post.userImg}
            alt=""
          />}
          <div className="info">
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser.username === post.username &&
         ( <div className="edit">
            <Link to={'/write?edit=2'}>
              <img src={Edit} alt="" />
            </Link>

            <img onClick={handleDelete} src={Delete} alt="" />
          </div>)}
        </div>
        <h1>{post.title}</h1>
        {post.desc}

      </div>
      <Menu cat={post.cat} />
    </div>
  )
}