import React from 'react';
import { Button } from 'reactstrap';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'

export default function TakeSurvey() {
    const history = useHistory();
    const surveyIDs = useSelector((globalStore) => 
        globalStore.surveys.filter(s => s.isPublished).map((s) => s.surveyId)
    );

    const GotoSurvey=(surveyId)=> {
        history.push("/take-survey/"+surveyId);
    }
	return(
        <>
            {surveyIDs.map((surveyId) => (
                <Button onClick={()=> GotoSurvey(surveyId)} key={surveyId} className="survey-main-btn">Take Survey {surveyId}</Button>
            ))}
        </>
    );
}
