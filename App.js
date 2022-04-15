import './App.css'
import { Route, Routes } from 'react-router-dom'
import Register from './components/BasicComponents/Register'
import Login from './components/BasicComponents/Login'
import Frontpage from './components/BasicComponents/Frontpage'
import FAQ from './components/BasicComponents/FAQ'
import AboutUs from './components/BasicComponents/About Us'
import UserHome from './components/UserPages/UserHome'
import AdminHome from './components/AdminPages/AdminHome'
import UserProfile from './components/UserPages/UserProfile'
import PostAnswer from './components/UserPages/PostAnswer'
import CreateGroup from './components/GroupPages/CreateGroup'
import Datatable from './components/UserPages/Datatable'
import QuestionBank from './components/UserPages/QuestionBank'
import ViewGroup from './components/UserPages/ViewGroup'
import PostJoinGroup from './components/GroupPages/PostJoinGroup'
import Forgot from './components/BasicComponents/Forgot'

import ViewAnswerInGroup from './components/GroupPages/ViewAnswerInGroup'
import UserList from './components/AdminPages/UserList'
import AdminViewQuestions from './components/AdminPages/AdminViewQuestions'
import AdminProfile from './components/AdminPages/AdminProfile'
import AdminUpdateProfile from './components/AdminPages/AdminUpdateProfile'
import GroupAdminHome from './components/GroupPages/GroupAdminHome'
import GroupAdminViewQuestions from './components/GroupPages/GroupAdminViewQuestions'
import AskQuestion from './components/UserPages/AskQuestion'
import PostQuestion from './components/UserPages/PostQuestion'
import UpdateProfile from './components/UserPages/UpdateProfile'
import QuestionList from './components/UserPages/QuestionList'
import Dashboard from './components/UserPages/Dashboard'
import JoinGroup from './components/UserPages/JoinGroup'
import PostAnswerInGroup from './components/GroupPages/PostAnswerInGroup'
import UserJoinedGroupsList from './components/UserPages/UserJoinedGroupList'

function App() {
  return (
    <>
      <Routes>
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/register' element={<Register />} />
        <Route path='/' element={<Frontpage />} />
        <Route path='/FAQ' element={<FAQ />} />
        <Route path='/aboutUs' element={<AboutUs />} />
        <Route path='/forgotPassword' element={<Forgot />} />
      </Routes>

      {/* User routes */}
      <Routes>
        <Route path='/user' element={<UserHome />} />
        <Route path='/viewQuestion' element={<AskQuestion />} />
        <Route path='/postQuestion' element={<PostQuestion />} />
        <Route path='/userProfile' element={<UserProfile />} />
        <Route path='/updateProfile' element={<UpdateProfile />} />
        <Route path='/postAnswer' element={<PostAnswer />} />
        <Route path='/questionList' element={<QuestionList />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/joinGroup' element={<JoinGroup />} />
        <Route path='/createGroup' element={<CreateGroup />} />
        <Route path='/dataTable' element={<Datatable />} />
        <Route path='/questionBank' element={<QuestionBank />} />
        <Route path='/viewGroup' element={<ViewGroup />} />
      </Routes>

      {/* Admin routes */}
      <Routes>
        <Route path='/admin' element={<AdminHome />} />
        <Route path='/userList' element={<UserList />} />
        <Route path='/adminViewQuestion' element={<AdminViewQuestions />} />
        <Route path='/adminProfile' element={<AdminProfile />} />
        <Route path='/adminUpdateProfile' element={<AdminUpdateProfile />} />
      </Routes>

      {/* Group Admin routes */}
      <Routes>
        <Route path='/adminHome' element={<GroupAdminHome />} />
        <Route
          path='/groupAdminViewQuestions'
          element={<GroupAdminViewQuestions />}
        />
        <Route path='/postJoinGroup' element={<PostJoinGroup />} />
        <Route path='/postAnswerInGroup' element={<PostAnswerInGroup />} />
        <Route path='/viewAnswer' element={<ViewAnswerInGroup />} />
        <Route path='/userJoinedGroupList' element={<UserJoinedGroupsList />} />
      </Routes>
    </>
  )
}

export default App
