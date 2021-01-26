import React,{useState} from 'react'
import { Button,InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
function MultiSelect() {
const [options,setOptions] = useState([""]);
const [question,setQuestion] = useState("");

const addOption = (optionIdx) => {
    
    if(options.length < 4){
        const newOptions = [...options,""];
        const newOptionIdx = optionIdx + 1;
        let currentNewOptionIndex = newOptions.length-1;
        while(newOptionIdx !== currentNewOptionIndex){
            newOptions[currentNewOptionIndex] = newOptions[currentNewOptionIndex-1];
            currentNewOptionIndex--;
            newOptions[currentNewOptionIndex] = "";
        }
        setOptions(newOptions);
    }
}
const removeOption = (optionIdx) => {
    if(options.length > 1){
        options.splice(optionIdx,1);
        setOptions([...options]);
    }
}
const setOptionInArray = (value,optionIdx) => {
    options[optionIdx] = value;
    setOptions([...options]);
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
            {
                options.map((option, optionIdx) => (
                    <InputGroup className="input-grp" key={optionIdx}>
                        <Input placeholder={`Option ${optionIdx+1}` } value={option}  onChange={e => setOptionInArray(e.target.value,optionIdx)}/>
                        <InputGroupAddon addonType="append">
                        <Button onClick={()=> addOption(optionIdx)} disabled={options.length === 4}>+</Button>
                        <Button onClick={()=> removeOption(optionIdx)} disabled={options.length === 1}>-</Button>
                        </InputGroupAddon>
                    </InputGroup>
                ))
            }
            {   options.length === 4 ? 
                (<div className="question-buttons">
                    <Button className="survey-main-button" disabled={isQuestionAddPublishDisabled()}>Add question</Button>
                    <Button className="survey-main-button" disabled={isQuestionAddPublishDisabled()}>Publish</Button>
                </div>) : null
            }
        </div>
    )
}

export default MultiSelect;
