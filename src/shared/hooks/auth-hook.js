import { useState, useCallback, useEffect} from 'react';

let logoutTimer;


export const useAuth = () =>{
    const [token, setToken] = useState(false);
    const [tokenExpirationDate, setTokenExpirationDate] = useState();
    const [userId, setUserId] = useState(false);
    
    const login = useCallback((uid, token, expirationDate) => {
      setToken(token);

      const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 10000 * 60 * 60);
      setTokenExpirationDate(tokenExpirationDate);
      localStorage.setItem('userData', JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpirationDate.toISOString()
      }))
      setUserId(uid);

    }, []);
    
    const logout = useCallback(() => {
      setToken(null);
      setTokenExpirationDate(null);
      setUserId(null);
      localStorage.removeItem('userData');
    }, []);

    const reset = useCallback((uid, token, expirationDate) => {
      setToken(token);
      const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 15000 * 60);
      setTokenExpirationDate(tokenExpirationDate);
      localStorage.setItem('userData', JSON.stringify({
        userId:uid,
        token:token,
        expiration:tokenExpirationDate.toISOString()
      }))
      setUserId(uid);

    },[])

    useEffect(()=>{
      if(token && tokenExpirationDate){
        const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
        logoutTimer = setTimeout(logout, remainingTime);
      }else{
        clearTimeout(logoutTimer);
      }
    
    },[token, logout, tokenExpirationDate]);
    
    useEffect(()=>{
      const storedData = JSON.parse(localStorage.getItem('userData'));
      if(storedData && storedData.token && new Date(storedData.expiration) > new Date()
      ){
        login(storedData.userId, storedData.token);
      }
     },[login]);

     
    
     return{ token, login, reset, logout, userId};
}



