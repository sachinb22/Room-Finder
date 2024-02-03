import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import '../styles/Register.scss';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useEffect } from 'react';

const RegisterPage = () => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState(
        {
            firstName:'',
            lastName:'',
            email:'',
            password:'',
            confirmPassword:'',
            profileImage: null,
        }   
    )

    console.log(formData)

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: value,
            [name]: name === 'profileImage' ? files[0] : value
        });
    };

    const [passwordMatch, setPasswordMatch] = useState(true)

    useEffect(()=> {
        setPasswordMatch( formData.password === formData.confirmPassword || formData.confirmPassword === '')
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const register_form = new FormData()

            for (var key in formData) {
                register_form.append(key, formData[key])
            }

            const response = await fetch("http://localhost:3001/auth/register", {method: 'POST', body: register_form})

            if(response.ok) {
                navigate('/login')
            }
        } catch (err) {
            console.log('Registration failed', err.message)
        }
    }

    return (
        <>
            <div className="register">
                <div className="register_content">
                    <form className='register_content_form' onSubmit={handleSubmit}>
                        <input type='text' placeholder='First Name' name='firstName'  value={formData.firstName} onChange={handleChange} required/>
                        <input type='text' placeholder='Last Name' name='lastName'  value={formData.lastName} onChange={handleChange} required/>
                        <input type='email' placeholder='Email' name='email'  value={formData.email} onChange={handleChange} required/>
                        <input type='password' placeholder='Password' name='password'  value={formData.password} onChange={handleChange} required/>
                        <input type='password' placeholder='Confirm Password' name='confirmPassword'  value={formData.confirmPassword} onChange={handleChange} required/>

                        {!passwordMatch && (
                            <p style={{color: 'red'}} > Passwords did not matched!</p>
                        )}

                        <input id='image' type='file'  name='profileImage' accept='image/*' style={{display: 'none'}} onChange={handleChange} required/>
                        <label htmlFor="image">
                            <UploadFileIcon />
                            <p>Upload Your Photo</p>
                        </label>
                        {
                            formData.profileImage && (
                                <img src={URL.createObjectURL(formData.profileImage)} alt="Add Profile photo" style={{maxWidth: '80px'}} />
                            )
                        }
                        <button type='submit' disabled={!passwordMatch} >Register</button>
                    </form>
                    <Link to="/login">Already have an Account? Login Here</Link>
                </div>
            </div>
        </>
    );
};

export default RegisterPage;
