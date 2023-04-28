import React from "react";
import { useRef, createRef, useState, useEffect } from "react";
import "./style.css";
import { send, MessageInterface } from "./chatSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from '../../store/index';


export default function Reply() {
  const dispatch = useDispatch();
  const chatBoxRef = createRef<HTMLDivElement>();
  const [messageBox, setMessageBox] = useState<boolean>(false);
  const [message, setMessage] = useState("");
  const date:string = new Date().toLocaleString();
  let allMsg = [];
  allMsg = useSelector((state: RootState) => state.chat.messages);
  console.log("chat....>", allMsg);

  function sendMessage(){
    if(message == ""){}
    else{
        dispatch(send({ message, type: "received", date }))
    }
  }


  return (
    <>
      {!messageBox ? (
        <button className="open-button ob2" onClick={() => setMessageBox(true)}>
          Reply Box
        </button>
      ) : (
        <div className="chat c2">
          <div className="chat-head c2">
            <h6 className="heading">Reply Box</h6>
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
                <div key={key} className={msg.type == "send" ? `chat-body-send` : `chat-body-receive`}>{msg.message}<span className="chat-body-date">{msg.date}</span></div>
              )               
            }) : null
            }
            {/* <div className="chat-body-send">SSS</div> */}
          </div>
          <div className="chat-footer">
            <input
              className="chat-footer-type"
              onChange={(e) => setMessage(e.target.value)}
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
