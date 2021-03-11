import React, { useState } from 'react';
import { toast } from 'react-toastify';
import moment from 'moment';
import { addQuestions } from '../api/getAllUsers';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const CreateSurvey = ({ history }) => {
  const [questions, setQuestions] = useState([
    {
      text: '',
      questionType: 'instruction',
      questionNumber: 1,
    },
    {
      text: '',
      questionType: 'summary',
      questionNumber: -1,
    },
  ]);

  const onSubmit = e => {
    e.preventDefault();

    let createdAt = moment();

    const survey = {
      name: e.target.surveyName.value,
      description: e.target.surveyDescription.value,
      questions,
      createdAt: createdAt.format('MMM. D, YYYY [at] h:mm A z'),
    };

    addQuestions(survey).then(() => {
      toast.success('survey Created Sucessfully');
      history.push('/manage_surveys');
    });
  };

  const setQuestionAttributes = (e, index, choiceIndex) => {
    const stateQuestions = [...questions];
    const question = stateQuestions[index];
    switch (e.target.name) {
      case 'questionType':
        question.questionType = e.target.value;
        if (e.target.value === 'choice') {
          question.choices = ['', '', '', ''];
        } else if (question.choices) {
          delete question.choices;
        }
        break;
      case 'text':
        question.text = e.target.value;
        break;
      case 'choice':
        question.choices.splice(choiceIndex, 1, e.target.value);
        break;
      case 'addChoiceField':
        question.choices.push('');
        break;
      case 'removeChoice':
        if(question.choices.length === 1) {
          return 
        }
        question.choices.splice(choiceIndex, 1);
        break;
      default:
        return;
    }
    stateQuestions[index] = question;
    setQuestions(stateQuestions);
  };

  const addNewQuestionField = () => {
    const lastQuestion = questions[questions.length - 2];
    const currentQuestionNumber = lastQuestion.questionNumber + 1;
    var newQuestion = {
      text: '',
      questionType: '',
      questionNumber: currentQuestionNumber,
    };
    const stateQuestions = [...questions];
    stateQuestions.splice(questions.length - 1, 0, newQuestion);
    setQuestions(stateQuestions);
  };

  const removeQuestion = questionIndex => {
    const stateQuestions = [...questions];
    stateQuestions.splice(questionIndex, 1);
    setQuestions(stateQuestions);
  };

  const renderChoiceFields = questionIndex => {
    const currentQuestion = questions[questionIndex];
    return currentQuestion.choices.map((field, i) => (
      <div className="flex mx-3" key={i}>
        <div className="flex content-center my-1">
          <input
            name="choice"
            key={i}
            className="mt-2 ml-3 border border-gray-400"
            onChange={e => setQuestionAttributes(e, questionIndex, i)}
            value={field}
            autoComplete="off"
          />
          <button
            onClick={e => setQuestionAttributes(e, questionIndex, i)}
            name="removeChoice"
            type="button"
            className="bg-gray-200 m-2 px-1 shadow-2xl self-center"
          >
            &#10005;
          </button>
        </div>
      </div>
    ));
  };

  const renderQuestionType = (question, questionIndex) => {
    if (question.questionType === 'instruction') {
      return 'Instruction';
    } else if (question.questionType === 'summary') {
      return 'Summary';
    } else {
      return (
        <select
          className="dropdown border p-2 bg-white"
          onChange={e => {
            setQuestionAttributes(e, questionIndex);
          }}
          name="questionType"
          required
        >
          <option
            value="Please select..."
            dissabled
            className="bg-gray-200 py-2 px-4 block whitespace-no-wrap"
          >
            Please select...
          </option>
          <option
            value="boolean"
            className=" bg-gray-200 hover:shadow-none py-2 px-4 block whitespace-no-wrap"
          >
            {' '}
            Boolean
          </option>
          <option
            value="choice"
            className=" bg-gray-200 hover:shadow-none py-2 px-4 block whitespace-no-wrap"
          >
            {' '}
            Choice
          </option>
          <option
            value="scale"
            className=" bg-gray-200 hover:shadow-none py-2 px-4 block whitespace-no-wrap"
          >
            Scale
          </option>
        </select>
      );
    }
  };

  const renderQuestionFields = () =>
    questions.map((field, index, i) => (
      <div
        className={`px-4 py-3 mb-8 bg-white dark:bg-gray${field.questionNumber === 1 ||
          ' border-t-2 border-fuchsia-600'}`}
        key={index}
      >
        <div className="row m-10 flex flex-col">
          <div className="flex justify-right mb-4 justify-between	">
            <div className="flex">
              <div className="px-4">
                <label>Question No.{'  '}:</label>
              </div>
              <div className="mx-4">{index + 1}</div>
            </div>
            {field.questionType === 'instruction' || field.questionType === 'summary' || (
              <div className=" justify-self-end">
                <button
                  className="block px-4 py-2 ml-3 mb-5 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-red-700 border border-transparent shadow-2xl active:bg-red-600 hover:shadow-none focus:outline-none focus:shadow-outline-red"
                  onClick={() => removeQuestion(index)}
                  type="button"
                >
                  Remove Question
                </button>
              </div>
            )}
          </div>
          <div className="flex justify-right ">
            <div className="px-3 self-center">
              <label>Question Type:</label>
            </div>
            <div className="cursor-pointer flex">{renderQuestionType(field, index)}</div>
          </div>
          <div className="flex justify-right mt-4">
            <div className="self-center">
              <label className="px-4">Question Text: </label>
            </div>
            <div className="flex-1 w-3/5">
              <textarea
                className="block w-full mt-1 text-sm
                           dark:border-gray-600
                           dark:bg-gray-700
                           focus:border-red-400
                           focus:outline-none
                           focus:shadow-outline-red
                           dark:text-gray-300
                           dark:focus:shadow-outline-gray
                           form-input"
                name="text"
                value={questions[index].text}
                onChange={e => setQuestionAttributes(e, index)}
                required
              />
            </div>
          </div>

          {field.questionType === 'choice' && (
            <div>
              <div className="flex item-stretch">
                <div className="self-center">
                  <label className="mt-3 px-4">Enter choices: </label>
                </div>

                <div className="p-3 block flex flex-wrap justify-items-start flex-1  w-full mx-4">
                  {renderChoiceFields(index)}
                </div>

                <div className="self-end" name="addChoiceField">
                  <button
                    type="button"
                    onClick={e => setQuestionAttributes(e, index)}
                    name="addChoiceField"
                    className="block h-8  px-4 py-2 pb-2 mt-4 mb-4 ml-3
                               text-sm font-medium
                               leading-5 text-center
                               text-white
                               transition-colors
                               duration-150
                               bg-red-700
                               border
                               border-transparent
                               shadow-2xl
                               active:bg-red-600
                               hover:shadow-none
                               focus:outline-none
                               focus:shadow-outline-red"
                  >
                    Add a choice
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    ));

  return (
    <div className="container mx-auto px-4">
      <div className="mt-4 px-4 py-3 mb-8 bg-white shadow-2xl shadow-md dark:bg-gray-800">
        <div className="px-6 my-10 ml-2 ">
          <h1 className="mb-3 text-2xl font-semibold text-gray-700 dark:text-gray-200 mx-auto">
            Create Surveys
          </h1>
          <div className="h-1 bg-red-700 w-1/12" />
        </div>
        <form onSubmit={onSubmit}>
          <div className="flex flex-col mb-4">
            <div className="row flex justify-around	">
              <div className="w-1/5">
                <label className="text-gray-700 dark:text-gray-400 flex-auto pl-8">
                  Survey Name:
                </label>
              </div>
              <div className="flex-1">
                <input
                  className="block  mt-1 ml-4 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-red-400 focus:outline-none focus:shadow-outline-red dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                  id="surveyname"
                  name="surveyName"
                  required
                  autoFocus
                  autoComplete="off"
                />
              </div>
            </div>

            <div className="row mt-4 flex justify-left">
              <div className="w-1/5">
                <label className="text-gray-700 dark:text-gray-400 pl-8">Survey Description:</label>
              </div>
              <div className="w-2/5">
                <textarea
                  className="block w-full ml-4 mt-1 mb-5 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-red-400 focus:outline-none focus:shadow-outline-red dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                  id="surveyname"
                  name="surveyDescription"
                  required
                />
              </div>
            </div>
          </div>
          <div className="flex justify-start border-t-2 border-fuchsia-600 pt-4">
            <h1 className="text-xl font-semibold mx-auto">Create Questions</h1>
          </div>
          <div className="">{renderQuestionFields()}</div>

          <div className="flex justify-end relative">
            <button
              className="flex px-4 py-2 ml-3 mt-4 mb-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-red-700 border border-transparent shadow-2xl active:bg-red-500 hover:shadow-none focus:outline-none focus:shadow-outline-red"
              type="button"
              onClick={addNewQuestionField}
            >
              <span>Add Question </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </button>

            <button
              type="submit"
              className="flex px-4 py-2 mt-4 mb-4 ml-3 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-red-700 border border-transparent shadow-2xl active:bg-puredrple-500 hover:shadow-none focus:outline-none focus:shadow-outline-red"
            >
              <span>Create Survey</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSurvey;
