import React, { useEffect, useState } from 'react';
import { getQuestions, getSurvey } from '../api/getAllUsers';

const ViewResponse = ({ match }) => {
  const [questions, setQuestions] = useState([]);
  const [response, setResponse] = useState();

  useEffect(() => {
    getResponse();
  }, []);

  const recieveQuestions = questionId => {
    getQuestions(questionId).then(doc => {
      if (doc.questions.length !== questions.length) {
        setQuestions(doc.questions);
      }
    });
  };

  const getResponse = () => {
    getSurvey(match.params.userID, match.params.surveyId).then(res => {
      setResponse(res);
      recieveQuestions(res.surveyQuestionId);
    });
  };

  const renderAnswer = (questionNumber, questionType) => {
    const result = response.payload.results.filter(res => res.questionNumber === questionNumber)[0]
      .results[0];
    return (
      <div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          <b>Answer: </b>
          {result.booleanAnswer?.toString()}
          {result.scaleAnswer?.toString()}
          {result.choiceAnswers?.join(', ')}
        </p>
      </div>
    );
  };

  const renderResponse = () => {
    const questionsLength = questions.length;

    return questions.map((question, i) => {
      if (i === 0 || i === questionsLength - 1) {
      } else {
        return (
          <div>
            <h2 className="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300">
              Question 
{' '}
{i} |
{question.questionType}
            </h2>
            <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <b>Question: </b>
                  {question.text}
                </p>
              </div>
              {renderAnswer(question.questionNumber, question.questionType)}
            </div>
          </div>
        );
      }
    });
  };

  return (
    <div className="container px-6 mx-auto grid">
      <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        Survey Response
      </h2>
      {renderResponse()}
    </div>
  );
};

export default ViewResponse;
