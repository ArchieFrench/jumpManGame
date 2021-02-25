import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';



class Character extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      xPos: 100,
      vw: 'vw',
      yPos: 550,
      score: 0,
      timeoutId: 0,
      gameOver: false,
      gameStarted: false,
      gameLoopTimeout: 50,
      display: "none",
      startTextOpacity: 1
    }

  }

  down(amount) {
    if (this.state.yPos + amount <= 550) {
      this.setState(
        {yPos: this.state.yPos + amount}
      );
    } else {
      this.setState(
        {yPos: 550}
      );
    }
  }



  handleKeyUp = (event) => {
    if (!this.state.gameOver) {
      switch( event.keyCode ) {
        case 69:
          this.setState(
            {gameStarted: true,
            startTextOpacity: 0}
          );
          break;
        case 32:
          if(this.state.yPos == 550 & (this.state.gameStarted)) {
            this.setState(
              {yPos: this.state.yPos - 250}
            );
          }
          break;
        case 87:
          if(this.state.yPos == 550 & (this.state.gameStarted)) {
            this.setState(
              {yPos: this.state.yPos - 250}
            );
          }
            break;
        case 83:
          if (this.state.gameStarted) {
            this.down(250);
          }
          break;
        default:
          break;
      }
    }
  }

  componentWillMount() {
    window.addEventListener('keydown', this.handleKeyUp);
    this.gameLoop();
  }


  componentWillUnmount(){

  }

  gravity() {
    this.down(10);
  }

  objMove() {
    if (this.state.xPos < 0) {
      this.setState(
        {xPos: 100,
        score: this.state.score + 1}
      );
    } else {
      this.setState(
        {xPos: this.state.xPos - ((this.state.score * Math.random()) + 1)}
      );
    }
  }

  isGameOver() {
    if (this.state.xPos <= 5 && (this.state.xPos >= 3)) {
      if (this.state.yPos >= 450) {
        this.setState(
          {gameOver: true,
          display: "inherit"}        
        );
      }
    }
  }

  gameStarted() {
    if (this.state.gameStarted) {
      return true;
    }

    return false;
  }

  gameLoop() {
    let timeoutId = setTimeout(() => {
    
      this.isGameOver();
      if (!this.state.gameOver && (this.state.gameStarted)) {
        this.gravity();
        this.objMove();
      } else {

      }

      this.gameLoop()
    }, this.state.gameLoopTimeout)

    this.setState({ timeoutId })
  }

  render() {
    return(
      <div class="container">
        <div class="hud">
          <div class="title">{this.state.score}</div>
          <div class="startGame" style={{opacity: this.state.startTextOpacity}}>Press e to start</div>
        </div>
        <div class="game"> 
          <div class="sky">
            <div class="characterModel" style={{top: this.state.yPos}}>
              0-0
            </div>
            <div class="obj" style={{left: this.state.xPos + this.state.vw}}>
              00
            </div>
          </div>
          <div class="ground"></div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Character/>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
