import { StyleSheet,
    Text,
    View,
    TextInput,
    Pressable,
    KeyboardAvoidingView} from 'react-native';
import React, { Component } from 'react'
import { bluePrimary, blueAccent, grayBackground } from '../utils/colors';
import { connect } from 'react-redux';
import { handleSaveQuestion } from '../actions/questions';

class AddCard extends Component {
    state = {
        question: '',
        answer: ''
    }

    handleChange = (input) => {
        this.setState(input)
    }

    submit = () => {
        this.props.dispatch(handleSaveQuestion(this.props.route.params.deckId, {
            question: this.state.question,
            answer: this.state.answer
        }))
        this.props.navigation.goBack()
    }

    render() {

        return (
            <KeyboardAvoidingView style = {styles.container}>
                <TextInput
                    style = {styles.input}
                    value = {this.state.question}
                    onChangeText = {input => this.handleChange({question: input})}
                    placeholder = 'Set your Question here'></TextInput>
                <TextInput
                    style = {styles.input}
                    value = {this.state.answer}
                    onChangeText = {input => this.handleChange({answer: input})}
                    placeholder = 'Set your Answer here'></TextInput>
                <Pressable onPress = {this.submit}
                    style = {styles.submitBtn}
                    android_ripple={{color: 'white', borderless: true}}>
                        <Text style = {styles.submitBtnText}>SUBMIT</Text>
                </Pressable>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: bluePrimary
    },
    input: {
        height: 40,
        width: '60%',
        margin: 12,
        backgroundColor: grayBackground,
        borderWidth: 3,
        borderRadius: 5,
        borderColor: blueAccent,
        padding: 10,
    },
    submitBtn: {
        height: 45,
        padding: 10,
        borderRadius: 5,
        backgroundColor: "white",
        marginTop: 50,
        width: '30%'
    },
    submitBtnText: {
        color: bluePrimary,
        fontSize: 18,
        textAlign: "center"
    }
})

export default connect()(AddCard)