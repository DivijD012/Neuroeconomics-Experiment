import React from "react";
import * as fs from "fs";

import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Answer from "./components/Answer/Answer";
import Result from "./components/Result/Result";
import QuestionParagraph from "./components/Question/Question.js";
import addCssTransition from "./utils/css-transition";
import { withStyles, MuiThemeProvider } from "@material-ui/core/styles";

import logo from "../assets/logo.svg";
import theme from "./styles/theme";
import styles from "./app-style";
import questionsFactory from "./models/factories/get-questions-factory";
import submitFactory from "./models/factories/submit-questions-factory";

import CircularLoading from "./components/CircularLoading";

import getQuestions from "./models/services/questions/local/get-questions";

import questionsData from "./models/services/questions/local/data/questionsData.js";

class App extends React.Component {
    lastTimeButtonClicked = new Date().getTime();
    jsonOutput = {

    }

    constructor(props) {
        super(props);
    
        // State initialization
        this.state = {
            questions: null,
            result: null,
            questionsAnswers: [],
            currentQuestionIndex: 0,
            showMultiple: true,
            input_value: "",
        };
    }

    componentDidUpdate(prevProps, prevState) {
        this.updateButtonsPos();

        setTimeout(() => {
            this.updateButtonsPos();
        }, 0);
    }

    componentDidMount() {
        window.onorientationchange = () => this.updateButtonsPos();
        window.onresize = () => this.updateButtonsPos();

        questionsFactory(false).then(value => {
            this.setState({ questions: value }, () => {
                this.updateButtonsPos();
            });
        });

        this.updateButtonsPos();
        setTimeout(() => {
            this.updateButtonsPos();
        }, 0);
    }

