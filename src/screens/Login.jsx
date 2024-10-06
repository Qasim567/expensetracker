import * as React from 'react';
import { useState } from 'react';
import auth from '@react-native-firebase/auth';
import Snackbar from 'react-native-snackbar';
import { StyleSheet, Text, View, Pressable, Image, TextInput, TouchableOpacity, } from 'react-native';
const Login = ({navigation}) => {   

    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        Snackbar.show({
          text: 'Login Successfully',
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

        if (error.code === 'auth/invalid-credential') {
            Snackbar.show({
              text: 'Wrong email or password!',
              duration: Snackbar.LENGTH_LONG,
            });
          }
                
        }
      );
  };

    return (
        <View style={styles.container}>
            <Image style={styles.img}
                source={require('../../assets/card.png')}
                resizeMode='stretch'>
            </Image>
                <>
                    <Text style={styles.txt1}>Welcome back</Text>
                    <Text style={styles.txt2}>Log in to your existing account</Text>
                    {/* <Text style={{color:'red',fontSize:10,textAlign:'center'}}>{error}</Text> */}
                    <TextInput style={styles.input}
                        placeholder={'Email'}
                        value={email}
                        onChangeText={value => setEmail(value)}
                        autoCapitalize='none'
                        keyboardType='email-address'
                    />
                    <TextInput style={styles.input}
                        placeholder={'Passward'}
                        value={password}
                        onChangeText={value => setPassword(value)}
                        autoCapitalize='none'
                        secureTextEntry={true}
                    />
                    {/* <TouchableOpacity onPress={() => { setstate(!state) }}>
                        <Text style={styles.txt3}>{state ? 'Reset Passward' : 'Forget Passward'}</Text>
                    </TouchableOpacity> */}
                    <Pressable style={styles.btn1} onPress={onLogin}>
                        <Text style={styles.btntxt}>LOG IN</Text>
                    </Pressable>
                    <View style={styles.view2}>
                        <Text>Don't Have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                            <Text style={styles.txt}>Sign up</Text>
                        </TouchableOpacity>
                    </View>
                </>
        </View>
    );
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#17B169',
    },
    img: {
        marginTop: '5%',
        marginLeft: '5%',
        width: '90%',
        height: '35%',
    },
    txt1: {
        marginTop: '5%',
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    txt2: {
        fontSize: 15,
        textAlign: 'center',
    },
    input: {
        marginTop: '1.5%',
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
        marginTop: '3%',
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
        marginTop: '3%',
        marginLeft: '24%',
        flexDirection: 'row',
    },
    txt: {
        marginLeft: '10%',
        color: 'black',
    },
    txt3: {
        marginTop: '1%',
        marginLeft: '64%',
        color: 'blue',
    },
});