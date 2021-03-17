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
      recieveQuestions(res.payload.identifier);
    });
  };

  const renderChoiceAnswers = (questionNumber, choices) => {
    const choiceAnswers = [];
    const choiceQuestions = questions.filter(
      question => question.questionType === 'choice' && question.questionNumber === questionNumber
    );

    if (choiceQuestions.length > 0) {
      choices.map(choiceIndx => {
        const currentQuestion = choiceQuestions.find(
          ques => ques.questionNumber === questionNumber
        );
        choiceAnswers.push(currentQuestion?.choices[choiceIndx]);
      });
    }
    return choiceAnswers.join(', ');
  };

  const capitalizeFirstCharacter = answer => {
    if(answer === true) {
      //checking foor boolean answers
      return 'Yes'
    } else if(answer === false){
      return  'No'
    } else {
      return answer?.toString().replace(/\b\w/g, l => l.toUpperCase());
    }
  }
  const renderAnswer = questionNumber => {
    const result = response.payload.results.filter(res => res.identifier == questionNumber)[0]
      ?.results[0];
    const choiceAnswers = renderChoiceAnswers(questionNumber, result?.choiceAnswers);
    return (
      <div>
        <div className="text-md text-gray-600 dark:text-gray-400">
          <div className="flex">
            <b className="mx-3"> Answer: </b>
            <div className="text-gray-900	self-center mx-3">
              { capitalizeFirstCharacter(result?.booleanAnswer) || null}
              { result?.scaleAnswer?.toString() || null}
              { choiceAnswers || null}
              { capitalizeFirstCharacter(result?.textAnswer) || null }
              { result?.emailAnswer || null }
              { result?.validatedTextAnswer || null }
              { result?.numericAnswer || null }
              { result?.dateAnswer || null }
              { result?.timeOfTheDayAnswer || null }
              { result?.locationAnswer || null }
              { result?.valuePickerAnswer || null }
              { result?.imageChoiceAnswer || null }
              { capitalizeFirstCharacter(result?.textChoiceAnswer) ||
                result?.textChoiceAnswers?.join(', ') ||
                null }
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderResponse = () => {
    const questionsLength = questions.length;

    return questions.map((question, i) => {
      if (i !== 0 && i !== questionsLength - 1) {
        return (
          <div key={ i }>
            <h2 className="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300">
              { `QUESTION ${i} | ${question.questionType}` }
            </h2>
            <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
              <div className="flex">
                <b className="text-md text-gray-600 dark:text-gray-400 self-center mx-3">
                  Question:{ ' ' }
                </b>
                <div className="text-gray-900	self-center">{ question.text }</div>
              </div>
              { renderAnswer(question.questionNumber) }
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
        { response ? null : <i className="fas fa-spinner fa-pulse mx-4 text-gray-400" /> }
      </h2>
      {renderResponse() }
    </div>
  );
};

export default ViewResponse;
