import { useModal } from '../../context/modal'

interface ScoreProps {
  total: number
  remaining: number
}

const Score = ({ total, remaining }: ScoreProps) => {
  const { setModal } = useModal()

  return (
    <header>
    <button className="home__score" onClick={setModal}>
      <span>?</span> You got {total - remaining}/{total}
    </button>
  </header>
  )
}

export default Score
