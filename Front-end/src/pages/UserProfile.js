import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from '../App'
import { useParams } from 'react-router-dom'


const Profile = () => {
  const [userProfile, setProfile] = useState({ user: {}, posts: [] });
  const [showFollow, setshowFollow] = useState(true)
  const [selectedImg, setSelectedImg] = useState(null);

  const { state, dispatch } = useContext(UserContext)
  const { userid } = useParams()

  // useEffect(() => {
  //   fetch(`/user/${userid}`, {
  //     headers: {
  //       "Authorization": "Bearer " + localStorage.getItem("jwt")
  //     }
  //   }).then(res => res.json())
  //     .then(result => {
  //       console.log(result)
  //       setProfile(result)
  //     })
  // }, [])


  useEffect(() => {
    fetch(`/user/${userid}`, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    })
      .then(res => res.json())
      .then(result => {
        setProfile(result);
      });
  }, [userid]); // ✅ Added `userid` as dependency
  
  console.log("User Profile is: ", userProfile)





  const followUser = () => {
    fetch('/follow', {
      method: "put",
      headers:
      {
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        followID: userid
      })
    }).then((res) => res.json())
      .then((result) => {
        dispatch({ type: "UPDATE", payload: { following: result.following, followers: result.followers } })
        console.log(result); // Log the result to see what the server is returning
        localStorage.setItem("user", JSON.stringify(result))
        setProfile(prevState => {
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: [...prevState.user.followers, result._id]

            }

          }
        })
      })
    setshowFollow(false)
  }





  const unfollowUser = () => {
    fetch('/unfollow', {
      method: "put",
      headers:
      {
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        unfollowID: userid
      })
    }).then((res) => res.json())
      .then((result) => {
        dispatch({ type: "UPDATE", payload: { following: result.following, followers: result.followers } })
        console.log(result); // Log the result to see what the server is returning
        localStorage.setItem("user", JSON.stringify(result))

        setProfile(prevState => {
          const newfollower = prevState.user.followers.filter(item => item !== result._id)
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: newfollower

            }
          }
        })
      })
    setshowFollow(true)
  }





  return (
  <>
    {userProfile ? (
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px" }}>
        <div style={{
          display: "flex",
          gap: "30px",
          padding: "20px",
          alignItems: "center",
          borderBottom: "1px solid #ccc"
        }}>
          <img
            style={{ width: "130px", height: "130px", borderRadius: "50%", objectFit: "cover" }}
            src="https://storage.ko-fi.com/cdn/useruploads/post/cb0018c0-22bd-4618-9d2f-ebf4208ab71c_fbphotoicon.png"
            alt="profile"
          />

          <div>
            <h2 style={{ color: '#2c3e50', marginBottom: "8px" }}>{userProfile.user.username}</h2>
            <div style={{ display: "flex", gap: "20px", marginBottom: "10px" }}>
              <span><strong>{userProfile.posts.length}</strong> posts</span>
              <span><strong>{userProfile.user.followers?.length || 0}</strong> followers</span>
              <span><strong>{userProfile.user.following?.length || 0}</strong> following</span>
            </div>

            {
              showFollow ? (
                <button onClick={followUser} className="btn" style={{ background: "#2980b9", color: "white" }}>Follow</button>
              ) : (
                <button onClick={unfollowUser} className="btn" style={{ background: "#c0392b", color: "white" }}>Unfollow</button>
              )
            }
          </div>
        </div>

        {/* Gallery */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
          {userProfile.posts.map((item, index) => (
            <img
              key={index}
              src={item.imageUrl}
              alt="Post"
              onClick={() => setSelectedImg(item.imageUrl)}
              style={{ width: '250px', height: '250px', objectFit: 'cover', cursor: 'pointer', borderRadius: '8px' }}
            />
          ))}
        </div>

        {/* Modal */}
        {selectedImg && (
          <div
            onClick={() => setSelectedImg(null)}
            style={{
              position: "fixed",
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: "rgba(0,0,0,0.8)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 9999
            }}
          >
            <img src={selectedImg} style={{ maxHeight: "90vh", maxWidth: "90vw", borderRadius: "10px" }} />
          </div>
        )}
      </div>
    ) : (
      <h2 style={{ textAlign: "center" }}>Loading profile...</h2>
    )}
  </>

  );
  
}


export default Profile
