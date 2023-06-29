import "./App.css";
import { useEffect, useState } from "react";
import Trivia from "./components/Trivia";
// import axios from "axios";

const App = () => {
    // const [questionNumber, setQuestionNumber] = useState(1);

    //
    // const data = [
    //     {
    //         id: "8544c4bf-a8e0-41d1-af9a-0534557545e0",
    //         question:
    //             "An organic compound is considered an alcohol if it has what functional group?",
    //         correctAnswer: "Hydroxyl",
    //         answers: ["Alkyl", "Carbonyl", "Aldehyde", "Hydroxyl"],
    //         userAnswer: "",
    //     },
    //     {
    //         id: "22c756af-7afd-4bb8-8b0d-0a5f705b7441",
    //         question: "When was Elvis Presley born?",
    //         correctAnswer: "January 8, 1935",
    //         answers: [
    //             "July 18, 1940",
    //             "December 13, 1931",
    //             "January 8, 1935",
    //             "April 17, 1938",
    //         ],
    //         userAnswer: "",
    //     },
    //     {
    //         id: "80001b6b-d669-4054-8d07-ec0f590d3a90",
    //         question:
    //             "Who designed the album cover for True Romance, an album by Estelle?",
    //         correctAnswer: "Rebecca Sugar",
    //         answers: [
    //             "Rebecca Sugar",
    //             "Matt Burnett",
    //             "Ian Jones Quartey",
    //             "Ben Leven",
    //         ],
    //         userAnswer: "",
    //     },
    //     {
    //         id: "d70e98f6-aa6f-4def-8f1b-655ab9212607",
    //         question: "What album did The Lumineers release in 2016?",
    //         correctAnswer: "Cleopatra",
    //         answers: [
    //             "The Lumineers",
    //             "Tracks From The Attic",
    //             "Cleopatra",
    //             "Winter",
    //         ],
    //         userAnswer: "",
    //     },
    //     {
    //         id: "41e85281-600a-4520-98df-79d084f527d0",
    //         question:
    //             "When was the video game publisher &quot;Ubisoft&quot; founded ?",
    //         correctAnswer: "March 1986",
    //         answers: ["August 1956", "March 1986", "June 2001", "April 1990"],
    //         userAnswer: "",
    //     },
    //     {
    //         id: "ebcce905-866c-47f8-9c2c-b342bb25e30b",
    //         question:
    //             "Which JoJo&#039;s Bizarre Adventure character possesses the Stand named Silver Chariot?",
    //         correctAnswer: "Jean Pierre Polnareff",
    //         answers: [
    //             "Jean Pierre Polnareff",
    //             "Hermes Costello",
    //             "Noriaki Kakyoin",
    //             "Hol Horse",
    //         ],
    //         userAnswer: "",
    //     },
    // ];

    // return (
    //     <div className="app">
    //         <p>Question Number: {questionNumber}/ 5 </p>
    //         <div className="bottom">
    //             <Trivia
    //                 data={data}
    //                 questionNumber={questionNumber}
    //                 setQuestionNumber={setQuestionNumber}
    //             />
    //         </div>
    //     </div>
    // );
    return (
        <>
            <Trivia />
        </>
    );
};

export default App;
