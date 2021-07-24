import React from 'react';
import { View, StyleSheet, Button, Image, Text } from 'react-native';

import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';

import Colors from '../constants/colors';

const GameOverScreen = ({ guessRounds, userNumber, newGame }) => {

  return (
    <View style={styles.screen}>
      <TitleText>The Game is Over!</TitleText>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require('../assets/success.png')}
          resizeMode="cover"
        />
      </View>
      <View style={styles.textContainer}>
        <BodyText style={styles.text}>Your phone needed <Text style={styles.highlight}>{guessRounds}</Text> rounds to guess the number <Text style={styles.highlight}>{userNumber}</Text></BodyText>
      </View>
      <MainButton onPress={newGame}>NEW GAME</MainButton>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  imageContainer: {
    borderRadius: 150,
    borderWidth: 3,
    borderColor: 'black',
    width: 300,
    height: 300,
    overflow: 'hidden',
    marginVertical: 30
  },
  textContainer: {
    marginHorizontal: 30,
    marginVertical: 15
  },
  highlight: {
    color: Colors.primary,
    fontFamily: 'open-sans-bold'
  },
  text: {
    textAlign: 'center'
  }
});

export default GameOverScreen;
