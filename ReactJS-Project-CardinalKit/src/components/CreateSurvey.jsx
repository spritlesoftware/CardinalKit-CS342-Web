import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { addQuestions } from '../api/getAllUsers';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const CreateSurvey = ({history}) => {
  const [choiceFields, setChoiceFields] = useState(['', '', '', '']);

  const [questions, setQuestions] = useState([
    {
      questionText: '',
      questionType: '',
      choices: [],
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
    switch(e.target.name){
      case 'questionType': 
        question.questionType = e.target.value;
      break;
      case 'questionText': 
        question.questionText = e.target.value;
      break;
      case 'choice':
        question.choices.splice(choiceIndex, 1, e.target.value);
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
        choices: [],
      },
    ]);
  };

  const addChoiceField = () => {
    setChoiceFields([...choiceFields, '']);
  };

  const renderChoiceFields = questionIndex =>
    choiceFields.map((field, i) => (
      <input
        name="choice"
        key={i}
        className="mt-2 border border-gray-800"
        onChange={e => setQuestionAttributes(e, questionIndex, i)}
      />
    ));

  const renderQuestionFields = () =>
    questions.map((field, index, i) => (
      <div className="px-4 py-3 mb-8 mt-10 bg-white rounded-lg shadow-md dark:bg-gray-800" key={index}>
        <div className="row m-10 flex flex-col">
          <select
            className="w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 self-end"
            onChange={e => {
              setQuestionAttributes(e, index);
            }}
            name="questionType"
          >
            <option className="lock px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
              Select Question Type
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
              {' '}
              boolean
            </option>
            <option
              value="choice"
              className="lock px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              {' '}
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
          <div className="flex mt-4">
            <label className="px-2">Question_Text: </label>
            <textarea
              className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
              name="questionText"
              onChange={e => setQuestionAttributes(e, index)}
              required
            />
          </div>

          {field.questionType === 'choice' && (
            <div>
              <div className="flex">
                <label className="px-3">Enter_choices: </label>
                <div className="p-3 block flex flex-col justify-between  w-full">
                  {renderChoiceFields(index)}
                </div>
              </div>
              <button
                type="button"
                onClick={addChoiceField}
                className="block px-4 py-2 mt-4 mb-4 ml-3 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
              >
                Add choice
              </button>
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
      <form onSubmit={onSubmit}>
        <div className="row m-10 flex">
          <label className="text-gray-700 dark:text-gray-400 mx-10">Survey Name: </label>
          <input
            className="block  mt-1 ml-4 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
            id="surveyname"
            name="surveyName"
            required
          />
        </div>
        <div className="row mt-4 flex">
          <label className="text-gray-700 dark:text-gray-400 mx-10">Survey Description: </label>
          <textarea
            className="block w-full mt-1 mb-5 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
            id="surveyname"
            name="surveyDescription"
            required
          />
        </div>
        {renderQuestionFields()}
        <div className="flex justify-around	">
          <button
            className="block px-4 py-2 mt-4 mb-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
            type="button"
            onClick={addNewQuestionField}
          >
            Add Question
          </button>
          <button
            type="submit"
            className="block px-4 py-2 mt-4 mb-4 ml-3 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSurvey;
