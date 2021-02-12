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
      questionNumber: 1,
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
        if (e.target.value === 'choice') {
          question.choices = ['', '', '', ''];
        } else if (question.choices) {
          delete question.choices;
        }
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
      case 'removeChoice':
        question.choices.splice(choiceIndex, 1);
        break;
      default:
        return;
    }
    stateQuestions[index] = question;
    setQuestions(stateQuestions);
  };

  const addNewQuestionField = () => {
    const lastQuestion = questions[questions.length - 1];
    const currentQuestionNumber = lastQuestion.questionNumber + 1;
    setQuestions([
      ...questions,
      {
        questionText: '',
        questionType: '',
        questionNumber: currentQuestionNumber,
      },
    ]);
  };

  const renderChoiceFields = questionIndex => {
    const currentQuestion = questions[questionIndex];
    return currentQuestion.choices.map((field, i) => (
      <div className="flex mx-3" key={i}>
        <div className="flex content-center my-1">
          <input
            name="choice"
            key={i}
            className="mt-2 ml-3 border border-gray-400  rounded"
            onChange={e => setQuestionAttributes(e, questionIndex, i)}
            value={field}
          />
          <button
            onClick={e => setQuestionAttributes(e, questionIndex, i)}
            name="removeChoice"
            type="button"
            className="bg-gray-200 m-2 px-1 rounded-sm self-center"
          >
            &#10005;
          </button>
        </div>
      </div>
    ));
  };

  const renderQuestionFields = () =>
    questions.map((field, index, i) => (
      <div
        className={`px-4 py-3 mb-8 bg-white dark:bg-gray${field.questionNumber === 1 ||
          ' border-t-2 border-fuchsia-600'}`}
        key={index}
      >
        <div className="row m-10 flex flex-col">
          <div className="flex justify-right mb-4">
            <div className="px-4">
              <label>Question No.{'  '}:</label>
            </div>
            <div className="mx-4">{field.questionNumber}</div>
          </div>
          <div className="flex justify-right ">
            <div className="px-3 self-center">
              <label>Question Type:</label>
            </div>
            <div className="cursor-pointer flex">
              <select
                className=" dropdown rounded-md border p-2 shadow bg-white"
                onChange={e => {
                  setQuestionAttributes(e, index);
                }}
                name="questionType"
              >
                <option className="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap">
                  Please select...
                </option>
                <option
                  value="instruction"
                  className="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                >
                  instruction
                </option>
                <option
                  value="boolean"
                  className="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                >
                  {' '}
                  boolean
                </option>
                <option
                  value="choice"
                  className="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                >
                  {' '}
                  choice
                </option>
                <option
                  value="scale"
                  className="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                >
                  scale
                </option>
                <option
                  value="summary"
                  className="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                >
                  summary
                </option>
              </select>
            </div>
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
                           focus:border-purple-400
                           focus:outline-none
                           focus:shadow-outline-purple
                           dark:text-gray-300
                           dark:focus:shadow-outline-gray
                           form-input"
                name="questionText"
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
                    className="block h-8  px-4 py-2  mt-4 mb-4 ml-3 
                               text-sm font-medium 
                               leading-5 text-center 
                               text-white 
                               transition-colors 
                               duration-150 
                               bg-purple-600 border 
                               border-transparent 
                               rounded-lg 
                               active:bg-purple-600 
                               hover:bg-purple-700 
                               focus:outline-none 
                               focus:shadow-outline-purple"
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
      <h1 className="px-6 my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200 mx-auto">
        Create Surveys
      </h1>
      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
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
                  className="block  mt-1 ml-4 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                  id="surveyname"
                  name="surveyName"
                  required
                  autoFocus
                />
              </div>
            </div>

            <div className="row mt-4 flex justify-left">
              <div className="w-1/5">
                <label className="text-gray-700 dark:text-gray-400 pl-8">Survey Description:</label>
              </div>
              <div className="w-2/5">
                <textarea
                  className="block w-full ml-4 mt-1 mb-5 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                  id="surveyname"
                  name="surveyDescription"
                  required
                />
              </div>
            </div>
          </div>
          <div className="flex justify-start border-t-2 border-fuchsia-600 pt-4">
            <h1 className="text-xl font-semibold mx-auto">Add Questions</h1>
          </div>
          <div className="">{renderQuestionFields()}</div>

          <div className="flex flex-row-reverse relative">
            <button
              type="submit"
              className="block px-4 py-2 mt-4 mb-4 ml-3 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
            >
              Create
            </button>

            <button
              className="block px-4 py-2 ml-3 mt-4 mb-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
              type="button"
              onClick={addNewQuestionField}
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
