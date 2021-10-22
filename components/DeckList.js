import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import {connect} from 'react-redux'
import {getDecks} from '../utils/api'
import {receiveDecks} from '../actions'
import { withOrientation } from 'react-navigation'
import {black, white, purple, lightgray} from '../utils/colors'
import {getCardsLength} from '../utils/helpers'

 class DeckList extends Component {
     componentDidMount() {
        getDecks().then((decks) => this.props.receiveAllDecks(decks))
     }
    render() {
        const {decks} = this.props;
        return (
            <ScrollView style = {styles.container}>
                {Object.keys(decks).map((deck) => {
                    const {title, questions} = decks[deck];
                    return (
                        <View key = {deck} style = {styles.card}>
                            <Text style = {{fontSize: 30, color: purple}} onPress={ ()=> this.props.navigation.navigate('ViewDeck', {entryId: deck}) }>{title}</Text>
                            <Text style = {styles.cardText}>{questions ? getCardsLength(questions) : null}</Text>
                        </View>
                    )
                })}
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',
        padding: 5
    },
    card: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: lightgray,
        margin: 8,
        height: 200,
        borderRadius: 10,
        shadowColor: 'rgba(0,0,0,0.34)',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 4,
        shadowOpacity: 1
    },
    cardText: {
        fontSize: 20,
        color: purple
    },
})
function mapDispatchToProps(dispatch){
    return {
        receiveAllDecks: (decks) => dispatch(receiveDecks(decks))
    }
}
function mapStateToProps(decks) {
    return {
        decks
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DeckList) 