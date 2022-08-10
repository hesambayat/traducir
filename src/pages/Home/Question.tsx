import { Shuffle } from '../../componentes'

interface QuestionProps {
  answers: number
  origin: string
  transforming: boolean
}

const Question = ({ answers, origin, transforming = false }: QuestionProps) => {
  return (
    <h1 className="home__question">
      {answers > 1 ? `What are ${answers} Spanish words for` : `What's Spanish for`} <Shuffle text={origin} live={!!transforming} />
    </h1>
  )
}

export default Question
