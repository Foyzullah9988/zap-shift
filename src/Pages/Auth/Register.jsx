import React, { use } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Context/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router';
import Google from './Google';
import axios from 'axios';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { registerUser,updateUserProfile } = use(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();


    const handleRegister = (data) => {
        const userImg = data.photo[0];
        console.log(data);

        registerUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);

                // store the image to imgbb server
                const formData = new FormData();
                formData.append('image', userImg)

                // send to imgbb server and get the url
                axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgbb}`,formData)
                .then(res=>{
                    console.log('after img upload',res.data.data.url);

                    // update the profile to firebase
                    const userProfile = {
                        displayName: data.name,
                        photoURL: res.data.data.url
                    }

                    updateUserProfile(userProfile)
                    .then(()=>{
                        console.log('user profile updated');
                        navigate(location?.state?.from?.pathname || '/', { replace: true });
                    })
                    .catch(error=>{
                        console.log(error.message);
                    })
                })

            })
            .catch(error => {
                console.log(error.message);
            })
    }
    return (
        <div>
            <form onSubmit={handleSubmit(handleRegister)}>
                <fieldset className="fieldset">

                    {/* name */}
                    <label className="label">Name</label>
                    <input type="name"
                        {...register('name', { required: true })} className="input" placeholder="Name" />
                    {
                        errors.email?.type === 'required' && <p className="text-red-500">Name is required</p>
                    }

                    {/* photo */}
                    <label className="label">Name</label>
                    {/* <input type="file" className="file-input" /> */}
                    <input type="file"
                        {...register('photo', { required: true })} className="file-input" placeholder="Your photo" />
                    {
                        errors.email?.type === 'required' && <p className="text-red-500">Photo is required</p>
                    }

                    {/* email */}
                    <label className="label">Email</label>
                    <input type="email"
                        {...register('email', { required: true })} className="input" placeholder="Email" />
                    {
                        errors.email?.type === 'required' && <p className="text-red-500">Email is required</p>
                    }

                    {/* password */}
                    <label className="label">Password</label>
                    <input type="password" {...register('password', {
                        required: true,
                        minLength: 6,
                        pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
                    })} className="input" placeholder="Password" />
                    {
                        errors.password?.type === 'required' && <p className="text-red-500">Password is required</p>
                    }
                    {
                        errors.password?.type === 'minLength' && <p className="text-red-500">Password must be at least 6 characters</p>
                    }
                    {
                        errors.password?.type === 'pattern' && <p className="text-red-500">Password must contain at least one Uppercase(A),Lowercase(a) and number(1) </p>
                    }

                    <button className="btn btn-neutral mt-4">Register</button>
                </fieldset>
                <p>Already have an account? <Link to={"/auth/login"}
                state={location.state}
                className='text-blue-500'>Login</Link></p>
            </form>
            <Google />
        </div>

    );
};

export default Register;