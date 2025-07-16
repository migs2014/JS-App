import React from 'react'

const Contact = () => {
  return (
    <div className="bg-gray-200 text-gray-800 px-16 min-h-screen flex items-center justify-center mt-10">
      <div className='w-full max-w-[1140px] bg-white rounded-lg shadow-lg p-10 grid md:grid-cols-2 gap-12'>
      {/* contact Details */}
      <div className='space-y-6'>
        <h2 className='text-3xl font-bold'>Contact Us</h2>
        <p className='text-gray-600'>Need Help or Have a question?</p>
        <div>
          <h4 className='font-semibold'>School Address</h4>
          <p className='text-gray-600'>P.O Box 000-0101 Nakuru Kenya</p>
        </div>
        <div>
          <h4 className='font-semibold'>Email</h4>
          <p className='text-gray-600'>jsapp@gmail.com</p>
        </div>
        <div>
          <h4 className='font-semibold'>Phone</h4>
          <p className='text-gray-600'>+25472300000</p>
        </div>
        <div>
          <h4 className='font-semibold'>Working Hours</h4>
          <p className='text-gray-600'>Mon-Fri:7:00-5:00 PM</p>
        </div>
        <div className='space-y-6'>
          {/* contact from */}
          <h3 className='text-xl font-semibold'>Send</h3>
          <input type="text" placeholder='name'className='w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus-blue-500'/>
          <input type="email" placeholder='Email' className='w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus-blue-500'/>
          <textarea placeholder='Message' className='w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus-blue-500'>
          </textarea>
          <button className='w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-500 cursor-pointer'>
            Send Message
          </button>
        </div> 
      </div>
      </div>
    </div>
  )
}

export default Contact