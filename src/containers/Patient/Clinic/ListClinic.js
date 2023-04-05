import "./ListClinic.scss"
import React, { Component } from 'react';
import { connect } from "react-redux";
import moment from "moment";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from 'react-intl';
import _ from "lodash";
import { getAllClinicService } from '../../../services/userService';


class ListClinic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataClinics: [],
        }
    }

    async componentDidMount() {
        let res = await getAllClinicService()
        if (res && res.errCode === 0) {
            this.setState({
                dataClinics: res.data
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }

    handleViewDetailClinic = (clinic) => {
        if (this.props.history) {

            this.props.history.push(`/detail-clinic/${clinic.id}`)
        }
    }

    returnToHome = () => {
        if (this.props.history) {

            this.props.history.push(`/home`)
        }
    }


    render() {
        let { dataClinics } = this.state
        let { language } = this.props
        return (
            <>
                <div className="list-container">
                    <div className="header-list">
                        <i className="fad fa-arrow-alt-left" onClick={() => this.returnToHome()}></i>
                        <span>{language === LANGUAGES.VI ? 'Cơ sở y tế' : 'Medical Clinic'}</span>
                    </div>
                    <div className="row">
                        {dataClinics && dataClinics.length > 0 && dataClinics.map((item, index) => {
                            return (
                                <div className='clinic-child row' key={index}
                                    onClick={() => this.handleViewDetailClinic(item)}>
                                    <div className='col-2 bg-img-clinic'
                                        style={{ backgroundImage: `url(${item.image})` }}></div>
                                    <div className='col-2 clinic-name'>{item.name}</div>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListClinic);
