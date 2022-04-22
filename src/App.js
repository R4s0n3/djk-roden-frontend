import React,{useState,useEffect} from 'react';
import {
  BrowserRouter,
  Route,
  Routes,

} from 'react-router-dom';
import './App.css';

import Auth from './user/pages/Auth';
import Button from './shared/components/FormElements/Button';
import Home from './user/pages/Home';
import Dashboard from './user/pages/Dashboard';
import AdminBar from './shared/components/Navigation/AdminBar';
import Page404 from './user/pages/Page404';
import NewTeam from './team/pages/NewTeam';
import NewDate from './date/pages/NewDate';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import { AuthContext } from './shared/context/auth-context';
import NewUser from './user/pages/NewUser';
import Maintance from './user/pages/Maintance';
import NewLead from './lead/pages/NewLead';
import NewSponsor from './sponsor/pages/NewSponsor';
import NewPost from './post/pages/NewPost';
import News from './post/pages/News';
import NewPlayer from './player/pages/NewPlayer';
import NewTrainer from './trainer/pages/NewTrainer';
import NewTraining from './training/pages/NewTraining';
import {useAuth} from './shared/hooks/auth-hook';
import Footer from './shared/components/UIElements/Footer';
import Post from './post/pages/Post';
import Teams from './team/pages/Teams';
import Team from './team/pages/Team';
import Mannschaften from './team/pages/Mannschaften';
import Verein from './user/pages/Verein';
import History from './user/pages/History';
import Sponsors from './sponsor/pages/Sponsors';
import Modal from './shared/components/UIElements/Modal'
import Cookies from 'universal-cookie';
import Kontakt from './user/pages/Kontakt';


function App() {
  const { token, login, logout, userId } = useAuth();
  const [isCookies, setIsCookies] = useState();

 
  const acceptCookies = () => {
    const cookies = new Cookies();
    cookies.set('DJK-Roden', {accept: true}, { path: '/' });
    setIsCookies(true);
  }

useEffect(()=>{
  const getCookies = () => {
    const cookies = new Cookies();
    let myCookies = cookies.get('DJK-Roden');
    if(!myCookies){
      setIsCookies(false)
    }else{
      setIsCookies(true)
    }
    

  }

  getCookies()
},[])

  let routes;
  let maintance = false;

  if(maintance && !token){
    routes = (
      <Routes>
        <Route path="/" element={<Maintance />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Auth />} />
        <Route path="/dashboard/*" element={<Auth />} />
        <Route path="/*" element={<Maintance />} />
      </Routes>
    );
  }

  if (token) {
    routes = (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/posts" element={<News />} />
        <Route path="/verein" element={<Verein />} />
        <Route path="/verein/history" element={<History />} />
        <Route path="/sponsoring" element={<Sponsors />} />
        <Route path="/mannschaften" element={<Mannschaften />} />
        <Route path="/mannschaften/aktive" element={<Teams filter="Aktive" />} />
        <Route path="/mannschaften/jugend" element={<Teams filter="Jugend" />} />
        <Route path="/mannschaften/aktive/:teamId" element={<Team />} />
        <Route path="/mannschaften/jugend/:teamId" element={<Team />} />
        <Route path="/posts/:postId" element={<Post />} />
        <Route path="/kontakt" element={<Kontakt />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/users" element={<NewUser />} />
        <Route path="/dashboard/posts" element={<NewPost />} />
        <Route path="/dashboard/teams" element={<NewTeam />} />
        <Route path="/dashboard/players" element={<NewPlayer />} />
        <Route path="/dashboard/trainers" element={<NewTrainer />} />
        <Route path="/dashboard/trainings" element={<NewTraining />} />
        <Route path="/dashboard/dates" element={<NewDate />} />
        <Route path="/dashboard/leads" element={<NewLead />} />
        <Route path="/dashboard/sponsors" element={<NewSponsor />} />
        <Route path="/*" element={<Page404 />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/posts" element={<News />} />
        <Route path="/verein" element={<Verein />} />
        <Route path="/verein/history" element={<History />} />
        <Route path="/sponsoring" element={<Sponsors />} />
        <Route path="/kontakt" element={<Kontakt />} />
        <Route path="/mannschaften" element={<Mannschaften />} />
        <Route path="/mannschaften/aktive" element={<Teams filter="Aktive" />} />
        <Route path="/mannschaften/jugend" element={<Teams filter="Jugend" />} />
        <Route path="/mannschaften/aktive/:teamId" element={<Team />} />
        <Route path="/mannschaften/jugend/:teamId" element={<Team />} />
        <Route path="/posts/:postId" element={<Post />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Auth />} />
        <Route path="/dashboard/*" element={<Auth />} />
        <Route path="/*" element={<Page404 />} />
      </Routes>
    );
  }

  return (
    <AuthContext.Provider
    value={{ isLoggedIn: !!token,  token: token, userId: userId, login: login, logout: logout }}  >
    <div className="App">
   {!token && <Modal
      show={!isCookies}
            header="Verwendung von Cookies"
            
            footerClass="cookies__modal-actions"
            footer={
                <React.Fragment>
                    <Button inverse onClick={acceptCookies}>Nur erforderliche erlauben</Button>
                    <Button onClick={acceptCookies}>Cookies erlauben</Button>
                </React.Fragment>
            }
        >   
        
        <p>
        Unsere Website verwendet Cookies und ähnliche Technologien.
        Wenn Sie auf der Seite weitersurfen, erklären Sie sich mit der 
        Verwendung von Cookies einverstanden.
        Mehr über die Verwendung von Cookies erfahren Sie in unseren
        <a href="/datenschutz"> Datenschutz-Richtlinien.</a>
        </p>
        </Modal>}
  <BrowserRouter>
  <MainNavigation />
  <AdminBar />
 <main>{routes}</main>
  </BrowserRouter>
   <Footer />
    </div>
    </AuthContext.Provider>
  );
}

export default App;
