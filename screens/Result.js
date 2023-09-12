import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const Result = () => {
  const route = useRoute();
  const receivedData = route.params?.isPlayerTurn;
  const navigation = useNavigation();
  const resetGame = () => {
    navigation.navigate('GamePlay', { receivedData });
  };
  return (
    <View style={styles.container}>
      {receivedData ? (
        <Text style={styles.resultText}>You Lose! AI Wins!</Text>
      ) : (
        <Text style={styles.resultText}>You Win! AI Loses!</Text>
      )}
      <Button title="Play Again" onPress={resetGame} />
      <Button title="Scores" onPress={resetGame} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default Result;
