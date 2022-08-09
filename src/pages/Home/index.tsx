import Keypad from '../../componentes/keypad'
import { useTranslationSource } from '../../hooks'
import words from '../../words.json'

const Home = () => {
  const [source, action, { remaining, total }] = useTranslationSource(words)
  if (!source) {
    return (
      <div className="home">
        <h1>Congratulations!</h1>
      </div>
    )
  }

  return (
    <div className="home">
      <header>
        <h4 className="home__score">You got {total - remaining}/{total}</h4>
      </header>
      <main>
        <h1 className="home__question">Find Spanish word for <span>{source.origin}</span></h1>
        <Keypad {...source} onDone={action.shift} />
        <div className="home__actions">
          {remaining > 1 && <button onClick={action.push}>Skip</button>}
        </div>
      </main>
    </div>
  )
}

export default Home
