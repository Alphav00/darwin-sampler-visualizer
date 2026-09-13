import { useEffect, useRef } from 'react'
import '../styles/fitness.css'

interface Props {
  data?: any
}

export default function FitnessLandscape({ data }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return
    
    const ctx = canvasRef.current.getContext('2d')
    if (!ctx) return

    // Placeholder: draw gradient representing fitness landscape
    const width = canvasRef.current.width
    const height = canvasRef.current.height

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const value = Math.sin(x / 50) * Math.cos(y / 50)
        const normalized = (value + 1) / 2
        ctx.fillStyle = `hsl(${normalized * 120}, 100%, 50%)`
        ctx.fillRect(x, y, 1, 1)
      }
    }
  }, [data])

  return (
    <div className="fitness-landscape-container">
      <h2>Fitness Landscape</h2>
      <canvas
        ref={canvasRef}
        width={400}
        height={300}
        className="fitness-canvas"
      />
      <p className="fitness-info">
        3D fitness surface visualization. Touch to explore parameter interactions.
      </p>
    </div>
  )
}
