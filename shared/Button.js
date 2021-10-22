import React from 'react'
import {Text, TouchableOpacity, StyleSheet} from 'react-native'
import {purple, white} from '../utils/colors'

export default function Button ({title, onPress,style}) {
    return (
        <TouchableOpacity 
        style = {style}
        onPress = {onPress}>
            <Text style = {styles.submitBtnText}>{title}</Text>
        </TouchableOpacity>
       
    )
}

const styles = StyleSheet.create({
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center',
    },
})