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
    <div className={className} />
  )
}

export default Splash
