import logo from './logo.svg';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {AuthProvider} from "./context/AuthContext";
import {Container} from "react-bootstrap";
import Header from './components/Header';
import Footer from './components/Footer';
import BookListScreen from './screens/BookListScreen';
import BookAddScreen from './screens/BookAddScreen';
import BookDetailScreen from './screens/BookDetailScreen';
import UserListScreen from './screens/UserListScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeScreen from "./screens/HomeScreen";
import UserEditScreen from "./screens/UserEditScreen";
import UserProfileScreen from "./screens/UserProfileScreen";

function App() {
    return (

        <Router>
            <AuthProvider>

                <Header/>


                <main>
                    <Container>
                        <Routes>
                            <Route path='/' element={<HomeScreen/>}/>
                            <Route path='/login' element={<LoginScreen/>}/>
                            <Route path='/register' element={<RegisterScreen/>}/>
                            <Route path="/profile" element={<UserProfileScreen/>}/>

                            <Route path="/users/">
                                <Route path='' element={<UserListScreen/>}/>
                                <Route path=":id/edit/" element={<UserEditScreen/>}/>
                            </Route>

                            <Route path="/books/">
                                <Route path='' element={<BookListScreen/>}/>
                                <Route path="add/" element={<BookAddScreen/>}/>
                                <Route path=':id/' element={<BookDetailScreen/>}/>
                                <Route path=":id/edit/" element={<BookAddScreen/>}/>
                            </Route>
                        </Routes>
                    </Container>
                </main>

                <Footer/>
            </AuthProvider>
        </Router>

    );
}

export default App;
