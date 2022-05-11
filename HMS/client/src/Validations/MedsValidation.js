import * as yup from 'yup'

export const medsSchema = yup.object().shape({
    fname: yup.string().required().min(5),
    fquantity: yup.number().required(),
    fscientificName: yup.string().required().min(5)
});