import React from "react";
import {createRef, useState} from "react";
import "./style.css";
import { send } from "./chatSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from '../../store/index';


export default function Chat() {
  const dispatch = useDispatch();
  const chatBoxRef = createRef<HTMLDivElement>();
  const [messageBox, setMessageBox] = useState<boolean>(false);
  const [message, setMessage] = useState("");
  const [typing, setTyping] = useState<boolean>(false);
  const date:string = new Date().toLocaleString();
  let allMsg = [];
  allMsg = useSelector((state: RootState) => state.chat.messages);
  console.log("chat....>", allMsg);

  function sendMessage(){
    if(message === ""){}
    else{
        dispatch(send({ message, type: "send", date }))
    }
  }


  return (
    <>
      {!messageBox ? (
        <button className="open-button" onClick={() => setMessageBox(true)}>
          Open Chat Box
        </button>
      ) : (
        <div className="chat">
          <div className="chat-head">
            <h6 className="heading">Open Chat Box</h6>
            <button
              className="chat-head-close"
              onClick={() => setMessageBox(false)}
            >
              X
            </button>
          </div>
          <div className="chat-body" ref={chatBoxRef}>
            <div className="chat-body-receive">Ask anything?<span className="chat-body-date">{date}</span></div>
            {
            allMsg.length !== 0 ?
            allMsg.map((msg, key) => {
              return(
                <div key={key} className={msg.type === "send" ? `chat-body-send` : `chat-body-receive`}>{msg.message}<span className="chat-body-date">{msg.date}</span></div>
              ) 
              
            }) : (
                <>
                <button className="chat-body-common-message" onClick={() => dispatch(send({ message : "who are you?", date }))}>who are you?</button>
                <button className="chat-body-common-message" onClick={() => dispatch(send({ message : "what you can do?", date }))}>what you can do?</button>
                </>
            )
            }
            {/* <div className="chat-body-send">SSS</div> */}
          </div>
          <div className="chat-footer">
            <input
              className="chat-footer-type"
              onChange={(e) => {setMessage(e.target.value); setTyping(true)}}
              placeholder="type"
            />
            <button
              className="chat-footer-button"
              onClick={() => sendMessage()}
              // onKeyDown={() => sendMessage()}
            >
              send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
