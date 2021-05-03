import {
    CButton,
    CCol,
    CForm,
    CFormGroup,
    CInput,
    CInputCheckbox,
    CLabel,
    CRow
} from '@coreui/react';
import React from 'react';

/**
 * Component for the form to add a fixed alarm.
 */
class AlarmForm extends React.Component {
    /**
     * Initiates the state.
     *
     * @param {object} props
     */
    constructor(props) {
        super(props);

        this.state = {
            'time': props.time,
            'repeat': false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /**
     * Callback when the form got submitted, adds the alarm to the server.
     *
     * @param {Event} event
     */
    handleSubmit(event) {
        event.preventDefault();
        let time = this.state.time.split(':');
        this.props.addAlarm(parseInt(time[0]) + ':' + time[1], this.state.repeat);
    }

    /**
     * Renders the form.
     *
     * @returns {JSX.Element}
     */
    render() {
        return (
            <CForm className={'form-horizontal'} onSubmit={this.handleSubmit}>
                <CFormGroup className={'row'}>
                    <CLabel className={'col-sm-2 col-form-label'}>Alarm at</CLabel>
                    <CCol sm={10}>
                        <CInput type={'time'} value={this.state.time}
                                onChange={(e) => this.setState({'time': e.target.value})} />
                    </CCol>
                </CFormGroup>
                <CFormGroup className="row">
                    <CCol sm={10} className="offset-sm-2">
                        <div className="form-check checkbox">
                            <CInputCheckbox id="alarm-repeat"
                                            onChange={(e) => this.setState({'repeat': e.target.checked})} />
                            <CLabel className="form-check-label" htmlFor="alarm-repeat">Repeat?</CLabel>
                        </div>
                    </CCol>
                </CFormGroup>
                <CRow>
                    <CCol className={'offset-sm-2'}>
                        <CButton color={'primary'} type={'submit'}>Submit</CButton>
                    </CCol>
                </CRow>
            </CForm>
        );
    }
}

export default AlarmForm;
