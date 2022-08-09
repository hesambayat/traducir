import Keypad from '../../componentes/keypad'
import { useTranslationSource } from '../../hooks'
import words from '../../words.json'

const Home = () => {
  const [source, action, { remaining }] = useTranslationSource(words)
  if (!source) {
    return (
      <div className="home">
        <h1>Congratulations!</h1>
      </div>
    )
  }

  return (
    <div className="home">
      <h1>{source.origin}</h1>
      <Keypad {...source} onDone={action.shift} />
      {remaining > 1 && <button onClick={action.push}>Skip</button>}
    </div>
  )
}

export default Home
