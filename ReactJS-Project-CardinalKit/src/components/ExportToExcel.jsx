import React, { useState, useEffect } from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

import { getQuestions, getSurveys } from '../api/getAllUsers';

const ExportToExcel = ({ uid }) => {
  const [surveyQuestions, setSurveyQuestions] = useState([]);
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [excelData, setExcelData] = useState([]);

  useEffect(() => {
    loading && setExportData();
  }, [surveyQuestions, excelData]);

  useEffect(() => {
    setQuestionAndResponseToState();
    clearPreviousData();
  }, []);

  const clearPreviousData = () => {
    setSurveyQuestions([]);
    setResponse([]);
    setExcelData([]);
  };

  const getChoiceAnswers = (allChoices, userChoices) => {
    const choiceAnswers = [];

    //user choices contain the indexes of the actual array of choices from the question
    userChoices.forEach(choiceIndx => {
      choiceAnswers.push(allChoices[choiceIndx]);
    });

    return choiceAnswers.join(', ');
  };

  const setQuestionAndResponseToState = () => {
    let temprorySurvey = [];
    let temproryResponse = [];

    getSurveys(uid).then(querySnapshot => {
      querySnapshot.docs.forEach(doc => {
        var questionId = doc.data().payload.identifier;

        temproryResponse.push({ response: doc.data().payload.results, questionId });

        setResponse(temproryResponse);

        getQuestions(questionId).then(doc => {
          setLoading(true);
          temprorySurvey.push({
            questions: doc.questions,
            name: doc.name,
            description: doc.description,
            questionId,
          });

          setSurveyQuestions([...temprorySurvey]);
          setLoading(false);
        });
      });
    });
  };

  const setExportData = () => {
    var temporaryData = [];
    var questionId = '';
    var name = '';
    var description = '';
    var answer = '';

    surveyQuestions.forEach((survey, i) => {
      questionId = survey.questionId;
      name = survey.name;
      description = survey.description;
      temporaryData = survey.questions.map((question, i) => {
        var matchedResponse = response.find(res => res.questionId === questionId)?.response[i]
          .results[0];

        if (matchedResponse?.booleanAnswer !== undefined) {
          answer = matchedResponse?.booleanAnswer === true ? 'Yes' : 'No';
        } else if (matchedResponse?.scaleAnswer) {
          answer = matchedResponse?.scaleAnswer.toString();
        } else if (matchedResponse?.choiceAnswers) {
          answer = getChoiceAnswers(question.choices, matchedResponse?.choiceAnswers);
        } else {
          answer = '-';
        }

        return Object.assign({}, question, { ...matchedResponse, answer });
      });
    });
    setExcelData([...excelData, { data: temporaryData, questionId, name, description }]);
  };

  return (
    <div>
      <ReactHTMLTableToExcel
        id="test-table-xls-button"
        className="download-table-xls-button px-2 py-1 ml-2 font-semibold leading-tight text-green-700 bg-blue-200 shadow-lg dark:bg-green-700 dark:text-green-100"
        table={uid}
        filename="Cardinal Kit Response"
        sheet="tablexls"
        buttonText="Response"
      />
      <table id={uid} className="hidden">
        <tbody>
          <tr />

          <tr>
            <th>User Id:</th>
            <td>{uid}</td>
          </tr>

          <tr />

          {excelData.map(survey => (
            <>
              <tr>
                <th>Survey Name:</th>
                <td>{survey?.name}</td>
              </tr>
              <tr />

              <tr>
                <th>SNO</th>
                <th>Question</th>
                <th>Answer</th>
              </tr>
              {survey?.data?.map((data, i) => (
                <tr key={i}>
                  <td className="text-center">{data?.questionNumber}</td>
                  <td>{data?.text}</td>
                  <td>{data?.answer}</td>
                </tr>
              ))}
              <tr />
              <tr />
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExportToExcel;
