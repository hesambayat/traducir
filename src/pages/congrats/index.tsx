import Confetti from 'react-confetti'

export const Congrats = () => {
  return (
    <div className="congrats">
      <h1>Congratulations! 🥳</h1>
      <h4>Since you came this far... You deserve <a href="https://youtu.be/dQw4w9WgXcQ">a proper celebration!</a></h4>
      <Confetti />
    </div>
  )
}

export default Congrats
