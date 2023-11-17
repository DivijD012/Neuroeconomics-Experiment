import questionsData from "./data/questionsData";
// import getRandomInt from "../../../../utils/random-int";

export default () => {
    return new Promise(resolve => {
        setTimeout(() => {
            const questionsLength = 13;
            const questions = [];

            for (let i = 0; i < questionsLength; i++) {
                const question = {
                    question: questionsData[i].question,
                    answers: questionsData[i].answers,
                    i
                };

                questions.push(question);
            }

            resolve(
                questions
                // questionsData.map((question, questionIndex) => {
                //     return {
                //         questionIndex,
                //         question: question.question,
                //         answers: question.answers
                //     };
                // })
            );
        }, 1500);
    });
};
