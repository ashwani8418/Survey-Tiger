import React,{useState, useEffect} from 'react';
import { Button } from 'reactstrap';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom'
import { responseSlice } from '../store/responseSlice';
import { useDispatch } from 'react-redux';
import '../index.css'

export default function Survey() {
    const [answers] = useState([]);
    const { surveyId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const survey = useSelector((globalStore) => 
        globalStore.surveys.find((s) => s.surveyId === surveyId)
    );
    const SubmitSurvey=()=> {
        dispatch(responseSlice.actions.userAnswer({answers, surveyId}))
        history.push("/survey-result/"+surveyId);
    };


    const saveAnswer=(e, qId, type)=> {
        // console.log("input value ",e.target.value);
        let currOption = answers.find((a) => a.qId === String(qId))
        if(type === 'multiple'){
            currOption.type = 'multiple';
            if(e.target.checked){
                if(e.target.className === 'option1'){
                    currOption.ans[0] = e.target.value;
                }else if(e.target.className === 'option2'){
                    currOption.ans[1] = e.target.value;
                }
                else if(e.target.className === 'option3'){
                    currOption.ans[2] = e.target.value;
                }
                else if(e.target.className === 'option4'){
                    currOption.ans[3] = e.target.value;
                }
            }else{
                if(e.target.className === 'option1'){
                    currOption.ans[0] = ''
                }else if(e.target.className === 'option2'){
                    currOption.ans[1] = ''
                }
                else if(e.target.className === 'option3'){
                    currOption.ans[2] = ''
                }
                else if(e.target.className === 'option4'){
                    currOption.ans[3] = ''
                }
            }
        }else {
            currOption.type = 'single';
            if(e.target.className === 'option1'){
                currOption.ans[0] = e.target.value;
                currOption.ans[1] = '';
            }else if(e.target.className === 'option2'){
                currOption.ans[0] = '';
                currOption.ans[1] = e.target.value;
            }
        }
        // console.log("Save option ",currOption);
    }

    useEffect(() => {
        // console.log(survey.questions);
        survey.questions.map((q, qId)=> {
            let arr = {
                qId: q.qId,
                type: '',
                ans: ['','','','']
            }
            answers.push(arr);
        })
        // console.log("answers ",answers);
    },[])
    
	return(
        <div className="all-question-container">
        {survey.questions.map((q, qId) => (
            <div className="survey-question-container" key={qId} onChange={(e)=> saveAnswer(e, qId+1, q.type)}>
                <div className="question">{q.question}</div>
                {q.type ==='single' ? (
                    <div className="single"style={{margin: "10px"}}>
                        <div className="option1">
                            <input name={qId} type="radio" className="option1" value={q.options[0]}></input>
                            <label style={{marginLeft: "5px"}} htmlFor={qId}>{q.options[0]}</label>
                        </div>
                        <div className="option2">
                            <input name={qId} type="radio" className="option2" value={q.options[1]}></input>
                            <label style={{marginLeft: "5px"}} htmlFor={qId}>{q.options[1]}</label>
                        </div>
                    </div>
                ):(
                    <div className="multiple" >
                        <div className="option1">
                            <input name={qId} type="checkbox" className="option1" value={q.options[0]}></input>
                            <label style={{marginLeft: "5px"}} htmlFor={qId}>{q.options[0]}</label>
                        </div>
                        <div className="option2">
                            <input name={qId} type="checkbox" className="option2" value={q.options[1]}></input>
                            <label style={{marginLeft: "5px"}} htmlFor={qId}>{q.options[1]}</label>
                        </div>
                        <div className="option3">
                            <input name={qId} type="checkbox" className="option3" value={q.options[2]}></input>
                            <label style={{marginLeft: "5px"}} htmlFor={qId}>{q.options[2]}</label>
                        </div>
                        <div className="option3">
                            <input name={qId} type="checkbox" className="option4" value={q.options[3]}></input>
                            <label style={{marginLeft: "5px"}} htmlFor={qId}>{q.options[3]}</label>
                        </div>
                    </div> 
                )}
            </div>
        ))}
        <Button onClick={SubmitSurvey} className="survey-main-btn">Submit Survey</Button>
        </div>
    );
}
