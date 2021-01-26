import tiger from './tiger.png';
import './App.css';
import { Button } from "reactstrap";
import {Switch,Route,Link, useHistory} from "react-router-dom";

import CreateSurvey from './components/create-survey';
import TakeSurvey from './components/take-survey';
import ConfirmSurvey from "./components/confirm-survey";
import {useDispatch} from 'react-redux';
import { store } from "./store/global-store";
import {surveySlice,createSurvey} from './store/SurveySlice';
import {unwrapResult} from '@reduxjs/toolkit'

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  
  const redirctToNewSurvey = () => {
    dispatch(createSurvey()).then(unwrapResult).then(newSurveyId => history.push('/create' + newSurveyId));
   // history.pushState('/create' + newSurveyId);
  }
  

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/create/:surveyId">
          <CreateSurvey />
        </Route>
        <Route path="/confirm/:surveyId">
          <ConfirmSurvey />
        </Route>
        <Route path="/take">
          <TakeSurvey />
        </Route>
        <Route path="/">
          <Button className="survey-main-btn" onClick={redirectToNewSurvey}>
            Create Survey
          </Button>
          <Link to="/take">
            <Button className="survey-main-btn">Take Survey</Button>
          </Link>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
