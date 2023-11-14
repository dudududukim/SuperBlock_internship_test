//state로 써야하는것
/* 
isBallon : 풍선이 터졌는가? 
*/

import React, { Fragment, useState, useEffect } from 'react';
import './BallonGame.css';
import Modal from 'react-modal';

import normalBallon from './img/normalBallon.png';
import poppedBallon from './img/poppedBallon.png';

//playingIndex : index that the box is actually visible for users
const playingIndex = [
    ...range(9, 15),
    ...range(17, 23),
    ...range(25, 31),
    ...range(33, 39),
    ...range(41, 47),
    ...range(49, 55),
];

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
    const [isBallon, setIsBallon] = useState(Array(64).fill(0));
    const [status, setStatus] = useState('');
    const [gameStarted, setGameStarted] = useState(false);
    //동기 처리를 정확히 이해하지 못해서 일단 인자하나 추가
    useEffect(() => handleRestart, []);

    function handlePop(i) {
        //getting hidden map caluation before popping the ballon

        //popping ballon and confirming that ballon is right or not
        if (!isBallon[i]) {
            //popped ballon doesn't pop again
            return;
        }
        const currentHiddenMap = hiddenMap(isBallon);

        //cheking is it right ballon
        const rightBallon = rightBalllonCheck(currentHiddenMap, currentHiddenMap[i]);
        if (rightBallon === 'correct') {
            const newIsBallon = poppingBallon(isBallon, i);
            setIsBallon(newIsBallon);
            setStatus('Correct');
            console.log('Popped!');
        } else {
            setStatus('Failed!!');
            alert('GameOver', handleRestart());
            console.log('WRONG!!!');
        }
        setGameStarted(true);
    }

    const gameClear = gameClearCheck(isBallon);
    if (gameClear && gameStarted) {
        setStatus('Conguratulation');
        setGameStarted(false);
    }

    function handleRestart() {
        //8*8중 사용할 6*6만 random으로 채우는 함수
        const copyIsBallon = isBallon.slice();
        playingIndex.forEach((visibleIndex, i) => {
            copyIsBallon[visibleIndex] = Math.round(Math.random());
        });
        setIsBallon(copyIsBallon);
        setStatus('Game Start!');
        setGameStarted(false);
    }

    return (
        <Fragment>
            <div className="infoBox">
                <div className="status">{status}</div>{' '}
                <button
                    style={{ display: gameClear ? 'inline' : 'none' }}
                    onClick={() => handleRestart()}
                >
                    RESTART
                </button>
            </div>

            <div className="fullBoard">
                <div className="board-row">
                    {isBallon.map((boxes, i) => {
                        if (i >= 9 && i <= 14) {
                            return (
                                <BallonBox isBallon={boxes} onBallonClicked={() => handlePop(i)} />
                            );
                        }
                    })}
                </div>
                <div className="board-row">
                    {isBallon.map((box, i) => {
                        if (i >= 17 && i <= 22) {
                            return (
                                <BallonBox isBallon={box} onBallonClicked={() => handlePop(i)} />
                            );
                        }
                    })}
                </div>
                <div className="board-row">
                    {isBallon.map((box, i) => {
                        if (i >= 25 && i <= 30) {
                            return (
                                <BallonBox isBallon={box} onBallonClicked={() => handlePop(i)} />
                            );
                        }
                    })}
                </div>
                <div className="board-row">
                    {isBallon.map((box, i) => {
                        if (i >= 33 && i <= 38) {
                            return (
                                <BallonBox isBallon={box} onBallonClicked={() => handlePop(i)} />
                            );
                        }
                    })}
                </div>
                <div className="board-row">
                    {isBallon.map((box, i) => {
                        if (i >= 41 && i <= 46) {
                            return (
                                <BallonBox isBallon={box} onBallonClicked={() => handlePop(i)} />
                            );
                        }
                    })}
                </div>
                <div className="board-row">
                    {isBallon.map((box, i) => {
                        if (i >= 49 && i <= 54) {
                            return (
                                <BallonBox isBallon={box} onBallonClicked={() => handlePop(i)} />
                            );
                        }
                    })}
                </div>
            </div>
        </Fragment>
    );
}

function gameClearCheck(isBallon) {
    if (Math.max(...isBallon) === 0) {
        return 'game clear';
    } else {
        return null;
    }
}

function range(start, end) {
    let array = [];
    for (let i = start; i < end; ++i) {
        array.push(i);
    }
    return array;
}

function hiddenMap(isBallon) {
    //using isBallon state, making absoulte map that contains the surround ballon number information

    const hiddenMap = Array(64).fill(0);

    playingIndex.forEach((visibleIndex, i) => {
        const surroundingBallons =
            isBallon[visibleIndex - 8] +
            isBallon[visibleIndex - 1] +
            isBallon[visibleIndex + 1] +
            isBallon[visibleIndex + 8];
        hiddenMap[visibleIndex] = isBallon[visibleIndex] ? surroundingBallons : 0;
        //console.log('index: ' + visibleIndex + 'surroundingBallons: ' + surroundingBallons + 'isBallon[visibleIndex]: '+ isBallon[visibleIndex]);
    });
    //console.log(hiddenMap);
    return hiddenMap;
}

function rightBalllonCheck(hiddenMap, surroundingBallonNumber) {
    if (Math.max(...hiddenMap) === surroundingBallonNumber) {
        return 'correct';
    } else {
        return 'Failed!!';
    }
}

function poppingBallon(isBallon, currentBox) {
    const newIsBallon = isBallon.slice();

    newIsBallon[currentBox] = 0;
    newIsBallon[currentBox - 8] = 0;
    newIsBallon[currentBox + 1] = 0;
    newIsBallon[currentBox - 1] = 0;
    newIsBallon[currentBox + 8] = 0;

    return newIsBallon;
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
