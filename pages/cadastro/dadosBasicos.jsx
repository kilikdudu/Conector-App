import React, { Component, useContext, useState } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View
} from 'react-native';
import GlobalStyles from '../../styles/globalStyles';
import {
    TextField
  } from '@freakycoder/react-native-material-textfield';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { Button } from 'react-native-elements';

import Loading from '../loading';
import MyContext from '../../context/MyContext';


export default class DadosBasicos extends Component {

    static contextType = MyContext;

    constructor({ navigation }) {
        super();

        MaterialIcon.loadFont();

        this.state = {
            loading: false,
            firstName: "",
            lastName: "",
            birthDay: "",
            password: "",
            secureTextEntry: true,
            confirmPassword: "",
            confirmSecureTextEntry: true,
        };
    }

    renderPasswordEye(entryVisibleState, pressCallback) {
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

    renderPasswordAccessory() {
        let { secureTextEntry } = this.state;
        
        return this.renderPasswordEye(secureTextEntry, this.onAccessoryPress);

    }

    renderPasswordConfirmAccessory() {
        let { confirmSecureTextEntry } = this.state;
    
        return this.renderPasswordEye(confirmSecureTextEntry, this.onAccessoryConfirmPress);
    }

    onAccessoryPress() {
        this.setState(({ secureTextEntry }) => ({ secureTextEntry: !secureTextEntry }));
    }

    onAccessoryConfirmPress() {
        this.setState(({ confirmSecureTextEntry }) => ({ confirmSecureTextEntry: !confirmSecureTextEntry }));
    }

    async onSubmit() {
        let errors = {};

        if(!this.state.firstName.value())
            errors[firstName] = 'Should not be empty';

        if(!this.state.lastName.value())
            errors[lastName] = 'Should not be empty';
        
        if(!this.state.birthDay.value())
            errors[firstName] = 'Should not be empty';

        fieldRefs
            .forEach((name) => {
            let value = this[name].value();

            if (!value) {
                errors[name] = 'Should not be empty';
            } else {
                if ('password' === name && value.length < 6) {
                errors[name] = 'Too short';
                }
                if('confirmPassword' === name && value != this['password'].value()) {
                errors[name] = 'Confirm password need to be the same as password';
                }
            }
            });

        this.setState({ errors });
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
                        value={this.firstName}
                        label="FIRST NAME"
                        error={errors.firstName}
                    />
                    <TextField
                        onChangeText={text => this.setState({lastName:text})}
                        value={this.lastName}
                        label="LAST NAME"
                        error={errors.lastName}
                    />
                    <TextField
                        onChangeText={text => this.setState({birthDay:text})}
                        value={this.birthDay}
                        label="BIRTHDAY"
                        error={errors.birthDay}
                    />
                    <TextField
                        onChangeText={text => this.setState({password:text})}
                        value={this.password}
                        secureTextEntry={this.secureTextEntry}
                        label="PASSWORD"
                        renderRightAccessory={this.renderPasswordAccessory}
                        error={errors.password}
                    />
                    <TextField
                        onChangeText={text => this.setState({confirmPassword:text})}
                        value={this.confirmPassword}
                        secureTextEntry={this.confirmSecureTextEntry}
                        label="CONFIRM PASSWORD"
                        renderRightAccessory={this.renderPasswordConfirmAccessory}
                        error={errors.confirmPassword}
                    />
                        <Button
                            onPress={this.onSubmit}
                            containerStyle={GlobalStyles.Container.viewButtonRight}
                            buttonStyle={GlobalStyles.Button.next}
                            titleStyle={GlobalStyles.Label.textButton}
                            title="NEXT" />
                </ScrollView>
                <View style={GlobalStyles.Cadastro.footerForm}>
                    <View style={GlobalStyles.Cadastro.lineFooter}></View>
                    <View style={GlobalStyles.Cadastro.itensFooter}>
                        <View style={GlobalStyles.Cadastro.circle}>
                            <View style={GlobalStyles.Cadastro.internalCircle} backgroundColor="#FFD599"></View>
                        </View>
                        <View style={GlobalStyles.Cadastro.circle}></View>
                        <View style={GlobalStyles.Cadastro.circle}></View>
                        <View style={GlobalStyles.Cadastro.circle}></View>
                        <View style={GlobalStyles.Cadastro.circle}></View>
                    </View>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
  
});