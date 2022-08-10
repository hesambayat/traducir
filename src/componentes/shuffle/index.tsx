import { useEffect, useState } from 'react'
interface ShuffleProps {
  text: string
  live: boolean
}

export const Shuffle = ({ text, live = false }: ShuffleProps) => {
  const [counter, setCounter] = useState(0)
  useEffect(() => {
    if (!live) return
    const emit = setTimeout(() => {
      setCounter(counter => counter + 1)
    }, 100)

    return () => clearTimeout(emit)
  }, [text, live, counter, setCounter])

  if (!live) return <span className="shuffle">{text}</span>

  return <span className="shuffle">{text.split('').sort(() =>  0.5 - Math.random()).join('')}</span>
}

export default Shuffle
