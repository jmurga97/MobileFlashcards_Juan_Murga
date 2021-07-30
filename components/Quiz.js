import { StyleSheet,
    Text,
    View,
    Pressable,
    ToastAndroid,
    Platform,
    AlertIOS} from 'react-native';
import React, { Component } from 'react'
import { blueAccent, bluePrimary, greenCorrect, orangeFalse } from '../utils/colors';
import {connect} from 'react-redux'
import CardFlip from 'react-native-card-flip';

class Quiz extends Component {

    state ={
        count: 0,
        correctAnswers: 0,
        question: [],
        iterator: null
    }

    //Show a short message Pop Up when the user clicks the button answer
    messageToast = (msg) => {
        if (Platform.OS === 'android') {
            ToastAndroid.showWithGravityAndOffset(
                msg,
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                0,
                50
            );
        } else {
            AlertIOS.alert(msg);
        }
    }

    startAgain = () => {
        this.props.navigation.replace('Quiz',{deckId: this.props.deck.id})
        //In order to use the animation of changing the screens of React Navigation, I refresh the actual view with navigation.replace

        //Another solution is resetting the state like this, but we will not getting the required animation
            // const questions = this.props.deck.questions
            // const arrayIterator = questions[Symbol.iterator]()
            // this.setState({
            //     iterator: arrayIterator,
            //     question: arrayIterator.next(),
            //     count: 0
            // })
    }
    toHome = () => {
        this.props.navigation.navigate('DeckList')
    }
    nextQuestion = (answer) => {
        this.setState((prevState) => ({
            question: prevState.iterator.next(),
            correctAnswers: answer ? prevState.correctAnswers + 1 : prevState.correctAnswers,
            count: prevState.count + 1
        }))
        this.messageToast(answer ? 'Nice!' : 'Oops :(')

    }

    componentDidMount(){
        const questions = this.props.deck.questions
        const arrayIterator = questions[Symbol.iterator]()
        this.setState({
            iterator: arrayIterator,
            question: arrayIterator.next()
        })
    }

    render() {
        const {value} = this.state.question
        const {done} = this.state.question
        const {count, correctAnswers} = this.state
        const numberOfQuestions = this.props.deck.questions.length
        console.log(this.state)
        console.log('TYPE OF VALUE', typeof value)
        console.log('DONE VALUE', done)
        if(!done){
            return(
                <View style={styles.cardContainer}>
                <CardFlip style={styles.card} ref={(card) => this.card = card}>
                    <View style={styles.cardContent}>
                        <Text style={styles.cardTitle}>{typeof value === 'undefined' ? null : value.question}</Text>
                        <Text style={styles.cardInfo}>{numberOfQuestions - count} of {numberOfQuestions} questions left</Text>
                        <Pressable style={{marginTop:150}} onPress = {() => this.card.flip()}>
                            <Text style={styles.answerBtn}>Show Answer</Text>
                        </Pressable>
                        <View style={styles.cardButtons}>
                            <Pressable
                                style={[styles.button, {backgroundColor: greenCorrect}]}
                                android_ripple={{color: 'white', borderless: false}}
                                onPress = {() => this.nextQuestion(true)}>
                                <Text style={styles.buttonText}>Correct</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, {backgroundColor: orangeFalse}]}
                                android_ripple={{color: 'white', borderless: false}}
                                onPress = {() => this.nextQuestion(false)}>
                                <Text style={styles.buttonText}>Incorrect</Text>
                            </Pressable>
                        </View>
                    </View>
                    <View style={styles.backCard}>
                        <Pressable onPress = {() => this.card.flip()}>
                            <Text style={styles.answerTxt}>{typeof value === 'undefined' ? null : value.answer}</Text>
                        </Pressable>
                    </View>
                </CardFlip>
                </View>
            )
        }else if(done && count > 0){
            return(
                <View style={styles.cardContainer}>
                    <View style={[styles.card, styles.cardContent]}>
                        <Text style={styles.cardInfo}>Congratulations! Your score was: </Text>
                        <Text style={styles.cardInfo}>{correctAnswers} of {numberOfQuestions} Cards</Text>
                        <Pressable
                            style={[styles.button, {backgroundColor: bluePrimary}]}
                            android_ripple={{color: 'white', borderless: false}}
                            onPress = {this.startAgain}>
                            <Text style={styles.buttonText}>Restart Quiz</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, {backgroundColor: bluePrimary}]}
                            android_ripple={{color: 'white', borderless: false}}
                            onPress = {this.toHome}>
                            <Text style={styles.buttonText}>Back to Deck</Text>
                        </Pressable>
                    </View>

                </View>
            )
        }
        else if (done && typeof value === 'undefined'){
            return(
                <View style={styles.cardContainer} >
                    <View style={[styles.card, styles.cardContent]}>
                        <Text style={[styles.cardInfo,{textAlign: 'center'}]}>
                            Sorry, you cannot take a quiz because there are no cards in the deck
                        </Text>
                    </View>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        padding: 30
    },
    card: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 10,
        width: '100%',
        shadowColor: 'black',
        shadowOpacity: 0,
        shadowOffset: {
            height: 10,
            width: 10
        }
    },
    cardContent:{
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 50,
    },
    cardInfo: {
        fontSize: 18,
        color: bluePrimary,
    },
    cardTitle: {
        fontSize: 35,
        color: bluePrimary,
        fontWeight: 'bold',
    },
    cardButtons:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    backCard:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: bluePrimary,
        borderRadius: 10,
        elevation: 10,
        color: 'white'
    },
    answerBtn:{
        color: blueAccent,
        fontWeight: 'bold',
        fontSize: 20,
        fontStyle: 'italic'
    },
    answerTxt:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 25
    },
    button:{
        height: 45,
        padding: 10,
        borderRadius: 5,
        justifyContent:'center',
        alignItems: 'center',
        width: '55%',
        marginRight: 10,
        marginLeft: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: "center"
    }
})

function mapStateToProps(state,props) {
    const deckId = props.route.params.deckId
    return{
        ...props,
        deck: state[deckId]
    }
}

export default connect(mapStateToProps)(Quiz)