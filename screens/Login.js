import React from "react"
import { useController, useForm } from "react-hook-form"
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Alert,
  Button,
} from "react-native"
import { StatusBar } from "expo-status-bar"
import { InputForm } from "./Input"
import {connect} from 'react-redux';
import {authenticate} from '../store';


const Login = () => {
  const { control, handleSubmit } = useForm();
  const onSubmit = (data) => this.props.submitForm(data.Email, data.object.Password);

  return (
    <View style={styles.container}>
      <StatusBar style='dark-content' />
      <Text style={styles.title}>Login</Text>
      <InputForm name="Email" style={styles.input} control={control} />
      <InputForm name="Password" style={styles.input} control={control} />
      <Button title="Login" onPress={handleSubmit(onSubmit)} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
    paddingTop: 50,
    paddingHorizontal: 12
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
    alignSelf: 'center',
    paddingBottom: 24
  },
  input: {
    height: 40,
    backgroundColor: 'white',
    margin: 12,
    borderWidth: 1,
    padding: 10
  }
})

const mapState = state => {
  return {
    name: 'login',
    displayName: 'Login',
  }
}

const mapDispatch = dispatch => {
  return {
    submitForm: (email, password, method = 'Login') => dispatch(authenticate(email, password, method))
    /* submitForm(data) {
      const email = data.email
      const password = data.email
      dispatch(authenticate(email, password, 'Login'))
    } */
  }
}

export default connect(mapState, mapDispatch)(Login);
