import "./ListSpecialty.scss"
import React, { Component } from 'react';
import { connect } from "react-redux";
import moment from "moment";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from 'react-intl';
import _ from "lodash";
import { getAllSpecialtyService } from '../../../services/userService';


class ListSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSpecialty: [],
        }
    }

    async componentDidMount() {
        let res = await getAllSpecialtyService()
        if (res && res.errCode === 0) {
            this.setState({
                dataSpecialty: res.data
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }

    handleViewDetailSpecialty = (item) => {
        if (this.props.history) {

            this.props.history.push(`/detail-specialty/${item.id}`)
        }
    }

    returnToHome = () => {
        if (this.props.history) {

            this.props.history.push(`/home`)
        }
    }


    render() {
        let { dataSpecialty } = this.state
        let { language } = this.props
        return (
            <>
                <div className="list-container">
                    <div className="header-list">
                        <i className="fad fa-arrow-alt-left" onClick={() => this.returnToHome()}></i>
                        <span>{language === LANGUAGES.VI ? 'Chuyên khoa' : 'Specialty'}</span>
                    </div>
                    <div className="row">
                        {dataSpecialty && dataSpecialty.length > 0 && dataSpecialty.map((item, index) => {
                            return (
                                <div className='specialty-child row' key={index}
                                    onClick={() => this.handleViewDetailSpecialty(item)}>
                                    <div className='col-2 bg-img-specialty'
                                        style={{ backgroundImage: `url(${item.image})` }}></div>
                                    <div className='col-2 specialty-name'>{item.name}</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ListSpecialty);
