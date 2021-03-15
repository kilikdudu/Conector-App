import React, { Component, useContext, useState } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
} from 'react-native';
import GlobalStyles from '../../styles/globalStyles';
import {
    TextField
  } from '@freakycoder/react-native-material-textfield';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { Button } from 'react-native-elements';
import Loading from '../loading';
import MyContext from '../../context/MyContext';
import GenericUtil from '../../lib/genericUtil';
import Footer from './footer';



export default class DadosContato extends Component {

    static contextType = MyContext;

    state = {
        email: "",
        phone: "",
        errors: {},
    };

    constructor({ navigation }) {
        super();

        MaterialIcon.loadFont();
        this.navigation = navigation;

        
    }

    

    onSubmit = async () => {
        let errors = {};
        let emptyText = 'Should not be empty';

        if(!this.state.firstName)
            errors["email"] = emptyText;

        if(!this.state.lastName)
            errors["phone"] = emptyText;
        
        

        this.setState({ errors });

        

        
    }

    render() {

        console.log("Teste", this.context.dadosBasicos);

        return (
            <View style={GlobalStyles.Container.containerGeral}>
                <Loading visibility={this.state.loading} />
                <ScrollView 
                    style={GlobalStyles.Container.scrollViewForm} 
                >
                    <Text style={GlobalStyles.Label.titleForm} >Contact information</Text>
                    <TextField
                        onChangeText={text => this.setState({phone:text})}
                        value={this.state.phone}
                        label="PHONE"
                        error={this.state.errors.phone}
                    />
                    <TextField
                        onChangeText={text => this.setState({email:text})}
                        value={this.state.email}
                        label="EMAIL"
                        error={this.state.errors.phone}
                    />
                    
                        <Button
                            onPress={this.onSubmit}
                            containerStyle={GlobalStyles.Container.viewButtonRight}
                            buttonStyle={GlobalStyles.Button.next}
                            titleStyle={GlobalStyles.Label.textButton}
                            title="NEXT" />
                </ScrollView>
                <Footer step={2} />
            </View>
        )
    }

}

const styles = StyleSheet.create({
  
});