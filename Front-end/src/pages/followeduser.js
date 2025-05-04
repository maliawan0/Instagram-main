import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../App'
import {Link} from 'react-router-dom'

function Home() {
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(UserContext)

  useEffect(() => {
    fetch('/followedposts', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result); // Log the result to see what the server is returning
        setData(result.posts);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array ensures the effect runs only once on mount


  const likePost = (id) => {
    fetch('/like',
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: 'Bearer ' + localStorage.getItem("jwt")
        },
        body: JSON.stringify({
          postId: id
        })
      }).then(res => res.json())
      .then(result => {
        const updatedData = data.map(item => {
          if (item._id == result._id) {
            return result
          }
          else {
            return item
          }
        })
        setData(updatedData)
      })
  }


  const unlikePost = (id) => {
    fetch('/unlike',
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: 'Bearer ' + localStorage.getItem("jwt")
        },
        body: JSON.stringify({
          postId: id
        })
      }).then(res => res.json())
      .then(result => {
        const updatedData = data.map(item => {
          if (item._id == result._id) {
            return result
          }
          else {
            return item
          }
        })
        setData(updatedData)
      })
  }

  const makeComment = (text, postId) => {
    fetch('/comment',
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: 'Bearer ' + localStorage.getItem("jwt")
        },
        body: JSON.stringify({
          text: text,
          postId: postId
        })
      }).then(res => res.json())
      .then(result => {
        const updatedData = data.map(item => {
          if (item._id == result._id) {
            return result
          }
          else {
            return item
          }
        })
        setData(updatedData)
      })
  }


  const deletePost = (postId) => {
    // Optimistically update the UI
    const newData = data.filter(item => item._id !== postId);
    setData(newData);
  
    fetch('/deletepost/' + postId, {
      method: "delete",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt")
      }
    })
      .then(res => res.json())
      .then(result => {
        console.log(result);
        // Update the state only if the operation was successful
      })
      .catch(err => {
        console.log(err);
        // Revert the state if there was an error
        setData(data);
      });
  };
  



  return (
    <div className='home'>
      {data.map((item) => (
        <div className='card' key={item._id}>
          <div className='home-card'>
            <h5><Link to={item.PostedBy._id!==state._id?
            "/profile/"+item.PostedBy._id:"/profile"}>
              {item.PostedBy.username}</Link>
             {item.PostedBy._id==state._id &&
            <i
            className='material-icons'
            style={{ color: 'midnightblue', float:"right"}} onClick={()=>deletePost(item._id)} >
                      delete_forever
                    </i>
                    }
            </h5>

            <div className='card-image'>
              <img src={item.imageUrl} alt='Post' />
            </div>
            <div className='card-content'>


              {item.likes.includes(state._id) ?
                (
                  <>
                    <i
                      className='material-icons'
                      style={{ color: 'midnightblue' }} >
                      favorite_border
                    </i>
                    <i
                      className='material-icons'
                      onClick={() => unlikePost(item._id)}
                      style={{ color: 'midnightblue' }} >
                      thumb_down
                    </i>


                  </>
                ) : (
                  <>
                    <i
                      className='material-icons'
                      onClick={() => likePost(item._id)}
                      style={{ color: 'midnightblue' }} >
                      thumb_up
                    </i>

                    <i
                      className='material-icons'
                      style={{ color: 'midnightblue' }} >
                      favorite
                    </i>
                  </>
                )}

              <h6>{item.likes.length} likes</h6>
              <h6>{item.caption}</h6>

              {
                item.comments.map(record=>
                  {
                    return(
                      <h6 ><span style={{fontWeight:"500"}}>
                        {record.PostedBy.username}: 
                        </span>
                         {record.text}
                      </h6>
                    )
                  })
              }

              <form onSubmit={(e) => {
                e.preventDefault()
                makeComment(e.target[0].value, item._id)
              }}>

                <input type='text' placeholder='Add a comment' />
              </form>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
