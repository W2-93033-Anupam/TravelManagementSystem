import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

const SimpleDatePicker = ({ label, value, onDateChange, minimumDate }) => {
  const [showInput, setShowInput] = useState(false);
  const [tempDate, setTempDate] = useState(value || '');

  const formatDate = (dateString) => {
    if (!dateString) return 'Select Date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };

  const handleDateSubmit = () => {
    if (tempDate) {
      onDateChange(tempDate);
      setShowInput(false);
    }
  };

  const getTodayString = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  if (showInput) {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          label="Date (YYYY-MM-DD)"
          value={tempDate}
          onChangeText={setTempDate}
          placeholder={getTodayString()}
          mode="outlined"
          style={styles.input}
        />
        <View style={styles.buttonRow}>
          <Button mode="outlined" onPress={() => setShowInput(false)} style={styles.button}>
            Cancel
          </Button>
          <Button mode="contained" onPress={handleDateSubmit} style={styles.button}>
            Set Date
          </Button>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity style={styles.dateButton} onPress={() => setShowInput(true)}>
        <Text style={styles.dateText}>{formatDate(value)}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  dateButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  input: {
    marginBottom: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    flex: 1,
  },
});

export default SimpleDatePicker;