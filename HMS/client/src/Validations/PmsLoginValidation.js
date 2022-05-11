import * as yup from 'yup'

export const pmsLoginSchema = yup.object().shape({
    pmsusername: yup.string().required().min(5),
    pmspassword: yup.string().required().min(5),
});