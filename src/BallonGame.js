import React, { useState } from 'react';
import './BallonGame.css';

function Square({ value }) {
    return <></>;
}

function Board({ squares }) {
    return <></>;
}

const BallonGame = () => {
    const [boardInfo, setBoardInfo] = useState([{ballonExists: '', surroundingBallons: 0}]);
    //board 각 칸에 풍선이 있는가? 그 칸 주위에 몇개의 풍선이 있는가?
    const [unmberMap, setNumberMap] = useState(Array(36).fill(0));
    //boardInfo에서 surroundingBallons 정보만 가지고 36개의 1차원 배열로 선언

    console.log(Math.round(Math.random));
    return (
        <div className="game">
            <div className="game-board"></div>
        </div>
    );
};


export default BallonGame;