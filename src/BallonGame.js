//state로 써야하는것
/* 
isBallon : 풍선이 터졌는가? 
*/

import React, { Fragment, useState } from 'react';
import './BallonGame.css';
import normalBallon from './img/normalBallon.jpg';
import poppedBallon from './img/poppedBallon.png';

function BallonBox({ isBallon, onBallonClicked }) {
    //여기서 이제 state들을 다양한 component로 부터 가져오려면,
    //declare the shared state in their parent component instead를 해야됨

    return (
        <Fragment>
            <button className="ballonBox" onClick={onBallonClicked}>
                <img
                    className="ballonImage"
                    src={normalBallon}
                    alt="ballonBox"
                    style={{ display: isBallon ? 'inline' : 'none' }}
                />
            </button>
        </Fragment>
    );
}


function Board({ squares }) {
    const [isBallon, setIsBallon] = useState(Array(64).fill(false));
    
    function handlePop(i) {
        if(!isBallon[i]){   //popped ballon doesn't pop again
            return;
        }
        const newIsBallon = isBallon.slice();
        newIsBallon[i] = !newIsBallon[i];
        setIsBallon(newIsBallon);
        console.log('Popped!');
    }

    return (
        <Fragment>
            <button onClick={()=> setIsBallon(Array.from({length: 64}, () => Math.round(Math.random())))}>restart</button>
            <div className="board-row">
                {isBallon.map((box, i) => {
                    if (i >= 9 && i <= 14) {
                        return <BallonBox isBallon={box} onBallonClicked={() => handlePop(i)} />;
                    }
                })}
            </div>
            <div className="board-row">
                {isBallon.map((box, i) => {
                    if (i >= 17 && i <= 22) {
                        return <BallonBox isBallon={box} onBallonClicked={() => handlePop(i)} />;
                    }
                })}
            </div>
            <div className="board-row">
                {isBallon.map((box, i) => {
                    if (i >= 25 && i <= 30) {
                        return <BallonBox isBallon={box} onBallonClicked={() => handlePop(i)} />;
                    }
                })}
            </div>
            <div className="board-row">
                {isBallon.map((box, i) => {
                    if (i >= 33 && i <= 38) {
                        return <BallonBox isBallon={box} onBallonClicked={() => handlePop(i)} />;
                    }
                })}
            </div>
            <div className="board-row">
                {isBallon.map((box, i) => {
                    if (i >= 41 && i <= 46) {
                        return <BallonBox isBallon={box} onBallonClicked={() => handlePop(i)} />;
                    }
                })}
            </div>
            <div className="board-row">
                {isBallon.map((box, i) => {
                    if (i >= 49 && i <= 54) {
                        return <BallonBox isBallon={box} onBallonClicked={() => handlePop(i)} />;
                    }
                })}
            </div>
        </Fragment>
    );
}

// const BallonGame = () => {
//     const [boardInfo, setBoardInfo] = useState([{ballonExists: '', surroundingBallons: 0}]);
//     //board 각 칸에 풍선이 있는가? 그 칸 주위에 몇개의 풍선이 있는가?
//     const [unmberMap, setNumberMap] = useState(Array(36).fill(0));
//     //boardInfo에서 surroundingBallons 정보만 가지고 36개의 1차원 배열로 선언

//     console.log(Math.round(Math.random));
//     return (
//         <div className="game">
//             <div className="game-board"></div>
//         </div>
//     );
// };

export default Board;
