import React, {useEffect, useState} from 'react';
import {StyleSheet, TextInput, View, Button} from 'react-native';
import {login} from '../../store/actions/profileActions';
import {connect} from 'react-redux';

const mapStateToProps = state => ({
  user: state.profile,
});

const Login = props => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // props.isLoggedIn(true);
    // props.user(userName);
    props.login({userName, password});
  };
  useEffect(() => {
    if (props.user.firstName) {
      props.navigation.navigate('Home');
    }
  }, [props.navigation, props.user]);

  return (
    <View style={styles.formContainer}>
      <TextInput
        placeholder="Email"
        style={styles.textField}
        value={userName}
        onChangeText={val => setUserName(val)}
      />
      <TextInput
        secureTextEntry={true}
        placeholder="Password"
        style={styles.textField}
        value={password}
        onChangeText={val => setPassword(val)}
      />
      <View style={styles.button}>
        <Button title="Sign in" onPress={handleLogin} />
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

export default connect(
  mapStateToProps,
  {login},
)(Login);
