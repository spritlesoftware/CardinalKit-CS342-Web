import React, { useState, useEffect } from 'react';
import ReactExport from 'react-data-export';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

import { getQuestions, getSurveys } from '../api/getAllUsers';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
const ExcelRow = ReactExport.ExcelFile.ExcelRow;

const ExportToExcel = ({ uid }) => {
  const [surveyQuestions, setSurveyQuestions] = useState([]);
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [excelData, setExcelData] = useState([]);
  const [dataExtracted, setDataExtracted] = useState(false);

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
    userChoices.map(choiceIndx => {
      choiceAnswers.push(allChoices[choiceIndx]);
    });

    return choiceAnswers.join(', ');
  };

  const convertBooleanAnswerToYesOrNo = (boolAswer) => {
    if(boolAswer === true) {
      return 'Yes'
    } else {
      return 'No'
    }
  }

  const setQuestionAndResponseToState = () => {
    let temprorySurvey = [];
    let temproryResponse = [];

    getSurveys(uid).then(querySnapshot => {
      querySnapshot.docs.map(doc => {
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

    surveyQuestions.map((survey, i) => {
      questionId = survey.questionId;
      name = survey.name;
      description = survey.description;
      temporaryData = survey.questions.map((question, i) => {
        var matchedResponse = response.find(res => res.questionId === questionId)?.response[i]
          .results[0];

        if (matchedResponse?.booleanAnswer !== undefined) {
          answer = convertBooleanAnswerToYesOrNo(matchedResponse?.booleanAnswer);
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
    setDataExtracted(true);
  };

  // const renderDownloadButton = () => {
  //   if (dataExtracted) {
  //     return (
  //       <button>
  //         <span className="px-1 py-1 ml-2 font-semibold bg-blue-200 leading-tight shadow-lg dark:bg-blue-700 dark:text-blue-100">
  //           Response
  //           <i className="ml-1 fas fa-cloud-download-alt  text-gray-700	animate-bounce ease-out hover:scale-50" />
  //         </span>
  //       </button>
  //     );
  //   } else {
  //     return null;
  //   }
  // };

  return (
    // <ExcelFile element={renderDownloadButton()} filename="Cardinal Kit survey Response">
    //   {excelData.map((survey, i) => (
    //     <ExcelSheet data={survey.data} name={survey.name} key={i}>
    //       <ExcelColumn label="Question Number" value="questionNumber" widthPx={160} />
    //       <ExcelColumn label="Question" value="text" wrapText={true} />
    //       <ExcelColumn label="Answer" value={'answer'} />
    //     </ExcelSheet>
    //   ))}
    // </ExcelFile>

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
            {survey?.data?.map(data => (
              <tr>
                <td className="text-center">{data?.questionNumber}</td>
                <td>{data?.text}</td>
                <td>{data?.answer}</td>
              </tr>
            ))}
            <tr />
            <tr />
          </>
        ))}
      </table>
    </div>
  );
};

export default ExportToExcel;
