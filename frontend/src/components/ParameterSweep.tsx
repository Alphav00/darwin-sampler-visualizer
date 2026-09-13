import '../styles/sweep.css'

interface Props {
  data?: any
}

export default function ParameterSweep({ data }: Props) {
  return (
    <div className="sweep-container">
      <h2>Parameter Sweep Results</h2>
      <div className="sweep-cards">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="sweep-card">
            <h3>Temperature: {(0.5 + i * 0.2).toFixed(1)}</h3>
            <div className="sweep-result">
              <div className="result-sample">
                Sample output from sweep run {i}...
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
