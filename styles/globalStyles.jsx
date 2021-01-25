import {
    StyleSheet
  } from 'react-native';

export default class GlobalStyles 
{
    static get Colors() {
        return {
            HEADER_TINT: "#FFF",
            HEADER_BACKGROUND: "#3E70AB",
        };
    }

    static get Container() {
        return StyleSheet.create({
            scrollViewForm: {
                padding: 20,
            },
            viewButtonRight: {
                paddingTop: 10,
                paddingRight: 0,
                marginRight: 0,
                marginLeft: 'auto',
                width: 100,
                flex: 1,
                alignSelf: "flex-end"
            },
            containerGeral: {
                margin: 0,
                padding: 0,
                flex: 1
            }
        });
    } 

    static get Button() {
        return StyleSheet.create({
            next: {
                backgroundColor: "#F68772"
            },
        });
    }

    static get Label() {
        return StyleSheet.create({
            titleForm: {
                paddingVertical: 0,
                color: "#444444"
            },
            textButton: {
                color: "#FFF"
            }
        });
    }

    static get Cadastro() {
        return StyleSheet.create({
            circle: {
                height: 10,
                width: 10,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: "#444444",
                backgroundColor: "#FFF",
                justifyContent: "center",
            },
            internalCircle: {
                width: 8,
                height: 8,
                alignSelf: "center",
                borderRadius: 4,
            },
            itensFooter: {
                flexDirection: "row",
                justifyContent: "space-between",
                alignSelf: "center",
                position: "absolute",
                width: 100,
            },
            lineFooter: {
                width: 100,
                height: 1,
                backgroundColor: "#444444",
                alignSelf: "center",
            },
            footerForm: {
                height: 35,
                backgroundColor: "#E4EAF1",
                margin: 0,
                padding: 0,
                justifyContent: "center"
            }
        });
    }
}
