import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import GlobalStyles from '../../styles/globalStyles';

export default class Footer extends Component {

    render(){
        let step = this.props.step;
        let stepVisibility = {
            one: false,
            two: false,
            three: false,
            four: false,
            five: false,
        }
        switch(step) {
            case 1:
                stepVisibility.one = true;
                break;
            case 2:
                stepVisibility.two = true;
                break;
            case 3:
                stepVisibility.three = true;
                break;
            case 4:
                stepVisibility.four = true;
                break;
            case 5:
                stepVisibility.five = true;
                break;
        }
        return (
            <View style={GlobalStyles.Cadastro.footerForm}>
                <View style={GlobalStyles.Cadastro.lineFooter}></View>
                <View style={GlobalStyles.Cadastro.itensFooter}>
                    <View style={GlobalStyles.Cadastro.circle}>
                        {stepVisibility.one && (<View style={GlobalStyles.Cadastro.internalCircle} backgroundColor="#FFD599" ></View>)}
                    </View>
                    <View style={GlobalStyles.Cadastro.circle}>
                        {stepVisibility.two && (<View style={GlobalStyles.Cadastro.internalCircle} backgroundColor="#FFD599" ></View>)}
                    </View>
                    <View style={GlobalStyles.Cadastro.circle}>
                        {stepVisibility.three && (<View style={GlobalStyles.Cadastro.internalCircle} backgroundColor="#FFD599" ></View>)}
                    </View>
                    <View style={GlobalStyles.Cadastro.circle}>
                        {stepVisibility.four && (<View style={GlobalStyles.Cadastro.internalCircle} backgroundColor="#FFD599" ></View>)}
                    </View>
                    <View style={GlobalStyles.Cadastro.circle}>
                        {stepVisibility.five && (<View style={GlobalStyles.Cadastro.internalCircle} backgroundColor="#FFD599" ></View>)}
                    </View>
                </View>
            </View>
        )
    }

}