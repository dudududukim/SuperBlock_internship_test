import React, {useState} from 'react';


//ballon making function
function boardSetting(){
    // const [boardInfo, setBoardInfo] = useState([{ballonExists: '', surroundingBallons: 0}]);
    const boardInfo = Array.from(Array(8), () => Array(8).fill({ballonExists: 'x', surroundingBallons: 0}));

    const renewBoardInfo = boardInfo;
    for(let i=1; i<7; i++){
        for(let j=1; j<7; j++){
            const randomNum = Math.random();
            renewBoardInfo[j][i].ballonExists = Math.round(randomNum) ? "o" : "x";
        }
    }
    // setBoardInfo(renewBoardInfo);
    console.log(renewBoardInfo);


}

boardSetting();