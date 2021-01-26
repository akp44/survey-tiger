import React,{useState} from 'react'
import { Button,InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { useHistory, useParams } from "react-router-dom";
import {useDispatch} from 'react-redux';

import {surveySlice} from '../store/SurveySlice';
function SingleSelect() {
    const {surveyId} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const [options,setOptions] = useState(["",""]);
    const [question,setQuestion] = useState("");
    const setOptionInArray = (value,optionIdx) => {
        options[optionIdx] = value;
        setOptions([...options]);
    }
    const addQuestionClickAction = () => {
        const payload = {
            options,
            question,
            surveyId,
            type: 'single'
        };
        dispatch(surveySlice.actions.addQuestion(payload));
        history.push('/create/' + surveyId);
    }

    const isQuestionAddPublishDisabled = () => question.trim() === '' || options.find(opt =>opt.trim() === '') !== undefined;

    return (
        <div className="question-container">
            <InputGroup className="input-grp">
                <InputGroupAddon addonType="prepend">
                <InputGroupText>?</InputGroupText>
                </InputGroupAddon>
                <Input placeholder="Your Question" value={question} onChange={e => setQuestion(e.target.value)} />
            </InputGroup>
            <p className="options-text">Options</p>
            <InputGroup className="input-grp">
                <Input placeholder="Option 1" value={options[0]} onChange={ e => setOptionInArray(e.target.value,0)} />
                <InputGroupAddon addonType="append">
                <InputGroupText>+</InputGroupText>
                <InputGroupText>-</InputGroupText>
                </InputGroupAddon>
            </InputGroup>
            <InputGroup className="input-grp">
                <Input placeholder="Option 2"value={options[1]} onChange={ e => setOptionInArray(e.target.value,1)} />
                <InputGroupAddon addonType="append">
                <InputGroupText>+</InputGroupText>
                <InputGroupText>-</InputGroupText>
                </InputGroupAddon>
            </InputGroup>
            <div className="question-buttons">
                <Button className="survey-main-button" onClick={addQuestionClickAction} disabled={isQuestionAddPublishDisabled()}>Add question</Button>
                <Button className="survey-main-button" disabled={isQuestionAddPublishDisabled()}>Publish</Button>
            </div>
        </div>
    )
}

export default SingleSelect;
