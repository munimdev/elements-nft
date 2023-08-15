import React from 'react'
//use react icons 
import { FaTwitter, FaInstagram, FaDiscord } from 'react-icons/fa'

const Footer = () => {
  return (
    <div className='px-10 text-xl py-10 flex flex-col md:flex-row gap-6 justify-between items-center'>
      <p className='transform transition-all ease-in-out hover:scale-125'>
      Elements NFT's
      </p>
      <p className='transform transition-all ease-in-out hover:scale-125'>
      Copyright © 2023 All rights reserved .
      </p>
     <div className="flex gap-1" >
        <a href='https://discord.gg/9zFvkvnX' target='_blank' rel='noreferrer'>
          <FaDiscord className='text-[42px] mx-2 mt-[-3px] transform transition-all hover:scale-125' />

        </a>
        <a href='https://twitter.com/_ELEMENTS_NFT' target='_blank' rel='noreferrer'>
          <FaTwitter className='text-4xl mx-2 transform transition-all hover:scale-125' />

        </a>
        <a href='https://instagram.com/e_l_e_m_e_n_t_s__n_f_t?igshid=MzRlODBiNWFlZA==' target='_blank' rel='noreferrer'>
          <FaInstagram className='text-4xl mx-2 transform transition-all ease-in-out hover:scale-125' />
        </a>
     </div>

    </div>
  )
}

export default Footer