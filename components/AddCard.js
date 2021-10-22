import React, {Component} from 'react'
import {Text, View, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView,} from 'react-native'
import {white, purple} from '../utils/colors'
import {connect} from 'react-redux'
import {addCard} from '../actions/index'
import {addCardToDeck} from '../utils/api'
import {NavigationActions} from 'react-navigation'

function SubmitBtn ({title, onPress}) {
    return (
        <TouchableOpacity 
        style = {styles.iosSubmitBtn}
        onPress = {onPress}>
            <Text style = {styles.submitBtnText}>Submit</Text>
        </TouchableOpacity>
    )
};

class AddCard extends Component {
    state = {
        question: '',
        answer: '',
        correctAnswer: ''
    }
    submit = (deck) => {
        const {question, answer, correctAnswer } = this.state
        this.props.dispatch(addCard({question, answer, deck, correctAnswer}))
        addCardToDeck(deck,{question, answer, correctAnswer})
        this.setState({question: '', answer: '', correctAnswer: ''})
        this.props.navigation.dispatch(NavigationActions.back({key: null}))
    }
render() {
    const deckName = this.props.navigation.state.params.entryId
    return (
        <KeyboardAvoidingView style = {styles.card}>
            <View style = {styles.card}>
                <Text style = {styles.textFont}>Question:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText ={(question) => this.setState({question: question})}
                    placeholder = 'Question'
                    value = {this.state.question}
                />
                <Text style = {styles.textFont}>Answer:</Text>
                 <TextInput
                    style={styles.input}
                    onChangeText ={(answer) => this.setState({answer: answer})}
                    placeholder = 'Answer'
                    value = {this.state.answer}
                />
                <Text style = {styles.textFont}>What is the correct answer ?</Text>
                <TextInput
                    style={styles.input}
                    onChangeText ={(correctAnswer) => this.setState({correctAnswer: correctAnswer})}
                    placeholder = 'Correct answer'
                    value = {this.state.correctAnswer}
                />
               <SubmitBtn onPress = {() => this.submit(deckName)}/>
            </View>
        </KeyboardAvoidingView>
    )
}
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        margin: 15,
        height: 40,
        width: 375, 
        borderColor: 'black',
        borderWidth: 1,
        marginTop: 30
        
     },
     iosSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
        marginTop: 50
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
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center',
    },
    textFont: {
        fontSize: 25,
    },
    card: {
        flex: 1,
        justifyContent: 'center',
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
})
export default connect()(AddCard)