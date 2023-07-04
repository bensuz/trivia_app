import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ClipLoader from "react-spinners/ClipLoader";

const Trivia = () => {
    const [questions, setQuestions] = useState([]);
    const [userData, setUserData] = useState({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ffffff");

    const fetchData = () => {
        fetch("https://wd40-trivia.onrender.com/api/questions")
            .then((response) => response.json())
            .then((data) => {
                setQuestions(data);
                // console.log(data);
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
        // setSelectedAnswer(userData[currentQuestionIndex + 1]?.a);
        if (!userData[currentQuestionIndex]) {
            const isCorrect =
                selectedAnswer ===
                questions[currentQuestionIndex].correctAnswer;
            if (isCorrect) {
                setScore((prevScore) => prevScore + 1);
            }

            setUserData({
                ...userData,

                [currentQuestionIndex]: {
                    question: questions[currentQuestionIndex].question,
                    a: selectedAnswer,
                    isCorrect: isCorrect,
                    correctAnswer:
                        questions[currentQuestionIndex].correctAnswer,
                },
            });
        }
        setSelectedAnswer(userData[currentQuestionIndex + 1]?.a);
        // setSelectedAnswer("");

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
    };
    // console.log("userdata", userData);

    // useEffect(() => {
    //     console.log(userData);
    // }, [userData]);

    const handlePrevQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
            setSelectedAnswer(userData[currentQuestionIndex - 1].a);
        }
    };
    // console.log("selected", selectedAnswer);

    const restartGame = () => {
        setQuestions([]);
        setUserData(null);
        setCurrentQuestionIndex(0);

        setScore(0);
        setGameOver(false);
        fetchData();
    };

    if (questions.length === 0) {
        return (
            <div className="loading">
                <h2>Loading questions...</h2>
                <div className="sweet-loading">
                    <ClipLoader
                        color={color}
                        loading={loading}
                        // cssOverride={override}
                        size={100}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
            </div>
        );
    }

    // console.log("array:", Object.entries(userData)[0][1]);

    if (gameOver) {
        const reviewData = Object.entries(userData);
        console.log("array:", Object.entries(userData));
        return (
            <div className="reviewpage">
                <div className="gameover">
                    <h2>Game Over!</h2>
                    <p>Your Final Score: {score} out of 6</p>
                    <h3>Questions Review:</h3>
                    <ul className="reviewList">
                        {reviewData.map(([index, data]) => (
                            <li key={index} className="review-li">
                                <p>
                                    {parseInt(index) + 1} - {data.question}
                                </p>
                                <p>Correct Answer: {data.correctAnswer}</p>
                                <p>
                                    Your Answer:{""}
                                    {data.a ? data.a : "Not Selected"}
                                </p>
                                <p
                                    className={
                                        data.isCorrect ? "correct" : "incorrect"
                                    }
                                >
                                    {/* {console.log({ userAnswers })} */}
                                    {data.isCorrect ? "Correct" : "Incorrect"}
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
            <div className="buttonContainer">
                <button
                    onClick={handlePrevQuestion}
                    className={
                        currentQuestionIndex === 0
                            ? "prevbutton hide"
                            : "prevbutton"
                    }
                >
                    Previous Question
                </button>
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
        </div>
    );
};

export default Trivia;
