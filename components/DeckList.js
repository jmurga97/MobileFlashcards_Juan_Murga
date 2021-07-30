import { StyleSheet,
            Text,
            View,
            FlatList,
            Pressable } from 'react-native';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { blueAccent } from '../utils/colors';

const Item = ({ title, questions, onPress }) => (
    <Pressable
        style={styles.deckCard}
        android_ripple={{color: blueAccent, borderless: false}}
        onPress = {onPress}>
        <Text style={styles.deckTitle} >Deck: {title}</Text>
        <Text style={styles.deckInfo}>{questions.length} Cards</Text>
    </Pressable>
);

class DeckList extends Component {

    renderItem = ({item}) => {
        return (<Item
                    {...item}
                    onPress = {() => this.onPressDeck(item.id)}/>)
    }

    onPressDeck = (id) =>{
        this.props.navigation.navigate('Deck', {deckId: id})
    }

    render() {
        const decks = this.props.decks
        return (
            <View style = {styles.container}>
                <FlatList
                    data = {decks}
                    keyExtractor = {item => item.id}
                    renderItem = {this.renderItem}/>
            </View>

        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    deckCard: {
        padding: 20,
        marginTop: 10,
        marginBottom: 10,
        height: 80,
        flex: 1,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        //elevation only works on Android
        elevation: 4
        // borderRadius: 5,
        // shadowRadius: 10,
        // shadowOpacity: 1,
        // shadowColor: 'rgba(0,0,0,0.24)',
        // shadowOffset: {
        //     width: 8,
        //     height: 3
        // }
    },
    deckTitle: {
        fontSize: 19,
        fontWeight: 'bold'
    },
    deckInfo: {
        fontSize: 16,
        marginTop: 5
    }
})

function mapStateToProps(state, props) {
    return {
        ...props,
        decks: Object.values(state)
    }
}

export default connect(mapStateToProps)(DeckList)