import React, { useState } from "react";
import { useFormik } from "formik";
  import * as yup from 'yup';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LogIn({saveUserData}) {
  const [isLoading, setisLoading] = useState(false);
  const [errorMessage, seterrorMessage] = useState('')
 const navigate= useNavigate()


  async function handleForm(values) {

    setisLoading(true)
const {data}=await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin",values).catch((error)=>{
seterrorMessage(` ${error.response.data.message}`)
setisLoading(false)

});

if (data.message==="success") {
  navigate('/')
  setisLoading(false)
  localStorage.setItem("userToken",data.token)
  saveUserData()
}
  }
  let validation = yup.object({
    email:yup.string().required("email is required").email("E-mail is invalid  "),
    password:yup.string().required("password is required").min(8),
   
  })
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },onSubmit:handleForm,
    validationSchema:validation,
  });
  return <>
<div className="w-50 mx-auto py-5">
<p className="h3">Log In ... </p>
{errorMessage?<div className="alert alert-danger text-center fw-500">{errorMessage}</div>:""}

<form  onSubmit={formik.handleSubmit}>

<label htmlFor="email">E-mail :</label>
<input  onBlur={formik.handleBlur} id="email" name="email" className="form-control" onChange={formik.handleChange} value={formik.values.email} type="email" />
{formik.errors.email && formik.touched.email?<div className="alert alert-danger">{formik.errors.email}</div>:" "}

<label htmlFor="password">Password :</label>
<input onBlur={formik.handleBlur} className="form-control mb-2" id="password" name="password" onChange={formik.handleChange} value={formik.values.password} type="password" />
{formik.errors.password && formik.touched.password?<div className="alert alert-danger">{formik.errors.password}</div>:" "}

{isLoading?<button  className="btn bg-main text-white" type="submit"><i className="fas fa-spinner fa-spin"> </i></button>:<button disabled={!(formik.isValid&& formik.dirty)} className="btn bg-main text-white" type="submit">Submit</button>}
       
       

  </form>
</div>

  </>;
}
