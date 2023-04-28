import React from 'react';
import logo from './logo.svg';
import './App.css';
import Chat from './features/Chat';
import Reply from './features/Chat/Reply';

function App() {
  return (
    <div className="App">
        <Chat/>
        <Reply/>
    </div>
  );
}

export default App;
