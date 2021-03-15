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
import Mask from '../../lib/mask';
import GenericUtil from '../../lib/genericUtil';
import Footer from './footer';



export default class DadosBasicos extends Component {

    static contextType = MyContext;

    state = {
        firstName: "",
        lastName: "",
        birthDay: "",
        isDatePickerVisible: false,
        password: "",
        secureTextEntry: true,
        confirmPassword: "",
        confirmSecureTextEntry: true,
        errors: {},
    };

    constructor({ navigation }) {
        super();

        MaterialIcon.loadFont();
        this.navigation = navigation;

    }

    renderPasswordEye = (entryVisibleState, pressCallback) => {
        let name = entryVisibleState?
        'visibility-off':
        'visibility';
    
        return (
            <MaterialIcon
                size={24}
                name={name}
                color="gray"
                onPress={pressCallback}
                suppressHighlighting={true}
            />
        );
    }

    renderPasswordAccessory = () => {
        let { secureTextEntry } = this.state;
        
        return this.renderPasswordEye(secureTextEntry, this.onAccessoryPress);

    }

    renderPasswordConfirmAccessory = () => {
        let { confirmSecureTextEntry } = this.state;
    
        return this.renderPasswordEye(confirmSecureTextEntry, this.onAccessoryConfirmPress);
    }

    onAccessoryPress = () => {
        this.setState(({ secureTextEntry }) => ({ secureTextEntry: !secureTextEntry }));
    }

    onAccessoryConfirmPress = () => {
        this.setState(({ confirmSecureTextEntry }) => ({ confirmSecureTextEntry: !confirmSecureTextEntry }));
    }

    onSubmit = async () => {
        let errors = {};
        let emptyText = 'Should not be empty';

        if(!this.state.firstName)
            errors["firstName"] = emptyText;

        if(!this.state.lastName)
            errors["lastName"] = emptyText;
        
        let birthday = null;
        if(!this.state.birthDay) {
            errors["birthDay"] = emptyText;
        } else {
            birthday = GenericUtil.brazilDateStringToDate(this.state.birthDay);
            if(!birthday || GenericUtil.dateIsAfterAsTheSecond(birthday, new Date()))
                errors["birthDay"] = 'Invalid date.';
        }

        if(!this.state.password) {
            errors["password"] = emptyText;
        } else if(this.state.password.length < 6) {
            errors["password"] = 'Too short';
        } else {
            if(!this.state.confirmPassword) {
                errors["confirmPassword"] = emptyText;
            } else if(this.state.password != this.state.confirmPassword) {
                errors["confirmPassword"] = 'Confirm password need to be the same as password';
            }
        }

        this.setState({ errors });

        //if(errors.Keys.length == 0){
            this.context.setDadosBasicos({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                birthday: GenericUtil.dateToServiceFormat(birthday),
                password: this.state.password,
            });
            this.navigation.navigate("ContactInfo");
        //}

        
    }

    render() {

        

        return (
            <View style={GlobalStyles.Container.containerGeral}>
                <Loading visibility={this.state.loading} />
                <ScrollView 
                    style={GlobalStyles.Container.scrollViewForm} 
                >
                    <Text style={GlobalStyles.Label.titleForm} >Tell us who are you.</Text>
                    <TextField
                        onChangeText={text => this.setState({firstName:text})}
                        value={this.state.firstName}
                        label="FIRST NAME"
                        error={this.state.errors.firstName}
                    />
                    <TextField
                        onChangeText={text => this.setState({lastName:text})}
                        value={this.state.lastName}
                        label="LAST NAME"
                        error={this.state.errors.lastName}
                    />
                    <TextField
                        onChangeText={text => this.setState({birthDay:text})}
                        value={this.state.birthDay}
                        label="BIRTHDAY (DD/MM/YYYY)"
                        maxLength={10}
                        formatText={text => Mask.date(text)}
                        error={this.state.errors.birthDay}
                    />
                    
                    <TextField
                        onChangeText={text => this.setState({password:text})}
                        value={this.state.password}
                        secureTextEntry={this.state.secureTextEntry}
                        label="PASSWORD"
                        textContentType='oneTimeCode'
                        renderRightAccessory={this.renderPasswordAccessory}
                        error={this.state.errors.password}
                    />
                    <TextField
                        onChangeText={text => this.setState({confirmPassword:text})}
                        value={this.state.confirmPassword}
                        secureTextEntry={this.state.confirmSecureTextEntry}
                        label="CONFIRM PASSWORD"
                        textContentType='oneTimeCode'
                        renderRightAccessory={this.renderPasswordConfirmAccessory}
                        error={this.state.errors.confirmPassword}
                    />
                        <Button
                            onPress={this.onSubmit}
                            containerStyle={GlobalStyles.Container.viewButtonRight}
                            buttonStyle={GlobalStyles.Button.next}
                            titleStyle={GlobalStyles.Label.textButton}
                            title="NEXT" />
                </ScrollView>
                <Footer step={1} />
            </View>
        )
    }

}

const styles = StyleSheet.create({
  
});