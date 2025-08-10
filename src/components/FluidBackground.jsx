import React, { useRef, useEffect } from 'react'

// Lightweight animated fluid swirl background using canvas particles and gradient blending.
export default function FluidBackground(){
  const ref = useRef(null)

  useEffect(()=>{
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    let w = canvas.width = window.innerWidth
    let h = canvas.height = window.innerHeight
    const particles = []
    const colors = ['rgba(99,102,241,0.12)','rgba(124,58,237,0.10)','rgba(236,72,153,0.08)','rgba(34,197,94,0.06)']

    for(let i=0;i<60;i++){
      particles.push({
        x: Math.random()*w,
        y: Math.random()*h,
        r: 100 + Math.random()*250,
        speed: 0.1 + Math.random()*0.6,
        angle: Math.random()*Math.PI*2,
        c: colors[i%colors.length]
      })
    }

    let t=0
    function draw(){
      ctx.clearRect(0,0,w,h)
      // subtle radial glow
      for(const p of particles){
        const cx = p.x + Math.cos(t*p.speed + p.angle)*60
        const cy = p.y + Math.sin(t*p.speed + p.angle)*60
        const g = ctx.createRadialGradient(cx,cy,p.r*0.1,cx,cy,p.r)
        g.addColorStop(0, p.c)
        g.addColorStop(1,'rgba(255,255,255,0)')
        ctx.globalCompositeOperation = 'screen'
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(cx,cy,p.r,0,Math.PI*2)
        ctx.fill()
      }
      t += 0.01
      requestAnimationFrame(draw)
    }

    draw()

    function onResize(){
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    window.addEventListener('resize',onResize)
    return ()=> window.removeEventListener('resize',onResize)
  },[])

  return <canvas ref={ref} className="fixed inset-0 -z-10 w-full h-full" />
}
