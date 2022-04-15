import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import Usernav from '../UserPages/UserNav'
import GroupAdminViewQuestions from './GroupAdminViewQuestions'
import GroupAdminViewMembers from './GroupAdminViewMembers'
import UploadPdf from './UploadPdf'
import Footer from '../BasicComponents/Footer'
import cryptoJs from 'crypto-js'

export default function GroupAdminHome() {
  // const [joingroupId, setjoingroupId] = useState();
  useEffect(() => {
    document.title = 'GroupAdminHome'
    if (sessionStorage.getItem('user') == null) {
      window.location = '/'
    } else if (sessionStorage.getItem('joingroupId') == null) {
      window.location = '/'
    } else {
      const encryptedName = sessionStorage.getItem('joingroupId')
      let joingroupId = doDecryption(encryptedName)
      getData(joingroupId)
    }
  }, [])

  function doDecryption(encryptedData) {
    let decryptedName = cryptoJs.AES.decrypt(encryptedData, 'my-key')
    return JSON.parse(decryptedName.toString(cryptoJs.enc.Utf8))
  }

  const [groupInfoArray, setGroupInfoArray] = useState([])
  const [questionsArray, setQuestionsArray] = useState([])
  const [usersArray, setUsersArray] = useState([])

  const getData = async (joingroupId) => {
    const response = await axios.get(
      `http://localhost:8080/getGroupInfo/${joingroupId}`
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
    // setQuestionsArray(response.data[0].question);
    setUsersArray(validUsers)
    setQuestionsArray(validQuestions)
    setGroupInfoArray(response.data)
    console.log(response.data)
    console.log(groupInfoArray[0].question)
    // setQuestionsArray(groupInfoArray[0].question);

    console.log(questionsArray)
  }

  return (
    <>
      <div
        style={{
          backgroundImage:
            'url(https://wallpapercave.com/wp/KHh6AWE.jpg/654967.png)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <Usernav />

        <div className='container'>
          <Tabs
            defaultActiveKey='home'
            transition={false}
            id='noanim-tab-example'
            className='mb-3'
          >
            <Tab eventKey='home' title='View Members'>
              {usersArray.length > 0 ? (
                <GroupAdminViewMembers
                  list={usersArray}
                ></GroupAdminViewMembers>
              ) : (
                <h4 style={{ height: '80vh' }}>No Members</h4>
              )}
            </Tab>
            <Tab eventKey='profile' title='View Questions'>
              {/* {console.log(questionsArray)} */}
              {questionsArray.length > 0 ? (
                <GroupAdminViewQuestions
                  list={questionsArray}
                ></GroupAdminViewQuestions>
              ) : (
                <h4 style={{ height: '80vh' }}>No Questions</h4>
              )}
            </Tab>
            <Tab eventKey='contact' title='Upload Resources'>
              <div
                className='row justify-content-center align-items-center'
                style={{ height: '80vh' }}
              >
                <div className='col-md-4'>
                  <UploadPdf></UploadPdf>
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
      <Footer />
    </>
  )
}
