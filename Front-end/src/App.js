import './App.css';
import NavBar from './components/Navbar'
import React,{useEffect,createContext,useReducer,useContext} from 'react'
import { BrowserRouter, Route, Routes,useNavigate } from 'react-router-dom';
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import Profile from './pages/Profile.js';
import Signup from './pages/Signup.js';
import CreatePost from './pages/Createpost.js';
import UserProfile from './pages/UserProfile.js';
import FollowedPosts from './pages/followeduser.js'
import ChatSupport from './pages/chatsupport.js';
import {reducer,initialState} from '../src/reducer/UserReducer.js'

export const UserContext=createContext()


const Routing=()=>
{
  const navigate=useNavigate();
  const {state,dispatch}=useContext(UserContext)
  

  useEffect(()=>{
    const user= JSON.parse(localStorage.getItem("user"))

    if(user)
    {
      dispatch({type:"USER",payload:user})   
    }
    else
    {
      navigate('/login')
    }

  },[])

  return(
    <Routes>
  <Route path="/" element={<NavBar />}>
    <Route index element={<Home />} />
    <Route path="signup" element={<Signup />} />
    <Route path="login" element={<Login />} />
    <Route path="createpost" element={<CreatePost />} />
    <Route path="profile/:userid" element={<UserProfile />} />
    <Route path="profile" element={<Profile />} />
    <Route path="chatsupport" element={<ChatSupport />} />
    <Route path="followedposts" element={<FollowedPosts />} />
  </Route>
</Routes>

  )
}

function App() {
  const [state,dispatch]=useReducer(reducer,initialState);

  return (
    <UserContext.Provider value={{state,dispatch}} >

      <BrowserRouter>
        <Routing/>
      </BrowserRouter>
    </UserContext.Provider>
  
  );
}

export default App;
