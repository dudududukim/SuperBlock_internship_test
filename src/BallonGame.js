//state로 써야하는것
/* 
isBallon : 풍선이 터졌는가?
status: 게임의 상태 success or failed or correctly popped
gameStarted: to checked game is flowing
sliderValue: that gets from slider the value
*/

import React, { Fragment, useState, useEffect } from 'react';
import './BallonGame.css';

import Slider from '@mui/material/Slider';
import { Box } from '@mui/material';

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

function BallonBox({ isBallon, isGameStarted, onBallonClicked }) {
    //여기서 이제 state들을 다양한 component로 부터 가져오려면,
    //declare the shared state in their parent component instead를 해야됨

    return (
        <Fragment>
            <button className="ballonBox" onClick={isGameStarted ? onBallonClicked : null}>
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

function Board({ theme }) {
    const [isBallon, setIsBallon] = useState(Array(64).fill(0));
    const [status, setStatus] = useState('');
    const [gameStarted, setGameStarted] = useState(true);
    const [sliderValue, setSliderValue] = useState(75);

    function handleRangeSlider(event, value) {
        document.documentElement.style.setProperty('--gridSize', value*Math.min(window.innerHeight, window.innerWidth)/920 + 'px');
        setSliderValue(value);
    }

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
            setStatus('----GameOver----');
            setGameStarted(false);
            console.log('WRONG!!!');
            return;
        }
    }

    useEffect(() => {
        if (gameClearCheck(isBallon) && gameStarted) {
            setStatus('Conguratulation');
            setGameStarted(false);
        }
    }, [isBallon]);

    function handleRestart() {
        //8*8중 사용할 6*6만 random으로 채우는 함수
        const copyIsBallon = isBallon.slice();
        playingIndex.forEach((visibleIndex, i) => {
            copyIsBallon[visibleIndex] = Math.round(Math.random());
        });
        setIsBallon(copyIsBallon);
        setStatus('Game Start!');
        setGameStarted(true);
    }

    function gameClearCheck() {
        console.log('clear check');
        if (Math.max(...isBallon) === 0) {
            return 'game clear';
        } else {
            return null;
        }
    }

    //only called when rendered
    useEffect(handleRestart, []);


    return (
        <Fragment>
            <div className="infoBox">
                <div className="sliderBox">
                    <Box sx={{ width: Math.max(window.innerWidth/4, window.innerHeight/4) }}>
                        <Slider
                            size="small"
                            defaultValue={60}
                            max={100}
                            min={30}
                            aria-label="small"
                            className="slider"
                            color={theme === 'light' ? 'success' : 'secondary'}
                            value={sliderValue}
                            onChange={handleRangeSlider}
                        />
                    </Box>
                </div>
                <div className="status">{status}</div>{' '}
                <button
                    variant="outlined"
                    style={{ display: gameStarted ? 'none' : 'inline' }}
                    className="restartButton"
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
                                <BallonBox
                                    isBallon={boxes}
                                    isGameStarted={gameStarted}
                                    onBallonClicked={() => handlePop(i)}
                                />
                            );
                        }
                    })}
                </div>
                <div className="board-row">
                    {isBallon.map((box, i) => {
                        if (i >= 17 && i <= 22) {
                            return (
                                <BallonBox
                                    isBallon={box}
                                    isGameStarted={gameStarted}
                                    onBallonClicked={() => handlePop(i)}
                                />
                            );
                        }
                    })}
                </div>
                <div className="board-row">
                    {isBallon.map((box, i) => {
                        if (i >= 25 && i <= 30) {
                            return (
                                <BallonBox
                                    isBallon={box}
                                    isGameStarted={gameStarted}
                                    onBallonClicked={() => handlePop(i)}
                                />
                            );
                        }
                    })}
                </div>
                <div className="board-row">
                    {isBallon.map((box, i) => {
                        if (i >= 33 && i <= 38) {
                            return (
                                <BallonBox
                                    isBallon={box}
                                    isGameStarted={gameStarted}
                                    onBallonClicked={() => handlePop(i)}
                                />
                            );
                        }
                    })}
                </div>
                <div className="board-row">
                    {isBallon.map((box, i) => {
                        if (i >= 41 && i <= 46) {
                            return (
                                <BallonBox
                                    isBallon={box}
                                    isGameStarted={gameStarted}
                                    onBallonClicked={() => handlePop(i)}
                                />
                            );
                        }
                    })}
                </div>
                <div className="board-row">
                    {isBallon.map((box, i) => {
                        if (i >= 49 && i <= 54) {
                            return (
                                <BallonBox
                                    isBallon={box}
                                    isGameStarted={gameStarted}
                                    onBallonClicked={() => handlePop(i)}
                                />
                            );
                        }
                    })}
                </div>
            </div>
        </Fragment>
    );
}

//making array that has the number from 'start' to 'end'
function range(start, end) {
    let array = [];
    for (let i = start; i < end; ++i) {
        array.push(i);
    }
    return array;
}

//using isBallon state, making absoulte map that contains the surround ballon number information
function hiddenMap(isBallon) {
    const hiddenMap = Array(64).fill(0);

    playingIndex.forEach((visibleIndex, i) => {
        const surroundingBallons =
            isBallon[visibleIndex - 8] +
            isBallon[visibleIndex - 1] +
            isBallon[visibleIndex + 1] +
            isBallon[visibleIndex + 8];
        hiddenMap[visibleIndex] = isBallon[visibleIndex] ? surroundingBallons : 0;
    });
    //console.log(hiddenMap);
    return hiddenMap;
}

//checking clicked ballon has the most surrounding ballons
function rightBalllonCheck(hiddenMap, surroundingBallonNumber) {
    if (Math.max(...hiddenMap) === surroundingBallonNumber) {
        return 'correct';
    } else {
        return 'Failed!!';
    }
}

//popping ballons that clicked with surrounding ballons
function poppingBallon(isBallon, currentBox) {
    const newIsBallon = isBallon.slice();

    newIsBallon[currentBox] = 0;
    newIsBallon[currentBox - 8] = 0;
    newIsBallon[currentBox + 1] = 0;
    newIsBallon[currentBox - 1] = 0;
    newIsBallon[currentBox + 8] = 0;

    return newIsBallon;
}


export default Board;
