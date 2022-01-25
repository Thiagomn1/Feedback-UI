import { useState, useContext, useEffect } from 'react'
import Card from './shared/Card'
import Button from './shared/Button'
import RatingSelect from './RatingSelect'
import FeedbackContext from '../context/FeedbackContext'

function FeedbackForm() {

    const {addFeedback, UpdateFeedback, updateFeedbackItem} = useContext(FeedbackContext)

    const [text, setText] = useState('')
    const [btnDisabled, setBtnDisabled] = useState(true)
    const [message, setMessage] = useState('')
    const [rating, setRating] = useState(10)

    useEffect(() => {
        if(UpdateFeedback.edit === true) {
            setBtnDisabled(false)
            setText(UpdateFeedback.item.text)
            setRating(UpdateFeedback.item.rating)
        }
    }, [UpdateFeedback])

    const handleText = event => {
        if(text === '') {
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
        if(text.trim().length > 10) {
            const newFeedback = {
                text,
                rating
            }

        if(UpdateFeedback.edit === true) {
            updateFeedbackItem(UpdateFeedback.item.id, newFeedback)
        }
        else {
            addFeedback(newFeedback)
        }
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
