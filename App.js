import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {
  const [selectedNumber, setSelectedNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onError={(error) => console.log(error)}
        onFinish={() => setDataLoaded(true)}
      />
    );
  }

  const startGame = (selectedNumber) => {
    setSelectedNumber(selectedNumber);
    setGuessRounds(0);
  };

  const gameOver = (numOfRounds) => {
    setGuessRounds(numOfRounds);
  }

  const newGame = () => {
    setSelectedNumber(null);
    setGuessRounds(0);
  }

  let content = <StartGameScreen startGame={startGame} />;

  if (selectedNumber && guessRounds <= 0) {
    content = <GameScreen userChoice={selectedNumber} onGameOver={gameOver} />;
  } else if (guessRounds > 0) {
    content = <GameOverScreen guessRounds={guessRounds} userNumber={selectedNumber} newGame={newGame} />;
  }

  return (
    <View style={styles.screen}>
      <Header title='hello world' />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
