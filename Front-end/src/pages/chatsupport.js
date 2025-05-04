// import React, { useState, useEffect } from "react";
// import { GiButterfly } from "react-icons/gi";
// import { BiUser } from 'react-icons/bi';
// import { useNavigate } from 'react-router-dom';
// import { Client } from "@gradio/client";


// async function predict(inputData) {
//     try {
//         const app = await Client.connect("https://74a5e73f99bf735ac3.gradio.live/");
//         const result = await app.predict("/predict", [		
// 				inputData, // string  in 'prediction_input' Textbox component
// 	]);
//     console.log(result.data);
//     return result.data;
//     } catch (error) {
//         console.error('Error:', error);
//         throw error;
//     }
// }

// const ChatSupport = () => {
//     const [message, setMessage] = useState('');
//     const [messages, setMessages] = useState([]);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const lastMessage = messages[messages.length - 1];
//         if (lastMessage && lastMessage.sender === 'user') {
//             predict(lastMessage.text)
//                 .then(response => {
//                     setMessages([...messages, { text: response, sender: 'bot' }]);
//                 })
//                 .catch(error => {
//                     console.error('Error predicting:', error);
//                 });
//         }
//     }, [messages]);

//     const handleMessageChange = (e) => {
//         setMessage(e.target.value);
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (message.trim() !== '') {
//             setMessages([...messages, { text: message, sender: 'user' }]);
//             setMessage('');
//         }
//     }

//     return (
//         <div className="chat" style={{ position: 'fixed', bottom: 0, width: '100%', padding: '10px' }}>
//             <div style={{ height: '60vh', overflowY: 'auto' }}>
//                 {messages.map((msg, index) => (
//                     <div key={index} style={{
//                         display: 'flex', alignItems: 'center', textAlign: msg.sender === 'user' ? 'left' : 'right', marginBottom: '5px',
//                         marginLeft: msg.sender === 'user' ? '5px' : 'auto', marginRight: msg.sender === 'user' ? 'auto' : '5px',
//                         color: 'white', borderRadius: '10px', padding: '8px', maxWidth: '300px', wordWrap: 'break-word',
//                         background: msg.sender === 'user' ? 'linear-gradient(to right, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))' : 'linear-gradient(to right, rgba(0, 102, 204, 0.7), rgba(51, 153, 255, 0.7))'
//                     }}>
//                         <div style={{ color: 'white', marginLeft: '8px', marginRight: '8px', display: 'inline-flex', alignItems: 'center' }}>
//                             {msg.sender === 'user' ? <BiUser size="18px" /> : <GiButterfly size="18px" />}
//                         </div>
//                         <div style={{ marginLeft: '8px', marginRight: '8px' }}>{msg.text}</div>
//                     </div>
//                 ))}
//             </div>
//             <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                 <input
//                     type="text"
//                     placeholder="Type a message..."
//                     value={message}
//                     onChange={handleMessageChange}
//                     style={{ color: 'white', fontWeight: '600', maxWidth: '600px' }}
//                 />
//                 <button
//                     type="submit"
//                     style={{
//                         marginLeft: '10px', backgroundColor: 'midnightblue', color: 'white',
//                         border: '1px solid white', padding: '8px 12px', borderRadius: '4px',
//                         display: 'flex', alignItems: 'center', justifyContent: 'center'
//                     }}>
//                     Send
//                     <div style={{ color: 'white', marginLeft: '8px' }}>
//                         <GiButterfly size="15px" />
//                     </div>
//                 </button>
//             </form>
//         </div>
//     );
// }

// export default ChatSupport;
