import React, { useState, useEffect } from 'react'
import { useHistory, Link } from "react-router-dom";
import { AiFillDelete } from 'react-icons/ai';
import { AiFillEdit } from 'react-icons/ai'
import { toast } from 'react-toastify';
import AppConstants from '../../utils/AppConstants';
import QuestionsData from '../../utils/QuestionsData';
import './Questions.css'

const Questions = () => {
  const history = useHistory()

  const questionsData = QuestionsData

  const [allQuestions, setAllQuestions] = useState(localStorage.getItem('allQuestions') ? JSON.parse(localStorage.getItem('allQuestions')) : questionsData)
  const [showLoader, setShowLoader] = useState(false)

  useEffect(() => {
    localStorage.setItem('allQuestions', JSON.stringify(allQuestions))
  }, [allQuestions])


  useEffect(() => {
    const allQuestionsFromLocalStorage = localStorage.getItem('allQuestions')
    if (allQuestionsFromLocalStorage) {
      setAllQuestions(JSON.parse(allQuestionsFromLocalStorage))
    } else {
      setAllQuestions(questionsData)
      localStorage.setItem('allQuestions', JSON.stringify(questionsData))
    }
  }, [])


  const deleteClickedQuestion = async (questionId) => {
    const isSureToDeleteQuestion = window.confirm('Are you sure ? You want to delete this question ?')
    if (!isSureToDeleteQuestion) {
      return;
    }
    const newQuestionsAfterDelete = allQuestions.filter((question) => question.id !== questionId)
    setAllQuestions(newQuestionsAfterDelete)
    toast.error('Question deleted successfully')
  }

  const editClickedQuestion = async (question) => {
    history.push({
      pathname: '/question-details',
      state: { questionId: question, isEdit: true }
    });
  }

  return (
    showLoader ? <div className="loader-gif-container"><img className="loader-gif" src="gifs/quiz-app-1.gif" /></div> : <div>
      <h2 className="your-questions-title">{AppConstants.ALL_QUESTIONS_TITLE}</h2>
      <div className="your-questions-container">
        {
          allQuestions.map((question) =>
            <div className="question-card-container card">
              <div className="edit-delete-button-container">
                <AiFillEdit size={25} onClick={() => editClickedQuestion(question)} />
                <AiFillDelete size={25} onClick={() => deleteClickedQuestion(question.id)} />
              </div>
              <div className="card-content">
                <span className="card-title activator grey-text text-darken-4">Q{question.id}. {question.title}<i className="material-icons right">View Details</i></span>
              </div>
              <div className="card-reveal">
                <span className="card-title grey-text text-darken-4">Q{question.id}. {question.title}<i className="material-icons right">close</i></span>
                <p>Description: {question.description}</p>
              </div>
            </div>
          )
        }
        <Link to="/question-details">
          <a className="waves-effect waves-light btn">{AppConstants.ADD_NEW_QUESTION}</a>
        </Link>
      </div>
    </div>
  )
}

export default Questions