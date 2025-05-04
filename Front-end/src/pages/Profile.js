import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../App';
import '../Profile.css';

function Profile() {
  const [posts, setPosts] = useState([]);
  const [selectedImg, setSelectedImg] = useState(null);
  const { state } = useContext(UserContext);

  useEffect(() => {
    fetch('/myposts', {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then(res => res.json())
      .then((result) => {
        setPosts(result.mypost);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <>
      <div className="profile-container">
        {/* Profile Header */}
        <div className="profile-header">
          <img
            src="https://storage.ko-fi.com/cdn/useruploads/post/cb0018c0-22bd-4618-9d2f-ebf4208ab71c_fbphotoicon.png"
            alt="profile"
          />
          <div>
            <h2>{state ? state.username : 'Refreshing...'}</h2>
            <div className="profile-stats">
              <span><strong>{posts.length}</strong> posts</span>
              <span><strong>{state?.followers?.length || 0}</strong> followers</span>
              <span><strong>{state?.following?.length || 0}</strong> following</span>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="profile-gallery">
          {posts.map((item, index) => (
            <img
              key={index}
              src={item.imageUrl}
              alt=""
              onClick={() => setSelectedImg(item.imageUrl)}
            />
          ))}
        </div>

        {/* Modal for Full Image */}
        {selectedImg && (
          <div className="modal-overlay" onClick={() => setSelectedImg(null)}>
            <img src={selectedImg} alt="" />
          </div>
        )}
      </div>
    </>
  );

  
}

export default Profile;
