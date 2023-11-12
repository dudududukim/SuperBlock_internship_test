import React, { useState } from 'react';

//ballon making function
function boardSetting() {
    // const [boardInfo, setBoardInfo] = useState([{ballonExists: '', surroundingBallons: 0}]);
    // const boardInfo = Array.from(Array(8), () =>
    //     Array(8).fill({ ballonExists: 'x', surroundingBallons: 0 })
    // );

    const boardInfo = new Array(8).fill(new Array(8).fill({ballonExists: 'x', surroundingBallons: 0}));

    console.log(boardInfo);

    const renewBoardInfo = boardInfo.slice();
    for (let i = 1; i < 7; i++) {
        for (let j = 1; j < 7; j++) {
            const new_Info = {...renewBoardInfo[i][j], ballonExists : Math.round(Math.random()) ? 'o' : 'x'};
            renewBoardInfo[i][j] = new_Info;
            console.log(renewBoardInfo[i][j]);
        }
        
    }
    // setBoardInfo(renewBoardInfo);
    console.log(renewBoardInfo);
}

boardSetting();
