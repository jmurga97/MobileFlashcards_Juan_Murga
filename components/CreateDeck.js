import { StyleSheet,
            Text,
            View,
            TextInput,
            Pressable,
            KeyboardAvoidingView} from 'react-native';
import React, { Component } from 'react'
import { blueAccent, bluePrimary, grayBackground } from '../utils/colors';
import {clearAll} from '../utils/api';
import { handleSaveDeck } from '../actions/questions';
import { connect } from 'react-redux';

class CreateDeck extends Component {

    state = {
        input: ''
    }

    handleChange = (input) => {
        this.setState({input})
    }

    submit = () =>{
        this.props.dispatch(handleSaveDeck(this.state.input))
        this.setState({input: ''})
        this.props.navigation.navigate('DeckList')
    }
    clear = () => {
        clearAll()
    }

    render() {
        return (

                <KeyboardAvoidingView behavior='padding' style={styles.container}>
                    <Text style={styles.title}>What is the title of your Deck ?</Text>
                    <TextInput
                        style = {styles.input}
                        value = {this.state.input}
                        placeholder = 'Set the title here'
                        onChangeText = {input => this.handleChange(input)}></TextInput>
                    <Pressable onPress = {this.submit}
                        style = {styles.submitBtn}
                        android_ripple={{color: 'white', borderless: true}}>
                            <Text style = {styles.submitBtnText}>SUBMIT</Text>
                    </Pressable>
                        {/* <Pressable onPress = {this.clear}
                        style = {styles.submitBtn}
                        android_ripple={{color: 'white', borderless: true}}>
                            <Text style = {styles.submitBtnText}>CLEAR DATABASE</Text>
                        </Pressable> */}
                </KeyboardAvoidingView>

        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 50,
        backgroundColor: bluePrimary
    },
    title: {
        fontSize: 22,
        textAlign: 'center',
        color: 'white'
    },
    input: {
        height: 40,
        width: '60%',
        margin: 12,
        borderWidth: 3,
        borderRadius: 5,
        borderColor: blueAccent,
        padding: 10,
        backgroundColor: grayBackground
    },
    submitBtn: {
        height: 45,
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'white',
        marginBottom: 50,
        width: '60%'
    },
    submitBtnText: {
        color: bluePrimary,
        fontSize: 16,
        textAlign: "center"
    }
})

export default connect()(CreateDeck)