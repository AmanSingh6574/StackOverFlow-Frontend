import { useEffect, useRef, useState } from "react";
import "./Chatbot.css";
import { Configuration, OpenAIApi } from "openai";
import { FiChevronDown } from "react-icons/fi";
import { IoSend } from "react-icons/io5";
import Logo from "../../assets/icon.png";

// console.log("All environment variables:", process.env);

const Chatbot = ({ setBotIsOpen }) => {

  const [chats, setChats] = useState([
    {
      id: 212,
      text: "Hi, what would you like to ask?",
      sender: "robot",
    },
  ]);
  const [input, setInput] = useState('');
  const boxRef = useRef(0);
  const [typing, setTyping] = useState(false);
  const KEY = process.env.REACT_APP_OPENAI_API;
  // console.log("API Key:", KEY);

  const configuration = new Configuration({
    apiKey: KEY,
  });
  const openai = new OpenAIApi(configuration);

  useEffect(() => {
    boxRef.current.scrollTo(-20, 10000000000);
  }, [chats]);

  const sendMessage = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: input }),
      });
      const data = await response.json();
      // console.log(data.message)
      setTyping(data.message);
  };
  return (
    <div className="chatbot-outer">
      <div className="chatbox-container">
        <div className="header">
          <div className="left-header">
            <div className="stack-logo">
              <img src={Logo} alt="" />
            </div>
            <span className="header-title">Stack-Bot</span>
          </div>
          <button onClick={() => setBotIsOpen(false)}>
            <FiChevronDown />
          </button>
        </div>
        <div className="chats-box" ref={boxRef}>
          {chats?.map((chat) => {
            return (
              <div className={chat.sender} key={chat.id}>
                <span>{chat.text}</span>
              </div>
            );
          })}
          {typing && <span className="typing">{typing}</span>}
        </div>
        <form onSubmit={sendMessage}>
          <div className="footer">
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              required
            />
            <button type="submit">
              <IoSend />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;