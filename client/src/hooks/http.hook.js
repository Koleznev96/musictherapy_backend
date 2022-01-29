import {useState, useCallback, useContext} from 'react';
import {httpServer} from '../const';
import {AuthContext} from "../context/authContext";

export const useHttp = () => {
  const auth = useContext(AuthContext);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
    setLoading(true)
    try {
      if (body) {
        body = JSON.stringify(body)
        headers['Content-Type'] = 'application/json'
      }

      const response = await fetch(httpServer + url, {method, body, headers})
      const data = await response.json()

      if (!response.ok && response.status === 401) {
        auth.logout();
      }

      if (!response.ok) {
        throw new Error(data.message || 'Что-то пошло не так')
      }

      setLoading(false)

      return data
    } catch (e) {
      setLoading(false)
      setError(e.message)
      throw e
    }
  }, [])

  const clearError = useCallback(() => setError(null), [])

  return { loading, request, error, clearError }
}
