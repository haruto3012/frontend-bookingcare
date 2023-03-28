import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';


class About extends Component {

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }


    render() {


        return (
            <div className='section-share section-about'>
                <div className='section-about-header'>
                    Truyền thông nói về Tiến sĩ Haruto như thế nào?
                </div>
                <div className='section-about-content'>
                    <div className='content-left'>
                        <iframe width="100%" height="360px"
                            src="https://www.youtube.com/embed/IBTmypxD2mU"
                            title="Michael Wong 光良【 Fairy Tale 童话 Tong Hua 】"
                            frameBorder="{0}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen>
                        </iframe>


                    </div>
                    <div className='content-right'>
                        <p>Trong thời đại công nghệ 4.0, việc sử dụng mạng Internet và các thiết bị kết nối đã trở thành một phần không thể thiếu trong cuộc sống của chúng ta. Tuy nhiên, cùng với sự phát triển của công nghệ, sự nguy hiểm và các mối đe dọa liên quan đến an ninh mạng cũng ngày càng tăng lên.
                            💥Với những kỹ năng và hiểu biết về an ninh mạng, sinh viên có thể sử dụng mạng Internet một cách an toàn và hiệu quả, đồng thời giúp xây dựng một không gian mạng văn minh và lịch sự hơn.
                            🍀🍀Hãy cùng nhau chung tay bảo vệ an ninh mạng và xây dựng một không gian mạng văn minh, lịch sự và an toàn cho cộng đồng! Hôm nay, Đoàn – Hội Khoa CNTT mang đến cho các bạn checklist về chủ đề “Sinh viên làm chủ Công nghệ”.

                        </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
