import { motion, AnimatePresence } from 'framer-motion'
import PropTypes from 'prop-types'
import FeedbackItem from './FeedbackItem'

function FeedbackList({ feedback, deleteFeedback }) {

    if(!feedback || feedback.length === 0){
        return <p>No Feedbacks Posted</p>        
    }

    return (
        <div className="feedback-list">
            <AnimatePresence>
            {feedback.map(item => (
                <motion.div key={item.id} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
                    <FeedbackItem key={item.id} item={item} deleteFeedback={deleteFeedback} />
                </motion.div>
            ))}
            </AnimatePresence>
        </div>
    )
}

FeedbackList.propTypes = {
    feedback: PropTypes.array.isRequired
}

export default FeedbackList;