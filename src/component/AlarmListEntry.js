import {
    cilLoop,
    cilPowerStandby
} from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import {
    CButton,
    CCol,
    CRow
} from '@coreui/react';
import React from 'react';

/**
 * Component to show one alarm entry.
 */
class AlarmListEntry extends React.Component {
    constructor(props) {
        super(props);

        this.stopEntry = this.stopEntry.bind(this);
    }

    /**
     * Renders one alarm entry.
     *
     * @returns {JSX.Element}
     */
    render() {
        return (
            <CRow>
                <CCol>
                    <div className="text-cell">
                        {this.props.entry.data}
                        {this.props.entry.repeat ? <CIcon content={cilLoop} /> : ''}
                    </div>
                </CCol>
                <CCol>
                    <div className="text-cell">
                        {this.props.entry.next_date}
                    </div>
                </CCol>
                <CCol>
                    <CButton color="danger" size="sm" onClick={this.stopEntry}>
                        <CIcon content={cilPowerStandby} />
                    </CButton>
                </CCol>
            </CRow>
        );
    }

    /**
     * Tells the server to stop the given alarm.
     */
    stopEntry() {
        let key = 'timer_stop';
        if (this.props.entry.repeat) {
            key += '_repeat';
        }
        key += ' ' + this.props.entry.data;

        this.props.stopAlarmEntry(key);
    }
}

export default AlarmListEntry;
