import '../styles/stability.css'

interface Props {
  data?: any
}

export default function StabilityMatrix({ data }: Props) {
  const seeds = [1, 2, 3, 4, 5]
  const params = ['0.3', '0.6', '0.9', '1.2', '1.5']

  // Mock data: stability scores (0-1)
  const stabilityData = seeds.map(() => 
    params.map(() => Math.random())
  )

  return (
    <div className="stability-matrix-container">
      <h2>Stability Matrix</h2>
      <div className="matrix-scroll">
        <table className="stability-table">
          <thead>
            <tr>
              <th>Seed</th>
              {params.map(p => <th key={p}>{p}</th>)}
            </tr>
          </thead>
          <tbody>
            {seeds.map((seed, i) => (
              <tr key={seed}>
                <th>Seed {seed}</th>
                {stabilityData[i].map((score, j) => {
                  const hue = score * 120
                  return (
                    <td 
                      key={j}
                      style={{ backgroundColor: `hsl(${hue}, 100%, 50%)` }}
                      title={`Stability: ${(score * 100).toFixed(1)}%`}
                    >
                      {(score * 100).toFixed(0)}%
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
