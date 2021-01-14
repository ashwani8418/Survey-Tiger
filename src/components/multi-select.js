import React, { useState } from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input, Button } from 'reactstrap';
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { surveySlice } from '../store/surveySlice';

export default function MultiSelect() {
	const [ options, setOptions ] = useState([ '' ]);
	const [ question, setQuestion ] = useState('');
	const { surveyId } = useParams();
	const dispatch = useDispatch();
	const history = useHistory();

	const addOption = (optionIdx) => {
		if (options.length < 4) {
			const newOptions = [ ...options, '' ];
			const newOptionIdx = optionIdx + 1;
			let currentNewOptionIndex = newOptions.length - 1;
			while (newOptionIdx !== currentNewOptionIndex) {
				newOptions[currentNewOptionIndex] = newOptions[currentNewOptionIndex - 1];
				currentNewOptionIndex--;
				newOptions[currentNewOptionIndex] = '';
			}
			setOptions(newOptions);
		}
	};

	const removeOption = (optionIdx) => {
		if (options.length > 1) {
			options.splice(optionIdx, 1);
			setOptions([ ...options ]);
		}
	};

	const setOptionInArray = (value, optionIdx) => {
		options[optionIdx] = value;
		setOptions([ ...options ]);
	};

	const isQuestionAddPublishDisabled = () =>
		question.trim() === '' || options.find((opt) => opt.trim() === '') !== undefined;


	const addQuestionClickAction=()=> {
		const payload = {
			options,
			question,
			surveyId,
			type: "multiple"
		};
		dispatch(surveySlice.actions.addQuestion(payload));
		history.push('/create/'+ surveyId+'?check=true');
	}

	const publishQuestion=()=> {
		const payload = {
			options,
			question,
			surveyId,
			type: "multiple"
		};
		dispatch(surveySlice.actions.addQuestion(payload));
		history.push('/confirm/'+ surveyId);
	}
	return (
		<div className="question-container">
			<InputGroup className="input-grp">
				<InputGroupAddon addonType="prepend">
					<InputGroupText>?</InputGroupText>
				</InputGroupAddon>
				<Input placeholder="Your Question" onChange={(e) => setQuestion(e.target.value)} value={question} />
			</InputGroup>
			<p className="options-text">Options</p>
			{options.map((option, optionIdx) => (
				<InputGroup className="input-grp" key={optionIdx}>
					<Input
						placeholder={`option ${optionIdx + 1}`}
						onChange={(e) => setOptionInArray(e.target.value, optionIdx)}
						value={option}
					/>
					<InputGroupAddon addonType="append">
						<Button onClick={() => addOption(optionIdx)} disabled={options.length === 4}>
							+
						</Button>
						<Button onClick={() => removeOption(optionIdx)} disabled={options.length === 1}>
							-
						</Button>
					</InputGroupAddon>
				</InputGroup>
			))}
			{options.length === 4 ? (
				<div className="question-buttons">
					<Button onClick={addQuestionClickAction} className="survey-main-btn" disabled={isQuestionAddPublishDisabled()}>
						Add Question
					</Button>
					<Button onClick={publishQuestion} className="survey-main-btn" disabled={isQuestionAddPublishDisabled()}>
					Publish
				</Button>
				</div>
			) : null}
		</div>
	);
}
