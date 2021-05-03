import {
    CCol,
    CRow
} from '@coreui/react';
import React from 'react';

import AlarmListEntry from './AlarmListEntry';
import AlarmListHeader from './AlarmListHeader';

import './AlarmList.scss';

/**
 * Component to list all alarm entries.
 */
class AlarmList extends React.Component {
    /**
     * Renders all alarm entries.
     *
     * @returns {JSX.Element}
     */
    render() {
        if (!this.props.entries.length) {
            return (
                <AlarmListHeader loadAlarmEntries={this.props.loadAlarmEntries}
                                 entries={0 < this.props.entries.length} />
            );
        }

        let rows = [];
        for (let e = 0; e < this.props.entries.length; e++) {
            rows.push((<AlarmListEntry key={e} entry={this.props.entries[e]}
                                       stopAlarmEntry={this.props.stopAlarmEntry} />));
        }

        return (
            <div>
                <AlarmListHeader loadAlarmEntries={this.props.loadAlarmEntries}
                                 entries={0 < this.props.entries.length} />
                <div className="alarm-table">
                    <CRow className="heading">
                        <CCol>data</CCol>
                        <CCol>next date</CCol>
                        <CCol>stop</CCol>
                    </CRow>
                    {rows}
                </div>
            </div>
        );
    }
}

export default AlarmList;
