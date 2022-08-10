import { useEffect, useState } from 'react'

const Splash = () => {
  const [className, setClassName] = useState('splash')

  useEffect(() => {
    const emit = setTimeout(() => {
      setClassName('splash splash--out')
    }, 1200)

    return () => clearTimeout(emit)
  }, [setClassName])

  return (
    <div className={className}>
      <div className="clip">
        <h1>Loading... <strong>Loading...</strong> <em>Loading...</em></h1>
        <p>Loading... <strong>Loading...</strong> <em>Loading...</em></p>
      </div>
    </div>
  )
}

export default Splash
