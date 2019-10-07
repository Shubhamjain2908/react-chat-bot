import React, { Component } from 'react';
import axios from 'axios/index';

class Chatbot extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messgaes: []
        };
        this.df_text_query('Where is snoopy');
    }

    async df_text_query(text) {
        let says = {
            speaks: 'me',
            msg: {
                text: {
                    text
                }
            }
        };
        this.setState({ messgaes: [...this.state.messgaes, says] });

        const res = await axios.post('localhost:3000/api/df_text_query', { text });

        for (let msg of res.data.fulfillmentMessages) {
            says = {
                speaks: 'bots',
                msg
            };
            this.setState({ messgaes: [...this.state.messgaes, says] });
        }
    }

    async df_event_query(event) {
        const res = await axios.post('localhost:3000/api/df_event_query', { event });

        for (let msg of res.data.fulfillmentMessages) {
            let says = {
                speaks: 'bots',
                msg
            };
            this.setState({ messgaes: [...this.state.messgaes, says] });
        }
    }

    render() {
        return (
            <div style={{ height: 400, width: 400, float: 'right' }}>
                <div id="chatbot" style={{ height: '100%', width: '100%', overflow: 'auto' }}>
                    <h2>Chatbot</h2>
                    <input type="text" />
                </div>
            </div>
        );
    }

}

export default Chatbot;