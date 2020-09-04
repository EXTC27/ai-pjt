import React, { Component } from 'react';
import styled from 'styled-components';
// import logo from '..';

class MainAnimation extends Component {
  render() {
    return (
      <Animation>
        <div className="logo">
          <img src="/logo192.png" alt=""/>
        </div>

        <div className="words">
          <div className="word">AI</div>
          <div className="word">Photo</div>
          <div className="word">Editor</div>
          <div className="word">AIditor</div>
        </div>
      </Animation>
    )
  }
}

export default MainAnimation;

const Animation = styled.div`
  width: 70%;
  height: 30%;
  margin-bottom: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  /* transform: translateY(22vh); */
  animation: backColor 6s 4.5s infinite;
  /* animation-delay: 6s; */
  /* animation-iteration-count: infinite; */
  
  /* @keyframes backColor{
    0% {
      background-color: white;
    }
    5% {
      background-color: #00e6ac;
    }
    20% {
      background-color: #00e6ac;
    }
    30% {
      background-color: white;
    }
    80% {
      background-color: white;
    }
  } */

  div{
    box-sizing: content-box;
  }

  .logo{
    display: flex;
    margin: 0.5rem;
    background: linear-gradient(to bottom, #66ffff 0%, #ff99cc 100%);
    border: 3px solid white;
    border-radius: 29px;
    img{
      width: 100px;
    }
  }

  .words{
    font-family: 'Baloo Bhaina 2', cursive;
    font-weight: 600;
    color: white;
    text-shadow: 0 0 10px gray;
    text-align:center;
    display: flex;
    width: 80%;
    height: 25%;
    justify-content: center;
    align-items: center;

    .word{
      opacity: 0;
      
      position: absolute;
      font-size: 3rem;
    }
    .word:nth-child(1) {
      animation: motion 8s 0s infinite;
    }
    .word:nth-child(2) {
      animation: motion 8s 2s infinite;
    }
    .word:nth-child(3) {
      animation: motion 8s 4s infinite;
    }
    .word:nth-child(4) {
      animation: motion 8s 6s infinite;
    }
  }

  @keyframes motion {
    0% {
      opacity: 0;
      /* transform: translateY(10px); */
      transform: translateX(2rem);
    }
    
    5% {
      opacity: 1;
      /* transform: translateY(0); */
      transform: translateX(0);
    }
    
    20% {
      opacity: 1;
      /* transform: translateY(0); */
      transform: translateX(0);
    }
    
    30% {
      opacity: 0;
      /* transform: translateY(-50px); */
      transform: translateX(-4rem);
    }

    80% {
      opacity: 0;
      /* transform: translateY(-50px); */
      transform: translateX(0);
    }
  }

  @keyframes motion2 {
    0% {
      opacity: 0;
      /* transform: translateY(10px); */
      transform: translateX(2rem);
    }
    
    5% {
      opacity: 1;
      /* transform: translateY(0); */
      transform: translateX(0);
    }
    
    20% {
      opacity: 1;
      /* transform: translateY(0); */
      transform: translateX(0);
    }

    30% {
      opacity: 0;
      /* transform: translateY(-50px); */
      transform: translateX(-4rem);
    }
  }
`