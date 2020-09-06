import React, {useState} from 'react';
import {StyleSheet, TextInput, View, Button} from 'react-native';

export default props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    await fetch('http://localhost:5000/register', {
      method: 'POST',
      data: JSON.stringify({email, password}),
    });
  };

  return (
    <View style={styles.formContainer}>
      <TextInput
        placeholder="Email"
        style={styles.textField}
        value={email}
        onChangeText={val => setEmail(val)}
      />
      <TextInput
        secureTextEntry={true}
        placeholder="Password"
        style={styles.textField}
        value={password}
        onChangeText={val => setPassword(val)}
      />
      <View style={styles.button}>
        <Button title="Sign up" onPress={handleRegister} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textField: {
    width: '80%',
    padding: 5,
    borderBottomWidth: 1,
  },
  formContainer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: 15,
  },
});
