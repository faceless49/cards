import React from "react";
import {useFormik} from "formik";

export type RegisterTypeProps = {}
export const Register: React.FC = () => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        validate: (values) => {
            const errors: any = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length <= 8) {
                errors.password = 'Must be 8 characters or less';
            }
            if (!values.confirmPassword) {
                errors.confirmPassword = 'Required';
            } else if (values.confirmPassword.length <= 8) {
                errors.confirmPassword = 'Must be 8 characters or less';
            } else if (values.confirmPassword !== values.password) {
                errors.confirmPassword = 'Password is not compatible with password confirmation'
            }

            return errors;
        },
        onSubmit: values => {
            alert(JSON.stringify(values));
            formik.resetForm();
        },
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <h1>Sign Up</h1>
            <div>
                <input
                    id='email'
                    type='email'
                    placeholder='email'
                    {...formik.getFieldProps("email")}
                /></div>
            {formik.touched.email
            && formik.errors.email
            && <div style={{color: 'red'}}>{formik.errors.email}</div>}
            <div>
                <input id='password'
                       type='password'
                       placeholder='password'
                       {...formik.getFieldProps("password")}
                />
                {formik.touched.password
                && formik.errors.password
                && <div style={{color: 'red'}}>{formik.errors.password}</div>}
            </div>
            <div>
                <input
                    id="confirmPassword"
                    type="password"
                    placeholder="confirmPassword"
                    {...formik.getFieldProps("confirmPassword")}
                /></div>
            {formik.touched.confirmPassword
            && formik.errors.confirmPassword
            && <div style={{color: 'red'}}>{formik.errors.confirmPassword}</div>}
            <div>
                <button type="submit">Register</button>
            </div>
        </form>
    );
}
