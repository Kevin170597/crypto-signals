import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Dimensions, ScrollView, TextInput, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import bitcoin from './assets/currency/bitcoin.png';

export default function App() {
  const [saving, setSaving] = useState(false);

  const [toggle, setToggle] = useState(false);
  const [btcPrice, setBtcPrice] = useState('');

  const [buySignal, setBuySignal] = useState('');
  const [sellSignal, setSellSignal] = useState('');

  const getBTC = async () => {
    const req = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd')
    const btc = await req.json();
    //console.log(btc)
    setBtcPrice(btc.bitcoin.usd);
  };

  const getConfig = async () => {
    const req = await fetch('https://crypto-signals-seven.vercel.app/prices');
    const res = await req.json();
    //console.log(res);
    setToggle(res.active)
    setSellSignal(res.sell.toString());
    setBuySignal(res.buy.toString());
  };

  const saveConfig = async () => {
    setSaving(true);
    const req = await fetch('https://crypto-signals-seven.vercel.app/prices', {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        active: toggle,
        sell: Number(sellSignal),
        buy: Number(buySignal)
      })
    });
    const res = await req.json();
    //console.log(res);
    setSaving(false);
  };

  useEffect(() => {
    setToggle(false);
    getBTC();
    getConfig();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='light' backgroundColor='#34312C' />
      <ScrollView>
        <View style={styles.content}>
          <Text style={styles.currency}>Bitcoin</Text>
          <Image source={bitcoin} style={styles.currencyImage} />
          <Text style={styles.currencyPrice}>${btcPrice}</Text>
          <Text style={styles.signalStatus}>{toggle ? 'Active' : 'Inactivo'}</Text>
          <ToggleSwitch
            isOn={toggle}
            onToggle={() => setToggle(!toggle)}
          />
          <Text style={styles.signalSubtitle}>Señal de compra</Text>
          <View style={styles.inputContainer}>
            <Text style={{ color: '#DF4444', fontSize: 30 }}>-$</Text>
            <TextInput
              placeholder='0'
              style={styles.buyInput}
              placeholderTextColor={'#DF4444'}
              keyboardType='numeric'
              value={buySignal}
              onChangeText={(value) => setBuySignal(value)}
            />
          </View>
          <Text style={styles.signalSubtitle}>Señal de venta</Text>
          <View style={styles.inputContainer}>
            <Text style={{ color: '#2C9630', fontSize: 30 }}>+$</Text>
            <TextInput
              placeholder='0'
              style={styles.sellInput}
              placeholderTextColor={'#2C9630'}
              keyboardType='numeric'
              value={sellSignal}
              onChangeText={(value) => setSellSignal(value)}
            />
          </View>
          <TouchableOpacity onPress={saveConfig} style={styles.saveButton}>
            <Text style={styles.saveButtonLabel}>
              {saving ? 'Guardando...' : 'Guardar'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#34312C',
    flex: 1
  },
  content: {
    padding: 16,
    alignItems: 'center',
    height: Dimensions.get('window').height
  },
  currency: {
    color: '#fff',
    fontSize: 26,
    height: 60,
    textAlignVertical: 'center'
  },
  currencyImage: {
    height: 130,
    aspectRatio: 1
  },
  currencyPrice: {
    color: '#fff',
    fontSize: 60,
    height: 150,
    textAlignVertical: 'center'
  },
  signalStatus: {
    color: '#fff',
    height: 40,
    fontSize: 24,
    textAlignVertical: 'center'
  },
  signalSubtitle: {
    color: '#A3A3A3',
    height: 40,
    fontSize: 18,
    textAlignVertical: 'center'
  },
  inputContainer: {
    flexDirection: 'row',
    height: 80,
    alignItems: 'center'
  },
  buyInput: {
    color: '#DF4444',
    fontSize: 40
  },
  sellInput: {
    color: '#2C9630',
    fontSize: 40
  },
  saveButton: {
    backgroundColor: '#2C8655',
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 'auto'
  },
  saveButtonLabel: {
    color: '#fff',
    fontSize: 16
  }
});
