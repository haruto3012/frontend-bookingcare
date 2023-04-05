import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';
import { LANGUAGES } from '../../utils';
import { FormattedMessage } from 'react-intl';

class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        }

        this.listenToEmitter();
    }

    listenToEmitter() {
        emitter.on(`EVENT_CLEAR_MODAL_DATA`, () => {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
            })
        })
    }

    componentDidMount() {
    }

    toggle = () => {
        this.props.toggleFromParent()
    }

    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        });
    }

    checkValidateInput = () => {
        let isValid = true
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter: ' + arrInput[i]);
                break;
            }

        }
        return isValid;
    }

    handleAddNewUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid) {
            this.props.createNewUser(this.state)
        }
    }


    render() {
        let { language } = this.props
        return (
            <Modal isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className="modal-user-container"
                size="lg"
            >
                <ModalHeader toggle={() => { this.toggle() }} style={{ textTransform: 'upperCase' }}>
                    {language === LANGUAGES.VI ? 'Tạo người dùng mới' : 'Create a new user'}</ModalHeader>
                <ModalBody>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id='manage-user.email' /></label>
                            <input className='form-control' type='text' onChange={(event) => this.handleOnChangeInput(event, "email")} value={this.state.email}></input>
                        </div>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id='manage-user.password' /></label>
                            <input className='form-control' type='password' onChange={(event) => this.handleOnChangeInput(event, "password")} value={this.state.password}></input>
                        </div>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id='manage-user.firstname' /></label>
                            <input className='form-control' type='text' onChange={(event) => this.handleOnChangeInput(event, "firstName")} value={this.state.firstName}></input>
                        </div>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id='manage-user.lastname' /></label>
                            <input className='form-control' type='text' onChange={(event) => this.handleOnChangeInput(event, "lastName")} value={this.state.lastName}></input>
                        </div>
                        <div className='col-12 form-group'>
                            <label><FormattedMessage id='manage-user.address' /></label>
                            <input className='form-control' type='text' onChange={(event) => this.handleOnChangeInput(event, "address")} value={this.state.address}></input>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className="px-3" onClick={() => { this.handleAddNewUser() }}>
                        <FormattedMessage id='patient.booking-modal.confirm' />
                    </Button>{' '}
                    <Button color="secondary" className="btn btn-danger px-3" onClick={() => { this.toggle() }}>
                        <FormattedMessage id='patient.booking-modal.cancel' />

                    </Button>
                </ModalFooter>
            </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
