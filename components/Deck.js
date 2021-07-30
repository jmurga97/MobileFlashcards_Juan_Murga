import React, {useEffect} from 'react'
import { StyleSheet,
            Text,
            View,
            Pressable } from 'react-native';
import { connect } from 'react-redux';
import { grayBackground, bluePrimary, blueAccent } from '../utils/colors';


function Deck(props) {
    const {deck} = props

    const startQuiz = () => {
        props.navigation.navigate('Quiz',{deckId: deck.id})
    }
    const addCard = () => {
        props.navigation.navigate('AddCard',{deckId: deck.id})
    }

    //componentDidMount equivalent React hook
    useEffect(() => {
        //With setOptions we can change dynamically the title of the View
        props.navigation.setOptions({
            title: `Deck: ${deck.title}`
        })
    }, [])

    return (
        <View style = {styles.container}>
            <View style={styles.card}>
                <Text style={styles.cardTitle}>{deck.title}</Text>
                <Text style={styles.cardInfo}>{deck.questions.length} Cards</Text>
                <View style={styles.cardButtons}>
                    <Pressable
                        style={styles.button}
                        android_ripple={{color: 'white', borderless: false}}
                        onPress = {startQuiz}>
                        <Text style={styles.buttonText}>Start Quiz</Text>
                    </Pressable>
                    <Pressable
                        style={styles.button}
                        android_ripple={{color: 'white', borderless: false}}
                        onPress = {addCard}>
                        <Text style={styles.buttonText}>Add Card</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30
    },
    card: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
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
    cardTitle: {
        fontSize: 35,
        color: bluePrimary,
        fontWeight: 'bold',
        marginTop: 80
    },
    cardInfo: {
        fontSize: 20,
        color: bluePrimary,
        position: 'absolute',
        top: 150
    },
    cardButtons:{
        alignItems: 'center',
        width: '100%',
        position: 'absolute',
        bottom: 100
    },
    button: {
        height: 45,
        padding: 10,
        borderRadius: 5,
        backgroundColor: bluePrimary,
        elevation: 5,
        marginBottom: 15,
        width: '30%'
    },
    buttonAddCard: {
        position: 'absolute',

    },
    buttonQuiz: {
        position: 'absolute'
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: "center",
    }
})

function mapStateToProps(state, props) {
    const deckId = props.route.params.deckId
    return {
        ...props,
        deck: state[deckId]
    }
}

export default connect(mapStateToProps)(Deck)