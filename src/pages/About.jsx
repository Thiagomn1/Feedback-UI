import Card from '../components/shared/Card'
import { Link } from 'react-router-dom'
import Button from '../components/shared/Button'

function About() {
    return (
        <Card>
            <div className="about">
                <h1>About this App</h1>
                <p>This is a Feedback UI Application developed using React.</p>
                <p>Version: 1.0.0</p>

                <Button version='secondary'>
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Back to Home</Link>
                </Button>
            </div>
        </Card>
    )
}

export default About
