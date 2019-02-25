import React from 'react';
import {StyleSheet, Text, TextInput, View, TouchableOpacity} from 'react-native';

const BUTTONS = [1, 2, 3, '+', '<', 4, 5, 6, '-', 'M+', 7, 8, 9, '*', 'M-', '%', 0, 'CE', '/', '='];

export default class App extends React.Component {

    state = {
        str: '',
        digit1: null,
        operation: null
    };

    calculate = (numberX, numberY, operation) => {
        const x = parseInt(numberX);
        const y = parseInt(numberY);

        console.log('[CALC]', x, y);
        if (x && y) {
            switch (operation) {
                case '+':
                    return x + y;
                case '-':
                    return x - y;
                case '*':
                    return x * y;
                case '/':
                    if (y === 0 || x === 0) {
                        // на ноль делить нельзя !
                        return 0;
                    } else {
                        return x / y;
                    }
                default: return 0;
            }
        }
        return 0;
    };

    clear = () => {
        this.setState({
            str: '',
            digit1: null,
            operation: null});
    };

    handler = (symbol) => {
        if (Number.isInteger(symbol)) {
            if (this.state.str.length === 0 && symbol === 0) {
                return null;
            }

            let string = this.state.str;
            string += symbol;
            this.setState({str: string});
        }


        switch (symbol) {
            case 'CE':
                this.clear();
                break;
            case '+':
            case '-':
            case '*':
            case '%':
            case '/':
                if (!this.state.digit1) {
                    this.setState({digit1: this.state.str, str: '', operation: symbol});
                }
                break;

            case '=':
                if (this.state.digit1 && this.state.str) {
                    let summary = this.calculate(this.state.digit1, this.state.str, this.state.operation);
                    console.log(summary);
                    this.setState({str: summary.toString(), digit1: null, operation: null});
                }
                break;
            case '<':
                let str = this.state.str.substr(0, this.state.str.length -1);
                this.setState({str});
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
                  <TouchableOpacity key={index} style={styles.bottomPanelChild} onPress={() => this.handler(button)}>
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
