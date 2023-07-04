import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Trivia = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const fetchData = () => {
        fetch("https://wd40-trivia.onrender.com/api/questions")
            .then((response) => response.json())
            .then((data) => {
                setQuestions(data);
                console.log(data);
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAnswerSelection = (a) => {
        setSelectedAnswer(a);
    };

    const handleNextQuestion = () => {
        if (!userAnswers[currentQuestionIndex]) {
            const isCorrect =
                selectedAnswer ===
                questions[currentQuestionIndex].correctAnswer;
            setUserAnswers([
                ...userAnswers,
                { isCorrect, userAnswer: selectedAnswer },
            ]);

            if (isCorrect) {
                setScore((prevScore) => prevScore + 1);
            }
        }
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        } else {
            Swal.fire({
                title: "Are you sure?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, finish game!",
            }).then((result) => {
                if (result.isConfirmed) {
                    setGameOver(true);
                }
            });
        }
        setSelectedAnswer("");
    };

    const restartGame = () => {
        setQuestions([]);
        setCurrentQuestionIndex(0);
        setUserAnswers([]);
        setScore(0);
        setGameOver(false);
        fetchData();
    };

    if (questions.length === 0) {
        return (
            <div className="loading">
                <h2>Loading questions...</h2>
            </div>
        );
    }

    if (gameOver) {
        return (
            <div className="reviewpage">
                <div className="gameover">
                    <h2>Game Over!</h2>
                    <p>Your Final Score: {score} out of 6</p>
                    <h3>Questions Review:</h3>
                    <ul className="reviewList">
                        {questions.map((question, index) => (
                            <li key={index} className="review-li">
                                <p>
                                    {index + 1} - {question.question}
                                </p>
                                <p>Correct Answer: {question.correctAnswer}</p>
                                <p>
                                    Your Answer:{""}
                                    {userAnswers[index].userAnswer}
                                </p>
                                <p
                                    className={
                                        userAnswers[index].isCorrect
                                            ? "correct"
                                            : "incorrect"
                                    }
                                >
                                    {/* {console.log({ userAnswers })} */}
                                    {userAnswers[index].isCorrect
                                        ? "Correct"
                                        : "Incorrect"}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
                <button onClick={restartGame} className="nextbutton">
                    Restart Game
                </button>
            </div>
        );
    }

    return (
        <div className="app">
            <h2 className="heading">Trivia Game</h2>
            <h3>Question {currentQuestionIndex + 1} / 6</h3>
            <div className="trivia">
                <p>{questions[currentQuestionIndex].question}</p>
                <ul className="answerContainer">
                    {/* {console.log(questions[currentQuestionIndex].answers)} */}
                    {questions[currentQuestionIndex].answers.map(
                        (answer, index) => (
                            <li
                                key={index}
                                onClick={() => handleAnswerSelection(answer)}
                                className={
                                    selectedAnswer === answer
                                        ? "answer active"
                                        : "answer"
                                }
                            >
                                {answer}
                            </li>
                        )
                    )}
                </ul>
            </div>
            {/* <p>Score: {score}</p> */}
            <button
                onClick={handleNextQuestion}
                className="nextbutton"
                // disabled={!userAnswers[currentQuestionIndex]}
            >
                {currentQuestionIndex === questions.length - 1
                    ? "Finish Game"
                    : "Next Question"}
            </button>
        </div>
    );
};

export default Trivia;
