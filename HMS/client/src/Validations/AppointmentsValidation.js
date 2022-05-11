import * as yup from 'yup'

export const appvalSchema = yup.object().shape({
    
    aDocId: yup.string().required().min(5),
    aDocName: yup.string().required().min(5),
    aPatientId: yup.string().required().min(5),
    aPatientName: yup.string().required().min(5),
    aTime: yup.string().required().min(5),
    aSpecialization: yup.string().required().min(5),
    aRoom: yup.string().required().min(5),
});