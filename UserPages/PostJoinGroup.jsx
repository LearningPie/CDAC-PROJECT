import axios from 'axios'
import { useEffect, useState } from 'react'
import UserNav from './UserNav'
import Footer from '../BasicComponents/Footer'
import { Form, Row, Tabs } from 'react-bootstrap'
import { Tab } from 'bootstrap'
import ReuseableDataTable from '../GroupPages/ReuseableDataTable'
import ReuseableQuestionDataTable from '../GroupPages/ReuseableQuestionDataTable'
import { swal } from 'sweetalert2'
import ResourcesList from '../GroupPages/ResourcesList'

export default function PostJoinGroup() {
  useEffect(() => {
    document.title = 'PostJoinGroup'
    // if (sessionStorage.getItem("userSession") == null) {
    //   window.location = "/";
    // } else if (localStorage.getItem("user") == null) {
    //   window.location = "/";
    // }
  }, [])

  const [groupInfoArray, setGroupInfoArray] = useState([])
  const [questionsArray, setQuestionsArray] = useState([])
  const [usersArray, setUsersArray] = useState([])
  const [filesArray, setFilesArray] = useState([])

  let s = './Uploaded/Pdf/' + '6-Project Idea.png'

  let [que, setQue] = useState('')
  let [sub, setSub] = useState('')
  let userId = sessionStorage.getItem('userId')

  let Question = {
    question: que,
    subject: sub,
    user: { userId: userId },
  }

  let setQuestion = (e) => setQue(e.target.value)
  let setSubject = (e) => setSub(e.target.value)

  const submit = (Question) => {
    axios
      .post(
        `http://localhost:8080/postQuestionInGroup/${sessionStorage.getItem(
          'joingroupId'
        )}`,
        Question
      )
      .then(
        (response) => {
          console.log(response.data)
          swal.fire({
            icon: 'Success',
            title: 'Congratulations',
            text: 'Your question is posted',
          })

          window.location = '/user'
        },
        (error) => {
          console.log(error)
          swal.fire({
            icon: 'error',
            title: 'Oh no!',
            text: 'Server is down',
          })
        }
      )
  }

  let [eque, setEque] = useState('')

  const validate = () => {
    if (que.trim() === '' || sub.trim() === '') {
      swal.fire('All fields are required')
    } else if (que.search(/^[a-zA-Z?=. ]*$/) < 0) {
      document.getElementById('que').classList.add('is-invalid')
      setEque('Enter a valid question')
    } else {
      submit(Question)
    }
  }
  const getData = async () => {
    const response = await axios.get(
      `http://localhost:8080/getGroupInfo/${sessionStorage.getItem(
        'joingroupId'
      )}`
    )
    let validQuestions = []
    response.data[0].question.map((item) => {
      if (item.deleted == false) {
        validQuestions.push(item)
      }
    })
    let validUsers = []
    response.data[0].userList.map((item) => {
      if (item.deleted == false) {
        validUsers.push(item)
      }
    })
    let pdfArray = []
    response.data[0].file.map((item) => {
      let s = './Uploaded/Pdf/' + item.fileName
      pdfArray.unshift(s)
    })

    //setQuestionsArray(response.data[0].question);
    setUsersArray(validUsers)
    setQuestionsArray(validQuestions)
    setGroupInfoArray(response.data)
    setFilesArray(pdfArray)
    console.log(response.data)
    console.log(groupInfoArray[0].question)
    //setQuestionsArray(groupInfoArray[0].question);

    console.log(questionsArray)
  }
  useEffect(getData, [])
  return (
    <>
      <UserNav />

      <div className='container mt-5'>
        <Tabs
          defaultActiveKey='home'
          transition={false}
          id='noanim-tab-example'
          className='mb-3'
        >
          <Tab eventKey='home' title='Participants'>
            {usersArray.length > 0 ? (
              <ReuseableDataTable list={usersArray}></ReuseableDataTable>
            ) : (
              <h4 style={{ height: '80vh' }}>No Participants</h4>
            )}
            {console.log(groupInfoArray)}
          </Tab>
          <Tab eventKey='profile' title='View Questions'>
            {questionsArray.length > 0 ? (
              <ReuseableQuestionDataTable
                list={questionsArray}
              ></ReuseableQuestionDataTable>
            ) : (
              <h4 style={{ height: '80vh' }}>No Questions Found</h4>
            )}
          </Tab>
          <Tab eventKey='contact' title='Post Question'>
            <div>
              <Row
                className=' fluid-container'
                style={{ height: '100vh', width: '100%' }}
              >
                <div className='row justify-content-center'>
                  <div className='col-md-8   '>
                    <h4 className='alert alert-info '>
                      Post Your Question Here
                    </h4>
                    <Form onSubmit={validate}>
                      <Form.Group
                        className='mb-3 shadow'
                        controlId='exampleForm.ControlTextarea1'
                      >
                        <Form.Control
                          as='textarea'
                          id='que'
                          placeholder='Write your question here......'
                          rows={15}
                          value={que}
                          name='question'
                          onChange={setQuestion}
                        />
                        <div class='invalid-feedback fs-6 fw-bold'>{eque}</div>
                      </Form.Group>
                      <span>
                        <div className='d-flex justify-content-start mb-2'>
                          <select
                            id='sub'
                            class='form-select '
                            style={{ width: 200 }}
                            name='subject'
                            value={sub}
                            onChange={setSubject}
                            required
                          >
                            <option selected>Select Subject</option>
                            <option value='Java'>Java</option>
                            <option value='ADS'>ADS</option>
                            <option value='Reactjs'>Reactjs</option>
                            <option value='Database'>Database</option>
                            <option value='JS'>JavaScript</option>
                            <option value='Adv Java'>Java</option>
                            <option value='OS'>OS</option>
                            <option value='WPT'>WPT</option>
                            <option value='C++'>C++</option>
                            <option value='Dot Net'>Dot Net</option>
                            <option value='Python'>Python</option>
                            <option value='Swift'>Swift</option>
                          </select>
                          <div class='invalid-feedback fs-6 fw-bold'>{}</div>
                        </div>
                      </span>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <span>
                        <button className='btn btn-success'>SUBMIT</button>
                      </span>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <span>
                        <button className='btn btn-danger'>CANCEL</button>
                      </span>
                    </Form>
                  </div>
                </div>
              </Row>
            </div>
          </Tab>
          <Tab
            eventKey='resources'
            title='Resources'
            // style={{ height: "80vh" }}
          >
            <div className='overflow-auto' style={{ height: '160vh' }}>
              {filesArray.length > 0 ? (
                <ResourcesList list={filesArray}></ResourcesList>
              ) : (
                <h4>No Resources</h4>
              )}
            </div>
          </Tab>
          {/* <Tab eventKey="links" title="Links"></Tab> */}
        </Tabs>
      </div>

      <Footer />
    </>
  )
}
