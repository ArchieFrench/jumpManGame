import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';



class Character extends React.Component {e

  constructor(props) {
    super(props);

    this.state = {
      xPos: [100, 125, 150, 175],
      vw: 'vw',
      yPos: 550,
      height: 100,
      score: 0,
      timeoutId: 0,
      gameOver: false,
      gameStarted: false,
      gameLoopTimeout: 50,
      display: "none",
      startTextOpacity: 1,
      text: "Press e to start",
      type: ["obj2", "obj2", "obj3", "obj1"],
      duck: false
    }

  }

  /**
   * Moves the player down, by gravity or when a key is pressed
   * @param {how much the player moves down} amount 
   */
  down(amount) {
    if (this.state.yPos + this.state.height + amount <= 650) {
      this.setState(
        {yPos: this.state.yPos + amount}
      );
    } else {
      this.setState(
        {yPos: 650 - this.state.height}
      );
    }
  }

  duck() {
    this.setState(
      {height: 75,
        yPos: 575,
        duck: true}
    );
  }

  handleKeyUp = (event) => {
    if (!this.state.gameOver) {
      switch( event.keyCode ) {
        case 83:
          this.setState(
            {duck: "false",
            height: 100,
            yPos: 550}
          );
        break;
        default:
          break;
      }
    }
  }

  handleKeyDown = (event) => {
    if (!this.state.gameOver) {
      switch( event.keyCode ) {
        case 69:
          this.setState(
            {gameStarted: true,
            startTextOpacity: 0,
            text: "Game Over"}
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
          if (this.state.gameStarted & (this.state.yPos != 550)) {
            this.down(250);
          } else if (this.state.gameStarted) {
            this.duck();
          }
          break;
        default:
          break;
      }
    }
  }

  componentWillMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
    this.gameLoop();
  }


  componentWillUnmount(){
    window.removeEventListener('keyup', this.handleKeyUp);
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  gravity() {
    this.down(20);
  }

  rngObj(index) {
    var prob = Math.random();
    const types = this.state.type;

    if (prob < 0.25) {
      types[index] = "obj1"
    } else if (prob < 0.50) {
      types[index] = "obj2"
    } else if (prob < 0.75){
      types[index] = "obj3"
    } else {
      types[index] = "noObj"
    }

    this.setState(
      {type: types}
    );
  }

  objMove() {
    for(var i = 0; i < 4; i++) {
      const xPositions = this.state.xPos;
      var scores = this.state.score;

      if (xPositions[i] < 0) {
        xPositions[i] = 100;
        scores++;

        this.setState(
          {xPos: xPositions,
          score: scores}
        );

        this.rngObj(i);
      } else {
        xPositions[i] = Math.round(xPositions[i] - ((this.state.score * 0.1) + 1), 3);
        this.setState(
          {xPos: xPositions}
        );
      }
    }
  }

  isGameOver() {
    for(var i = 0; i < 4; i++) {
      if (this.state.xPos[i] <= 7 & (this.state.xPos[i] >= 5)) {
        if (this.state.yPos >= 550 & (this.state.type[i] == "obj1")) {
          this.setState(
            {gameOver: true,
            display: "inherit",
            startTextOpacity: 1}        
          );
        } else if (this.state.type[i] == "obj2") {
          if ((575 < this.state.yPos) & (540 < this.state.yPos)) {
            this.setState(
              {gameOver: true,
              display: "inherit",
              startTextOpacity: 1}        
            );
          }
        } else if (this.state.yPos >= 450 & (this.state.type[i] == "obj3")) {
          this.setState(
            {gameOver: true,
            display: "inherit",
            startTextOpacity: 1}        
          );
        }
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
          <div class="startGame" style={{opacity: this.state.startTextOpacity}}>{this.state.text}</div>
        </div>
        <div class="game"> 
          <div class="sky">
            <div class="characterModel" style={{top: this.state.yPos, height: this.state.height}}>
              0-0
            </div>
            <div className={this.state.type[0]} style={{left: this.state.xPos[0] + this.state.vw}}>
              {this.state.xPos[0]}
            </div>
            <div className={this.state.type[1]} style={{left: (this.state.xPos[1]) + this.state.vw}}>
              {this.state.xPos[1]}
            </div>
            <div className={this.state.type[2]} style={{left: (this.state.xPos[2]) + this.state.vw}}>
              {this.state.xPos[2]}
            </div>
            <div className={this.state.type[3]} style={{left: (this.state.xPos[3]) + this.state.vw}}>
              {this.state.xPos[3]}
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
