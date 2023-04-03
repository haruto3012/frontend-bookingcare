import "./ProfileDoctor.scss"
import React, { Component } from 'react';
import { connect } from "react-redux";
import { getProfileInforDoctorByIdService } from "../../../services/userService";
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from "../../../utils";
import moment from "moment";
import _ from "lodash";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";


class ProfileDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {}
        }
    }

    async componentDidMount() {
        let data = await this.getInforDoctor(this.props.doctorId)
        this.setState({
            dataProfile: data
        })
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }

        if (this.props.doctorId !== prevProps.doctorId) {
            let data = await this.getInforDoctor(this.props.doctorId);
            this.setState({
                dataProfile: data,
            });
        }
    }

    getInforDoctor = async (id) => {
        let result = {};
        if (id) {
            let res = await getProfileInforDoctorByIdService(id)
            if (res && res.errCode === 0) {
                result = res.data
            }
        }
        return result
    }

    renderTimeBooking = (dataTime) => {
        let { language } = this.props

        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn
            let date = language === LANGUAGES.VI ? moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY') : moment.unix(+dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY')
            return (
                <>
                    <div>
                        {time} - {date}
                    </div>
                </>
            )
        }
        return <></>

    }


    render() {
        let { dataProfile } = this.state
        let { language, isShowDescDoctor, dataTime, isShowLinkDetail, isShowPrice, doctorId, isShowPosition } = this.props
        let nameVi = '', nameEn = ''
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi}. ${dataProfile.lastName} ${dataProfile.firstName}`;
            nameEn = `${dataProfile.positionData.valueEn}. ${dataProfile.firstName} ${dataProfile.lastName}`;
        }
        console.log('check data profile', dataProfile)
        console.log('check province')
        return (
            <div className="profile-doctor-container">
                <div className='intro-doctor'>
                    <div className='content-intro-left' style={{ backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ''})` }}>

                    </div>
                    <div className='content-intro-right'>
                        <div className='intro-up'>
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                        </div>
                        <div className='intro-down'>
                            {isShowDescDoctor === true ?
                                <>
                                    {dataProfile && dataProfile.Markdown && dataProfile.Markdown.description &&
                                        <span>
                                            {dataProfile.Markdown.description}
                                        </span>
                                    }
                                </>
                                : <>
                                    {this.renderTimeBooking(dataTime)}
                                </>
                            }
                            {isShowPosition === true &&
                                <div>
                                    <i className="fas fa-map-marker-alt"></i>
                                    &nbsp;
                                    {dataProfile && dataProfile.Doctor_Infor && dataProfile.Doctor_Infor.provinceTypeData &&
                                        <span>
                                            {language === LANGUAGES.VI ?
                                                dataProfile.Doctor_Infor.provinceTypeData.valueVi
                                                :
                                                dataProfile.Doctor_Infor.provinceTypeData.valueEn}
                                        </span>}
                                </div>}
                        </div>
                    </div>
                </div>
                {isShowLinkDetail === true &&
                    <div className="view-detail-doctor">
                        <Link to={`/detail-doctor/${doctorId}`} className='link-to'>Xem thêm</Link>
                    </div>
                }
                {isShowPrice === true &&
                    <div className="price">
                        <span className="pri">
                            {<FormattedMessage id='patient.booking-modal.price' />}
                        </span>
                        <span className="ce">
                            {dataProfile && dataProfile.Doctor_Infor && language === LANGUAGES.VI &&
                                <NumberFormat
                                    className="currency"
                                    value={dataProfile.Doctor_Infor.priceTypeData.valueVi}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'VNĐ.'} />
                            }
                            {dataProfile && dataProfile.Doctor_Infor && language === LANGUAGES.EN &&
                                <NumberFormat
                                    className="currency"
                                    value={dataProfile.Doctor_Infor.priceTypeData.valueEn}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'$.'} />
                            }
                        </span>
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
