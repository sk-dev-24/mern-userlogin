import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h4 className='text-center my-5'>User Login</h4>
            <Formik
                initialValues={{ email: '', password: '' }}
                validate={values => {
                    const errors = {};
                    if (!values.email || !values.password) {
                        if (!values.email) errors.email = 'Email required';
                        if (!values.password) errors.password = 'Password required';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = 'Invalid email address';
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting, setFieldError }) => {
                    setSubmitting(true);
                    axios.post('http://localhost:4000/user/login', values)
                        .then((res) => {
                            setSubmitting(false);
                            if (res.data.error) {
                                if (res.data.error.email) setFieldError('email', res.data.error.email);
                                if (res.data.error.password) setFieldError('password', res.data.error.password);
                            }
                            else navigate('/user-list');
                        })
                        .catch((err) => {
                            setSubmitting (false);
                            console.log(err);
                        })
                }}
            >
                {({ isSubmitting }) => (
                    <Form className='row w-50 m-auto' autoComplete=''>
                        <div className='d-flex justify-content-between'>
                            <label htmlFor="email">Email ID</label>
                            <Field type="email" name="email" />
                        </div>
                        <ErrorMessage name="email" component="div" className='text-danger text-end' />
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
            <div className='text-center mt-2'>Create a account? <span className='text-primary' onClick={() => navigate('/registeration')}><u>SignUp</u></span></div>
        </div>
    )
}

export default SignIn;