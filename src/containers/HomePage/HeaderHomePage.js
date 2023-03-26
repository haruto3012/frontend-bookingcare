import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { LANGUAGES } from '../../utils/constant'
import { changeLanguageApp } from '../../store/actions';
import { withRouter } from 'react-router-dom';
// import { adminMenu } from './menuApp';
import './HeaderHomePage.scss';
import bg1 from '../../assets/images/khamchuyenkhoa.png'
import bg2 from '../../assets/images/khamtuxa.png'
import bg3 from '../../assets/images/khamtongquat.png'
import bg4 from '../../assets/images/dichvuxetnghiem.png'
import bg5 from '../../assets/images/suckhoetinhthan.png'
import bg6 from '../../assets/images/khamnhakhoa.png'
import bg7 from '../../assets/images/goiphauthuat.jpg'
import bg8 from '../../assets/images/sanphamyte.png'
import bg9 from '../../assets/images/khamdoanhnghiep.jpg'
import banner from '../../assets/bookingcare-cover-4.jpg'
import logo from '../../assets/logo.svg'
// import { lang } from 'moment/moment';

class HeaderHomePage extends Component {

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }

    returnToHome = () => {
        if (this.props.history) {

            this.props.history.push(`/home`)
        }
    }


    render() {
        let language = this.props.language

        return (
            <>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className='left-content'>
                            <i className="fas fa-bars"></i>
                            <img className='header-logo' src={logo} alt='logo' onClick={() => this.returnToHome()} />
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div><b> <FormattedMessage id='home-header.speciality' /></b></div>
                                <div className='sub-title'><FormattedMessage id='home-header.search-doctor' /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id='home-header.health-facility' /></b></div>
                                <div className='sub-title'><FormattedMessage id='home-header.select-room' /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id='home-header.doctor' /></b></div>
                                <div className='sub-title'><FormattedMessage id='home-header.select-doctor' /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id='home-header.package' /></b></div>
                                <div className='sub-title'><FormattedMessage id='home-header.check-total-health' /></div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='support'><i className="fas fa-question-circle"></i><FormattedMessage id='home-header.support' /></div>
                            <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}><span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</span></div>
                            <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}><span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span></div>
                        </div>
                    </div>
                </div>
                {this.props.isShowBanner === true &&
                    <div className='home-header-banner' style={{ backgroundImage: `url(${banner})` }}>
                        <div className='content-up'>
                            <div className='title1'><FormattedMessage id='banner.title1' /></div>
                            <div className='title2'><FormattedMessage id='banner.title2' /></div>
                            <div className='search'>
                                <i className="fas fa-search"></i>
                                <input type='text' placeholder='Tìm chuyên khoa khám bệnh' />
                            </div>
                        </div>
                        <div className='content-down'>
                            <div className='options'>
                                <a className='option-child' href='#'>
                                    <div className='icon-child' style={{ backgroundImage: `url(${bg1})`, backgroundSize: '32px' }} ></div>
                                    <div className='text-child'><FormattedMessage id='banner.icon1' /></div>
                                </a>
                                <a className='option-child' href='#'>
                                    <div className='icon-child' style={{ backgroundImage: `url(${bg2})`, backgroundSize: '32px' }}></div>
                                    <div className='text-child'><FormattedMessage id='banner.icon2' /></div>
                                </a>
                                <a className='option-child' href='#'>
                                    <div className='icon-child' style={{ backgroundImage: `url(${bg3})`, backgroundSize: '32px' }}></div>
                                    <div className='text-child'><FormattedMessage id='banner.icon3' /></div>
                                </a>
                                <a className='option-child' href='#'>
                                    <div className='icon-child' style={{ backgroundImage: `url(${bg4})`, backgroundSize: '32px' }}></div>
                                    <div className='text-child'><FormattedMessage id='banner.icon4' /></div>
                                </a>
                                <a className='option-child' href='#'>
                                    <div className='icon-child' style={{ backgroundImage: `url(${bg5})`, backgroundSize: '32px' }}></div>
                                    <div className='text-child'><FormattedMessage id='banner.icon5' /></div>
                                </a>
                                <a className='option-child' href='#'>
                                    <div className='icon-child' style={{ backgroundImage: `url(${bg6})`, backgroundSize: '32px' }}></div>
                                    <div className='text-child'><FormattedMessage id='banner.icon6' /></div>
                                </a>
                                <a className='option-child' href='#'>
                                    <div className='icon-child' style={{ backgroundImage: `url(${bg7})`, backgroundSize: '32px' }}></div>
                                    <div className='text-child'><FormattedMessage id='banner.icon7' /></div>
                                </a>
                                <a className='option-child' href='#'>
                                    <div className='icon-child' style={{ backgroundImage: `url(${bg8})`, backgroundSize: '32px' }}></div>
                                    <div className='text-child'><FormattedMessage id='banner.icon8' /></div>
                                </a>
                                <a className='option-child' href='#'>
                                    <div className='icon-child' style={{ backgroundImage: `url(${bg9})`, backgroundSize: '32px' }}></div>
                                    <div className='text-child'><FormattedMessage id='banner.icon9' /></div>
                                </a>
                            </div>
                        </div>
                    </div>
                }
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderHomePage));
