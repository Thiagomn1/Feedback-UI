import {useState} from 'react'
import Card from './shared/Card'
import Button from './shared/Button'
import RatingSelect from './RatingSelect'

function FeedbackForm({ handleAddFeedback }) {

    const [text, setText] = useState('')
    const [btnDisabled, setBtnDisabled] = useState(true)
    const [message, setMessage] = useState('')
    const [rating, setRating] = useState(10)

    const handleText = event => {
        if(text === ''){
            setBtnDisabled(true)
            setMessage(null)
        } 
        else if(text !== '' && text.trim().length <= 10) {
            setBtnDisabled(true)
            setMessage('Message must be at least 10 characters long')
        }
        else {
            setMessage(null)
            setBtnDisabled(false)
            
        }

        setText(event.target.value)
    }

    const handleSubmit = event => {
        event.preventDefault()
        if(text.trim().length > 10){
            const newFeedback = {
                text,
                rating
            }

            handleAddFeedback(newFeedback)
            setText('')
        }
    }

    return (
        <Card>
            <form onSubmit={handleSubmit}>
                <h2>How would you rate your experience?</h2>
                <RatingSelect select={rating => setRating(rating)} />
                <div className="input-group">
                    <input onChange={handleText} type="text" placeholder="Write a review" value={text} />
                    <Button type="submit" isDisabled={btnDisabled}>Send</Button>
                </div>

                {message && <div className='message'>{message}</div>}
            </form>
        </Card>
    )
}

export default FeedbackForm
