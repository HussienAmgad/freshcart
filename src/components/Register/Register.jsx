import axios from 'axios';
import { Formik, useFormik } from 'formik';
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; // استخدام useNavigate للتنقل
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
  const navigate = useNavigate();

  async function register(information) {
    try {
      const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', information);
      toast.success(data.message);
      navigate("/");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Registration failed!";
      toast.error(errorMessage);
      console.error("Error registering:", error.response ? error.response.data : error.message);
    }
  }

  let myForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Required")
        .matches(/^[A-Z][a-zA-Z\s]{2,49}$/, "Name must start with a capital letter and be 3 to 50 characters long"),

      email: Yup.string()
        .required("Required")
        .email("Invalid email"),

      password: Yup.string()
        .required("Required")
        .min(6, "Password must be at least 6 characters long"),

      rePassword: Yup.string()
        .required("Required")
        .oneOf([Yup.ref('password'), null], "Confirm password should match password"),

      phone: Yup.string()
        .required("Required")
        .matches(/^01[0125][0-9]{8}$/, "Invalid phone number"),
    }),
    onSubmit: register
  });

  return (
    <div>
      <ToastContainer />
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an account
              </h1>
              <form onSubmit={myForm.handleSubmit} className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                  <input onBlur={myForm.handleBlur} type="name" name="name" id="name" value={myForm.values.name} onChange={myForm.handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
                </div>
                {myForm.errors.name ?

                  <div class="p-4 text-sm text-white rounded-lg bg-red-700 dark:bg-gray-800 dark:text-gray-300" role="alert">
                    <span class="font-medium">{myForm.errors.name}</span>
                  </div> : null
                }
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <input type="email" name="email" id="email" value={myForm.values.email} onChange={myForm.handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                </div>
                {myForm.errors.email ?

                  <div class="p-4 text-sm text-white rounded-lg bg-red-700 dark:bg-gray-800 dark:text-gray-300" role="alert">
                    <span class="font-medium">{myForm.errors.email}</span>
                  </div> : null
                }
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input onBlur={myForm.handleBlur} type="password" name="password" id="password" value={myForm.values.password} onChange={myForm.handleChange} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                {myForm.errors.password ?

                  <div class="p-4 text-sm text-white rounded-lg bg-red-700 dark:bg-gray-800 dark:text-gray-300" role="alert">
                    <span class="font-medium">{myForm.errors.password}</span>
                  </div> : null
                }
                <div>
                  <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                  <input onBlur={myForm.handleBlur} type="password" name="rePassword" id="rePassword" placeholder="••••••••" value={myForm.values.rePassword} onChange={myForm.handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                {myForm.errors.rePassword ?

                  <div class="p-4 text-sm text-white rounded-lg bg-red-700 dark:bg-gray-800 dark:text-gray-300" role="alert">
                    <span class="font-medium">{myForm.errors.rePassword}</span>
                  </div> : null
                }
                <div>
                  <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your phone</label>
                  <input onBlur={myForm.handleBlur} type="tel" name="phone" id="phone" value={myForm.values.phone} onChange={myForm.handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="01211111111" required />
                </div>
                {myForm.errors.phone ?

                  <div class="p-4 text-sm text-white rounded-lg bg-red-700 dark:bg-gray-800 dark:text-gray-300" role="alert">
                    <span class="font-medium">{myForm.errors.phone}</span>
                  </div> : null
                }
                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 h-12"
                >
                  Create an account
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account? <NavLink to={"/"} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</NavLink>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
