import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik'; // Add this line
import axios from 'axios'; // If axios is not already imported
import { ToastContainer, toast } from 'react-toastify'; // Ensure toast is also imported
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast
import { UserTokenContext } from '../Context/UserTokenContext'

export default function Login() {
  const navigate = useNavigate(); // تعريف useNavigate
  let tokenContext = useContext(UserTokenContext)

  async function Login(information) {
    try {
      const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', information);
      toast.success(data.message);
      localStorage.setItem('userToken', data.token);
      localStorage.setItem('ShowCart', false);
      tokenContext.setToken(data.token)
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed!";
      toast.error(errorMessage);
      console.error("Error registering:", error.response ? error.response.data : error.message);
    }
  }

  let myForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: Login,
  });

  return (
    <div>
      <ToastContainer />
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form onSubmit={myForm.handleSubmit} className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required onChange={myForm.handleChange} value={myForm.values.email} />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required onChange={myForm.handleChange} value={myForm.values.password} />
                </div>
                <div className="flex items-center justify-between">
                  <NavLink to={"resetaccount"} className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</NavLink>
                </div>
                <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 h-12">
                  Login
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet? <NavLink to={"register"} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</NavLink>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
