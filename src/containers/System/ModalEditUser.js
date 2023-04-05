import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
// import { emitter } from '../../utils/emitter';
import _ from 'lodash'
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils';


class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        }
    }

    componentDidMount() {
        let user = this.props.currentUser;
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: 'hashcode',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
            })
        }

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
    //Validate input
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

    //Check valid if valid do save
    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid) {
            this.props.editUser(this.state)
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
                <ModalHeader toggle={() => { this.toggle() }}>{language === LANGUAGES.VI ? 'Thay đổi thông tin' : 'Edit the users'}</ModalHeader>
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
                    <Button color="primary" className="px-3" onClick={() => { this.handleSaveUser() }}>
                        Saves change
                    </Button>{' '}
                    <Button color="secondary" className="px-3" onClick={() => { this.toggle() }}>
                        Close
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
