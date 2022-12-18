import React from "react";

import './GameOver.css';

const GameOver = ({endGame, score}) => {
    return (
        <div>
            <h1>Fim do Jogo!</h1>
            <h2>A sua pontuação foi:<span>{score}</span></h2>
            <button onClick = {endGame}>Voltar ao inicio</button>
        </div>
    )
}

export default GameOver;