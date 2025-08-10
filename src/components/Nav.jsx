import React from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

const items = [
  {to: '/', label: 'Home'},
  {to: '/projects', label: 'Projects'},
  {to: '/skills', label: 'Skills'},
  {to: '/fun', label: 'Fun'},
  {to: '/blogs', label: 'Blogs'},
  {to: '/me', label: 'Me'},
  {to: '/contact', label: 'Contact'},
]

export default function Nav(){
  return (
    <motion.nav className="fixed top-6 left-1/2 -translate-x-1/2 z-40"
      initial={{ y:-20, opacity:0 }}
      animate={{ y:0, opacity:1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex gap-4 bg-white/60 p-2 rounded-3xl shadow-soft items-center">
        <div className="pl-3 pr-4 border-r h-10 flex items-center">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-400 flex items-center justify-center text-white font-bold">AI</div>
        </div>
        {items.map(i => (
          <NavLink
            key={i.to}
            to={i.to}
            className={({isActive})=>`px-4 py-2 rounded-xl text-sm ${isActive? 'bg-white/90 shadow' : 'text-gray-700 hover:bg-white/40'}`}
          >{i.label}</NavLink>
        ))}
      </div>
    </motion.nav>
  )
}
