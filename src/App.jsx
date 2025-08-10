import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Home from './pages/Home'
import Me from './pages/Me'
import Projects from './pages/Projects'
import Skills from './pages/Skills'
import Fun from './pages/Fun'
import Contact from './pages/Contact'
import Blogs from './pages/Blogs'
import Nav from './components/Nav'

export default function App(){
  return (
    <div className="min-h-screen relative overflow-hidden">
      <Nav />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/me" element={<Me/>} />
        <Route path="/projects" element={<Projects/>} />
        <Route path="/skills" element={<Skills/>} />
        <Route path="/fun" element={<Fun/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/blogs" element={<Blogs/>} />
      </Routes>
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 text-sm text-gray-500"
      >
        © {new Date().getFullYear()} — Built with ❤️ and AI
      </motion.footer>
    </div>
  )
}
