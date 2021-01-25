import React, { Component, useContext, useState } from 'react';
import {
  StyleSheet,
  Text,
  FlatList,
  ScrollView,
  View
} from 'react-native';
import GlobalStyles from '../../styles/globalStyles';
import {
    TextField
  } from '@freakycoder/react-native-material-textfield';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { Button } from 'react-native-elements';
import MyContext from '../../context/MyContext';


let defaults = { };
let fieldRefs = [
    "firstName",
    "lastName",
    "birthDay",
    "password",
    "confirmPassword"
]

class DadosBasicos extends Component {

    static contextType = MyContext;

    constructor({ navigation }) {
        super();

        MaterialIcon.loadFont();

        this.onFocus = this.onFocus.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.onAccessoryPress = this.onAccessoryPress.bind(this);
        this.onAccessoryConfirmPress = this.onAccessoryConfirmPress.bind(this);
        this.renderPasswordAccessory = this.renderPasswordAccessory.bind(this);
        this.renderPasswordConfirmAccessory = this.renderPasswordConfirmAccessory.bind(this);

        fieldRefs.forEach(element => {
            this[element + "Ref"] = this.updateRef.bind(this, element);
        });

        this.state = {
            secureTextEntry: true,
            confirmSecureTextEntry: true,
            ...defaults,
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

    onFocus() {
        let { errors = {} } = this.state;

        for (let name in errors) {
            let ref = this[name];

            if (ref && ref.isFocused()) {
                delete errors[name];
            }
        }

        this.setState({ errors });
    }

    onChangeText(text) {
        fieldRefs
            .map((name) => ({ name, ref: this[name] }))
            .forEach(({ name, ref }) => {
                if (ref.isFocused()) {
                    this.setState({ [name]: text });
            }
        });
    }

    onSubmit() {
        let errors = {};
  
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
    
    updateRef(name, ref) {
        this[name] = ref;
    }

    onAccessoryPress() {
        this.setState(({ secureTextEntry }) => ({ secureTextEntry: !secureTextEntry }));
    }

    onAccessoryConfirmPress() {
        this.setState(({ confirmSecureTextEntry }) => ({ confirmSecureTextEntry: !confirmSecureTextEntry }));
    }


    render() {
        let { errors = {}, secureTextEntry, confirmSecureTextEntry, ...data } = this.state;
        let { firstName, lastName } = data;
        return (
            <View style={GlobalStyles.Container.containerGeral}>
                <ScrollView 
                    style={GlobalStyles.Container.scrollViewForm} 
                >
                    <Text style={GlobalStyles.Label.titleForm} >Tell us who are you.</Text>
                    <FlatList 
                        data={this.context.cars} 
                        keyExtractor={item => item.id}
                        renderItem={({item}) => {
                            return (
                                <View>
                                    <Text>Nome Carro: {item.name}</Text> 
                                    <Text>Preço: {item.price}</Text>
                                    <Button
                                        onPress={() => this.context.incrementPrice(item.id)}
                                        containerStyle={GlobalStyles.Container.viewButtonRight}
                                        buttonStyle={GlobalStyles.Button.next}
                                        titleStyle={GlobalStyles.Label.textButton}
                                        title="Incrementar" />
                                    <Button
                                        onPress={() => this.context.decrementPrice(item.id)}
                                        containerStyle={GlobalStyles.Container.viewButtonRight}
                                        buttonStyle={GlobalStyles.Button.next}
                                        titleStyle={GlobalStyles.Label.textButton}
                                        title="Decrementar" />
                                    
                                </View>
                            )
                        }}
                    />
                    <TextField
                        onFocus={this.onFocus}
                        onChangeText={this.onChangeText}
                        ref={this.firstNameRef}
                        value={firstName}
                        label="FIRST NAME"
                        error={errors.firstName}
                    />
                    <TextField
                        onFocus={this.onFocus}
                        onChangeText={this.onChangeText}
                        ref={this.lastNameRef}
                        value={lastName}
                        label="LAST NAME"
                        error={errors.lastName}
                    />
                    <TextField
                        onFocus={this.onFocus}
                        onChangeText={this.onChangeText}
                        ref={this.birthDayRef}
                        label="BIRTHDAY"
                        error={errors.birthDay}
                    />
                    <TextField
                        onFocus={this.onFocus}
                        onChangeText={this.onChangeText}
                        ref={this.passwordRef}
                        secureTextEntry={secureTextEntry}
                        label="PASSWORD"
                        renderRightAccessory={this.renderPasswordAccessory}
                        error={errors.password}
                    />
                    <TextField
                        onFocus={this.onFocus}
                        onChangeText={this.onChangeText}
                        ref={this.confirmPasswordRef}
                        secureTextEntry={confirmSecureTextEntry}
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

export default DadosBasicos;