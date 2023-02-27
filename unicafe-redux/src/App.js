import { useState } from 'react'


const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)


const Stats = ({ text, votes, other }) => <tr> <td>{text}</td> <td>{votes}</td><td>{other}</td></tr>


const Total = ({ good, bad, neutral, all, average, positive }) => {
  if (good === 0 && bad === 0 && neutral === 0)  return <div> <h1> No feedback given! </h1> </div>
  return (
    <div>
      <h1> statistics </h1>
      <Stats text={"good"} votes={good}/>
      <Stats text={"neutral"} votes={neutral}/>
      <Stats text={"bad"} votes={bad}/>
      <Stats text={"all"} votes={all}/>
      <Stats text={"average"} votes={average}/>
      <Stats text={"positive"} votes={positive*100} other={"%"}/>
    </div>
  )

}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad
  const average = (good - bad)/all
  const positive = (good)/all 

  return (
    <div>
      <h1> give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Total good={good} bad={bad} neutral={neutral} all={all} average={average} positive={positive}></Total>
    </div>
  )
}

export default App