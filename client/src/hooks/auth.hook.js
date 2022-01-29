import {useState, useCallback, useEffect} from 'react';

const storageName = 'userData';

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState(null);

  const newEmail = useCallback((email) => {
    setEmail(email);

    localStorage.setItem('email', JSON.stringify(email));
  }, []);

  const login = useCallback((jwtToken, email) => {
    setToken(jwtToken);
    setEmail(email);

    localStorage.setItem(storageName, JSON.stringify({
      token: jwtToken
    }));
    localStorage.setItem('email', JSON.stringify(email));
  }, []);

  const logout = useCallback(()=> {
    setToken(null);

    localStorage.removeItem(storageName);
  }, []);

  useEffect( () => {
    const data = JSON.parse(localStorage.getItem(storageName));
    const email = JSON.parse(localStorage.getItem('email'));

    if (data && data.token && email) {
      login(data.token, email);
    }
    setReady(true);
  }, [login]);


  return { login, logout, token, ready, email, newEmail };
}
