import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import MyContext from '../context/MyContext';
import Loading from './loading';

export default class Login extends Component {
  
  static contextType = MyContext;

  state={
    email:"bruno@seila.com",
    password:"123456"
  }

  constructor({ navigation }) {
      super();
      this.navigation = navigation;
  } 

  login = async () => {
    this.context.showLoading();
    var request = await this.context.login(this.state.email, this.state.password);
    if(request.sucesso) {
      this.navigation.navigate("Register");
      this.context.hideLoading();
    }
    else {
      Alert.alert(
        "Atenção",
        request.mensagem,
        [ { text: "OK", onPress: () => this.context.hideLoading() } ]
      );
    }
    

  }

  render(){
    return (
      <View style={styles.container}>
        <Loading visibility={this.context.loading} />
        <Text style={styles.logo}>Conector</Text>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Email..." 
            placeholderTextColor="#003f5c"
            value={this.state.email}
            onChangeText={text => this.setState({email:text})}/>
        </View>
        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            textContentType='oneTimeCode'
            style={styles.inputText}
            placeholder="Password..." 
            placeholderTextColor="#003f5c"
            value={this.state.password}
            onChangeText={text => this.setState({password:text})}/>
        </View>
        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn} onPress={this.login}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.loginText}>Signup</Text>
        </TouchableOpacity>

  
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    fontWeight:"bold",
    fontSize:50,
    color:"#fb5b5a",
    marginBottom:40
  },
  inputView:{
    width:"80%",
    backgroundColor:"#465881",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"white"
  },
  forgot:{
    color:"white",
    fontSize:11
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#fb5b5a",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  loginText:{
    color:"white"
  }
});