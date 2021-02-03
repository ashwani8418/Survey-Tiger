import logo from './logo.png';
import './App.css';
import { Button } from 'reactstrap';
import { Switch, Route, Link, useHistory } from 'react-router-dom';
import CreateSurvey from './components/create-survey';
import { createSurvey } from './store/surveySlice';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import TakeSurvey from './components/take-survey'
import ConfirmSurvey from './components/confirm-survey'
import Survey from './components/survey'
import SurveyResult from './components/survey-result';
function App() {
	const dispatch = useDispatch();
	const history = useHistory();

	const redirectToNewSurvey = () => {
		dispatch(createSurvey()).then(unwrapResult).then((newSurveyId) => history.push('/create/' + newSurveyId));
	};


	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
			</header>
			<Switch>
				<Route path="/create/:surveyId">
					<CreateSurvey />
				</Route>
				<Route path="/confirm/:surveyId">
					<ConfirmSurvey />
				</Route>
				<Route path="/take-survey/:surveyId">
					<Survey />
				</Route>
				<Route path="/survey-result/:surveyId">
					<SurveyResult />
				</Route>
				<Route path="/take"><TakeSurvey /></Route>
				<Route path="/">
					<Button onClick={redirectToNewSurvey} className="survey-main-btn">
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
