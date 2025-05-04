import React, { useState, useEffect } from 'react';
import M from 'materialize-css';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const createPost = async (post) => {
      try {
        const response = await fetch('/createpost', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('jwt'),
          },
          body: JSON.stringify({
            caption: post.caption,
            imageUrl: post.url,
          }),
        });

        const data = await response.json();

        if (data.error) {
          M.toast({ html: data.error, classes: 'rounded N/A transparent' });
        } else {
          M.toast({ html: 'Post created successfully', classes: 'rounded N/A transparent' });
          navigate('/')
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (posts.length > 0) {
      createPost(posts[0]);
      setPosts((prevPosts) => prevPosts.slice(1)); // Remove the processed post
    }
  }, [posts]);

  const postImage = () => {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'instaClone');
    data.append('cloud_name', 'umamahhussain');

    fetch('https://api.cloudinary.com/v1_1/umamahhussain/upload', {
      method: 'post',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setPosts((prevPosts) => [...prevPosts, { caption, url: data.url }]);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  return (
    <div className='createpost' style={{
      background: ' rgb(189, 195, 199)',
      background: 'radial-gradient(circle, rgba(189, 195, 199, 1) 0%, rgba(44, 62, 80, 1) 100%)', height: '89vh', display: 'flex', justifyContent: 'center', alignItems: 'center'
    }}>
      <div className="card input-filed" style={{ margin: '10px auto', width: '500px', textAlign: 'center', padding: '30px' }}>
        <input
          type="text"
          placeholder="Caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <form action="#">
          <div className="file-field input-field">
            <div className="btn" style={{ backgroundColor: 'midnightblue' }}>
              <span>File</span>
              <input type="file" onChange={(e) => setImage(e.target.files[0])} />
            </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" />
            </div>
          </div>
          <button
            className="btn waves-effect"
            style={{ backgroundColor: 'midnightblue', color: 'white' }}
            type="button" // Change the type to button
            name="action"
            onClick={() => postImage()}
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );

};

export default CreatePost;
