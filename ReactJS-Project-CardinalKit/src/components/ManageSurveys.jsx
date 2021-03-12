import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactTable from 'react-table-6';
import { getAllSurveys } from '../api/getAllUsers';
import Pagination from './Pagination';


const ManageSurveys = () => {

  const [totalSurveys, setTotalSurveys] = useState([]);


  useEffect(() => {
    getAllSurveys()
      .then((data) => setTotalSurveys([...data]))
  }, [])


  const columns = [
    {
      Header: () => (
        <div className="text-base font-bold text-center tracking-wide text-left text-gray-500 uppercase dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
          Name
        </div>
      ),
      accessor: 'name',
      className: 'font',
      width: 300,
      Cell: row => <div style={ { textAlign: 'center' } }>{ row.value }</div>,
    },
    {
      Header: () => (
        <div className="text-base font-bold text-center tracking-wide text-left text-gray-500 uppercase dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
          Description
        </div>
      ),
      accessor: 'description',
      className: 'font',
      width: 300,
      Cell: row => <div
        style={ { textAlign: 'center' } }>
        { row.value }</ div>,
    },
    {
      Header: () => (
        <div className="text-base font-bold text-center tracking-wide text-left text-gray-500 uppercase dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
          Created at
        </div>
      ),
      accessor: 'createdAt',
      className: 'font',
      width: 300,
      Cell: row => <div style={ { textAlign: 'center' } }>{ row.value }</div>,
    },
  ]

  return (
    <div>
      <div className="flex justify-between mx-24 my-10">
        <h1 className='text-2xl font-semibold'>Manage Surveys</h1>
        <Link
          className="btn bg-red-700 p-2 shadow-lg text-white"
          to='create_survey'
        >Create a Survey</Link>
      </div>
      <div className='mx-24'>
        <ReactTable
          data={ totalSurveys }
          columns={ columns }
          className="ReactTable"
          sortable={ true }
          defaultPageSize={ 5 }
          PaginationComponent={ Pagination }
        />
      </div>
    </div >
  )
}

export default ManageSurveys