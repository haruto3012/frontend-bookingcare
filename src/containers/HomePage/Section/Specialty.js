import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';


class Specialty extends Component {

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }


    render() {


        return (
            <div className='section-share section-specialty'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Chuyên khoa phổ biến</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-customize'>
                                <div className='bg-img section-specialty' ></div>
                                <div>Cơ xương khớp</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-img section-specialty' ></div>
                                <div>Thần kinh</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-img section-specialty' ></div>
                                <div>Tim mạch</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-img section-specialty' ></div>
                                <div>Tiêu hoá</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-img section-specialty' ></div>
                                <div>Tai mũi họng</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-img section-specialty' ></div>
                                <div>Cột sống</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-img section-specialty' ></div>
                                <div>Y học cổ truyền</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-img section-specialty' ></div>
                                <div>Châm cứu</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-img section-specialty' ></div>
                                <div>Sản phụ khoa</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
