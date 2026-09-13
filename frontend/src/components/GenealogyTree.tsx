import { useRef, useState } from 'react'
import '../styles/genealogy.css'

interface Edge {
  id: string
  parent_id?: string
  variant_id: string
  mutation_type: string
  fitness_delta: number
  timestamp: string
}

interface Props {
  data?: { edges: Edge[] }
}

export default function GenealogyTree({ data }: Props) {
  const [selectedEdge, setSelectedEdge] = useState<string | null>(null)
  const startTouchRef = useRef<Touch | null>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    startTouchRef.current = e.touches[0]
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!startTouchRef.current) return
    
    const endTouch = e.changedTouches[0]
    const deltaX = endTouch.clientX - startTouchRef.current.clientX
    
    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        console.log('Swiped right: previous generation')
      } else {
        console.log('Swiped left: next generation')
      }
    }
  }

  return (
    <div className="genealogy-container">
      <div 
        className="genealogy-tree"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="tree-nodes">
          {data?.edges?.map((edge) => (
            <div
              key={edge.id}
              className={`tree-node ${selectedEdge === edge.id ? 'selected' : ''}`}
              onClick={() => setSelectedEdge(edge.id)}
            >
              <div className="node-header">
                <span className="mutation-type">{edge.mutation_type}</span>
                <span className={`fitness-delta ${edge.fitness_delta > 0 ? 'positive' : 'negative'}`}>
                  {edge.fitness_delta > 0 ? '+' : ''}{edge.fitness_delta.toFixed(2)}
                </span>
              </div>
              <div className="node-body">
                <small>{edge.timestamp}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {selectedEdge && (
        <div className="edge-details">
          <h3>Edge Details</h3>
          <p>Selected: {selectedEdge}</p>
          <button onClick={() => setSelectedEdge(null)}>Close</button>
        </div>
      )}
    </div>
  )
}
