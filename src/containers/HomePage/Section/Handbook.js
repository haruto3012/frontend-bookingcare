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
                                <div>Cơ xương khớp</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-img section-handbook' ></div>
                                <div>Thần kinh</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-img section-handbook' ></div>
                                <div>Tim mạch</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-img section-handbook' ></div>
                                <div>Tiêu hoá</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-img section-handbook' ></div>
                                <div>Tai mũi họng</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-img section-handbook' ></div>
                                <div>Cột sống</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-img section-handbook' ></div>
                                <div>Y học cổ truyền</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-img section-handbook' ></div>
                                <div>Châm cứu</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-img section-handbook' ></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Handbook);
