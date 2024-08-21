import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h4 className='text-center my-5'>User Registeration</h4>
            <Formik
                initialValues={{ firstname: '', lastname: '', mobile: '', role: 'user', email: '', password: '' }}
                validate={values => {
                    const errors = {};
                    if (!values.firstname || !values.lastname || !values.mobile || !values.role || !values.email || !values.password) {
                        if (!values.firstname) errors.firstname = 'First Name required';
                        if (!values.lastname) errors.lastname = 'Last Name required';
                        if (!values.mobile) errors.mobile = 'Mobile number required';
                        if (!values.role) errors.role = 'Role required';
                        if (!values.email) errors.email = 'Email required';
                        if (!values.password) errors.password = 'Password required';
                    } else if (values.mobile && isNaN(values.mobile)) {
                        errors.mobile = 'Enter valid number';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = 'Invalid email address';
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting, setFieldError }) => {
                    setSubmitting(true);
                    axios.post('http://localhost:4000/user/register', values)
                        .then((res) => {
                            setSubmitting(false);
                            if (res.data.error && res.data.error.email) setFieldError('email', res.data.error.email);
                            else navigate('/user-list');
                        })
                        .catch((err) => {
                            setSubmitting(false);
                            console.log(err);
                        })
                }}
            >
                {({ isSubmitting }) => (
                    <Form className='row w-50 m-auto' autoComplete=''>
                        <div className='d-flex justify-content-between'>
                            <label htmlFor="firstname">First Name</label>
                            <Field type="text" name="firstname" />
                        </div>
                        <ErrorMessage name="firstname" component="div" className='text-danger text-end' />
                        <div className='d-flex justify-content-between'>
                            <label htmlFor="lastname">Last Name</label>
                            <Field type="text" name="lastname" />
                        </div>
                        <ErrorMessage name="lastname" component="div" className='text-danger text-end' />
                        <div className='d-flex justify-content-between'>
                            <label htmlFor="email">Email ID</label>
                            <Field type="email" name="email" />
                        </div>
                        <ErrorMessage name="email" component="div" className='text-danger text-end' />
                        <div className='d-flex justify-content-between'>
                            <label htmlFor="mobile">Mobile No</label>
                            <Field type="text" name="mobile" />
                        </div>
                        <ErrorMessage name="mobile" component="div" className='text-danger text-end' />
                        <div className='d-flex justify-content-between'>
                            <label htmlFor="role">Role</label>
                            <Field as="select" name="role">
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                                <option value="guest">Guest</option>
                            </Field>
                        </div>
                        <ErrorMessage name="role" component="div" className='text-danger text-end' />
                        <div className='d-flex justify-content-between'>
                            <label htmlFor="password">Password</label>
                            <Field type="password" name="password" />
                        </div>
                        <ErrorMessage name="password" component="div" className='text-danger text-end' />
                        <div className='d-flex justify-content-around'>
                            <button type="submit" disabled={isSubmitting} className='btn btn-dark mt-2 px-5'>
                                Submit
                            </button>
                            <button type='reset' className='btn btn-dark mt-2 px-5'>Reset</button>
                        </div>
                    </Form>
                )}
            </Formik>
            <div className='text-center mt-2'>Already have account? <span className='text-primary' onClick={() => navigate('/login')}><u>SignIn</u></span></div>
        </div>
    )
}

export default SignUp;