import "./DetailSpecialty.scss"
import React, { Component } from 'react';
import { connect } from "react-redux";
import moment from "moment";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from 'react-intl';
import _ from "lodash";
import { getDetailSpecialtyById, getAllCodeService } from "../../../services/userService";
import HeaderHomePage from "../../HomePage/HeaderHomePage";
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from "../Doctor/ProfileDoctor";


class DetailSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailSpecialty: {},
            listProvince: [],
            isShowDetailInfor: false,

        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            let res = await getDetailSpecialtyById({
                id: id,
                location: 'ALL'
            })

            let resPro = await getAllCodeService('PROVINCE')
            if (res && res.errCode === 0 && resPro && resPro.errCode === 0) {
                let data = res.data;
                let arrDoctorId = []
                if (data && !_.isEmpty(data)) {
                    let arr = data.doctorSpecialty;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }

                let dataProvince = resPro.data
                if (dataProvince && dataProvince.length > 0) {
                    dataProvince.unshift({
                        createAt: null,
                        keyMap: 'ALL',
                        type: 'PROVINCE',
                        valueEn: 'All',
                        valueVi: 'Toàn quốc'
                    })
                }

                this.setState({
                    dataDetailSpecialty: res.data,
                    arrDoctorId: arrDoctorId,
                    listProvince: dataProvince ? dataProvince : []
                })
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }


    }


    handleOnChangeSelect = async (event) => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            let location = event.target.value

            let res = await getDetailSpecialtyById({
                id: id,
                location: location
            })

            if (res && res.errCode === 0) {
                let data = res.data;
                let arrDoctorId = []
                if (data && !_.isEmpty(data)) {
                    let arr = data.doctorSpecialty;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }

                this.setState({
                    dataDetailSpecialty: res.data,
                    arrDoctorId: arrDoctorId,
                })
            }
        }
    }
    showHideDetailInfor = (status) => {
        this.setState({
            isShowDetailInfor: !status
        })
    }

    render() {
        let { arrDoctorId, dataDetailSpecialty, listProvince, isShowDetailInfor } = this.state
        let { language } = this.props

        return (
            <div className="detail-specialty-container">
                <HeaderHomePage />
                <div className="detail-specialty-body">
                    {isShowDetailInfor === false &&
                        <div className="description-specialty" style={{ maxHeight: '130px' }}>
                            {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) &&
                                <>
                                    < div dangerouslySetInnerHTML={{ __html: dataDetailSpecialty.descriptionHTML }}>
                                    </div>
                                </>
                            }
                        </div>
                    }
                    {isShowDetailInfor === true &&
                        <div className="description-specialty">
                            {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) &&
                                <>
                                    < div dangerouslySetInnerHTML={{ __html: dataDetailSpecialty.descriptionHTML }}></div>

                                </>
                            }

                        </div>}
                    <div className="infor-doctor">
                        {isShowDetailInfor === true ? <span
                            className="detail"
                            onClick={() => this.showHideDetailInfor(isShowDetailInfor)}>
                            <FormattedMessage id='patient.extra-infor-doctor.hidedetail' />
                        </span> : <span
                            className="detail"
                            onClick={() => this.showHideDetailInfor(isShowDetailInfor)}>
                            <FormattedMessage id='patient.extra-infor-doctor.read-more' />
                        </span>
                        }
                        <div className="search-doctor-by-spe">
                            <select onChange={(event) => this.handleOnChangeSelect(event)}>
                                {listProvince && listProvince.length > 0 && listProvince.map((item, index) => {
                                    return (
                                        <option key={index} value={item.keyMap}>{language === LANGUAGES.VI ? item.valueVi : item.valuaEn}</option>
                                    )
                                })}
                            </select>
                        </div>
                        {arrDoctorId && arrDoctorId.length > 0 && arrDoctorId.map((item, index) => {
                            return (
                                <div className="each-doctor" key={index}>
                                    <div className="content-left">
                                        <div className="profile-doctor">
                                            <ProfileDoctor doctorId={item}
                                                isShowDescDoctor={true}
                                                isShowLinkDetail={true}
                                                isShowPrice={false}
                                                isShowPosition={true}
                                            // dataTime={dataTime}
                                            />

                                        </div>
                                    </div>
                                    <div className="content-right">
                                        <div className="doctor-schedule">

                                            <DoctorSchedule doctorIdFromParent={item} />
                                        </div>
                                        <div className="doctor-extra-infor">
                                            <DoctorExtraInfor doctorIdFromParent={item} />
                                        </div>

                                    </div>
                                </div>

                            )
                        })}
                    </div>
                </div>

            </div >
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
