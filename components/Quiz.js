import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import {NavigationActions} from 'react-navigation'
import Button from '../shared/Button'
import {connect} from 'react-redux'
import {purple,white, black, red, green} from '../utils/colors'

function ToggleAnswer ({title, onPress}) {
    return (
        <TouchableOpacity style = {styles.submitBtnText} onPress = {onPress}>
            <Text style = {styles.submitBtnText}>{title}</Text>
        </TouchableOpacity>
    )
};

class Quiz extends React.Component {

    state = {
        questionNumber: 0,
        showQuestion: false,
        correct: 0,
        incorrect: 0
    }
    showAnswer = () => (
        !this.state.showQuestion ? this.setState({showQuestion: true})
        : this.setState({showQuestion: false})
    )
    SubmitAnswer = (answer) => {
        const {questionNumber} = this.state
        const deck = this.props.navigation.state.params.entryId
        const decks = this.props.decks
        const correct = decks[deck].questions[questionNumber].correctAnswer.toLowerCase();

        if (answer === correct) {
            this.setState({ correct: this.state.correct +1 })
        }
        else {
            this.setState({ incorrect: this.state.incorrect +1 })
        }
        this.setState({ questionNumber: this.state.questionNumber +1, showQuestion: false })
    }

    tryAgain = () => {
        this.setState({
            questionNumber: 0,
            showQuestion: false,
            correct: 0,
            incorrect: 0,
        })
    }

    goBack = () => {
        this.props.navigation.dispatch(NavigationActions.back({key: null}))
    }

    render() {
        const questionNumber = this.state.questionNumber
        const deck = this.props.navigation.state.params.entryId
        const decks = this.props.decks
        const number = this.state.questionNumber + 1

        if (questionNumber === decks[deck].questions.length) {
            return (
                <View style = {styles.container}>
                    <View style = {styles.card}>
                        <Text  style = {{fontSize: 40}}> You got {this.state.correct} out of {decks[deck].questions.length} !</Text>
                        {this.state.correct > this.state.incorrect ? <Text style = {{fontSize: 40}}></Text>
                         : <Text style = {{fontSize: 30}}>TRY AGAIN</Text>}
                         <View>
                            <Button style = {styles.correctBtn} title = "Back" onPress = {this.goBack}/>
                            <Button style = {styles.incorrectBtn} title = "Try Again" onPress = {this.tryAgain}/>
                         </View>
                    </View>
                </View>
            )
        }
        return (
            <View style = {styles.container}>
                <View style = {styles.card}>
                    <Text style = {styles.questions} >{number} / {decks[deck].questions.length}</Text>
                    {!this.state.showQuestion ? <Text style = {{fontSize: 40}}>{decks[deck].questions[questionNumber].question}</Text>
                     : <Text style = {{fontSize: 40}}>{decks[deck].questions[questionNumber].answer}</Text>}
                    {!this.state.showQuestion ? <ToggleAnswer style = {styles.showAnswer} title = 'Show Answer' onPress ={this.showAnswer}></ToggleAnswer>
                     : <ToggleAnswer style = {styles.showAnswer} title = 'Show Question' onPress ={this.showAnswer}></ToggleAnswer>}
                     <View>
                        <Button style = {styles.correctBtn} title = "Correct" onPress = {() => this.SubmitAnswer('true')}/>
                        <Button style = {styles.incorrectBtn} title = "Incorrect" onPress = {() => this.SubmitAnswer('false')}/>
                     </View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitBtnText: {
        color: black,
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 50,
        marginTop: 50
    },
    correctBtn: {
        backgroundColor: green,
        padding: 10,
        borderRadius: 7,
        height: 45,
        margin: 5,
        marginLeft: 40,
        marginRight: 40,
        width: 200
    },
    incorrectBtn: {
        backgroundColor: red,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
        width: 200
    },
    androidSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 2,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 10,
        backgroundColor: "#C0C0C0",
        height: 200,
        alignSelf: 'stretch',
        borderRadius: 10,
        shadowColor: 'rgba(0,0,0,0.34)',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 4,
        shadowOpacity: 1
    },
    questions: {
        top: 0,
        alignSelf: 'flex-start',
        left: 0,
        color: purple,
        fontSize: 20,
        margin: 5,
        position: 'absolute'
    },
    showAnswer: {
        color: white,
        fontSize: 20,
        margin: 50
    }
})
function mapStateToProps(decks) {
return{
    decks
    }
}
export default connect(mapStateToProps)(Quiz)