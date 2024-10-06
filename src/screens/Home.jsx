import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Snackbar from 'react-native-snackbar';

const Home = ({ navigation }) => {
  const [expenses, setExpenses] = useState([]);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const user = auth().currentUser;

      if (user) {
        try {
          // Fetch Expenses
          const expensesSnapshot = await firestore()
            .collection('expenses')
            .where('userId', '==', user.uid)
            .get();
          const expensesData = expensesSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setExpenses(expensesData);

          // Fetch Balance
          const balanceDoc = await firestore()
            .collection('balance')
            .doc(user.uid)
            .get();
          if (balanceDoc.exists) {
            setBalance(balanceDoc.data().amount);
          } else {
            setBalance(0); // Default if no balance found
          }
        } catch (error) {
          console.error('Error fetching data from Firestore: ', error);
        }
      }
    };

    fetchData();
  }, []);
  
  const onLogout = () => {
    auth()
      .signOut()
      .then(() => {
        Snackbar.show({
          text: 'Logout Successfully',
          duration: Snackbar.LENGTH_SHORT,
        });
        navigation.replace('Login');
      });
  };

  return (
    <View style={styles.conatiner}>
      <View style={styles.firstconatiner}>
        <Text style={styles.welcometext}>Welcome Back</Text>
        <TouchableOpacity onPress={onLogout}>
          <Image style={styles.logoutimg} source={require('../../assets/logout.png')} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.replace('AddBalance')}>
        <Image style={styles.dollarimg} source={require('../../assets/dollar.png')} />
      </TouchableOpacity>
      <View style={styles.seccontainer}>
        <Image source={require('../../assets/expense.png')} />
        <Text style={styles.balanceText}>Your Balance: <Text style={styles.dollarSign}>PKR: {balance}</Text></Text>
      </View>
      <View style={styles.thirdconatiner}>
        <TouchableOpacity onPress={() => navigation.replace('AddExpense')}>
          <Text style={styles.btntext}>ADD AN EXPENSE</Text>
        </TouchableOpacity>
      </View>

      <View style={{ padding: 10 }}>
        {expenses.map(expense => (
          <View key={expense.id} style={styles.expenseItem}>
            <Text style={{ color: 'white' }}>{expense.name} - PKR {expense.amount}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: 'black',
  },
  firstconatiner: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
    marginLeft: 17,
  },
  welcometext: {
    fontSize: 27,
    color: 'white',
  },
  logoutimg: {
    width: 50,
    height: 50,
  },
  dollarimg: {
    height: 40,
  },
  seccontainer: {
    flex: 0.4,
    backgroundColor: '#17B169',
    margin: 7,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceText: {
    color: '#ffffff',
    fontWeight: '200',
    fontSize: 18,
  },
  dollarSign: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 25,
    alignItems: 'baseline',
  },
  thirdconatiner: {
    flex: 0.07,
    justifyContent: 'center',
    margin: 7,
    marginTop: 5,
    backgroundColor: '#17B169',
    borderRadius: 20,
  },
  btntext: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
  },
  expenseItem: {
    padding: 10,
    backgroundColor: '#333',
    marginVertical: 5,
    borderRadius: 5,
  },
});
