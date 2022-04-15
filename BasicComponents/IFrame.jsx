import React from 'react'

function IFrame() {
  return (
    <>
      <div>
        <div>
          <h1>FOR THEORY REFERENCE</h1>
          <div className='col d-flex '>
            <h3>JAVATPOINT</h3>
            <iframe
              src='https://www.javatpoint.com'
              width='550'
              height='450'
            ></iframe>
          </div>
          <div>
            <h3>W3SCHOOL</h3>
            <iframe
              src='https://www.w3schools.com'
              width='550'
              height='450'
            ></iframe>
          </div>
          <div>
            <h3>TUTORIAL-POINT</h3>
            <iframe
              src='https://www.tutorialspoint.com/index.htm'
              width='550'
              height='450'
            ></iframe>
          </div>
          <div>
            <h3>GEEKS-FOR-GEEKS</h3>
            <iframe
              src='https://www.geeksforgeeks.org'
              width='550'
              height='450'
            ></iframe>
          </div>
          <hr />
          <h1>For Coding Practise</h1>
          <div>
            <h3>LEETCODE</h3>
            <iframe
              src='https://leetcode.com'
              width='550'
              height='450'
            ></iframe>
          </div>
          <div>
            <h3>CODE-CHEIF</h3>
            <iframe
              src='https://www.codechef.com'
              width='550'
              height='450'
            ></iframe>
          </div>
          <div>
            <h3>HACKER-RANK</h3>
            <iframe src='www.hackerrank.com' width='550' height='450'></iframe>
          </div>
          <div>
            <h3>HACKER-EARTH</h3>
            <iframe
              src='https://www.hackerearth.com'
              width='550'
              height='450'
            ></iframe>
          </div>
        </div>
      </div>
    </>
  )
}

export default IFrame
