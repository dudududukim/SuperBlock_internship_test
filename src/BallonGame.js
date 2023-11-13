//state로 써야하는것
/* 
isBallon : 풍선이 터졌는가? 
*/

import React, { Fragment, useState } from 'react';
import './BallonGame.css';
import normalBallon from './img/normalBallon.jpg';
import poppedBallon from './img/poppedBallon.png';

function BallonBox() {
    const [isBallon, setIsBallon] = useState(true);
    function handlePop() {
        setIsBallon(!isBallon);
        console.log('Popped!');
    }
    return (
        <Fragment>
            <button className="ballonBox" onClick={handlePop}>
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
    return (
        <>
            <div className="board-row">
                <BallonBox />
                <BallonBox />
                <BallonBox />
                <BallonBox />
                <BallonBox />
                <BallonBox />
            </div>
            <div className="board-row">
                <BallonBox />
                <BallonBox />
                <BallonBox />
                <BallonBox />
                <BallonBox />
                <BallonBox />
            </div>
            <div className="board-row">
                <BallonBox />
                <BallonBox />
                <BallonBox />
                <BallonBox />
                <BallonBox />
                <BallonBox />
            </div>
            <div className="board-row">
                <BallonBox />
                <BallonBox />
                <BallonBox />
                <BallonBox />
                <BallonBox />
                <BallonBox />
            </div>
            <div className="board-row">
                <BallonBox />
                <BallonBox />
                <BallonBox />
                <BallonBox />
                <BallonBox />
                <BallonBox />
            </div>
            <div className="board-row">
                <BallonBox />
                <BallonBox />
                <BallonBox />
                <BallonBox />
                <BallonBox />
                <BallonBox />
            </div>
        </>
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
