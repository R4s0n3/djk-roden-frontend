import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes

} from 'react-router-dom';
import './App.css';

import Auth from './user/pages/Auth';

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
import NewPlayer from './player/pages/NewPlayer';
import NewTrainer from './trainer/pages/NewTrainer';
import NewTraining from './training/pages/NewTraining';
import {useAuth} from './shared/hooks/auth-hook';
import Footer from './shared/components/UIElements/Footer';


function App() {
  const { token, login, logout, userId } = useAuth();
  const maintance = true;

  let routes;

  if (token) {
    routes = (
      <Routes>
        <Route path="/" element={<Home />} />
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
        <Route path="/" element={<Maintance />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Auth />} />
        <Route path="/dashboard/*" element={<Auth />} />
        <Route path="/*" element={<Maintance />} />
      </Routes>
    );
  }

  return (
    <AuthContext.Provider
    value={{ isLoggedIn: !!token,  token: token, userId: userId, login: login, logout: logout }}  >
    <div className="App">
  <BrowserRouter>
 <MainNavigation />
 {token && <AdminBar />}
  <main>{routes}</main>
  </BrowserRouter>
  <Footer />
    </div>
    </AuthContext.Provider>
  );
}

export default App;
