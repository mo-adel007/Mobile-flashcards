import React, { Component } from 'react'
import { View, Text, TextInput,StyleSheet, TouchableOpacity, TouchableHighlightBase,KeyboardAvoidingView} from 'react-native'
import {saveDeckTitle} from '../utils/api'
import {purple,white} from '../utils/colors'
import {addDeck} from '../actions'
import {connect} from 'react-redux'

function SubmitBtn ({title, onPress}) {
    return (
        <TouchableOpacity 
        style = {Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
        onPress = {onPress}>
            <Text style = {styles.submitBtnText}>Create</Text>
        </TouchableOpacity>
    )
};
 class AddDeck extends Component {
     state = {
        title: ''
     }
     submit = () => {
         const {title} = this.state
         saveDeckTitle(title)
         this.props.dispatch(addDeck(title))
         this.props.navigation.navigate('ViewDeck', {entryId: title})
         this.setState({title: ''})
     }
   render() {
        return (
            <KeyboardAvoidingView style = {styles.container}>
                <Text style = {styles.textFont}>What is the title of your new deck?</Text>
                <TextInput
                    style={styles.input}
                    onChangeText ={(title) => this.setState({title: title})}
                    value = {this.state.title}
                />
                <SubmitBtn onPress ={this.submit}/>
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
        width: 250, 
        borderColor: 'black',
        borderWidth: 1
     },
     iosSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
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
    }
})
export default connect()(AddDeck)