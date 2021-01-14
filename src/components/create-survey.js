import React, { useState, useEffect } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import SingleSelect from './single-select'
import MultiSelect from './multi-select'
import { useParams, useLocation, useHistory } from 'react-router-dom'

function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

export default function CreateSurvey() {
    const { surveyId } = useParams();
    const query = useQuery().get('check');
    const history = useHistory();
    // console.log("query ", query.get('check'));
    // console.log(query);
	const [ dropdownOpen, setDropdownOpen ] = useState(false);
    const [ dropdownText, setDropdownText ] = useState('Select Question Type');
    
    useEffect(()=> {
        if(query === 'true'){
            setDropdownText('Select Question Type');
            history.push("/create/" + surveyId);
        }
    }, [query, history, surveyId])


	const toggle = () => setDropdownOpen((prevState) => !prevState);

	return (
        <>
            <p>Survey ID: <b>{surveyId}</b></p>
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle caret>{dropdownText}</DropdownToggle>
                <DropdownMenu>
                    <DropdownItem onClick={() => setDropdownText('Multi Select Question')}>
                        Multi Select Question
                    </DropdownItem>
                    <DropdownItem onClick={() => setDropdownText('Single Select Question')}>
                        Single Select Question
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
            {dropdownText === "Multi Select Question" ? <MultiSelect/>:null}
            {dropdownText === "Single Select Question" ? <SingleSelect/>:null}
        </>
	);
}
