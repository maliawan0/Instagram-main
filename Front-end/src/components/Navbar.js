import React, { useContext,useRef,useEffect,useState } from 'react'
import { Outlet, Link,useNavigate } from "react-router-dom";
import { UserContext } from '../App.js'
import M from 'materialize-css'


const NavBar = () => {

  const navigate=useNavigate();
  const [userDetails,setUserDetails] = useState([])
  const { state, dispatch } = useContext(UserContext)
  const searchModal=useRef(null);
  const [search,setSearch]=useState('')

  useEffect(()=>
    {
        M.Modal.init(searchModal.current)
    },[])

  const renderList = () => {
    if (state) {
      return[
      <li>
        <Link to="/profile" style={{color: "midnightblue",fontWeight:'450'}}>Profile</Link>
      </li>,
       <li>
       <Link to="/createpost" style={{color: "midnightblue",fontWeight:'450'}}>Create Post</Link>
     </li>,
       <li>
       <Link to="/followedposts" style={{color: "midnightblue",fontWeight:'450'}}>Following Posts</Link>
     </li>,
     <li>
     <Link to="/chatsupport" style={{color: "midnightblue",fontWeight:'450'}}>Chat Support</Link>
   </li>,
     
     <li>
     <button Link to="/search" data-target="modal1" class="btn modal-trigger" 
     style={{ backgroundColor: "midnightblue", color: "white",margin:"4px" }}>Search
     </button>
     
   </li>,
      <li>
        <button className="btn" style={{ backgroundColor: "midnightblue", color: "white",margin:"4px" }}
           type="submit" name="action" 
           onClick={()=>
           {
            localStorage.clear();
            dispatch({type:"CLEAR"})
            navigate('/login')
           }}>
            Log Out</button>
      </li>
     
      ]

    }
    else {
      return[
        <li >
        <Link to="/login" style={{color: "midnightblue"}}  >Login</Link>
      </li>,
      
      <li >
        <Link to="/signup" style={{color: "midnightblue"}}>Signup</Link>
      </li>
      
      ]

    }
  }



  const fetchUsers = (query)=>{
    setSearch(query)
    fetch('/search',{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        query
      })
    }).then(res=>res.json())
    .then(results=>{
      // console.log(results)
      setUserDetails(results.user)
    })
 }


  return (
    <div className="navbar">
      <nav>
        <div className="nav-wrapper white">
          <Link to={state?"/":"/login"} className="brand-logo" style={{color:"midnightblue"}}>Instagram</Link>
          <ul className="right hide-on-med-and-down">
            {renderList()}
          </ul>
        </div>
      </nav>

      <div id="modal1" className="modal" ref={searchModal}>
    <div className="modal-content">
      <input type="text" placeholder='Search Users' value={search} 
      onChange={(e)=>fetchUsers(e.target.value)} />

<ul className="collection">
  {userDetails.map(item => (
    <li
      key={item._id}
      className="collection-item"
      style={{color: "midnightblue" }}
    >
      <Link
        to={item._id !== state._id ? "/profile/" + item._id : '/'}
        onClick={() => {
          M.Modal.getInstance(searchModal.current).close();
          setSearch('');
        }}
      >
        {item.username}
      </Link>
    </li>
  ))}
</ul>
      
    </div>
    <div className="modal-footer">
      <button className="modal-close waves-effect waves-green btn-flat" onClick={()=>setSearch('')}>close</button>
    </div>
  </div>
          
  <Outlet />
    </div>
  )
}

export default NavBar;
