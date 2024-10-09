import React, { useState } from 'react'

const Button = ({onClick, children, props}) => {
  
  return (
    <button className='w-full px-4 py-2 m-auto text-center border-white border-2 rounded-xl' onClick={() => onClick(prev => !prev)} {...props}>
      {children}
    </button>
  )
}

export default Button