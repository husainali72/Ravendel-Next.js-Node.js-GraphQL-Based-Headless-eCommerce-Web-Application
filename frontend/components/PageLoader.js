import React from 'react'
import Loading from './loading'

const PageLoader = () => {
  return (
    <div className='page-loader'>
        <Loading/><span>Loading...</span>
    </div>
  )
}

export default PageLoader