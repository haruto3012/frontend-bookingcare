import axios from '../axios';

const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword })
}

const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`)
}

const createNewUserService = (data) => {
    return axios.post(`/api/create-new-user`, data)
}

const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user', { data: { id: userId } })
}

const editUserService = (inputData) => {
    return axios.put('/api/edit-user', inputData)
}

const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`)
}

const getTopDoctorService = (limitInput) => {
    return axios.get(`/api/top-doctor?limit=${limitInput}`)
}

const getAllDoctorsService = () => {
    return axios.get(`/api/get-all-doctors`)
}

const saveDetailDoctorService = (data) => {
    return axios.post(`/api/save-infor-doctors`, data)
}

const getDetailInforDoctorService = (inputId) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`)
}

const saveBulkScheduleDoctorService = (data) => {
    return axios.post(`/api/bulk-create-schedule`, data)
}

const getScheduleByDateService = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`)
}

const getExtraInforDoctorByIdService = (doctorId) => {
    return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`)
}

const getProfileInforDoctorByIdService = (doctorId) => {
    return axios.get(`/api/get-profile-infor-doctor-by-id?doctorId=${doctorId}`)
}

const postPatientBookingAppointment = (data) => {
    return axios.post(`/api/patient-book-appointment`, data)
}

const postVerifyBookingAppointment = (data) => {
    return axios.post(`/api/verify-book-appointment`, data)
}

const createNewSpecialty = (data) => {
    return axios.post(`/api/create-new-specialty`, data)
}

const getAllSpecialtyService = () => {
    return axios.get(`/api/get-all-specialty`)
}

const getDetailSpecialtyById = (data) => {
    return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`)
}

const createNewClinic = (data) => {
    return axios.post(`/api/create-new-clinic`, data)
}

const getAllClinicService = () => {
    return axios.get(`/api/get-all-clinic`)
}

const getDetailClinicById = (id) => {
    return axios.get(`/api/get-detail-clinic-by-id?id=${id}`)
}

const getAllPatientForDoctor = (data) => {
    return axios.get(`/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`)
}

const postSendRemedy = (data) => {
    return axios.post(`/api/send-remedy`, data)

}

export {
    handleLoginApi, getAllUsers,
    createNewUserService, deleteUserService,
    editUserService, getAllCodeService,
    getTopDoctorService, getAllDoctorsService,
    saveDetailDoctorService, getDetailInforDoctorService,
    saveBulkScheduleDoctorService, getScheduleByDateService,
    getExtraInforDoctorByIdService, getProfileInforDoctorByIdService,
    postPatientBookingAppointment, postVerifyBookingAppointment,
    createNewSpecialty, getAllSpecialtyService,
    getDetailSpecialtyById, createNewClinic,
    getAllClinicService, getDetailClinicById,
    getAllPatientForDoctor, postSendRemedy

};