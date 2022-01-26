import { createContext, useState, useEffect } from 'react'

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
    const [loading, setLoading] = useState(true)
    const [feedback, setFeedback] = useState([])
    const [UpdateFeedback, setUpdateFeedback] = useState({
      item: {},
      edit: false
    })

    useEffect(() => {
      fetchFeedback()
    }, [])

    // Fetch feedback data
    const fetchFeedback = async () => {
      const response = await fetch('/feedback?_sort=id&_order=desc')
      const data = await response.json()

      setFeedback(data)
      setLoading(false)
    }

    const addFeedback = async newFeedback => {
        const response = await fetch('/feedback', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(newFeedback)})

        const data = await response.json()

        setFeedback([data, ...feedback])
    }

    const deleteFeedback = async (id) => {
        if(window.confirm('Are you sure you want to delete?')){
            await fetch(`feedback/${id}`, {method: 'DELETE'})
            setFeedback(feedback.filter(item => item.id !== id))
        }
    }

    const editFeedback = item => {
      setUpdateFeedback({
        item,
        edit: true
      })
    }

    const updateFeedbackItem = async (id, newItem) => {
      const response = await fetch(`feedback/${id}`, {method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(newItem)})
      const data = await response.json()
      setFeedback(feedback.map(item => item.id === id ? {...item, ...data} : item))
    }

    return <FeedbackContext.Provider value={{loading, feedback, deleteFeedback, addFeedback, editFeedback, UpdateFeedback, updateFeedbackItem}}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext