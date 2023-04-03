import "./BookingModal.scss"
import React, { Component } from 'react';
import { connect } from "react-redux";
import moment from "moment";
import { LANGUAGES } from "../../../../utils";
import { FormattedMessage } from 'react-intl';
import _ from "lodash";
import { Modal } from 'reactstrap';
import ProfileDoctor from "../ProfileDoctor";
import DatePicker from "../../../../components/Input/DatePicker";
import * as actions from '../../../../store/actions'
import Select from 'react-select'
import { postPatientBookingAppointment } from "../../../../services/userService";
import { toast, Toast } from "react-toastify";
import NumberFormat from "react-number-format";
import { getDetailInforDoctorService } from "../../../../services/userService";




class BookingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            genders: '',
            selectedGender: '',
            doctorId: '',
            addressClinic: '',
            errors: ''

        }
    }

    async componentDidMount() {
        this.props.fetchGender()


    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.setState({
                genders: this.buildDataGender(this.props.genderRedux)
            })
        }
        if (this.props.genderRedux !== prevProps.genderRedux) {
            this.setState({
                genders: this.buildDataGender(this.props.genderRedux)
            })
        }
        if (this.props.dataTime !== prevProps.dataTime) {
            if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
                let timeType = this.props.dataTime.timeType
                let doctorId = this.props.dataTime.doctorId
                this.setState({
                    doctorId: doctorId,
                    timeType: timeType
                })
            }
        }
        if (this.state.doctorId !== prevState.doctorId) {
            let res = await getDetailInforDoctorService(this.state.doctorId)
            if (res && res.errCode === 0) {
                this.setState({
                    addressClinic: res.data.Doctor_Infor.addressClinic
                })
            }
        }
    }

    buildDataGender = (data) => {
        let result = []
        let language = this.props.language

        if (data && data.length > 0) {
            data.map(item => {
                let object = {}
                object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn
                object.value = item.keyMap
                result.push(object)
            })
        }
        return result
    }


    handleOnChangeInput = (event, id) => {
        let valueInput = event.target.value
        let copyState = { ...this.state }
        copyState[id] = valueInput
        this.setState({
            ...copyState
        })
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            birthday: date[0]
        })
    }

    handleChangeSelect = async (selectedGender) => {
        this.setState({ selectedGender });
    };

    checkValidateInput = () => {
        let { language } = this.props
        let isValid = true
        let arrInput = ['fullName', 'phoneNumber', 'email', 'address', 'reason', 'birthday', 'genders'];
        let error = ''
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                error = language === LANGUAGES.VI ? 'Vui lòng điền: ' + arrInput[i] : 'Missing parameter: ' + arrInput[i];
                this.setState({
                    errors: error
                })
                break;
            }

        }
        return isValid;
    }


    handleConfirmBooking = async () => {
        let timeString = this.buildTimeBooking(this.props.dataTime)
        let doctorName = this.buildDoctorName(this.props.dataTime)
        let date = new Date(this.state.birthday).getTime()
        let isValid = this.checkValidateInput();
        if (isValid) {
            let res = await postPatientBookingAppointment({
                fullName: this.state.fullName,
                phoneNumber: this.state.phoneNumber,
                email: this.state.email,
                address: this.state.address,
                reason: this.state.reason,
                date: date,
                selectedGender: this.state.selectedGender.value,
                doctorId: this.state.doctorId,
                timeType: this.state.timeType,
                language: this.props.language,
                timeString: timeString,
                doctorName: doctorName,
                addressClinic: this.state.addressClinic
            })
            if (res && res.errCode === 0) {
                toast.success('Booking a new appointment Succeed!')
                this.props.closeBookingModal()
            } else {
                toast.error('Booking a new appointment Error!')
            }
        } else {
            toast.error('Booking a new appointment Error!')

        }
        console.log('check ', this.state)


    }

    buildTimeBooking = (dataTime) => {
        let { language } = this.props

        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn
            let date = language === LANGUAGES.VI ? moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY') : moment.unix(+dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY')
            return `${time} - ${date}`
        }
        return ''

    }

    buildDoctorName = (dataTime) => {
        let { language } = this.props

        if (dataTime && !_.isEmpty(dataTime)) {
            let name = language === LANGUAGES.VI ?
                `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`
                :
                `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`
            return name
        }
        return ''
    }

    handleSubmit = (event) => {
        if (event.key === 'Enter' || event.keyCode === 13) {
            this.handleConfirmBooking()
        }
    }

    render() {
        let { isOpenModal, closeBookingModal, dataTime, keyDown, language } = this.props
        let doctorId = dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : '';

        return (

            <div onKeyDown={(event) => keyDown(event)}>
                <Modal isOpen={isOpenModal}
                    // toggle={''}
                    className="booking-modal-container"
                    size="lg"
                    centered

                >
                    <div className="booking-modal-content" onKeyDown={(event) => this.handleSubmit(event)}>
                        <div className="booking-modal-header">
                            <span className="left"><FormattedMessage id='patient.booking-modal.title' /></span>
                            <span className="right" onClick={closeBookingModal}><i className="fas fa-times"></i></span>
                        </div>
                        <div className="booking-modal-body">
                            {/* {JSON.stringify(dataTime)} */}
                            <div className="doctor-infor">
                                <ProfileDoctor doctorId={doctorId} isShowDescDoctor={false}
                                    isShowLinkDetail={false} isShowPrice={true}
                                    isShowPosition={false} dataTime={dataTime} />
                            </div>
                            <div className="row">
                                <div className="col-6 py-1 form-group">
                                    <i className="fas fa-user"></i>
                                    <label><FormattedMessage id='patient.booking-modal.fullname' /></label>
                                    <input className="form-control"
                                        value={this.state.fullName}
                                        onChange={(event) => this.handleOnChangeInput(event, 'fullName')} />

                                </div>
                                <div className="col-6 py-1 form-group">
                                    <i className="fas fa-phone"></i>
                                    <label><FormattedMessage id='patient.booking-modal.phonenumber' /></label>
                                    <input className="form-control" value={this.state.phoneNumber}
                                        onChange={(event) => this.handleOnChangeInput(event, 'phoneNumber')} />
                                </div>
                                <div className="col-6 py-1 form-group">
                                    <i className="fas fa-envelope"></i>
                                    <label><FormattedMessage id='patient.booking-modal.email' /></label>
                                    <input className="form-control" value={this.state.email}
                                        onChange={(event) => this.handleOnChangeInput(event, 'email')} />
                                </div>
                                <div className="col-6 py-1 form-group">
                                    <i className="fas fa-map-marker-alt"></i>
                                    <label><FormattedMessage id='patient.booking-modal.address' /></label>
                                    <input className="form-control" value={this.state.address}
                                        onChange={(event) => this.handleOnChangeInput(event, 'address')} />
                                </div>
                                <div className="col-6 py-1 form-group">
                                    <i className="fas fa-clipboard-list"></i>
                                    <label><FormattedMessage id='patient.booking-modal.reason' /></label>
                                    <input className="form-control" value={this.state.reason}
                                        onChange={(event) => this.handleOnChangeInput(event, 'reason')} />
                                </div>
                                <div className="col-3 py-1 form-group">
                                    <i className="fas fa-birthday-cake"></i>
                                    <label><FormattedMessage id='patient.booking-modal.birthday' /></label>
                                    <DatePicker className='form-control'
                                        onChange={this.handleOnChangeDatePicker}
                                        value={this.state.birthday}
                                    // minDate={new Date().setHours(0, 0, 0, 0)}
                                    />
                                </div>
                                <div className="col-3 py-1 form-group">
                                    <i className="fas fa-venus-mars"></i>
                                    <label><FormattedMessage id='patient.booking-modal.gender' /></label>
                                    <Select
                                        placeholder={language === LANGUAGES.VI ? 'Chọn giới tính' : 'Select gender'}
                                        value={this.state.selectedGender}
                                        onChange={this.handleChangeSelect}
                                        options={this.state.genders} />
                                </div>

                            </div>
                        </div>
                        <div className="booking-modal-footer">
                            <div className='col-6' style={{ color: 'red' }}>{this.state.errors} </div>

                            <button className="btn btn-primary"
                                onClick={() => this.handleConfirmBooking()} ><FormattedMessage id='patient.booking-modal.confirm' /></button>
                            <button className="btn btn-danger" onClick={closeBookingModal}><FormattedMessage id='patient.booking-modal.cancel' /></button>
                        </div>


                    </div>
                </Modal >
            </div >
        )
    }
}
const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchGender: () => dispatch(actions.fetchGenderStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
