import React, { useState } from 'react'
import { useFormik } from 'formik';
import axios from 'axios'; // تأكد من استيراد axios
import { toast } from 'react-toastify'; // تأكد من استيراد toast أو أي مكتبة تنبيهات تستخدمها

export default function Forgetpassword() {
    let [Code, setCode] = useState(false)
    let [Password, setPassword] = useState(false)
    let [Button, setButton] = useState("Verify")

    async function ResetPassword(information) {
        if (Code == false && Password == false && Button == "Verify") {            
            try {
                const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', { email: information.email });
                toast.success(data.message);
                setCode(true);
                setButton("EnterCode");
                localStorage.setItem('Email', information.email);
            } catch (error) {
                const errorMessage = error.response?.data?.message || "Failed to send verification code!";
                toast.error(errorMessage);
                console.error("Error:", error.response ? error.response.data : error.message);
            }
        } else if (Code == true && Password == false && Button == "EnterCode") {
            try {
                const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', { resetCode: information.resetCode });
                toast.success(data.message);
                setPassword(true);
                setButton("EnterPassword");
            } catch (error) {
                const errorMessage = error.response?.data?.message || "Failed to verify reset code!";
                toast.error(errorMessage);
                console.error("Error:", error.response ? error.response.data : error.message);
            }
        } else if (Code == true && Password == true && Button == "EnterPassword") {
            try {
                const { data } = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', {
                    email: localStorage.getItem('Email'),
                    newPassword: information.newPassword
                });
                toast.success(data.message);
                setCode(false);
                setPassword(false);
                setButton("Password reset successful");
            } catch (error) {
                const errorMessage = error.response?.data?.message || "Failed to reset password!";
                toast.error(errorMessage);
                console.error("Error:", error.response ? error.response.data : error.message);
            }
        }
    }
    
    let myForm = useFormik({
        initialValues: {
          email: "",
          resetCode: "",
          newPassword: ""
        },
        onSubmit: ResetPassword
    });
    
    return (
        <div>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                        <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Change Password
                        </h2>
                        <form onSubmit={myForm.handleSubmit} className="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input value={myForm.values.email} onChange={myForm.handleChange} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                            </div>
                            {Code ? (
                            <div>
                                <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Reset Code</label>
                                <input value={myForm.values.resetCode} onChange={myForm.handleChange} type="text" name="resetCode" id="resetCode" placeholder="Enter reset code" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            ) : null}
                            {Password ? (
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                                <input value={myForm.values.newPassword} onChange={myForm.handleChange} type="password" name="newPassword" id="newPassword" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            ) : null}

                            <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 h-12">
                                {Button}
                            </button>                        
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}
