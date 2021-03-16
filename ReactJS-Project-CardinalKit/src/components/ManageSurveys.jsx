import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactTable from 'react-table-6';
import { getAllSurveys } from '../api/getAllUsers';
import Pagination from './Pagination';

const ManageSurveys = () => {
  const [totalSurveys, setTotalSurveys] = useState([]);

  useEffect(() => {
    getAllSurveys().then(data => setTotalSurveys([...data]));
  }, []);

  const renderSortIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="h-5 w-5 ml-1"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
      />
    </svg>
  );

  const columns = [
    {
      Header: () => (
        <div className="flex justify-center text-base font-bold text-center tracking-wide text-left text-gray-500 uppercase dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
          <>Name</>
          {renderSortIcon()}
        </div>
      ),
      accessor: 'name',
      className: 'font',
      width: 300,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },
    {
      Header: () => (
        <div className="flex justify-center text-base font-bold text-center tracking-wide text-left text-gray-500 uppercase dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
          <>Description</>
          {renderSortIcon()}
        </div>
      ),
      accessor: 'description',
      className: 'font',
      width: 300,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },
    {
      Header: () => (
        <div className="flex justify-center text-base font-bold text-center tracking-wide text-left text-gray-500 uppercase dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
          <>Created At</>
          {renderSortIcon()}
        </div>
      ),
      accessor: 'createdAt',
      className: 'font',
      width: 300,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },
  ];

  return (
    <div>
      <div className="flex justify-between mx-24 my-10">
        <div>
          <h1 className="text-2xl font-semibold">Manage Surveys</h1>
          <div className="h-1 mt-1 bg-red-700 w-3/5" />
        </div>
        <Link className="btn bg-red-700 p-2 shadow-lg text-white" to="create_survey">
          Create a Survey
        </Link>
      </div>
      <div className="mx-24">
        <ReactTable
          data={totalSurveys}
          columns={columns}
          className="ReactTable"
          sortable={true}
          defaultPageSize={5}
          PaginationComponent={Pagination}
        />
      </div>
    </div>
  );
};

export default ManageSurveys;
