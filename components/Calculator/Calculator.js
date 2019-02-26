import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, View, TouchableOpacity} from 'react-native';

const BUTTONS = [1, 2, 3, '+', '<', 4, 5, 6, '-', 'M+', 7, 8, 9, '*', 'M-', '.', 0, 'CE', '/', '='];
const disabledButtons = ['M+', 'M-', '='];

class Calculator extends Component {
    state = {
        str: ''
    };

    onPressHandler = (symbol) => {
        if (!disabledButtons.includes(symbol)) {
            let str = this.state.str;
            str += symbol;
            this.setState({str});
        }

        switch (symbol) {
            case '=':
                try {
                    if (this.state.str.length === 0) break;
                    let sum = eval(this.state.str);
                    this.setState({str: sum.toString()});
                }
                catch(err) {
                    this.setState({str: 'INVALID EXPRESSION'});
                    throw new Error('INVALID EXPRESSION, PLEASE CHECK WHAT YOU CALCULATE');
                }
                break;

            case '<':
                let str = this.state.str.substr(0, this.state.str.length -1);
                this.setState({str});
                break;
            case 'CE':
                this.setState({str: ''});
                break;
            default:
                break;
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.topPanel} >
                    <Text style={styles.topPanelText}>Created by Urmat Bekboev (JS4)</Text>
                    <TextInput
                        style={styles.input}
                        editable={false}
                        value={this.state.str}
                        placeholder={'0'}
                    />
                </View>

                <View style={styles.bottomPanel}>
                    {BUTTONS.map((button, index) => (
                        <TouchableOpacity key={index} style={styles.bottomPanelChild} onPress={() => this.onPressHandler(button)}>
                            <View style={styles.button}>
                                <Text style={Number.isInteger(button) ? styles.buttonText : styles.buttonNumber}>{button}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 60,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,

        flex: 1,
        flexDirection: 'column',
        flexWrap: 'nowrap',

        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'stretch',

        backgroundColor: '#000',
    },
    topPanel: {
        flexGrow: 1,
        flex: 1,
        justifyContent: 'center',

    },
    topPanelText: {
        textAlign: 'right',
        color: '#fff',
        marginBottom: 5
    },
    bottomPanel: {
        flexGrow: 4,

        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        backgroundColor: 'grey',

        alignItems: 'stretch',
        alignContent: 'stretch',
    },
    bottomPanelChild: {
        flexBasis: '20%',
        margin: 'auto',

        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

        borderWidth: 0.5,
        borderColor: '#424242',
        backgroundColor: '#001',

    },

    buttonText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#fff'
    },
    buttonNumber: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'red'
    },
    input: {
        backgroundColor: '#fff',
        width: '100%',
        height: '100%',
        textAlign: 'right',
        padding: 15,
        fontSize: 25,
    }
});

export default Calculator;