    makeid(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
          counter += 1;
        }
        return result;
    }

    route(index) {
        if(questionsData[index].correctAnswerIndex == 1)
        {
            index = 12;
        }
        else if(index == 3)
        {
            if(this.state.questionsAnswers[index] == 0)
                index = 8;
            else
                index = 4;
        }
        else if(index == 4)
        {
            if(this.state.questionsAnswers[index] == 0)
                index = 5;
            else
                index = 6;
        }
        else if(index == 6)
        {
            if(this.state.questionsAnswers[index] == 0)
                index = 12;
            else
                index = 7;
        }
        else if(index == 8)
        {
            if(this.state.questionsAnswers[index] == 0)
                index = 10;
            else
                index = 9;
        }
        else if(index == 10)
        {
            if(this.state.questionsAnswers[index] == 0)
                index = 12;
            else
                index = 11;
        }
        else
        {
            index += 1;
        }
        return index;
    }

    onNextClick = e => {
        let thisTime = new Date().getTime()
        const currentState = this.state;
        const timeDiff = (thisTime - this.lastTimeButtonClicked)/1000
        let timestring = currentState.currentQuestionIndex + "_time"
        if (currentState.currentQuestionIndex === currentState.questions.length - 1 || this.areButtonsAnimating()) {
            return;
        }
        console.log(this.state.questionsAnswers[this.state.currentQuestionIndex]);
        if(questionsData[currentState.currentQuestionIndex].correctAnswerIndex == 0)
            this.jsonOutput[currentState.currentQuestionIndex] = this.state.questionsAnswers[this.state.currentQuestionIndex];
        else
            this.jsonOutput[currentState.currentQuestionIndex] = this.state.input_value;
        this.jsonOutput[timestring] = timeDiff;
        currentState.currentQuestionIndex = this.route(currentState.currentQuestionIndex);
        this.state.input_value = ""
        if(questionsData[currentState.currentQuestionIndex].correctAnswerIndex == 0)
            this.setState({showMultiple: true})
        else
            this.setState({showMultiple: false})
        console.log(this.jsonOutput);
        this.updatePage(currentState.currentQuestionIndex);
    };

    onPrevClick = e => {
        const currentState = this.state;

        if (currentState.currentQuestionIndex === 0 || this.areButtonsAnimating()) {
            return;
        }

        this.updatePage(--currentState.currentQuestionIndex);
    };

    onSubmitClick = e => {
        const currentState = this.state;

        // this.setState({
        //     questions: null,
        //     questionsAnswers: [],
        //     currentQuestionIndex: 0
        // });
        let getRandomId = this.makeid(25)
        getRandomId += ".json"
        const jsonString = JSON.stringify(this.jsonOutput, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = getRandomId;
        downloadLink.click();
        URL.revokeObjectURL(downloadLink.href);
        // let result = await submitFactory(null, currentState.questions, currentState.questionsAnswers);
        // this.setState({
        //     result
        // });
    };

    onTryAgainPressed = async () => {
        this.setState({
            questions: null,
            questionsAnswers: [],
            currentQuestionIndex: 0,
            result: null
        });

        this.setState({
            questions: await getQuestions()
        })
    };

    onAnswerSelected = answerId => {
        let clickedAnswerIndex = answerId;
        let currentState = this.state;
        const currentAnswers = this.state.questionsAnswers;
        currentAnswers[currentState.currentQuestionIndex] = clickedAnswerIndex;

        this.setState({
            userAnswerIndexes: currentAnswers
        });
    };

    updateButtonsPos = () => {
        if (!this.questionsLoaded()) {
            return false;
        }

        let buttons = Array.from(document.getElementById("buttonsContainer").children);
        let mainContainer = document.getElementById("mainContainer");

        buttons.forEach(button => {
            button.children[0].style.bottom = "0px";
        });

        const bottomPosition = mainContainer.clientHeight - mainContainer.scrollHeight + 20;

        buttons.forEach(button => {
            button.children[0].style.bottom = bottomPosition + "px";
        });
    };

    isNumeric(num){
        return !isNaN(num)
      }
      

    updatePage = questionIndex => {
        this.lastTimeButtonClicked = new Date().getTime();
        document.getElementById("mainContainer").scrollTop = 0;
        this.setState({
            currentQuestionIndex: questionIndex
        });
    };

    handleInputChange = (event) => {
        this.setState({ input_value: event.target.value });
      };
    

    questionsLoaded = () => (this.state.questions !== null ? true : false);
    getCurrentQuestion = () => this.state.questions[this.state.currentQuestionIndex].question;
    getCurrentAnswers = () => this.state.questions[this.state.currentQuestionIndex].answers;
    isAnswerSelected = answerIndex => this.state.questionsAnswers[this.state.currentQuestionIndex] === answerIndex;
    shouldShowSubmit = () =>
        this.state.currentQuestionIndex === this.state.questions.length - 1
    shouldShowNext = () =>
        this.state.currentQuestionIndex !== this.state.questions.length - 1 &&
        this.state.questionsAnswers[this.state.currentQuestionIndex] !== undefined;
    shouldShowNext2 = () =>
        this.state.currentQuestionIndex !== this.state.questions.length - 1 &&
        this.state.input_value !== "" &&
        this.isNumeric(this.state.input_value)

    shouldShowPrev = () => false; // this.state.currentQuestionIndex !== 0;
    areButtonsAnimating = () => {
        const transitionTime = 600;
        const currentTime = new Date().getTime();

        return currentTime - transitionTime <= this.lastTimeButtonClicked;
    };

    render() {
        const { classes } = this.props;
        return (
            <MuiThemeProvider theme={theme}>
                {
                    this.state.showMultiple == true ? (
                    addCssTransition(
                        <Paper id="mainContainer" className={classes.paper} elevation={2}>
                            {/* <img key={"logo"} src={logo} className={classes.logo} alt="logo" /> */}
                            {/* <hr key={"horizontalLine"} width={"100%"} /> */}
                            {this.questionsLoaded() && this.state.result == null ? (
                                <div>
                                    {addCssTransition(
                                        <div key={this.getCurrentQuestion()}>
                                            <QuestionParagraph
                                                question={this.getCurrentQuestion()}
                                                questionIndex={this.state.currentQuestionIndex + 1}
                                                questionsLength={this.state.questions.length}
                                            />

                                            <div className={classes.answerContainer}>
                                                {this.getCurrentAnswers().map((currentAnswer, index) => (
                                                    <Answer
                                                        answerIndex={index}
                                                        key={this.getCurrentQuestion() + index}
                                                        answer={currentAnswer}
                                                        isSelected={this.isAnswerSelected(index)}
                                                        onAnswerSelect={this.onAnswerSelected}
                                                    />
                                                ))}
                                            </div>

                                            <div id="buttonsContainer">
                                                {this.shouldShowSubmit()
                                                    ? addCssTransition(
                                                        <Button
                                                            variant="contained"
                                                            className={classes.btnSubmit}
                                                            onClick={this.onSubmitClick}
                                                            color="primary"
                                                        >
                                                            Submit
                                                        </Button>
                                                    )
                                                    : null}

                                                {this.shouldShowNext()
                                                    ? addCssTransition(
                                                        <Button
                                                            variant="contained"
                                                            className={classes.btnNext}
                                                            onClick={this.onNextClick}
                                                            color="primary"
                                                        >
                                                            Next
                                                        </Button>
                                                    )
                                                    : null}

                                                {this.shouldShowPrev()
                                                    ? addCssTransition(
                                                        <Button
                                                            variant="contained"
                                                            className={
                                                                this.shouldShowSubmit()
                                                                    ? classes.btnPrevSubmit
                                                                    : classes.btnPrev
                                                            }
                                                            onClick={this.onPrevClick}
                                                            color="primary"
                                                        >
                                                            Prev
                                                        </Button>
                                                    )
                                                    : null}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : this.state.result !== null ? (
                                addCssTransition(
                                    <Result result={this.state.result} tryAgainPressed={this.onTryAgainPressed} />
                                )
                            ) : (
                                <CircularLoading key={"loadingCircle"} />
                            )}
                        </Paper>
                    ))
                    :
                    (addCssTransition(
                        <Paper id="mainContainer" className={classes.paper} elevation={2}>
                            {/* <img key={"logo"} src={logo} className={classes.logo} alt="logo" /> */}
                            {/* <hr key={"horizontalLine"} width={"100%"} /> */}
                            {this.questionsLoaded() && this.state.result == null ? (
                                <div>
                                    {addCssTransition(
                                        <div key={this.getCurrentQuestion()}>
                                            <QuestionParagraph
                                                question={this.getCurrentQuestion()}
                                                questionIndex={this.state.currentQuestionIndex + 1}
                                                questionsLength={this.state.questions.length}
                                            />

                                            <div className={classes.answerContainer}>
                                                <br/>
                                                <input type="text" id="textInput" value={this.state.input_value} onChange={this.handleInputChange}/>
                                                <label htmlFor="textInput">:</label>'
                                            </div>

                                            <div id="buttonsContainer">
                                                {this.shouldShowSubmit()
                                                    ? addCssTransition(
                                                        <Button
                                                            variant="contained"
                                                            className={classes.btnSubmit}
                                                            onClick={this.onSubmitClick}
                                                            color="primary"
                                                        >
                                                            Submit
                                                        </Button>
                                                    )
                                                    : null}

                                                {this.shouldShowNext2()
                                                    ? addCssTransition(
                                                        <Button
                                                            variant="contained"
                                                            className={classes.btnNext}
                                                            onClick={this.onNextClick}
                                                            color="primary"
                                                        >
                                                            Next
                                                        </Button>
                                                    )
                                                    : null}

                                                {this.shouldShowPrev()
                                                    ? addCssTransition(
                                                        <Button
                                                            variant="contained"
                                                            className={
                                                                this.shouldShowSubmit()
                                                                    ? classes.btnPrevSubmit
                                                                    : classes.btnPrev
                                                            }
                                                            onClick={this.onPrevClick}
                                                            color="primary"
                                                        >
                                                            Prev
                                                        </Button>
                                                    )
                                                    : null}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : this.state.result !== null ? (
                                addCssTransition(
                                    <Result result={this.state.result} tryAgainPressed={this.onTryAgainPressed} />
                                )
                            ) : (
                                <CircularLoading key={"loadingCircle"} />
                            )}
                        </Paper>
                    ))
                }
            </MuiThemeProvider>
        );
    }
}

export default withStyles(styles)(App);
