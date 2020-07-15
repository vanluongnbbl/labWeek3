import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';

const ConversionTypeButton = ({ to, from, toCurrency, fromCurrency, setConversionCurrencies }) => {
  const isSelectedConversionType = fromCurrency === from && toCurrency === to
  const fromFlag = from === 'usd' ? 'US' : 'VN'
  const toFlag = to === 'usd' ? 'US' : 'VN'
  const backgroundColor = isSelectedConversionType ? 'lightblue' : null
  const buttonStyle = { backgroundColor: backgroundColor }

  return (
    <View style={styles.wrapBtnSubmit}>
      <TouchableOpacity style={[styles.btnSubmit, buttonStyle]}
        onPress={() => setConversionCurrencies(from, to)}
      >
        <Text style={styles.btnSubmitText}>{fromFlag} to {toFlag}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default function App() {
  const [toCurrency, setToCurrency] = useState('usd')
  const [fromCurrency, setFromCurrency] = useState('vnd')
  const [currentCurrencyValue, setFromCurrencyValue] = useState(0)
  const [convertedCurrencyValue, setConvertedValue] = useState(0)

  const convertCurrency = () => {
    let value
    if (fromCurrency === 'vnd') {
      value = currentCurrencyValue / 23000
    } else {
      value = 23000 * currentCurrencyValue
    }
    setConvertedValue(value)
  }

  const setConversionCurrencies = (from, to) => {
    setToCurrency(to)
    setFromCurrency(from)
  }

  useEffect(convertCurrency)

  return (
    <View style={styles.container}>
      <Text>Please enter the value of the currency you want to convert</Text>
      <TextInput
        style={styles.inputCurrency}
        // onChangeText={(text) => this.setState({ currentCurrentcyValue: text })}
        onChangeText={setFromCurrencyValue}
        autoFocus={true}
        selectionColor="red"
        keyboardType="number-pad"
        placeholder="100,000,000 VND"
      />

      <ConversionTypeButton
        toCurrency={toCurrency}
        fromCurrency={fromCurrency}
        setConversionCurrencies={setConversionCurrencies}
        to="usd" from="vnd" />
      <ConversionTypeButton
        toCurrency={toCurrency}
        fromCurrency={fromCurrency}
        setConversionCurrencies={setConversionCurrencies}
        to="vnd" from="usd" />

      <Text>Current currency: </Text>
      <Text style={styles.numberCurrent}>{currentCurrencyValue}</Text>
      <Text>Conversion currency: </Text>
      <Text style={styles.numberCurrent}>{convertedCurrencyValue}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  inputCurrency: {
    height: 60,
    padding: 5,
    width: 300,
    fontSize: 35,
    borderWidth: 1,
    borderColor: 'lightblue',
    textAlign: 'center'
  },
  wrapBtnSubmit: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  btnSubmit: {
    height: 35,
    width: 200,
    margin: 10,
    borderWidth: 2,
    borderRadius: 20,
    alignItems: 'center',
    borderColor: 'lightblue',
    justifyContent: 'center',
  },
  btnSubmitText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold'
  },
  numberCurrent: {
    color: 'green',
    fontSize: 24,
    fontWeight: 'bold',
  }
});
