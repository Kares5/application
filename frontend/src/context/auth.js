import { useEffect , useContext , useState , createContext } from 'react';
import axios from 'axios';
const AuthContext = createContext()

const AuthProvider = ({children} ) => {
    const [auth , setAuth] = useState({existingUser : null , token : ''})
    // السطر يلي تحت بيتعرف بالكونتكست فقط ممنوع تستخدميه كل ما احتجتي اليوز اوث وبالتالي الهيدرز رح يتحدث بكل مرة بضغط على اللوغ ان او اللوغ اوت اما لو كتبتو بصفحة اللوغ ان رح يتحدث اول ما افتح الصفحة مو بس اضغط على اللوغ ان
    axios.defaults.headers.common["Authorization" ] = auth?.token
    useEffect ( () => {
            // data is equal localStorage so it is string 
        const data = localStorage.getItem('auth')
        if(data) {
             // parse from string to js so we can put it in state
            const parseData = JSON.parse(data)
             // after line bottom auth become js not string
            setAuth({...auth , existingUser : parseData.existingUser , token : parseData.token})
        }
    } , [])
    return (
        <AuthContext.Provider value={[auth , setAuth]}>
            {children}
        </AuthContext.Provider>
    )

}

// hooks
const useAuth = () => useContext(AuthContext)

export { useAuth , AuthProvider } 