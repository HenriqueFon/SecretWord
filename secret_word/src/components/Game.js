import React from "react";
import { useState, useRef } from "react";
import './Game.css';

const Game = ({
        verifyLetter, 
        pickedWord, 
        pickedCategory, 
        letters, 
        guessedLetters,
        wrongLetters,
        guesses,
        score,
    }) => {

        const handleSubmit = (e) => {
            e.preventDefault();

            verifyLetter(letter);

            //Reiniciar a caixa de input do usuário
            setLetter("");

            letterInputRef.current.focus();
        }
    
        const [letter,setLetter] = useState("");

        //useRef cria uma referência do que foi passado nele até o fim de vida
        //do componente
        const letterInputRef = useRef("");
    return (
        <div className = "game">
            <p className = "points">
                <span>Pontuação:{score}</span>
            </p>
            <h1>
                Adivinhe a palavra:
            </h1>
            <h3 className = "tip">
                Dica sobre a palavra: <span>{pickedCategory}</span>
            </h3>
            <p>Você ainda tem {guesses} {guesses == 1 ? ("tentativa") : ("tentativas")}.</p>
            <div className = "wordContainer">
                {letters.map( (letter, i) => (
                    guessedLetters.includes(letter) ? (
                        <span key = {i} className = "letter">{letter}</span>
                    ) : (
                        <span key = {i} className = "blankSquare"></span>
                    )
                ))}
            </div>
            <div className = "letterContainer">
                <p>Tente adivinhar uma letra da palavra:</p>
                <form onSubmit = {handleSubmit}>
                    <input type = "text" 
                           name = "letter" 
                           maxLength = "1" 
                           required 
                           onChange = {(e) => setLetter(e.target.value)}
                           value = {letter}
                           ref = {letterInputRef}
                    />
                    <button>Jogar!</button>
                </form>
            </div>
            <div className = "wrongLettersContainer">
                <p>Letras já utilizadas:</p>
                {wrongLetters.map( (letter, i) => (
                    <span key = {i}>{letter}, </span>
                ))}
            </div>
        </div>
    )
}

export default Game;