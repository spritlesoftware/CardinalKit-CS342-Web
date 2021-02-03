import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { addQuestions } from '../api/getAllUsers';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const CreateSurvey = ({ history }) => {

  const [questions, setQuestions] = useState([
    {
      questionText: '',
      questionType: '',
      choices: ['', '', '', ''],
    },
  ]);

  const onSubmit = e => {
    e.preventDefault();
    const survey = {
      name: e.target.surveyName.value,
      description: e.target.surveyDescription.value,
      questions,
    };

    addQuestions(survey).then(() => {
      toast.success('survey Created Sucessfully');
      history.push('/users');
    });
  };

  const setQuestionAttributes = (e, index, choiceIndex) => {
    const stateQuestions = [...questions];
    const question = stateQuestions[index];
    switch (e.target.name) {
      case 'questionType':
        question.questionType = e.target.value;
        break;
      case 'questionText':
        question.questionText = e.target.value;
        break;
      case 'choice':
        question.choices.splice(choiceIndex, 1, e.target.value);
        break;
      case 'addChoiceField':
        question.choices.push('');
        break;
      default:
        return
    }
    stateQuestions[index] = question;
    setQuestions(stateQuestions);
  };

  const addNewQuestionField = () => {
    setQuestions([
      ...questions,
      {
        questionText: '',
        questionType: '',
        choices: ['', '', '', ''],
      },
    ]);
  };

  const renderChoiceFields = questionIndex => {
    var currentQuestion = questions[questionIndex]
    return currentQuestion.choices.map((field, i) => (
      <div className="flex flex-wrap">
        <input
          name="choice"
          key={ i }
          className="mt-2  ml-3 border border-gray-800 w-1/2 rounded"
          onChange={ e => setQuestionAttributes(e, questionIndex, i) }
        />
      </div>
    ));
  }


  const renderQuestionFields = () =>
    questions.map((field, index, i) => (
      <div className="px-4 py-3 mb-8 mt-10 bg-white dark:bg-gray border-t-2 " key={ index }>
        <div className="row m-10 flex flex-col">
          <div className="flex">
            <div className="flex-auto">
              <label>Question Type:</label>
            </div>
            <div className="flex">
              <select
                className="w-7 mr-6 ml-3 rounded-md border p-2 px-3 shadow-lg bg-white ring-1 ring-black ring-opacity-5 justify-self-end"
                onChange={ e => {
                  setQuestionAttributes(e, index);
                } }
                name="questionType"
              >
                <option className="lock px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                  Please select...
              </option>
                <option
                  value="instruction"
                  className="lock px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  instruction
              </option>
                <option
                  value="boolean"
                  className="lock px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  { ' ' }
              boolean
              </option>
                <option
                  value="choice"
                  className="lock px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  { ' ' }
              choice
              </option>
                <option
                  value="scale"
                  className="lock px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  scale
              </option>
                <option
                  value="summary"
                  className="lock px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  summary
              </option>
              </select>
            </div>
          </div>
          <div className="flex mt-4">
            <div className="flex-auto">
              <label className="px-2">Question Text: </label>
            </div>
            <div className="flex-1 w-3/5">
              <textarea
                className="block w-full mt-1 text-sm
                           dark:border-gray-600
                           dark:bg-gray-700
                           focus:border-purple-400
                           focus:outline-none
                           focus:shadow-outline-purple
                           dark:text-gray-300
                           dark:focus:shadow-outline-gray
                           form-input"
                name="questionText"
                onChange={ e => setQuestionAttributes(e, index) }
                required
              />
            </div>
          </div>

          { field.questionType === 'choice' && (
            <div>

              <div className="flex item-stretch w-1/2">

                <div className="flex flex-auto align-end">
                  <label className="mt-3 ">Enter choices: </label>
                </div>

                <div
                  className="p-3 block flex flex-wrap justify-items-start flex-1  w-full mx-4">
                  { renderChoiceFields(index) }
                </div>

                <div className="self-end">
                  <button
                    type="button"
                    onClick={ e => setQuestionAttributes(e, index) }
                    name="addChoiceField"
                    className="block h-8  px-4 py-2  mt-4 mb-4 ml-3 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                  >
                    <i className="fas fa-plus mb-2" />
                  </button>
                </div>
              </div>
            </div>
          ) }
        </div>
      </div>
    ));

  return (
    <div className="container mx-auto px-4">
      <h1 className="px-6 my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200 mx-auto">
        Create Surveys
      </h1>
      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <form onSubmit={ onSubmit }>
          <div className="flex flex-col mb-4">
            <div className="row flex">
              <div className="w-5/6 ">
                <label
                  className="text-gray-700 dark:text-gray-400 mx-10 flex-auto pl-8">
                  Survey Name:
                </label>
              </div>
              <div className="flex-1 pl-10">
                <input
                  className="block  mt-1 ml-4 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                  id="surveyname"
                  name="surveyName"
                  required
                />
              </div>
            </div>

            <div className="row mt-4 flex">
              <label
                className="text-gray-700 dark:text-gray-400 mx-10 flex-auto justify-self-center pl-8">
                Survey Description:
            </label>
              <textarea
                className="block w-full ml-4 flex-1 mt-1 mb-5 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                id="surveyname"
                name="surveyDescription"
                required
              />
            </div>
          </div>
          <div className="flex justify-startt">
            <h1 className="text-xl w-9 font-semibold mx-auto">Add Questions</h1>
          </div>
          <div className="border-t-2 border-fuchsia-600">
            { renderQuestionFields() }
          </div>
          <div className="flex flex-row-reverse">

            <button
              type="submit"
              className="block px-4 py-2 mt-4 mb-4 ml-3 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
            >
              Create
            </button>


            <button
              className="block px-4 py-2 ml-3 mt-4 mb-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
              type="button"
              onClick={ addNewQuestionField }
            >
              Add Question
            </button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSurvey;
