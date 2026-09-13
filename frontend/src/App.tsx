import { useState, useEffect } from 'react'
import './App.css'
import GenealogyTree from './components/GenealogyTree'
import FitnessLandscape from './components/FitnessLandscape'
import StabilityMatrix from './components/StabilityMatrix'
import ParameterSweep from './components/ParameterSweep'

function App() {
  const [view, setView] = useState<'genealogy' | 'fitness' | 'stability' | 'sweep'>('genealogy')
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load initial data from API
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/darwin/genealogy`)
        const result = await response.json()
        setData(result)
      } catch (error) {
        console.error('Failed to load data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const toggleFullscreen = async () => {
    const elem = document.documentElement
    if (!document.fullscreenElement) {
      try {
        await elem.requestFullscreen()
        setIsFullscreen(true)
      } catch (err) {
        console.error('Fullscreen request failed:', err)
      }
    } else {
      await document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Darwin Sampler Visualizer</h1>
        <div className="header-actions">
          <button onClick={toggleFullscreen} title="Toggle fullscreen">
            {isFullscreen ? '⛶' : '⛶'} Fullscreen
          </button>
        </div>
      </header>

      <nav className="app-nav">
        <button 
          className={view === 'genealogy' ? 'active' : ''}
          onClick={() => setView('genealogy')}
        >
          Genealogy
        </button>
        <button 
          className={view === 'fitness' ? 'active' : ''}
          onClick={() => setView('fitness')}
        >
          Fitness
        </button>
        <button 
          className={view === 'stability' ? 'active' : ''}
          onClick={() => setView('stability')}
        >
          Stability
        </button>
        <button 
          className={view === 'sweep' ? 'active' : ''}
          onClick={() => setView('sweep')}
        >
          Sweep
        </button>
      </nav>

      <main className="app-content">
        {loading ? (
          <div className="loading">Loading data...</div>
        ) : (
          <>
            {view === 'genealogy' && <GenealogyTree data={data} />}
            {view === 'fitness' && <FitnessLandscape data={data} />}
            {view === 'stability' && <StabilityMatrix data={data} />}
            {view === 'sweep' && <ParameterSweep data={data} />}
          </>
        )}
      </main>
    </div>
  )
}

export default App
