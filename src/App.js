import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import FeedbackList from './components/FeedbackList'
import FeedbackStats from './components/FeedbackStats'
import FeedbackForm from './components/FeedbackForm'
import { FeedbackProvider } from './context/FeedbackContext'
import About from './pages/About'
import AboutIcon from './components/AboutIcon'

function App() {
    return (
        <FeedbackProvider>
        <Router>
            <Header />
            <div className='container'>
            <Routes>
                <Route exact path='/' element={
                    <>
                        <FeedbackForm />
                        <FeedbackStats />
                        <FeedbackList />
                    </>
                }>
                </Route>

                <Route path='/about' element={<About />} />
            </Routes>
            <AboutIcon />
            </div>
        </Router>
        </FeedbackProvider>
    )
}

export default App