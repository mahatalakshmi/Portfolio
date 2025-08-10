import React from 'react'
import FluidBackground from '../components/FluidBackground'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Home(){
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6">
      <FluidBackground />

      <motion.header initial={{opacity:0, y:-20}} animate={{opacity:1,y:0}} transition={{delay:0.1}} className="text-center mt-8">
        <div className="text-sm text-gray-600">Hey, I'm <strong>Mahata</strong> 👋</div>
        <h1 className="mt-4 text-6xl font-extrabold leading-tight">AI Portfolio</h1>
        <p className="mt-2 text-gray-600 text-lg">High-tech · Cutting-edge · Interactive</p>
      </motion.header>

      <motion.div className="mt-8 w-full max-w-3xl" initial={{opacity:0}} animate={{opacity:1}}>
        <div className="bg-white/80 card-bg rounded-3xl p-8 shadow-soft flex flex-col items-center gap-6">

          <div className="w-44 h-44 rounded-full bg-gradient-to-br from-pink-300 to-indigo-300 flex items-center justify-center text-6xl">🙂</div>

          <motion.div className="w-full relative" initial={{y:10}} animate={{y:0}}>
            <input placeholder="Ask me anything..." className="w-full rounded-full py-4 px-6 border border-gray-200 shadow-sm text-lg outline-none" />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center">→</button>
          </motion.div>

          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/me" className="p-4 rounded-2xl bg-white/60 card-bg flex flex-col items-center gap-2">
              <div className="text-2xl">🙂</div>
              <div className="text-sm text-gray-700">Me</div>
            </Link>
            <Link to="/projects" className="p-4 rounded-2xl bg-white/60 card-bg flex flex-col items-center gap-2">
              <div className="text-2xl">📁</div>
              <div className="text-sm text-gray-700">Projects</div>
            </Link>
            <Link to="/skills" className="p-4 rounded-2xl bg-white/60 card-bg flex flex-col items-center gap-2">
              <div className="text-2xl">🧠</div>
              <div className="text-sm text-gray-700">Skills</div>
            </Link>
            <Link to="/fun" className="p-4 rounded-2xl bg-white/60 card-bg flex flex-col items-center gap-2">
              <div className="text-2xl">🎮</div>
              <div className="text-sm text-gray-700">Fun</div>
            </Link>
          </div>

        </div>
      </motion.div>

    </main>
  )
}
