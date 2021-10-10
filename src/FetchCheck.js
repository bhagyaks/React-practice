import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import "./styles.css";
import {fetchChecks, submitCheckResults} from "./api";
import "./Button.css";
import "./FetchCheck.css";
import Button from "./Button";
const FetchCheck = (props) => {
    const [checks, setChecks] = useState(null);
    const history = useHistory();
    const [isSubmitDisabled,disableSubmit]=useState(true);
    const [dataArray, setDataArray] = useState([]);
    useEffect(() => {
        fetchChecks().then(p => {
            let data = [];
            p.sort((a,b) => a.priority - b.priority);
            for(let i=0;i<p.length;i++) {
                data.push({'id': i,'checkId':p[i].id, 'value' : null});
           }
            setChecks(p);
            setDataArray(data);
        });
    }, []);
    if (checks === null) {
        return <h2>Loading...</h2>;
    }
    return (
        <div className="App">
            {checks.map((check, index) => (
                <div  key={check.id}  className={`container ${disableElement(check)}`} onKeyUp={handleKey} onKeyDown={disableEnter}>
                    <div className="question"><span>{check.description}</span></div>
                    <div className="tab" value="" id={index}>
                        <button id="yes" tabIndex="-1"  value={"Yes"} onClick={handleButton} autoFocus={isAutoFocusEnable(check,index)}>Yes</button>
                        <button id="no" tabIndex="-1"  value={"No"} onClick={handleButton}>No</button>
                    </div>
                </div>
            ))}
            <br />
            <div className="submit_section"><Button disabled={isSubmitDisabled} id="app_submit" onClick={submitData}>Submit</Button></div>
        </div>
    );
     /**
   * @param check - check 
   * disables all elements except first div. create data array, to  update yes no button values
   */
    function disableElement(check) {
        return checks[0] === check ? false : "disabled"; 
    }
    /**
   * @param event - check 
   * handle thew mouse on click of  yes and no button to enable and disable next and previous children
   */
    function handleButton(event) {
        event.target.parentNode.childNodes.forEach(e => {
            e.classList.remove("active");
        });
        event.target.classList.add("active");
        if (event.target) {
            dataArray[Number(event.target.parentNode.id)].value = event.target.value;
            if (event.target.value === "Yes") {
                enableNextQuestion(Number(event.target.parentNode.id) + 1);
            }
            else {
                updateOnNo(Number(event.target.parentNode.id) + 1);
            }
        }
    }
     /**
   * @param check - element id 
   * enable elements and submit button enables/disabled based on yes/no button.
   */
    function enableNextQuestion(elementId) {
        if (document.getElementById(elementId)) {
            document.getElementById(elementId).parentElement.classList.remove("disabled");
            for (let i=0;i<dataArray.length;i++)
            {
                if(dataArray[i].value===null)
                {
                    disableSubmit(true);
                    break;
                }
            }
        }
        else {
            disableSubmit(false);
        }
    }
     /**
    * @param check - element id 
   * disable elements and submit button enables/disabled based on yes/no button.
   */
    function updateOnNo(elementId){
        for (let i=elementId;i<dataArray.length;i++)
        {
            dataArray[i].value=null;
            document.getElementById(i).parentElement.classList.add("disabled");
            (document.getElementById(i).childNodes).forEach(e => {
                e.classList.remove("active");
            });
        }
        disableSubmit(false);
    }
    /**
    * @param event -
    * handles keys press 1 for yes, 2 for no and arrow up and down for movement in checks.
    */
    function handleKey(event) {
        if (event.keyCode === 49) {
            event.target.parentNode.childNodes.forEach(e => {
                if (e.id === "yes") {
                    e.click();
                }
            });
        } else if (event.keyCode === 50) {
            event.target.parentNode.childNodes.forEach(e => {
                if (e.id === "no") {
                    e.click();
                }
            });
        } else if (event.keyCode === 40) {
            if (event.target.parentNode.parentNode.nextElementSibling && !event.target.parentNode.parentNode.nextElementSibling.classList.contains("disabled")) {
                if(event.target.parentNode.parentNode.nextElementSibling.lastChild)
                    event.target.parentNode.parentNode.nextElementSibling.lastChild.firstChild.focus();
            }
        } else if (event.keyCode === 38) {
            if (event.target.parentNode.parentNode.previousElementSibling && !event.target.parentNode.parentNode.previousElementSibling.classList.contains("disabled")) {
                if(event.target.parentNode.parentNode.previousElementSibling.lastChild)
                    event.target.parentNode.parentNode.previousElementSibling.lastChild.firstChild.focus();
            }
        }
    }
    function disableEnter(e)
    {
        if(e.keyCode === 13){
            e.preventDefault();
            return false;
        }
    }
    function isAutoFocusEnable(check,index){
        return checks[0] === check ? true :false; 
    }
    /**
   * submit the data and catch error if submission failed
   */
    function submitData(e) {
        let finalData = [];
        for (let i = 0; i < dataArray.length; i++) {
            if (dataArray[i].value !== null) {
                finalData[i] = { 'checkId': dataArray[i].checkId, 'result': dataArray[i].value };
            }
        }
        submitCheckResults(finalData).then(() => {
            history.push("./success");
         }).catch(() => alert("Submission Failed!!!"));
    }
}
  export default FetchCheck;