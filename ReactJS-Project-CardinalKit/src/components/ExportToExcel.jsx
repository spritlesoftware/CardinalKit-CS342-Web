import React, { useState, useEffect } from "react";
import ReactExport from "react-export-excel";
import { getQuestions, getSurveys } from "../api/getAllUsers";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const ExportToExcel = ({uid}) =>  {

	const [surveyQuestions, setSurveyQuestions] = useState([])
	const [response, setResponse] = useState([])
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		loading && matchResponseWithQuestions()
	}, [surveyQuestions])

	const exportAsExcel = () => {
		getSurveys(uid)
		.then((querySnapshot) => {
			querySnapshot.docs.map((doc) => {
				var questionId = doc.data().surveyQuestionId
				setResponse([...response, {response: doc.data().payload.results, questionId}])
				getQuestions(questionId)
					.then((doc) => {	
						setLoading(true)
						setSurveyQuestions([...surveyQuestions, {questions: doc.questions, questionId }])
						setLoading(false)
					})
				})
		})
	}

	const fetchResponseForSingleQuestion = (surveyId, questionNumber) => {
		const responseForCurrentSurvey = response.filter((res) => res.questionId = surveyId)[0]	
		return responseForCurrentSurvey.response.filter((res) => res.questionNumber === questionNumber)[0].results[0]	
	}

	const matchResponseWithQuestions = () => {
		surveyQuestions.map((survey) => {
			const surveyId = survey.questionId
			survey.questions.map(question => {
				var res = fetchResponseForSingleQuestion(surveyId, question.questionNumber)
				console.log(res.booleanAnswer?.toString())
			})
		})
	}


	return (
		<button onClick={() => {exportAsExcel()}}>
			<span className="px-2 py-1  font-semibold bg-blue-200 leading-tight rounded-full dark:bg-blue-700 dark:text-blue-100">
				Response
				<i className="ml-1 fas fa-cloud-download-alt  text-gray-700	animate-bounce ease-out hover:scale-50" />
			</span>
		</button> 
		// <ExcelFile element={renderDownloadButton()}>
		// 	<ExcelSheet data={dataSet1} name="Employees">
		// 		<ExcelColumn label="Name" value="name"/>
		// 		<ExcelColumn label="Wallet Money" value="amount"/>
		// 		<ExcelColumn label="Gender" value="sex"/>
		// 		<ExcelColumn label="Marital Status"
		// 			value={(col) => col.is_married ? "Married" : "Single"}/>
		// 	</ExcelSheet>
		// 	<ExcelSheet data={dataSet2} name="Leaves">
		// 		<ExcelColumn label="Name" value="name"/>
		// 		<ExcelColumn label="Total Leaves" value="total"/>
		// 		<ExcelColumn label="Remaining Leaves" value="remaining"/>
		// 	</ExcelSheet>
		// </ExcelFile>
	);
}

export default ExportToExcel