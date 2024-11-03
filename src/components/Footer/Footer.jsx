import React from 'react'
import styles from './Footer.module.css'
import amazon from '../../assets/images/amazonpay.png'
import american from '../../assets/images/american.png'
import master from '../../assets/images/mastercard.png'
import paypal from '../../assets/images/paypal.png'
import appstore from '../../assets/images/appstore.png'
import palystoe from '../../assets/images/palystore.png'


export default function Footer() {
  return <>
  <footer className='py-5 bg-light my-5 mb-auto '>
    <div className="container mt-5 ">
    <h2>Get The FreshCart App</h2>
    <p className='text-muted'>We will Send You alink,open it in your phone to dawnload The App</p>
    <form >
    <div className="row">
      <div className="col-md-10">
        <input placeholder="email...." className='form-control' />
      </div>
      <div className="col-md-2">
        <button className='btn bg-main text-white'>Share App Link</button>
      </div>
    </div>

    </form>
    <div className="d-flex justify-content-between my-5">
      <div >
        <span className='mx-2'>Payment Partenrs</span>
        <img height={50}  src={amazon} className='w-5 ahmos mx-2' />
        <img  height={50}  src={american} className='w-5 ahmos mx-2' />
        <img  height={50}  src={master} className='w-5 ahmos mx-2' />
        <img height={50}   src={paypal} className='w-5 ahmos mx-2' />

      </div>
      <div >
      <span className='images'>Get Delivers with FrshCart</span>
        <img height={50} src={appstore}  />
        <img height={50} src={palystoe}  />
      </div>
    </div>
       
    </div>
    </footer>
  </>
}