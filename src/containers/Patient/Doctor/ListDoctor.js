import "./ListDoctor.scss"
import React, { Component } from 'react';
import { connect } from "react-redux";
import moment from "moment";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from 'react-intl';
import _ from "lodash";
import * as actions from '../../../store/actions';



class ListDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrDoctors: [],
            arrClinic: []
        }
    }

    async componentDidMount() {
        this.props.loadTopDoctors()
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
        if (prevProps.topDoctorRedux !== this.props.topDoctorRedux) {
            this.setState({
                arrDoctors: this.props.topDoctorRedux
            })
        }
    }

    handleViewDetailDoctor = (doctor) => {
        if (this.props.history) {

            this.props.history.push(`/detail-doctor/${doctor.id}`)
        }
    }

    returnToHome = () => {
        if (this.props.history) {

            this.props.history.push(`/home`)
        }
    }


    render() {
        let { arrDoctors } = this.state
        let { language } = this.props
        return (
            <>
                <div className="list-container">
                    <div className="header-list">
                        <i className="fad fa-arrow-alt-left" onClick={() => this.returnToHome()}></i>
                        <span>{language === LANGUAGES.VI ? 'Bác sĩ nổi bật' : 'Outstanding Doctor'}</span>
                    </div>
                    <div className="row">
                        {arrDoctors && arrDoctors.length > 0 && arrDoctors.map((item, index) => {
                            let imageBase64 = ''
                            if (item.image) {
                                imageBase64 = new Buffer(item.image, 'base64').toString('binary')

                            }
                            let nameVi = `${item.positionData.valueVi}. ${item.lastName} ${item.firstName}`
                            let nameEn = `${item.positionData.valueEn}. ${item.firstName} ${item.lastName}`
                            return (
                                <div className='doctor-child row' key={index}
                                    onClick={() => this.handleViewDetailDoctor(item)}>
                                    <div className='col-2 bg-img-doctor'
                                        style={{ backgroundImage: `url(${imageBase64})` }}></div>
                                    <div className='col-2'>
                                        <div className="doctor-name">{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                        <div className='address-clinic'>{item.address}</div>
                                    </div>
                                </div>
                            )
                        })}


                    </div>
                </div >

            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        topDoctorRedux: state.admin.topDoctor,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctor())

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListDoctor);
