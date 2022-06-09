import React,{useState,useEffect} from 'react';

import {
  BrowserRouter,
  Route,
  Routes,

} from 'react-router-dom';

import './App.css';

import { AuthContext } from './shared/context/auth-context';
import {useAuth} from './shared/hooks/auth-hook';
import {
  KBarProvider,
  KBarPortal,
  KBarPositioner,
  KBarAnimator,
  KBarSearch,
  useMatches,
  KBarResults,
} from "kbar";

import Auth from './user/pages/Auth';
import Button from './shared/components/FormElements/Button';
import Home from './user/pages/Home';
import Dashboard from './user/pages/Dashboard';
import AdminBar from './shared/components/Navigation/AdminBar';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import Footer from './shared/components/UIElements/Footer';
import Modal from './shared/components/UIElements/Modal'
import Cookies from 'universal-cookie';
import Datenschutz from './user/pages/Datenschutz';

import NewTeam from './team/pages/NewTeam';
import NewDate from './date/pages/NewDate';
import NewUser from './user/pages/NewUser';
import NewLead from './lead/pages/NewLead';
import NewSponsor from './sponsor/pages/NewSponsor';
import NewPost from './post/pages/NewPost';
import News from './post/pages/News';
import NewPlayer from './player/pages/NewPlayer';
import NewTrainer from './trainer/pages/NewTrainer';
import NewTraining from './training/pages/NewTraining';
import NewCategory from './category/pages/NewCategory';

import UpdatePlayer from './player/pages/UpdatePlayer';
import UpdateSponsor from './sponsor/pages/UpdateSponsor';
import UpdateCategory from './category/pages/UpdateCategory';
import UpdateLead from './lead/pages/UpdateLead';
import UpdateDate from './date/pages/UpdateDate';
import UpdateTraining from './training/pages/UpdateTraining';
import UpdateTrainer from './trainer/pages/UpdateTrainer';
import UpdateTeam from './team/pages/UpdateTeam';
import UpdatePost from './post/pages/UpdatePost';
import UpdateUser from './user/pages/UpdateUser';

import ForgotPassword from './user/pages/ForgotPassword';
import ResetPassword from './user/pages/ResetPassword';

import Maintance from './user/pages/Maintance';
import Post from './post/pages/Post';
import Page404 from './user/pages/Page404';
import Teams from './team/pages/Teams';
import Team from './team/pages/Team';
import Mannschaften from './team/pages/Mannschaften';
import Verein from './user/pages/Verein';
import History from './user/pages/History';
import Sponsors from './sponsor/pages/Sponsors';
import Kontakt from './user/pages/Kontakt';
import Impressum from './user/pages/Impressum';
import actions from './shared/util/actions';

function App() {
  const { token, reset, login, logout, userId } = useAuth();
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
        <Route path="/teams" element={<Mannschaften />} />
        <Route path="/mannschaften/aktive" element={<Teams filter="Aktive" />} />
        <Route path="/mannschaften/jugend" element={<Teams filter="Jugend" />} />
        <Route path="/mannschaften/aktive/:teamId" element={<Team />} />
        <Route path="/mannschaften/jugend/:teamId" element={<Team />} />
        <Route path="/posts/:postId" element={<Post />} />
        <Route path="/kontakt" element={<Kontakt />} />
        <Route path="/impressum" element={<Impressum />} />
        <Route path="/datenschutz" element={<Datenschutz />} />


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
        <Route path="/dashboard/categories" element={<NewCategory />} />


        <Route path="/dashboard/users/:userId" element={<UpdateUser />} />
        <Route path="/dashboard/posts/:postId" element={<UpdatePost />} />
        <Route path="/dashboard/players/:playerId" element={<UpdatePlayer />} />
        <Route path="/dashboard/trainers/:trainerId" element={<UpdateTrainer />} />
        <Route path="/dashboard/trainings/:trainingId" element={<UpdateTraining />} />
        <Route path="/dashboard/dates/:dateId" element={<UpdateDate />} />
        <Route path="/dashboard/leads/:leadId" element={<UpdateLead />} />
        <Route path="/dashboard/sponsors/:sponsorId" element={<UpdateSponsor />} />
        <Route path="/dashboard/categories/:categoryId" element={<UpdateCategory />} />
        <Route path="/dashboard/teams/:teamId" element={<UpdateTeam />} />
        <Route path="/auth/reset-password/:userId/:token" element={<ResetPassword />} />
        <Route path="/*" element={<Page404 />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth/reset-password/:userId/:token" element={<ResetPassword />} />

        <Route path="/news" element={<News />} />
        <Route path="/posts" element={<News />} />
        <Route path="/verein" element={<Verein />} />
        <Route path="/verein/history" element={<History />} />
        <Route path="/sponsoring" element={<Sponsors />} />
        <Route path="/kontakt" element={<Kontakt />} />
        <Route path="/impressum" element={<Impressum />} />
        <Route path="/datenschutz" element={<Datenschutz />} />

        <Route path="/mannschaften" element={<Mannschaften />} />
        <Route path="/teams" element={<Mannschaften />} />
        <Route path="/mannschaften/aktive" element={<Teams filter="Aktive" />} />
        <Route path="/mannschaften/jugend" element={<Teams filter="Jugend" />} />
        <Route path="/mannschaften/aktive/:teamId" element={<Team />} />
        <Route path="/mannschaften/jugend/:teamId" element={<Team />} />
        <Route path="/posts/:postId" element={<Post />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Auth />} />
        <Route path="/dashboard/*" element={<Auth />} />
        <Route path="/*" element={<Page404 />} />
      </Routes>
    );
  }

  if(!token && maintance){
    routes = (
      <Routes>
        <Route path="/" element={<Maintance />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/kontakt" element={<Kontakt />} />
        <Route path="/impressum" element={<Impressum />} />
        <Route path="/datenschutz" element={<Datenschutz />} />
        <Route path="/dashboard" element={<Auth />} />
        <Route path="/dashboard/*" element={<Auth />} />
        <Route path="/*" element={<Maintance />} />
      </Routes>
    );
  }

  return (
    <AuthContext.Provider
    value={{ isLoggedIn: !!token,  token: token, userId: userId, login: login, logout: logout, reset: reset }}  >
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
        <a href="https://www.djk-roden.de/datenschutz" target="_blank" rel="noreferrer" >Datenschutz-Richtlinien.</a>
        </p>
        </Modal>}
  <BrowserRouter>
  <MainNavigation />
  <AdminBar />
  <KBarProvider className="DJK-Bar" actions={actions}>
          <KBarPortal> 
            <KBarPositioner> 
              <KBarAnimator> 
                <KBarSearch /> 
                <RenderResults />;
              </KBarAnimator>
            </KBarPositioner>
          </KBarPortal>
          <main>{routes}</main>
        </KBarProvider>
 
   <Footer />

 
  </BrowserRouter>
    </div>
    </AuthContext.Provider>
  );
}

function RenderResults() {
  const { results } = useMatches();

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) =>
        typeof item === "string" ? (
          <div>{item}</div>
        ) : (
          <div
            style={{
              background: active ? "#eee" : "transparent",
            }}
          >
            {item.name}
          </div>
        )
      }
    />
  );
}
export default App;
