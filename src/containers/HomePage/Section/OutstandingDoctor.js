import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import './OutstandingDoctor.scss'


class OutstandingDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrDoctors: [],
            arrClinic: []
        }
    }

    async componentDidMount() {
        this.props.loadTopDoctors()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
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

    handleViewListDoctor = () => {
        if (this.props.history) {
            this.props.history.push(`/list-doctor`)
        }
    }

    render() {
        let { arrDoctors } = this.state
        let { language } = this.props
        return (
            <div className='section-share section-outstanding-doctor'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'><FormattedMessage id='homepage.outstanding-doctor' /></span>
                        <button className='btn-section' onClick={() => this.handleViewListDoctor()}><FormattedMessage id='homepage.more-infor' /></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>

                            {arrDoctors && arrDoctors.length > 0 && arrDoctors.map((item, index) => {
                                let imageBase64 = ''
                                if (item.image) {
                                    imageBase64 = new Buffer(item.image, 'base64').toString('binary')

                                }
                                let nameVi = `${item.positionData.valueVi}. ${item.lastName} ${item.firstName}`
                                let nameEn = `${item.positionData.valueEn}. ${item.firstName} ${item.lastName}`
                                return (

                                    <div className='section-customize outstanding-doctor-child' key={index} onClick={() => this.handleViewDetailDoctor(item)}>
                                        <div className='border-customize'>
                                            <div className='outer-bg'>
                                                <div className='bg-img section-outstanding-doctor'
                                                    style={{ backgroundImage: `url(${imageBase64})` }} />
                                            </div>
                                            <div className='position text-center'>
                                                <div className='outstanding-doctor-name'>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                                <div className='address-clinic'>{item.address}</div>
                                            </div>
                                        </div>
                                    </div>

                                )
                            })}


                        </Slider>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        topDoctorRedux: state.admin.topDoctor,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctor())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor));
