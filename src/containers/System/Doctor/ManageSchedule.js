import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import './ManageSchedule.scss'
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from "../../../store/actions"
import { LANGUAGES, dateFormat } from '../../../utils';
import { getDetailInforDoctorService } from '../../../services/userService';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import FormattedDate from '../../../components/Formating/FormattedDate';
import { toast, Toast } from 'react-toastify';
import _ from 'lodash';
import { saveBulkScheduleDoctorService } from '../../../services/userService';


class ManageSchedule extends Component {

    constructor(props) {
        super(props)
        this.state = {
            listDoctors: [],
            selectedDoctor: {},
            currentDate: '',
            rangeTime: ''
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctorsRedux();
        this.props.fetchAllScheduleTime();
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })
        }

        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            let data = this.props.allScheduleTime
            if (data && data.length > 0) {
                data = data.map(item => ({
                    ...item,
                    isSelected: false

                }))
            }
            this.setState({
                rangeTime: data

            })
        }

        // if (prevProps.language !== this.props.language) {
        //     let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
        //     this.setState({
        //         listDoctors: dataSelect
        //     })
        // }

    }

    buildDataInputSelect = (inputData) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`
                let labelEn = `${item.firstName} ${item.lastName}`
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id
                result.push(object)
            })
        }
        return result;
    }

    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor });
    };

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }

    handleClickButtonTime = (time) => {
        let { rangeTime } = this.state
        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map(item => {
                if (item.id === time.id) item.isSelected = !item.isSelected;
                return item;
            })
            this.setState({
                rangeTime: rangeTime
            })
        }

    }

    handleSaveSchedule = async () => {
        let { rangeTime, selectedDoctor, currentDate } = this.state
        let result = []
        if (!currentDate) {
            toast.error('Invalid Date')
            return
        }
        if (selectedDoctor && _.isEmpty(selectedDoctor)) {

            toast.error('Invalid Selected Doctor')
            return
        }
        // let formattedDate = moment(currentDate).unix();
        let formattedDate = new Date(currentDate).getTime();

        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(item => item.isSelected === true);
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map(item => {
                    let object = {};
                    object.doctorId = selectedDoctor.value;
                    object.date = formattedDate;
                    object.timeType = item.keyMap;
                    result.push(object)
                })
            } else {
                toast.error('Invalid Selected Time!')
                return
            }
        }
        let res = await saveBulkScheduleDoctorService({
            arrSchedule: result,
            doctorId: selectedDoctor.value,
            formattedDate: formattedDate
        })

        if (res && res.errCode === 0) {
            toast.success("Save schedule succeed!")
        } else {
            toast.error("Save failed!")
        }
    }

    render() {
        let { rangeTime } = this.state
        let { language } = this.props
        // let yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
        return (
            <div className='manage-schedule-container'>
                <div className='manage-schedule-title'>
                    <FormattedMessage id={'manage-schedule.title'} />
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id={'manage-schedule.choose-doctor'} /></label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDoctors} />
                        </div>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id={'manage-schedule.choose-date'} /></label>
                            <DatePicker className='form-control'
                                onChange={this.handleOnChangeDatePicker}
                                value={this.state.currentDate}
                                minDate={new Date().setHours(0, 0, 0, 0)}
                            />
                        </div>
                        <div className='col-12 pick-hour-container mt-3'>
                            {rangeTime && rangeTime.length > 0 &&
                                rangeTime.map((item, index) => {
                                    return (
                                        <button className={item.isSelected === true ? 'btn btn-schedule active' : 'btn btn-schedule'}
                                            key={index} onClick={() => this.handleClickButtonTime(item)}>
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </button>
                                    )
                                })}
                        </div>
                        <div className='col-12'>

                            <button type='button' className='btn btn-primary btn-save-schedule'
                                onClick={() => this.handleSaveSchedule()}
                            ><FormattedMessage id={'manage-schedule.save-infor'} /></button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allScheduleTime: state.admin.allScheduleTime,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorsRedux: () => dispatch(actions.fetchAllDoctors()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
