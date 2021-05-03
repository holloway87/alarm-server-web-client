import {cilReload} from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import {
    CButton,
    CCol,
    CRow
} from '@coreui/react';
import React from 'react';

/**
 * Component to display the alarm entries header.
 */
class AlarmListHeader extends React.Component {
    /**
     * Shows the header depending if entries are available or not.
     *
     * @returns {JSX.Element}
     */
    render() {
        return (
            <CRow>
                <CCol><h3>{this.props.entries ? 'Alarms:' : 'No alarms'}</h3></CCol>
                <CCol className="text-right">
                    <CButton color="primary">
                        <CIcon content={cilReload} onClick={this.props.loadAlarmEntries} />
                    </CButton>
                </CCol>
            </CRow>
        );
    }
}

export default AlarmListHeader;
