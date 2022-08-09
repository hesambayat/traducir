import { Button, Keypad } from '../../componentes'
import { useTranslationSource } from '../../hooks'
import words from '../../words.json'

export const Home = () => {
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
        <button className="home__score"><span>&#10033;</span> You got {total - remaining}/{total}</button>
      </header>
      <main>
        <h1 className="home__question">Find Spanish word for <span>{source.origin}</span></h1>
        <Keypad {...source} onDone={action.shift} />
        <div className="home__actions">
          <Button label="Skip &#10230;" disabled={remaining < 2} onClick={action.push} />
        </div>
      </main>
    </div>
  )
}

export default Home
