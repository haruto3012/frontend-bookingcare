import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Slider from 'react-slick';

class OutstandingDoctor extends Component {

    render() {

        return (
            <div className='section-share section-outstanding-doctor'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Bác sĩ nổi bật tuần qua</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-customize'>
                                <div className='border-customize'>

                                    <div className='outer-bg'>
                                        <div className='bg-img section-outstanding-doctor' />
                                    </div>
                                    <div className='position text-center'>
                                        <div>Giáo sư, Tiến sĩ Sát thủ đa tình</div>
                                        <div>Bệnh viện hữu nghị Việt Đức</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='border-customize'>
                                    <div className='outer-bg'>
                                        <div className='bg-img section-outstanding-doctor' />
                                    </div>
                                    <div className='position text-center'>
                                        <div>Giáo sư, Tiến sĩ Sát thủ đa tình</div>
                                        <div>Bệnh viện Chợ Rẫy</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='border-customize'>

                                    <div className='outer-bg'>
                                        <div className='bg-img section-outstanding-doctor' />
                                    </div>
                                    <div className='position text-center'>
                                        <div>Giáo sư, Tiến sĩ Sát thủ đa tình</div>
                                        <div>Phòng khám bệnh viện Đại học Y Dược 1</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='border-customize'>

                                    <div className='outer-bg'>
                                        <div className='bg-img section-outstanding-doctor' />
                                    </div>
                                    <div className='position text-center'>
                                        <div>Giáo sư, Tiến sĩ Sát thủ đa tình</div>
                                        <div>Bệnh viện Ung bướu Hưng Việt</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='border-customize'>

                                    <div className='outer-bg'>
                                        <div className='bg-img section-outstanding-doctor' />
                                    </div>
                                    <div className='position text-center'>
                                        <div>Giáo sư, Tiến sĩ Sát thủ đa tình</div>
                                        <div>Hệ thống y tế Thu Cúc TCI</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='border-customize'>

                                    <div className='outer-bg'>
                                        <div className='bg-img section-outstanding-doctor' />
                                    </div>
                                    <div className='position text-center'>
                                        <div>Giáo sư, Tiến sĩ Sát thủ đa tình</div>
                                        <div>Hệ thống y tế MEDLATEC</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='border-customize'>

                                    <div className='outer-bg'>
                                        <div className='bg-img section-outstanding-doctor' />
                                    </div>
                                    <div className='position text-center'>
                                        <div>Giáo sư, Tiến sĩ Sát thủ đa tình</div>
                                        <div>Bệnh viện đa khoa Hồng Phát</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='border-customize'>

                                    <div className='outer-bg'>
                                        <div className='bg-img section-outstanding-doctor' />
                                    </div>
                                    <div className='position text-center'>
                                        <div>Giáo sư, Tiến sĩ Sát thủ đa tình</div>
                                        <div>Bệnh viện đa khoa Xuyên Á</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='border-customize'>

                                    <div className='outer-bg'>
                                        <div className='bg-img section-outstanding-doctor' />
                                    </div>
                                    <div className='position text-center'>
                                        <div>Giáo sư, Tiến sĩ Sát thủ đa tình</div>
                                        <div>Bệnh viện đa khoa 175</div>
                                    </div>
                                </div>
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
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor);
