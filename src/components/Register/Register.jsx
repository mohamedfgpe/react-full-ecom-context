import React, { useState } from "react";
import { useFormik } from "formik";
  import * as yup from 'yup';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [isLoading, setisLoading] = useState(false);
  const [errorMessage, seterrorMessage] = useState('')
 const navigate= useNavigate()


  async function handleForm(values) {

    setisLoading(true)
const {data}=await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",values).catch((error)=>{
seterrorMessage(` ${error.response.data.message}`)
setisLoading(false)

});

if (data.message==="success") {
  navigate('/login')
  setisLoading(false)
}
  }
  let validation = yup.object({
    name:yup.string().required("name is required").min(3,"must be 3 letters or more").max(15, "must be lower than or equal 15 letters ..."),
    email:yup.string().required("email is required").email("E-mail is invalid  "),
    password:yup.string().required("password is required").min(8),
    rePassword: yup.string().required("Confirm password is required").oneOf([yup.ref("password")], "Passwords must match"),
      phone:yup.string().required("must be required").matches(/^01[0125][0-9]{8}$/gm,"must be an Egyptain Number ")
  })
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone:""
    },onSubmit:handleForm,
    validationSchema:validation,
  });
  return <>
<div className="w-50 mx-auto py-5">
<p className="h3">Register ... </p>
{errorMessage?<div className="alert alert-danger text-center fw-500">{errorMessage}</div>:""}

<form  onSubmit={formik.handleSubmit}>
<label htmlFor="name">Name :</label>
<input  onBlur={formik.handleBlur} className="form-control mb-2" id="name" name="name" onChange={formik.handleChange} value={formik.values.name} type="text" />
{formik.errors.name && formik.touched.name?<div className="alert alert-danger">{formik.errors.name}</div>:" "}

<label htmlFor="email">E-mail :</label>
<input  onBlur={formik.handleBlur} id="email" name="email" className="form-control" onChange={formik.handleChange} value={formik.values.email} type="email" />
{formik.errors.email && formik.touched.email?<div className="alert alert-danger">{formik.errors.email}</div>:" "}

<label htmlFor="password">Password :</label>
<input onBlur={formik.handleBlur} className="form-control mb-2" id="password" name="password" onChange={formik.handleChange} value={formik.values.password} type="password" />
{formik.errors.password && formik.touched.password?<div className="alert alert-danger">{formik.errors.password}</div>:" "}

<label htmlFor="rePassword">confirm Password :</label>
<input onBlur={formik.handleBlur} className="form-control mb-2" id="rePassword" name="rePassword" onChange={formik.handleChange} value={formik.values.rePassword} type="password" />
{formik.errors.rePassword && formik.touched.rePassword?<div className="alert alert-danger">{formik.errors.rePassword}</div>:" "}

<label htmlFor="phone">Phone :</label>
<input onBlur={formik.handleBlur} className="form-control mb-2" id="phone" name="phone" onChange={formik.handleChange} value={formik.values.phone} type="tel" />
{formik.errors.phone && formik.touched.phone?<div className="alert alert-danger">{formik.errors.phone}</div>:" "}

{isLoading?<button  className="btn bg-main text-white" type="submit"><i className="fas fa-spinner fa-spin"> </i></button>:<button disabled={!(formik.isValid&& formik.dirty)} className="btn bg-main text-white" type="submit">Submit</button>}
       
       

  </form>
</div>

  </>;
}
