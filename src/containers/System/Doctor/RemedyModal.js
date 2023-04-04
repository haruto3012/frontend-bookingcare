import "./RemedyModal.scss"
import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES, CommonUtils } from "../../../utils";
import { FormattedMessage } from 'react-intl';
import _ from "lodash";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { toast, Toast } from "react-toastify";





class RemedyModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            imgBase64: ''
        }
    }

    async componentDidMount() {
        if (this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.dataModal !== this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }

    handleOnChangeEmail = (event) => {
        this.setState({
            email: event.target.value
        })

    }

    handleChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            this.setState({
                imgBase64: base64
            })
        }

    }

    handleSendRemedy = () => {
        this.props.sendRemedy(this.state)
    }


    render() {
        let { sendRemedy, isOpenModal, closeRemedyModal, dataModal } = this.props

        return (

            <div>
                <Modal isOpen={isOpenModal}
                    // toggle={''}
                    className="booking-modal-container"
                    size="md"
                    centered
                >
                    <div className="modal-header">
                        <h5 className="modal-title">Modal title</h5>
                        <button type="button" className="close" aria-label="Close" onClick={closeRemedyModal}>
                            <span aria-hidden="true">x</span>
                        </button>
                    </div>
                    <ModalBody>
                        <div className="row">
                            <div className="col-6 form-group">
                                <label>Email bệnh nhân</label>
                                <input className="form-control" type="email" value={this.state.email}
                                    onChange={(event) => { this.handleOnChangeEmail(event) }} />

                            </div>
                            <div className="col-6 form-group">
                                <label>Chọn file đơn thuốc</label>
                                <input className="form-control-file" type="file"
                                    onChange={(event) => this.handleChangeImage(event)} />
                            </div>

                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary px-3" onClick={() => this.handleSendRemedy()}>Send</Button>{' '}
                        <Button color="secondary px-3" onClick={closeRemedyModal}>Cancel</Button>
                    </ModalFooter>
                </Modal >
            </div >
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

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
