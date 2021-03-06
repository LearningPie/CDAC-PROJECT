import Faqpage from '../Images/Faqpage.png'
import homepage from '../Images/homepage.png'
import { Card } from 'react-bootstrap'
import { Nav } from 'react-bootstrap'
import { Button } from 'react-bootstrap'

export default function Answer(answers) {
  let a = [Faqpage, homepage]
  return (
    <Card>
      <Card.Header>
        <Nav variant='tabs' defaultActiveKey='#first'>
          <Nav.Item>
            <Nav.Link href='#first'>Active</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href='#link'>Link</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href='#disabled' disabled>
              Disabled
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Card.Header>
      <Card.Body>
        <Card.Title>Special title treatment</Card.Title>
        <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text>
        <Button variant='primary'>Go somewhere</Button>
      </Card.Body>
    </Card>
  )
}
