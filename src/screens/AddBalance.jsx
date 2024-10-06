import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, {useState} from 'react'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const AddBalance = ({navigation}) => {
  const [balance, setBalance] = useState('')

  const submitBalance = async () => {
    const user = auth().currentUser;

    if (user && balance) {
      try {
        const balanceRef = firestore().collection('balance').doc(user.uid);
        const balanceDoc = await balanceRef.get();
        
        if (balanceDoc.exists) {
          await balanceRef.update({
            amount: parseFloat(balance),
          });
        } else {
          await balanceRef.set({
            amount: parseFloat(balance),
            userId: user.uid,
          });
        }
        navigation.replace('Home');
      } catch (error) {
        console.error('Error adding/updating balance in Firestore: ', error);
      }
    } else {
      alert('Please enter a balance');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.firstcontainer}>
        <TouchableOpacity onPress={() => navigation.replace('Home')}>
          <Image source={require('../../assets/cross.png')}/>
        </TouchableOpacity>
      </View>
      <View style={styles.firstcontainer}>
        <Text style={styles.balancetxt}>Change Balance</Text>
      </View>
      <View style={styles.seccontainer}>
        <TextInput style={styles.inputstyle}
        multiline
        maxLength={30}
        keyboardType='numeric'
        placeholder='Add New Balance'
        value={balance}
        onChangeText={setBalance}/>
        <TouchableOpacity style={styles.btnconatiner} onPress={submitBalance}>
          <Text style={styles.btntext}>CHANGE BALANCE</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default AddBalance

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  firstcontainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  balancetxt: {
    fontSize: 20,
    color:'black'
  },
  seccontainer: {
    flex: 0.2,
    margin:15,
  },
  inputstyle: {
    borderBottomWidth: 1
  },
  btnconatiner: {
    justifyContent: 'center',
    margin: 7,
    marginTop: 8,
    padding: 5,
    backgroundColor:'#17B169',
    borderRadius: 20,
  },
  btntext: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center'
  }
})