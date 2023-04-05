import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers, createNewUserService, deleteUserService, editUserService } from '../../services/userService';
import ModalUser from './ModalUser';
import { emitter } from '../../utils/emitter';
import ModalEditUser from './ModalEditUser';
import { LANGUAGES } from '../../utils';
import { FormattedMessage } from 'react-intl';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {}
        }
    }

    async componentDidMount() {
        return this.getAllUserFromReact();
    }
    //get all user when this component did mount
    getAllUserFromReact = async () => {
        let response = await getAllUsers('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })
        }
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true
        })
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }

    toggleUserEditModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,
        })
    }
    //create user
    createNewUser = async (data) => {
        //use emitter to fire an event
        try {
            let response = await createNewUserService(data)
            if (response && response.errCode !== 0) {
                alert(response.errMessage)
            } else {
                await this.getAllUserFromReact();
                this.setState({
                    isOpenModalUser: false
                })
                emitter.emit(`EVENT_CLEAR_MODAL_DATA`)
            }
            console.log(response)
        } catch (e) {
            console.log(e)
        }
    }
    //delete user
    handleDeleteUser = async (user) => {
        try {
            let res = await deleteUserService(user.id);
            if (res && res.errCode === 0) {
                await this.getAllUserFromReact()
            } else {
                alert(res.errMessage)
            }
            console.log(res)
        } catch (e) {
            console.log(e)
        }
    }

    handleEditUser = async (user) => {
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user
        })
    }
    //edit user function then pass to props for modalEditUser
    doEditUser = async (user) => {
        try {
            let res = await editUserService(user)
            if (res && res.errCode === 0) {
                this.setState({
                    isOpenModalEditUser: false
                })
                await this.getAllUserFromReact()
            } else {
                alert(res.errCode);
            }
            console.log(res)
        } catch (e) {
            console.log(e)
        }
    }


    render() {
        let arrUsers = this.state.arrUsers;
        let { language } = this.props
        return (

            <div className="user-container">
                <ModalUser isOpen={this.state.isOpenModalUser}
                    toggleFromParent={this.toggleUserModal}
                    createNewUser={this.createNewUser} />
                {this.state.isOpenModalEditUser &&
                    <ModalEditUser isOpen={this.state.isOpenModalEditUser}
                        toggleFromParent={this.toggleUserEditModal}
                        currentUser={this.state.userEdit}
                        editUser={this.doEditUser}
                    />
                }
                <div className='title text-centre'>{language === LANGUAGES.VI ? 'QUẢN LÝ NGƯỜI DÙNG' : 'USER MANAGEMENT'}</div>
                <div className='mx-1'>
                    <button className='btn btn-primary px-3'
                        onClick={() => this.handleAddNewUser()}>
                        <i className="fas fa-plus"></i>{language === LANGUAGES.VI ? ' Thêm người dùng' : ' Add new user'}</button>
                </div>
                <div className='user-table mt-3 mx-1'>

                    <table id="customers">
                        <tbody>

                            <tr>
                                <th><FormattedMessage id='manage-user.email' /></th>
                                <th><FormattedMessage id='manage-user.firstname' /></th>
                                <th><FormattedMessage id='manage-user.lastname' /></th>
                                <th><FormattedMessage id='manage-user.address' /></th>
                                <th><FormattedMessage id='manage-user.action' /></th>
                            </tr>

                            {arrUsers && arrUsers.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className='btn-edit' onClick={() => this.handleEditUser(item)}><i className="fas fa-pencil"></i></button>
                                            <button className='btn-delete' onClick={() => this.handleDeleteUser(item)}><i className="fas fa-trash"></i></button>
                                        </td>
                                    </tr>

                                )
                            })}
                        </tbody>


                    </table>
                </div>
            </div>

        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
