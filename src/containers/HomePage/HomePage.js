import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import HeaderHomePage from './HeaderHomePage';
import Specialty from './Section/Specialty';
import MedicalFacilities from './Section/MedicalFacilities';
import './HomePage.scss';
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import OutstandingDoctor from './Section/OutstandingDoctor';
import Handbook from './Section/Handbook';
import About from './Section/About';
import FooterHomePage from './FooterHomePage';


class HomePage extends Component {
    // handleAfterChange = (event, slick, currentSlide) => {

    // }
    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            // slickGoTo: this.handleAfterChange
        };

        return (
            <div style={{ fontFamily: 'Montserrat' }}>

                <HeaderHomePage isShowBanner={true} />
                <Specialty settings={settings} />
                <MedicalFacilities settings={settings} />
                <OutstandingDoctor settings={settings} />
                <Handbook settings={settings} />
                <About />
                <FooterHomePage />
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
