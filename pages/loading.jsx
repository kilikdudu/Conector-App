import Spinner from 'react-native-loading-spinner-overlay';
import React, {Component} from 'react';
import { StyleSheet } from 'react-native';

export default class Loading extends Component {
    
    render(){
        return (
            <Spinner
                visible={this.props.visibility}
                textContent={'Carregando...'}
                textStyle={styles.spinnerTextStyle}
                overlayColor={'rgba(0, 0, 0, 0.75)'}
            />
        )
    }
}

const styles = StyleSheet.create({
    spinnerTextStyle: {
      color: '#FFF'
    },
  });