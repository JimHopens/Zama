import { useState } from 'react'

function App() {
  const [message, setMessage] = useState('')
  const [result, setResult] = useState('')

  const handleEncrypt = async () => {
    const res = await fetch('/api/encrypt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message })
    })
    const data = await res.json()
    setResult(data.encrypted)
  }

  return (
    <div>
      <h1>Encrypt</h1>
      <input value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={handleEncrypt}>Encrypt</button>
      <p>Result: {result}</p>
    </div>
  )
}

export default App
