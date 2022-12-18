// CSS
import "./App.css";

//React
import { useCallback, useEffect, useState } from "react";

//data
import { wordsList } from "./data/word";

//Component
import StartScreen from "./components/StartScreen";
import Game from "./components/Game";
import GameOver from "./components/GameOver";

//Estagios do jogo
const stages = [
  {id: 1, name: "start"},
  {id: 2, name: "game"},
  {id: 3, name: "end"},
];

function App() {
  const quantityGuesses = 3;

  //Cria o gameStage, que no caso default começa no start
  const [gameStage, setGameStage] = useState(stages[0]);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("")
  const [pickedCategory, setpickedCategory] = useState("")
  const [letters, setLetters] = useState("")

  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(quantityGuesses)
  const [score, setScore] = useState(0)

  const pickWordAndCategory = () => {
    //Pega uma categoria aleatória
    //cria um objeto a partir de chaves
    const categories = Object.keys(words);
    //dentro do objeto categorias escolhe um numero de indice aleatório
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]

    //Pega uma palavra aleatória
    //cria uma constante word que dentro do objeto de categorias pega um número aleatório
    const word = words[category][Math.floor(Math.random() * words[category].length)]

    //retorna um objeto desestruturado com a variável word e category
    return {word, category}

    //tambem é possível enviar o retorno como um array
    //return [word, category]
  }

  //Starts the secret word game
  const startGame = () => {
    cleanAllStates();
    //desestrutura a resposta da função em 2 variáveis
    const {word, category} = pickWordAndCategory();

    //seapara as palavras
    let wordLetters = word.split("");

    //converte todas letras de wordLetters para minúsculo
    wordLetters = wordLetters.map((l) => l.toLowerCase())

    setPickedWord(word)
    setpickedCategory(category)
    setLetters(wordLetters)
    
    setGameStage(stages[1]);
  }

  //process the letter input
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();

    //Checar se a letra já foi utilizada
    if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) {
      return;
    }

    //adicionar letra adivinhada ou remover uma tentativa
    if(letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter
      ])
      setScore((score) => score + 10)
    }else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter
      ])

      setGuesses((actualGuesses) => actualGuesses - 1)
    }
  }

  const cleanAllStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  };

  //useEffect monitora uma função ou variável
  useEffect(() => {
    if(guesses <= 0) {
      //reset all states
      cleanAllStates();
      setGameStage(stages[2])
      ;
    }

  }, [guesses])

  //useEffect monitora uma função ou variável
  useEffect(() => {

    const uniqueLetters = [... new Set(letters)];//Cria uma array sem valores repetidos

    if(guessedLetters.length === uniqueLetters.length) {
      setScore((actualScore) => (actualScore += 100));
      startGame();
    }

  }, [guessedLetters, letters, startGame])

  const endGame = () => {
    setScore(0);
    setGuesses(quantityGuesses);

    setGameStage(stages[0]);
  }

  return (
    <div className = "App">
      {gameStage.id === 1 && <StartScreen startGame = {startGame} />}
      {gameStage.id === 2 && 
        <Game verifyLetter = {verifyLetter} 
              pickedWord = {pickedWord}
              pickedCategory = {pickedCategory}
              letters = {letters}
              guessedLetters = {guessedLetters}
              wrongLetters = {wrongLetters}
              guesses = {guesses}
              score = {score}
        />} 
      {gameStage.id === 3 && <GameOver endGame = {endGame} score = {score} />}
    </div>
  );
}

export default App;
