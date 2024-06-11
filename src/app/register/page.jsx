'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import Link from 'next/link'
const Register = () => {
    const router = useRouter()
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: "",
    })
    const [isRegistered, setIsRegistered] = useState(false);
    const [error, setError] = useState('');
    const handleChange = (event) => {
        let { name, value } = event.target
        setUserData({ ...userData, [name]: value })
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        createUser()
    }
    const createUser = async () => {
        try {
            let res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: userData.email,
                    password: userData.password,
                    returnSecureToken: true
                })
            });
            if (res.ok) {
                let data = await res.json();
                setIsRegistered(true);
                setTimeout(() => {
                    setIsRegistered(false)
                    router.push('/')
                }, 3000)
            } else {
                let errorData = await res.json();
                throw new Error(errorData.error.message || 'Something went wrong during registration');
            }
        } catch (err) {
            setError(err.message)
            setTimeout(() => {
                setError('');
            }, 3000);

        }

    }
    return (
        <div className='flex justify-center items-center w-full h-screen'>
            {isRegistered && <div className="alert alert-success absolute w-auto right-2 top-12" >
                <span>Registered successfully.</span>
            </div>}
            {error && <div className="alert bg-red-600 text-white absolute w-auto right-2 top-12" >
                <span>{error}</span>
            </div>}
            <form className='w-[400px] ' onSubmit={handleSubmit} >
                <label className="input input-bordered flex items-center gap-2 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                    <input autoComplete='false' type="text" className="grow" placeholder="Email" name='email' onChange={handleChange} />
                </label>
                <label className="input input-bordered flex items-center gap-2 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                    <input autoComplete='false' type="text" className="grow" placeholder="Username" name='name' onChange={handleChange} />
                </label>
                <label className="input input-bordered flex items-center gap-2 mb-2 ">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                    <input autoComplete='false' type="password" placeholder='Password' className="grow" name='password' onChange={handleChange} />
                </label>
                <div className='flex justify-between mb-2.5'>
                    <Link href={'/login'}> Already have an account? <span className="link link-error">Login</span></Link>
                </div>
                <button className="btn btn-outline btn-primary  w-full" type='submit'>Register</button>
            </form>
        </div>
    )
}
export default Register