import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import { getAllClinicService } from '../../../services/userService';
import { withRouter } from 'react-router-dom';
import './MedicalFacilities.scss'
import { FormattedMessage } from 'react-intl';

class MedicalFacilities extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataClinics: []
        }
    }

    async componentDidMount() {
        let res = await getAllClinicService()
        if (res && res.errCode === 0) {
            this.setState({
                dataClinics: res.data ? res.data : []
            })
        }
    }

    handleViewDetailClinic = (clinic) => {
        if (this.props.history) {

            this.props.history.push(`/detail-clinic/${clinic.id}`)
        }
    }

    handleViewListClinic = () => {
        if (this.props.history) {
            this.props.history.push(`/list-clinic`)
        }
    }

    render() {
        let { dataClinics } = this.state
        return (
            <div className='section-share section-medical-facility'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'><FormattedMessage id='homepage.outstanding-medical' /></span>
                        <button className='btn-section' onClick={() => this.handleViewListClinic()}><FormattedMessage id='homepage.more-infor' /></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {dataClinics && dataClinics.length > 0 && dataClinics.map((item, index) => {
                                return (<div className='section-customize clinic-child' key={index}
                                    onClick={() => this.handleViewDetailClinic(item)}>
                                    <div className='bg-img section-medical-facility'
                                        style={{ backgroundImage: `url(${item.image})` }}></div>
                                    <div className='clinic-name'>{item.name}</div>
                                </div>)
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
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacilities));
