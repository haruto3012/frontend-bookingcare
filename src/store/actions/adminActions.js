import actionTypes from './actionTypes';
import {
    getAllCodeService,
    createNewUserService,
    getAllUsers,
    editUserService,
    deleteUserService,
    getTopDoctorService,
    getAllDoctorsService,
    saveDetailDoctorService
} from '../../services/userService';
import { toast } from 'react-toastify';
// import { createNewUserService } from '../../services/userService';
// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("GENDER")
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data))
            } else {
                dispatch(fetchGenderFailed())
            }
        } catch (e) {
            dispatch(fetchGenderFailed())
            console.log(e)
        }
    }
}
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("POSITION")
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data))
            } else {
                dispatch(fetchPositionFailed())
            }
        } catch (e) {
            dispatch(fetchPositionFailed())
            console.log(e)
        }
    }
}

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})
export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("ROLE")
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data))
            } else {
                dispatch(fetchRoleFailed())
            }
        } catch (e) {
            dispatch(fetchRoleFailed())
            console.log(e)
        }
    }
}

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})

export const saveNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            if (res && res.errCode === 0) {
                toast.success("Create a new user succeed!")
                dispatch(saveUserSuccess(res.data))
                dispatch(fetchAllUsersStart())
            } else {
                toast.error("Create a new user error!")
                dispatch(saveUserFailed())
            }
        } catch (e) {
            dispatch(saveUserFailed())
            console.log(e)
        }
    }
}

export const saveUserSuccess = () => ({
    type: actionTypes.SAVE_USER_SUCCESS
})
export const saveUserFailed = () => ({
    type: actionTypes.SAVE_USER_FAILED
})

export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers("ALL")
            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users.reverse()))
            } else {
                toast.error("Fetch all user error!")
                dispatch(fetchAllUsersFailed())
            }
        } catch (e) {
            toast.error("Fetch all user error!")
            dispatch(fetchAllUsersFailed())
            console.log(e)
        }
    }
}

export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data
})
export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED
})


export const editUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(data);
            if (res && res.errCode === 0) {
                toast.success("Edit the user succeed!")
                dispatch(editUserSuccess(res.data))
                dispatch(fetchAllUsersStart())
            } else {
                toast.error("Edit the user error!")
                dispatch(editUserFailed())
            }
        } catch (e) {
            dispatch(editUserFailed())
            console.log(e)
        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})
export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})


export const deleteUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);
            if (res && res.errCode === 0) {
                toast.success("Delete the user succeed!")
                dispatch(deleteUserSuccess(res.data))
                dispatch(fetchAllUsersStart())
            } else {
                toast.error("Delete the user error!")
                dispatch(deleteUserFailed())
            }
        } catch (e) {
            dispatch(deleteUserFailed())
            console.log(e)
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})
export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})

export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorService('20')
            if (res && res.errCode === 0) {
                dispatch(fetchTopDoctorSuccess(res.data))
            }
        } catch (e) {
            dispatch(fetchTopDoctorFailed())
            console.log(e)
        }

    }
}

export const fetchTopDoctorSuccess = (data) => ({
    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
    dataDoctor: data
})
export const fetchTopDoctorFailed = () => ({
    type: actionTypes.FETCH_TOP_DOCTORS_FAILED
})

export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctorsService()
            if (res && res.errCode === 0) {
                dispatch(fetchAllDoctorsSuccess(res.data))
            }
        } catch (e) {
            dispatch(fetchAllDoctorsFailed())
            console.log(e)
        }

    }
}

export const fetchAllDoctorsSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
    dataDr: data
})
export const fetchAllDoctorsFailed = () => ({
    type: actionTypes.FETCH_ALL_DOCTORS_FAILED
})

export const saveDetailDoctor = (inputData) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailDoctorService(inputData)
            if (res && res.errCode === 0) {
                toast.success("Save the doctor succeed!")
                dispatch(saveDetailDoctorSuccess())
            } else {
                toast.error("Save the doctor error!")
                dispatch(saveDetailDoctorFailed())
            }
        } catch (e) {
            toast.error("Save the doctor error!")
            dispatch(saveDetailDoctorFailed())
            console.log(e)
        }

    }
}

export const saveDetailDoctorSuccess = () => ({
    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
})
export const saveDetailDoctorFailed = () => ({
    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED
})

export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('TIME')
            if (res && res.errCode === 0) {
                dispatch(fetchAllScheduleTimeSuccess(res.data))
            }
        } catch (e) {
            dispatch(fetchAllScheduleTimeFailed())
            console.log(e)
        }

    }
}

export const fetchAllScheduleTimeSuccess = (data) => ({
    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
    dataTime: data
})
export const fetchAllScheduleTimeFailed = () => ({
    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED
})

export const getRequiredDoctorInfor = () => {
    return async (dispatch, getState) => {
        try {
            dispatch(fetchRequiredDoctorInforStart())
            let resPrice = await getAllCodeService("PRICE")
            let resPayment = await getAllCodeService("PAYMENT")
            let resProvince = await getAllCodeService("PROVINCE")
            if (resPrice && resPayment && resProvince &&
                resPrice.errCode === 0 && resPayment.errCode === 0 && resProvince.errCode === 0) {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                }
                dispatch(fetchRequiredDoctorInforSuccess(data))
            } else {
                dispatch(fetchRequiredDoctorInforFailed())
            }
        } catch (e) {
            dispatch(fetchRequiredDoctorInforFailed())
            console.log(e)
        }
    }
}

export const fetchRequiredDoctorInforStart = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START
})

export const fetchRequiredDoctorInforSuccess = (allRequiredData) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
    allRequiredData: allRequiredData
})

export const fetchRequiredDoctorInforFailed = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED
})