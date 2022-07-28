import {createContext, useState, useEffect} from "react";
import jwtDecode from "jwt-decode";
import {useNavigate} from "react-router-dom";

const AuthContext = createContext()

export default AuthContext;


export const AuthProvider = ({children}) => {


    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null)
    let [loading, setLoading] = useState(false)
    const navigate = useNavigate()


    let register = (userToRegister) => {
        console.log('registering')

        return fetch(`/api/users/register/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(userToRegister)
        })
            .then(response => response.json())

            .then((data) => {
                console.log(data)
                navigate('/login')
            })
            .catch((error) => {
                console.error('detail:', error);
            });

    }

    let login = async (e) => {
        e.preventDefault()

        await fetch(`/api/users/login/`, {
            method: "POST",
            'headers': {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({'username': e.target.username.value, 'password': e.target.password.value})
        })
            .then(response => {
                    console.log('response:', response);
                    return response.json()
                }
            )

            .then(data => {
                console.log('data:', data);
                setAuthTokens(data)
                setUser(jwtDecode(data.access))
                localStorage.setItem('authTokens', JSON.stringify(data))
                navigate('/')
            })
            .catch((error) => {
                console.error('detail:', error);
            });

    }

    let logout = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate('/login')
    }

    let updateToken = async () => {
        console.log('update token called')
        await fetch(`/api/users/token/refresh/`, {
            method: "POST",
            'headers': {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'refresh': authTokens?.refresh})
        })
            .then(response => response.json())
            .then(data => {
                setAuthTokens(data)
                setUser(jwtDecode(data.access))
                localStorage.setItem('authTokens', JSON.stringify(data))
                navigate('/')
            })
            .catch((error) => {
                console.error('detail:', error);
                logout()
            });

        if (loading) {
            setLoading(false)
        }
    }


    useEffect(() => {
        console.log('loading auth', loading, authTokens)
        // if(loading){
        //     updateToken()
        // }

        let interval = setInterval(() => {
            if (authTokens) {
                updateToken()
            }
        }, 1000 * 60 * 4)
        return () => clearInterval(interval)
    }, [authTokens, loading])

    let contextData = {
        loginUser: login,
        LogoutUser: logout,
        registerUser: register,
        authTokens: authTokens,
        user: user
    }


    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}