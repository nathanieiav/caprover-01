import { useState } from 'react'
import './App.css'

function App() {
  const [getTrue, setTrue] = useState(false)

  const handleClick = async () => {
    try {
      const response = await fetch('/api/testBE02', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`)
      }

      const result = await response.json()

      console.log('result is: ', JSON.stringify(result, null, 4))

      setTrue(true)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div
      className="App"
      style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
    >
      <h1>if the light turns green, then its a success!</h1>
      <button onClick={handleClick}>bitch</button>
      <div
        className="light"
        style={{ backgroundColor: 'red', width: '100px', height: '100px' }}
      ></div>
    </div>
  )
}

export default App
