import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function PoolishYeastCalculator() {
  const [flour, setFlour] = useState('100');
  const [temp, setTemp] = useState('20');
  const [hours, setHours] = useState('24');
  const [yeast, setYeast] = useState(null);

  const calculateYeast = () => {
    const flourNum = parseFloat(flour);
    const tempNum = parseFloat(temp);
    const hoursNum = parseFloat(hours);

    const baseTemp = 20;
    const baseTime = 24;
    const basePercent = 0.035 / 100;

    const tempFactor = Math.pow(baseTemp / tempNum, 0.8);
    const timeFactor = Math.pow(baseTime / hoursNum, 1.2);

    const adjustedPercent = basePercent * tempFactor * timeFactor;
    const dryYeast = flourNum * adjustedPercent;

    setYeast(dryYeast.toFixed(4));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kalkulator suhog kvasca za poolish</Text>
      <Text style={styles.label}>Brašno (g)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={flour}
        onChangeText={setFlour}
      />
      <Text style={styles.label}>Temperatura (°C)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={temp}
        onChangeText={setTemp}
      />
      <Text style={styles.label}>Vrijeme fermentacije (sati)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={hours}
        onChangeText={setHours}
      />
      <Button title=\"Izračunaj\" onPress={calculateYeast} />
      {yeast !== null && (
        <Text style={styles.result}>
          Potrebno suhog kvasca: <Text style={styles.bold}>{yeast} g</Text>
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    marginTop: 10,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center',
  },
  bold: {
    fontWeight: 'bold',
  },
});
