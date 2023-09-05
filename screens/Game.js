import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Game = () => {
  const [coins, setCoins] = useState(21);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    if (!isPlayerTurn && coins > 0) {
      const timer = setTimeout(() => {
        let aiMove;
        if (coins === 1) {
          aiMove = 1;
        } else if (coins <= 5) {
          aiMove = coins === 5 ? 4 : (coins - 1) % 4 || 1;
        } else {
          aiMove = Math.min(coins % 5 || 1, Math.floor(Math.random() * 4) + 1);
        }

        setCoins(coins - aiMove);
        setIsPlayerTurn(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, coins]);

  const handlePlayerMove = (count) => {
    if (count < 1 || count > 4 || count > coins) {
      alert('Invalid move. Pick 1 to 4 coins.');
      return;
    }

    setCoins(coins - count);
    setIsPlayerTurn(false);
  };

  const navigateToResultScreen = () => {
    navigation.navigate('Result', { isPlayerTurn });
    setCoins(21);
    setIsPlayerTurn(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Turn-Based Coin Game</Text>
      <Text style={styles.coinsText}>Coins Remaining: {coins}</Text>
      {coins === 0 ? (
        <Button title="See Result" onPress={navigateToResultScreen} />
      ) : (
        <View>
          {isPlayerTurn ? (
            <View>
              <Text style={styles.turnText}>Your Turn</Text>
              <View style={styles.buttonContainer}>
                <Button
                  title="Pick 1 Coin"
                  onPress={() => handlePlayerMove(1)}
                />
                <Button
                  title="Pick 2 Coins"
                  onPress={() => handlePlayerMove(2)}
                />
                <Button
                  title="Pick 3 Coins"
                  onPress={() => handlePlayerMove(3)}
                />
                <Button
                  title="Pick 4 Coins"
                  onPress={() => handlePlayerMove(4)}
                />
              </View>
            </View>
          ) : (
            <Text style={styles.turnText}>AI is Thinking...</Text>
          )}
        </View>
      )}
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  coinsText: {
    fontSize: 18,
    marginBottom: 20,
  },
  turnText: {
    fontSize: 20,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default Game;
