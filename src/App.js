import {
    CButton,
    CButtonGroup,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow
} from '@coreui/react';
import React from 'react';

import AlarmForm from './component/AlarmForm';
import AlarmList from './component/AlarmList';
import RelativeAlarmForm from './component/RelativeAlarmForm';
import WebSocketCommunicator from './lib/WebSocketCommunicator';

import '@coreui/coreui/scss/coreui.scss';

/**
 * Web interface for the alarm server.
 */
class App extends React.Component {
    /**
     * Initiates the web socket communicator and an empty alarm list.
     *
     * @param {object} props
     */
    constructor(props) {
        super(props);

        this.state = {
            'alarm_entries': []
        };
        this.webSocketCommunicator = new WebSocketCommunicator('ws://' + this.getWebSocketDomain() +
            ':12614');

        this.addAlarm = this.addAlarm.bind(this);
        this.addAlarmRelative = this.addAlarmRelative.bind(this);
        this.listResponse = this.listResponse.bind(this);
        this.loadAlarmEntries = this.loadAlarmEntries.bind(this);
        this.playAlarm = this.playAlarm.bind(this);
        this.sendWebSocketCommand = this.sendWebSocketCommand.bind(this);
        this.stopAlarm = this.stopAlarm.bind(this);
        this.stopAlarmEntry = this.stopAlarmEntry.bind(this);
    }

    /**
     * Adds a fixed alarm on the server.
     *
     * Reloads the alarm list after 300ms.
     *
     * @param {string} time
     * @param {bool} repeat
     */
    addAlarm(time, repeat) {
        this.sendWebSocketCommand('timer' + (repeat ? '_repeat' : '') + ' ' + time);
        setTimeout(this.loadAlarmEntries, 300);
    }

    /**
     * Adds a relative alarm on the server.
     *
     * @param {number} amount
     * @param {string} unit
     * @param {bool} repeat
     */
    addAlarmRelative(amount, unit, repeat) {
        this.sendWebSocketCommand('timer' + (repeat ? '_repeat' : '') + ' ' + amount + unit);
        setTimeout(this.loadAlarmEntries, 300);
    }

    /**
     * Loads the alarm entries when the component was mounted.
     */
    componentDidMount() {
        this.loadAlarmEntries();
    }

    /**
     * Extracts the domain/ip from the browser location.
     *
     * @returns {string}
     */
    getWebSocketDomain() {
        let wsDomain = '127.0.0.1';
        // noinspection HttpUrlsUsage
        let locationMatch = window.location.href.match(/http:\/\/([^:/]+)/);
        if (locationMatch) {
            wsDomain = locationMatch[1];
        }

        return wsDomain;
    }

    /**
     * Callback when the server sent the alarm entries.
     *
     * @param {MessageEvent} message
     */
    listResponse(message) {
        let lines = message.data.split("\n");
        let entries = [];
        for (let l = 0; l < lines.length; l++) {
            if (!lines[l].trim()) {
                continue;
            }
            let data = lines[l].split(';');
            let timer = data[0].split(' ');
            entries.push({
                'repeat': 'timer_repeat' === timer[0],
                'data': timer[1],
                'next_date': 2 === data.length ? data[1] : null
            });
        }
        this.setState({'alarm_entries': entries});
    }

    /**
     * Loads the alarm entries from the web socket.
     */
    loadAlarmEntries() {
        this.webSocketCommunicator.sendMessageWithResponse('list', this.listResponse, 2000);
    }

    /**
     * Tells the server to play the alarm sound.
     */
    playAlarm() {
        this.sendWebSocketCommand('play');
    }

    /**
     * Renders the app.
     *
     * @returns {JSX.Element}
     */
    render() {
        return (
            <CRow>
                <CCol sm={7}>
                    <CCard>
                        <CCardHeader>Current alarms</CCardHeader>
                        <CCardBody>
                            <div className="mb-3">
                                <CButtonGroup>
                                    <CButton color={'danger'} onClick={this.playAlarm}>Alarm</CButton>
                                    <CButton color={'primary'} onClick={this.stopAlarm}>Stop</CButton>
                                </CButtonGroup>
                            </div>
                            <AlarmList entries={this.state.alarm_entries} loadAlarmEntries={this.loadAlarmEntries}
                                       stopAlarmEntry={this.stopAlarmEntry} />
                        </CCardBody>
                    </CCard>
                </CCol>
                <CCol sm={5}>
                    <CCard>
                        <CCardHeader>Add relative alarm</CCardHeader>
                        <CCardBody>
                            <RelativeAlarmForm amount={10} unit="m" addAlarm={this.addAlarmRelative} />
                        </CCardBody>
                    </CCard>
                    <CCard>
                        <CCardHeader>Add alarm</CCardHeader>
                        <CCardBody>
                            <AlarmForm time="15:00" addAlarm={this.addAlarm} />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        );
    }

    /**
     * Send a command to the server via the web socket.
     *
     * @param {string} command
     */
    sendWebSocketCommand(command) {
        this.webSocketCommunicator.sendMessage(command);
    }

    /**
     * Tells the server to stop the alarm sound.
     */
    stopAlarm() {
        this.sendWebSocketCommand('stop');
    }

    /**
     * Stops an alarm entry and reloads the alarm entries.
     *
     * @param {string} command
     */
    stopAlarmEntry(command) {
        this.sendWebSocketCommand(command);
        setTimeout(this.loadAlarmEntries, 300);
    }
}

export default App;
