import { useEffect, useState } from 'react'
import { Accordion } from 'react-bootstrap'
import DataTable from 'react-data-table-component'
import QuestionComp from './QuestionComp'

export default function Dataset(prop) {
  const [dataList, setDataList] = useState(prop.list)
  const [search, setSearch] = useState('')
  const [filteredDataList, setFilteredDataList] = useState(prop.list)
  // useEffect(async () => {
  //   setFilteredDataList(prop.list);
  //   setDataList(prop.list);
  // }, []);
  useEffect(() => {
    const result = dataList.filter((que) => {
      return que.question.toLowerCase().match(search.toLowerCase())
    })
    setFilteredDataList(result)
  }, [search])

  const column = [
    {
      // name: <h5>{prop.columnName}</h5>,
      width: '1200px',
      center: true,
      selector: (row) => <QuestionComp question={row}></QuestionComp>,

      sortable: true,
    },
  ]
  return (
    <div style={{ height: '80vh' }} className='overflow-auto container'>
      <DataTable
        columns={column}
        data={filteredDataList}
        pagination
        fixedHeader
        fixedHeaderScrollHeight='144vh'
        //selectableRows
        selectableRowsHighlight
        //highlightOnHover
        subHeader
        subHeaderComponent={
          <input
            className='form-control w-50'
            placeholder='Search Question Here....'
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
            }}
          />
        }
        //theme="dark"
        subHeaderAlign='right'
      />
    </div>
  )
}
