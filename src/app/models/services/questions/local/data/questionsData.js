const questions = [
    {
        // 0
        question: `Your participation in this experiment is voluntary. Your responses will be kept anonymous.
Do you consent to take part?
        `,
        answers: ["Yes"],
        correctAnswerIndex: 0,
    },
    {
        // 1
        question: `Are you comfortable with the data being used for statistical or research purposes?
    `,
        answers: ["Yes"],
        correctAnswerIndex: 0,
    },
    {
        // 2
        question: `Do you agree to answer the experiment questions truthfully and to the best of your ability?
    `,
        answers: ["Yes"],
        correctAnswerIndex: 0,
    },
    {
        // 3
        question:
`How many people (NOT including yourself) live in your home?`,
        answers:[

        ],
        correctAnswerIndex: 1,
    },
    {
        // 4
        question:
`Which category best describes your yearly household income before taxes? Include all income received from employment, social 
security, support from children or other family, welfare, bank interest, retirement accounts, rental property, investments, etc.`,
        answers:[
            "Less than Rs. 6 Lakhs",
            "Rs. 6 Lakhs to 9 Lakhs",
            "Rs. 9 Lakhs to 12 Lakhs",
            "Rs. 12 Lakhs to 15 Lakhs",
            "More than Rs. 15 Lakhs",
        ],
        correctAnswerIndex: 0,
    },
    {
        // 5
        question:
`Do you OWN your own home now (includes paying a mortgage)?`,
        answers:[
            "Yes",
            "No",
        ],
        correctAnswerIndex: 0,
    },
    {
        // 6
        question:
`Do you OWN a working motor vehicle (car, truck, van, SUV) now?`,
        answers:[
            "Yes",
            "No",
        ],
        correctAnswerIndex: 0,
    },
    {
        // 7
        question: `You are a final year student actively seeking placement opportunities in reputable companies.
It's a pivotal moment and you recognize the significance of choosing a career options that aligns with your skills and interests
so that you can continue with it without any issues in the future as well.

Which of the following two roles would you say are more suited to your passion and interests?
    `,
        answers: [
            "Software Development Engineer (SDE)",
            "Research",
        ],
        correctAnswerIndex: 0,
    },
    {
        // 8
        // Passion - Research
        question: `The placement season is closing in, but you have managed to land yourself 2 placement offers in the same company. The choice is
now yours to make. One of the offers is for the Research position, and offers a salary of 25 Lakhs per annum and the other is that
of an SDE with a salary of 40 Lakhs per annum.

Which job would you prefer to take?
    `,
        answers: [
            "Research",
            "SDE",
        ],
        correctAnswerIndex: 0,
    },
    {
        // 9
        // Passion - Research, Choice - Research
        //Submit
        question: `
You choose to follow the path of your passion and are satisfied with your decision when a close friend asks you about your choice.
Your friend wants to know what is the minimum salary (in Lakhs) that SDE must have offered for you to have considered it over
research (preferred job alignment)?  
    `,
        answers: [
            
        ],
        correctAnswerIndex: 1
    },
    {
        // 10
        // Passion - Research, Choice - SDE
        // Yes - Submit
        question: `
You choose to follow the path of greater financial gain and are satisfied with your decision when a senior in the company gives you
crucial information. You are told that the research position's salary ends up matching the SDE position's pay after a period of 2
years. Will you switch your decision? 
    `,
        answers: [
            "Yes",
            "No"
        ],
        correctAnswerIndex: 0
    },
    {
        // 11
        // Passion - Research, Choice - SDE,, Switch - No
        // Submit
        question: `
Your senior is curious about your decision and wants to know what would have gotten you to make a decision switch. He asks you
what would be the maximum duration (in months) in which the pay must become equal for you to choose research
(your preferred job) over SDE? 
    `,
        answers: [
            
        ],
        correctAnswerIndex: 1
    },
    {
        // 12
        // Passion - SDE
        question: `The placement season is closing in, but you have managed to land yourself 2 placement offers in the same company. The choice is
now yours to make. One of the offers is for the SDE position, and offers a salary of 25 Lakhs per annum and the other is that
of a Research position with a salary of 40 Lakhs per annum.

Which job would you prefer to take?
    `,
        answers: [
            "Research",
            "SDE",
        ],
        correctAnswerIndex: 0,
    },
    {
        // 13
        // Passion - SDE, Choice - SDE
        //Submit
        question: `
You choose to follow the path of your passion and are satisfied with your decision when a close friend asks you about your choice.
Your friend wants to know what is the minimum salary (in Lakhs) that Research must have offered for you to have considered it over
SDE (preferred job alignment)?  
    `,
        answers: [
            
        ],
        correctAnswerIndex: 1
    },
    {
        // 14
        // Passion - SDE, Choice - Research
        // Yes - Submit
        question: `
You choose to follow the path of greater financial gain and are satisfied with your decision when a senior in the company gives you
crucial information. You are told that the SDE position's salary ends up matching the Research position's pay after a period of 2
years. Will you switch your decision? 
    `,
        answers: [
            "Yes",
            "No"
        ],
        correctAnswerIndex: 0
    },
    {
        // 15
        // Passion - SDE, Choice - Research,, Switch - No
        // Submit
        question: `
Your senior is curious about your decision and wants to know what would have gotten you to make a decision switch. He asks you
what would be the maximum duration (in months) in which the pay must become equal for you to choose SDE (your preferred job)
over research? 
    `,
        answers: [
            
        ],
        correctAnswerIndex: 1
    },
    {
        // 16
        // Submission
        question: `
Thanks for going through our experiment. Please click on the submit button to download your results.
    `,
        answers: [
           
        ],
        correctAnswerIndex: 0
    },
];

export default questions;
