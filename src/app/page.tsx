 
import React from 'react'

import type { Metadata } from 'next'  
import Home from '@/components/home'
import Wrapper from '@/layouts/Wrapper'
export const metadata: Metadata = {
  title: "Sahil Bhanushali - MERN Stack Developer Portfolio",
  description:
    "I'm Sahil Bhanushali, a passionate MERN Stack Developer with expertise in JavaScript, React, Node.js, and PHP. My portfolio showcases my projects in web development, CRM customizations, and innovative solutions. I specialize in building responsive, user-friendly applications with modern technologies.",
};


export default function index() {
  return (
    <Wrapper>
     <Home /> 
    </Wrapper>
  )
}
