import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { purple } from '../utils/colors'
import Button from '../shared/Button'
import {connect} from 'react-redux'
import {getCardsLength} from '../utils/helpers'

class ViewDeck extends Component {
    render() {
        const deck = this.props.navigation.state.params.entryId
        const {decks} = this.props
        const questions = decks[deck].questions
        return (
            <View style = {styles.container}>
                <View style = {styles.card}>
                    <Text style ={{fontSize: 50}} >{decks[deck].title}</Text>
                    <Text style = {styles.text}>{questions ? getCardsLength(questions) : null}</Text>
                    <Button style = {styles.iosSubmitBtn} title="Add Card" onPress={ ()=> this.props.navigation.navigate('AddCard', {entryId: deck}) } />
                    <Button style = {styles.iosSubmitBtn} title="Start Quiz" onPress={() => this.props.navigation.navigate('Quiz', {entryId:deck})} />
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
        padding: 10,
    },   
    iosSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        borderRadius: 7,
        height: 45,
        margin : 5,
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
        justifyContent: 'center',
        alignItems: 'center',

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
    text: {
        fontSize: 25,
        marginBottom: 150,
    },
})
function mapStateToProps(decks) {
    return {
        decks
    }
}
export default connect(mapStateToProps)(ViewDeck)