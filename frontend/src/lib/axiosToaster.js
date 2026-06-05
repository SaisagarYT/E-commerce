import axios from 'axios'
import toast from 'react-hot-toast'

const getMessage = (data) => data?.message || data?.error || data?.ERROR || data?.msg

axios.interceptors.response.use(
  (response) => {
    const method = response.config?.method?.toLowerCase()
    const message = getMessage(response.data)

    if (message && ['post', 'put', 'patch', 'delete'].includes(method)) {
      toast.success(message)
    }

    return response
  },
  (error) => {
    const responseMessage = getMessage(error.response?.data)
    const fallbackMessage = error.message || 'Request failed'
    toast.error(responseMessage || fallbackMessage)
    return Promise.reject(error)
  },
)