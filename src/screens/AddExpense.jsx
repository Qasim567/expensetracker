import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native'
import React, {useState} from 'react'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const AddExpense = ({navigation}) => {

  const [expenseName, setExpenseName] = useState('')
  const [expenseAmount, setExpenseAmount] = useState('')

  const submitExpense = async () => {
    const user = auth().currentUser; 

    if (expenseName && expenseAmount && user) {
      try {
        await firestore().collection('expenses').add({
          name: expenseName,
          amount: parseFloat(expenseAmount),
          userId: user.uid, 
        });
        navigation.replace('Home');
      } catch (error) {
        console.error('Error adding expense to Firestore: ', error);
      }
    } else {
      alert('Please enter both name and amount of expense');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.firstcontainer}>
        <TouchableOpacity onPress={() => navigation.replace('Home')}>
          <Image source={require('../../assets/cross.png')}/>
        </TouchableOpacity>
      </View>
      <View style={styles.firstcontainer}>
        <Text style={styles.balancetxt}>Add an Expense</Text>
      </View>
      <View style={styles.seccontainer}>
        <TextInput style={styles.inputstyle}
        multiline
        maxLength={30}
        keyboardType='text'
        placeholder='Title'
        placeholderTextColor='white'
        value={expenseName}
        onChangeText={setExpenseName}/>
        <TextInput style={styles.inputstyle}
        multiline
        maxLength={30}
        keyboardType='numeric'
        placeholder='Price'
        placeholderTextColor='white'
        value={expenseAmount}
        onChangeText={setExpenseAmount}/>
        <TouchableOpacity style={styles.btnconatiner} onPress={submitExpense}>
          <Text style={styles.btntext}>SUBMIT EXPENSE</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default AddExpense

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  firstcontainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  balancetxt: {
    fontSize: 20,
    color:'white'
  },
  seccontainer: {
    flex: 0.2,
    margin:15,
  },
  inputstyle: {
    borderBottomWidth: 1,
    borderColor: 'white',
    color: 'white'
  },
  btnconatiner: {
    justifyContent: 'center',
    margin: 40,
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