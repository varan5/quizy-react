import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import AppConstants from '../../utils/AppConstants'
import './QuestionDetails.css'

const QuestionDetails = () => {

  const history = useHistory()

  const location = useLocation()
  const isEdit = location.state
  const [currentQuestionToEdit, setCurrentQuestionToEdit] = useState(isEdit ? location.state.questionId : '')
  const [questionTitle, setQuestionTitle] = useState(isEdit ? location.state.questionId.title : '')
  const [questionDescription, setQuestionDescription] = useState(isEdit ? location.state.questionId.description : '')
  const allQuestionsFromLocalStorage = localStorage.getItem('allQuestions') ? JSON.parse(localStorage.getItem('allQuestions')) : []
  const [allQuestions, setAllQuestions] = useState(allQuestionsFromLocalStorage)

  useEffect(() => {
    toast.success(isEdit ? 'Edit question' : AppConstants.ADD_NEW_QUESTION)
  }, [])

  useEffect(() => {
    localStorage.setItem('allQuestions', JSON.stringify(allQuestions))
  }, [allQuestions])

  const isQuestionTitleAndDescriptionValidated = () => {
    if (!questionTitle) {
      toast.error('Question title is required')
      return false;
    }
    if (!questionDescription) {
      toast.error('Question description is required')
      return false;
    }
    return true;
  }

  const handleAddNewQuestion = async () => {
    if (!isQuestionTitleAndDescriptionValidated()) {
      return;
    }
    const currentQuestionIndex = allQuestions.length;
    const newQuestion = {
      id: currentQuestionIndex + 1,
      title: questionTitle,
      description: questionDescription
    }
    await setAllQuestions([...allQuestions, newQuestion])
    toast.success('New Question Added')
    history.push({
      pathname: '/questions',
    });
  }

  const handleEditQuestion = async () => {
    if (!isQuestionTitleAndDescriptionValidated()) {
      return;
    }
    const updatedQuestions = allQuestions.map((question, index) => {
      if (index === currentQuestionToEdit.id - 1) {
        question.id = currentQuestionToEdit.id - 1
        question.title = questionTitle
        question.description = questionDescription
        return question
      } else {
        return question
      }
    })
    await setAllQuestions(updatedQuestions)
    toast.success('Question edited successfully')
    history.push({
      pathname: '/questions',
    });
  }

  return (
    <div>
      <div className="row">
        <form className="col s12">
          <div className="text-area-container">
            <div className="input-field col s12">
              <textarea value={questionTitle} onChange={(event) => setQuestionTitle(event.target.value)} id="textarea1" className="text-area materialize-textarea"></textarea>
              <label for="textarea1">Question Title</label>
            </div>
            <div className="input-field col s12">
              <textarea value={questionDescription} onChange={(event) => setQuestionDescription(event.target.value)} id="textarea1" className="text-area materialize-textarea"></textarea>
              <label for="textarea1">Question Description</label>
            </div>
          </div>
          <a onClick={isEdit ? handleEditQuestion : handleAddNewQuestion} className="add-question-button waves-effect waves-light btn">{isEdit ? 'Edit' : 'Add'} Question</a>
          <div className="question-gif-container">
            <img style={{ width: '220px', height: '240px' }} className="question-gif" src="gifs/quiz-app-1.gif" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default QuestionDetails