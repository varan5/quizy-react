import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

const Home = () => {
  return (
    <div>
      <div className="question-gif-container">
        <img className="question-gif" src="images/quiz-app-1.png" />
      </div>
      <div className="get-started-button"><Link to="/questions"><a className="waves-effect waves-light btn">Get Started</a></Link></div>
    </div>
  )
}

export default Home