import {
    CButton,
    CCol,
    CForm,
    CFormGroup,
    CInput,
    CInputCheckbox,
    CInputGroup,
    CInputGroupAppend,
    CLabel,
    CRow
} from '@coreui/react';
import React from 'react';

/**
 * Component for the form to add a relative alarm.
 */
class RelativeAlarmForm extends React.Component {
    /**
     * Initiates the state.
     *
     * @param {object} props
     */
    constructor(props) {
        super(props);

        this.state = {
            'amount': props.amount,
            'unit': props.unit,
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
        this.props.addAlarm(this.state.amount, this.state.unit, this.state.repeat);
    }

    /**
     * Renders the form.
     *
     * @returns {JSX.Element}
     */
    render() {
        return (
            <CForm className="form-horizontal" onSubmit={this.handleSubmit}>
                <CFormGroup className="row">
                    <CLabel className="col-sm-2 col-form-label">Alarm in</CLabel>
                    <CCol sm={10}>
                        <CInputGroup>
                            <CInput type="number" value={this.state.amount}
                                    onChange={(e) => this.setState({'amount': e.target.value})} />
                            <CInputGroupAppend>
                                <CButton color={'s' === this.state.unit ? 'primary' : 'secondary'}
                                         onClick={() => this.setState({'unit': 's'})}>s</CButton>
                                <CButton color={'m' === this.state.unit ? 'primary' : 'secondary'}
                                         onClick={() => this.setState({'unit': 'm'})}>m</CButton>
                                <CButton color={'h' === this.state.unit ? 'primary' : 'secondary'}
                                         onClick={() => this.setState({'unit': 'h'})}>h</CButton>
                            </CInputGroupAppend>
                        </CInputGroup>
                        <span className="help-block">s = seconds, m = minutes, h = hours</span>
                    </CCol>
                </CFormGroup>
                <CFormGroup className="row">
                    <CCol sm={10} className="offset-sm-2">
                        <div className="form-check checkbox">
                            <CInputCheckbox id="alarm-relative-repeat"
                                            onChange={(e) => this.setState({'repeat': e.target.checked})} />
                            <CLabel className="form-check-label" htmlFor="alarm-relative-repeat">Repeat?</CLabel>
                        </div>
                    </CCol>
                </CFormGroup>
                <CRow>
                    <CCol className="offset-sm-2">
                        <CButton color="primary" type="submit">Submit</CButton>
                    </CCol>
                </CRow>
            </CForm>
        );
    }
}

export default RelativeAlarmForm;
