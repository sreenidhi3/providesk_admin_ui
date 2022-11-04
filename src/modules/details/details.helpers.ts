import * as yup from 'yup';

export const validationSchema = yup.object({
  description: yup
    .string()
    .matches(
      /^[-().,_ A-Za-z0-9@': \n]*$/i,
      'Special characters are not allowed.'
    )
    .required('Comment is required.'),
  department_id: yup.string().required('Select department.'),
  category_id: yup.string().required('Select ticket category.'),
  resolver_id: yup.string().required('Assign ticket to resolver.'),
});
