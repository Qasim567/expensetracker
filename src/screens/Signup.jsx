import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';
import Snackbar from 'react-native-snackbar';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const Signup = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSignup = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        Snackbar.show({
          text: 'Account Created',
          duration: Snackbar.LENGTH_SHORT,
        });
        navigation.replace('Home');
      })
      .catch((error) => {
        if (error.code === 'auth/invalid-email') {
          Snackbar.show({
            text: 'That email address is invalid!',
            duration: Snackbar.LENGTH_LONG,
          });
        }

        if (error.code === 'auth/email-already-in-use') {
          Snackbar.show({
            text: 'That email address is already in use!',
            duration: Snackbar.LENGTH_LONG,
          });
        } 
        
        }
      );
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.img}
        source={require('../../assets/card.png')}
        resizeMode="stretch"
      />
      <ScrollView>
        <Text style={styles.txt1}>Let's Get Started</Text>
        <Text style={styles.txt2}>Create an account to get all features</Text>
        <TextInput
          style={styles.input}
          placeholder={'Email'}
          value={email}
          onChangeText={(value) => setEmail(value)}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder={'Password'}
          value={password}
          onChangeText={(value) => setPassword(value)}
          autoCapitalize="none"
          secureTextEntry={true}
        />
        <Pressable style={styles.btn1} onPress={onSignup}>
          <Text style={styles.btntxt}>SIGN UP</Text>
        </Pressable>
        <View style={styles.view2}>
          <Text>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.replace('Login')}>
            <Text style={styles.txt}>Log in</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#17B169',
  },
  img: {
    marginTop: '1%',
    marginLeft: '5%',
    width: '90%',
    height: '35%',
  },
  txt1: {
    marginTop: '1%',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  txt2: {
    fontSize: 15,
    textAlign: 'center',
  },
  input: {
    marginTop: '0.3%',
    marginLeft: '5%',
    marginRight: '5%',
    fontSize: 20,
    backgroundColor: 'white',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'black',
    textAlign: 'center',
  },
  btn1: {
    marginTop: '2%',
    marginLeft: '3%',
    marginRight: '3%',
    backgroundColor: 'black',
    borderRadius: 40,
  },
  btntxt: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
  },
  view2: {
    marginTop: '2%',
    marginLeft: '24%',
    flexDirection: 'row',
  },
  txt: {
    marginLeft: '10%',
    color: 'black',
  },
});
