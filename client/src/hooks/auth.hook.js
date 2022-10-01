import {useState, useCallback, useEffect} from 'react';
import {useHttp} from "./http.hook";

const storageName = 'userData';

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState(null);
  const [type_admin, set_type_admin] = useState(null);
  const [name, set_name] = useState(null);
  const [language, setLanguage] = useState(null);
  const [translations, setTranslations] = useState(null);
  const {loading, request, error, clearError} = useHttp();

  const newEmail = useCallback((email) => {
    setEmail(email);

    localStorage.setItem('email', JSON.stringify(email));
  }, []);

  const login = useCallback((jwtToken, email, type_admin, name) => {
    console.log('55555-', jwtToken, email, type_admin, name)
    setToken(jwtToken);
    setEmail(email);
    set_type_admin(type_admin);
    set_name(name);
    console.log('666666666')

    localStorage.setItem(storageName, JSON.stringify({
      token: jwtToken
    }));
    console.log('7777777')
    localStorage.setItem('email', JSON.stringify(email));
    localStorage.setItem('type_admin', JSON.stringify(type_admin));
    localStorage.setItem('name', JSON.stringify(name));
    console.log('888888')
  }, []);

  const logout = useCallback(()=> {
    console.log('logout!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    setToken(null);
    setEmail(null);
    set_type_admin(null);

    localStorage.removeItem(storageName);
  }, []);

  const getTranslations = async (language_) => {
    console.log('trans-111111-', language_);
    try {
      console.log('trans-22222-token-', token);
      const data = await request(`/api/admin_panel/translation/${language_}`, 'GET', null, {
        Authorization: `${token}`
      });
      console.log('trans-333333-', data);
      setTranslations(data);
    } catch (e) {}
  }

  const newLanguage = async (language_) => {
    setLanguage(language_);
    await localStorage.setItem("language", language_);
    await getTranslations(language_);
  }

  useEffect( () => {
    const data = JSON.parse(localStorage.getItem(storageName));
    const email = JSON.parse(localStorage.getItem('email'));
    const type_admin = JSON.parse(localStorage.getItem('type_admin'));
    const name = JSON.parse(localStorage.getItem('name'));
    const language_ = localStorage.getItem("language");
    newLanguage(language_ ? language_ : 'ru');

    if (data && data.token && email && type_admin && name) {
      login(data.token, email, type_admin, name);
    }
    setReady(true);
  }, [login]);


  return { login, logout, token, ready, email, newEmail, type_admin, name, language, newLanguage, translations };
}
