import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './pages/Home/Home'
import Questions from './pages/Questions/Questions';
import Navbar from './components/Navbar/Navbar'
import Game from './pages/Game/Game'
import QuestionDetails from './pages/QuestionDetails/QuestionDetails';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


const App = () => {
  return (
    <Router>
      <Navbar />
      <ToastContainer />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/questions' exact component={Questions} />
        <Route path='/question-details' exact component={QuestionDetails} />
        <Route path='/game' exact component={Game} />
        {/* <Route path='*' component={Page404} /> */}
      </Switch>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
