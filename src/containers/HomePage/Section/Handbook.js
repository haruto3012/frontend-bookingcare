import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';


class Handbook extends Component {

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }


    render() {


        return (
            <div className='section-share section-handbook'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Cẩm nang</span>
                        <button className='btn-section'>TẤT CẢ BÀI VIẾT</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-customize'>
                                <div className='bg-img section-handbook' ></div>
                                <div>Cẩm nang 1</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-img section-handbook' ></div>
                                <div>Cẩm nang 1</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-img section-handbook' ></div>
                                <div>Cẩm nang 1</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-img section-handbook' ></div>
                                <div>Cẩm nang 1</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-img section-handbook' ></div>
                                <div>Cẩm nang 1</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-img section-handbook' ></div>
                                <div>Cẩm nang 1</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-img section-handbook' ></div>
                                <div>Cẩm nang 1</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-img section-handbook' ></div>
                                <div>Cẩm nang 1</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-img section-handbook' ></div>
                                <div>Cẩm nang 1</div>
                            </div>


                        </Slider>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Handbook);
