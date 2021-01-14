import React, {useState, useEffect} from 'react';
import { Button } from 'reactstrap';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom'

export default function SurveyResult() {
    let [mark, setMark] = useState(0);
    const history = useHistory();
    const { surveyId } = useParams();
    const survey = useSelector((globalStore) => 
        globalStore.surveys.find((s) => s.surveyId === surveyId)
    );
    const response = useSelector((globalStore) =>
        globalStore.responses.find((s) => s.surveyId === surveyId).answers  
    );

    const result = survey.answers;
    // console.log(response);
    
    useEffect(() => {
        survey.answers.map((q, qId) =>{
            response.find((a) => {
                let flag = true;
                if((a.qId === q.qId)){
                    for(let i=0; i<a.ans.length; i++){
                        if(a.ans[i] !== q.ans[i]){
                            flag = false;
                        }
                        if(a.ans[i].length > 0){
                            if(q.type === 'multiple'){
                                document.getElementsByName(qId)[i].checked = 'true';
                            }else{
                                // if(a.ans[i] === ''){
                                    document.getElementsByName(qId)[i].checked = 'true';
                                // }
                                // else{
                                //     document.getElementsByName(qId)[i].checked = 'true';
                                // }
                                // break;
                            }
                        }
                    }
                    if(flag){
                        document.getElementById(qId).style.backgroundColor = '#4caf5047';
                        mark++;
                        setMark(mark);
                    }else{
                        document.getElementById(qId).style.backgroundColor = '#ff000024';
                    }
                }
            })
        })
    },[]);

    const GotoHome=()=> {
        history.push('/');
    }
	return(
        <div className="all-question-container">
        <h4 style={{textAlign: 'center'}}>Survey Result {mark} / {survey.questions.length}</h4>
        {survey.questions.map((q, qId) => (
            <div className="survey-question-container" id={qId} key={qId}>
                <div className="question">{q.question}</div>
                {q.type ==='single' ? (
                    <div className="single"style={{margin: "10px"}}>
                        <div className="option1">
                            <input disabled name={qId} type="radio" className="option" value={q.options[0]}></input>
                            <label style={{marginLeft: "5px"}} htmlFor={qId}>{q.options[0]}</label>
                        </div>
                        <div className="option2">
                            <input disabled name={qId} type="radio" className="option" value={q.options[1]}></input>
                            <label style={{marginLeft: "5px"}} htmlFor={qId}>{q.options[1]}</label>
                        </div>
                    </div>
                ):(
                    <div className="multiple" >
                        <div className="option1">
                            <input disabled name={qId} type="checkbox" className="option1" value={q.options[0]}></input>
                            <label style={{marginLeft: "5px"}} htmlFor={qId}>{q.options[0]}</label>
                        </div>
                        <div className="option2">
                            <input disabled name={qId} type="checkbox" className="option2" value={q.options[1]}></input>
                            <label style={{marginLeft: "5px"}} htmlFor={qId}>{q.options[1]}</label>
                        </div>
                        <div className="option3">
                            <input disabled name={qId} type="checkbox" className="option3" value={q.options[2]}></input>
                            <label style={{marginLeft: "5px"}} htmlFor={qId}>{q.options[2]}</label>
                        </div>
                        <div className="option3">
                            <input disabled name={qId} type="checkbox" className="option4" value={q.options[3]}></input>
                            <label style={{marginLeft: "5px"}} htmlFor={qId}>{q.options[3]}</label>
                        </div>
                    </div> 
                )}
            </div>
        ))}
        <Button onClick={()=> GotoHome()} className="survey-main-btn">Home</Button>
        </div>
    );
}
