interface QuestionProps {
  answers: number
  origin: string
}

const Question = ({ answers, origin }: QuestionProps) => {
  return <h1 className="home__question">{answers > 1 ? `What are ${answers} Spanish words for` : `What's Spanish for`} <span>{origin}</span></h1>
}

export default Question
