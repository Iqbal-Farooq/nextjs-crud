'use client';
import React, { useState, useContext } from 'react';
import { AuthContext } from '@/components/Auth';

const AddExpenses = () => {
  const { email } = useContext(AuthContext);
 const [userData, setUserData] = useState({
    amount: '',
    title: '',
    description:''
  });
  const [error, setError] = useState('');
  const [success,setSuccess]=useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    let Email=email.replace("@",'').replace(".",'')
     try {
      const res = await fetch(
        `https://nextjs-api-testing-default-rtdb.firebaseio.com/${Email}.json`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: userData.amount,
            title: userData.title,
            description:userData.description
          }),
        }
      );

      if (res.ok) {
        const data = await res.json();
        setSuccess(true)
        setTimeout(()=>{
          setSuccess(false)
        },2000)
        console.log('data => ',data)
        } else {
        const errorData = await res.json();
        throw new Error(errorData.error.message || 'Something went wrong');
      }
    } catch (error) {
      setError(error.message);
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  };

  return (
    <div className='flex justify-center items-center w-full h-screen'>
      {success && (
        <div className='alert bg-green-600 text-white w-auto absolute right-2 top-12'>
          <span>Expense Added Successfully </span>
        </div>
      )}
      {error && (
        <div className='alert bg-red-600 text-white w-auto absolute right-2 top-12'>
          <span>{error}</span>
        </div>
      )}
      <form className='w-[400px]' onSubmit={handleSubmit}>
       
        <label className='input input-bordered flex items-center gap-2 mb-2'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className='w-4 h-4'><path d="M20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C13.6418 20 15.1681 19.5054 16.4381 18.6571L17.5476 20.3214C15.9602 21.3818 14.0523 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12V13.5C22 15.433 20.433 17 18.5 17C17.2958 17 16.2336 16.3918 15.6038 15.4659C14.6942 16.4115 13.4158 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C13.1258 7 14.1647 7.37209 15.0005 8H17V13.5C17 14.3284 17.6716 15 18.5 15C19.3284 15 20 14.3284 20 13.5V12ZM12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9Z"></path></svg>
          <input autoComplete='false' type='text' placeholder='Title' className='grow' name='title' onChange={handleChange} />
        </label>
        <label className='input input-bordered flex items-center gap-2 mb-2'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className='w-4 h-4'><path d="M20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12ZM22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM13.5003 8C13.8278 8.43606 14.0625 8.94584 14.175 9.5H16V11H14.175C13.8275 12.7117 12.3142 14 10.5 14H10.3107L14.0303 17.7197L12.9697 18.7803L8 13.8107V12.5H10.5C11.4797 12.5 12.3131 11.8739 12.622 11H8V9.5H12.622C12.3131 8.62611 11.4797 8 10.5 8H8V6.5H16V8H13.5003Z"></path></svg>
          <input autoComplete='false' type='number' className='grow' placeholder='Amount' name='amount' onChange={handleChange} />
        </label>
        <textarea className="textarea textarea-primary w-full textarea-lg !h-20" placeholder="Add Description" name='description' onChange={handleChange}></textarea>
        
        <button className='btn btn-outline btn-primary w-full' type='submit' disabled={success}>
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default AddExpenses;
