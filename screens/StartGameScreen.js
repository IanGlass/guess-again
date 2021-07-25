import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions
} from 'react-native';

import TitleText from '../components/TitleText';
import BodyText from '../components/BodyText';
import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import MainButton from '../components/MainButton';

import Colors from '../constants/colors';

const StartGameScreen = ({ startGame }) => {

  const [enteredValue, setEnteredValue] = useState('');
  const [confirmInput, setConfirmInput] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      return Alert.alert(
        'Invalid Number!',
        'Number must be between 1 and 99',
        [
          {
            text: ' Okay',
            style: 'destructive',
            onPress: resetInput
          }
        ]
      );
    }
    setConfirmInput(true);
    setSelectedNumber(parseInt(enteredValue));
    setEnteredValue('');
    Keyboard.dismiss();
    startGame();
  };

  const resetInput = () => {
    setEnteredValue('');
    setConfirmInput(false);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.screen}>
        <TitleText style={styles.title}>Start a New Game!</TitleText>
        <Card style={styles.inputContainer}>
          <BodyText>Select a Number</BodyText>
          <Input
            style={styles.input}
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="number-pad"
            maxLength={2}
            onChangeText={(value) => setEnteredValue(value.replace(/[^0-9]/g, ''))}
            value={enteredValue}
          />
          <View style={styles.buttonsContainer}>
            <View style={styles.button}>
              <Button
                onPress={resetInput}
                color={Colors.primary}
                title="Reset"
              />
            </View>
            <View style={styles.button}>
              <Button
                onPress={confirmInputHandler}
                color={Colors.secondary}
                title="Confirm"
              />
            </View>
          </View>
        </Card>

        {confirmInput &&
          <Card style={styles.summaryContainer}>
            <Text>You Selected</Text>
            <NumberContainer>{selectedNumber}</NumberContainer>
            <MainButton onPress={() => startGame(selectedNumber)}>START GAME</MainButton>
          </Card>
        }

      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 100
  },
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  title: {
    marginVertical: 10
  },
  inputContainer: {
    width: Dimensions.get('window').width / 4,
    minWidth: 300,
    maxWidth: '95%',
    alignItems: 'center'
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15
  },
  input: {
    width: 100,
    textAlign: 'center'
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: 'center'
  }
});

export default StartGameScreen;
