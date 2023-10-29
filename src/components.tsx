
//Extra components file not utilized in Main App

import { useState } from "react";

  //define defualt states for useState 
  const defaultVerbiage = 'Lorem ipsum motherfu..',
		defaultSelection = '1',
		defaultCensor = false;

  const [output, setVulgar] = useState(defaultVerbiage);
  const [selection, setSelection] = useState(defaultSelection);
  const [censored, setCensored] = useState(defaultCensor);

	//sets output back to defualt state
	const clearOutputText = () => {
		setVulgar(defaultVerbiage);
	}
  
	//copyText component: copies stored state of 'output' to clipboard
	const copyText = () => {
		navigator.clipboard.writeText(output);
		alert('Copied to Clipboard');
		return output;
	}

	const setValue = (event:any) => {
		setSelection(event.target.value);
	}	
	
	const setCensor = (event:any) => {
		setCensored(event.target.checked);
	}

function Tableheader() {
  return (
      <table>
      <tr>
        <td>
          <form id="dropDownForm">
            <label htmlFor='selectionDropDown' id="dropDownTitle">
              <strong> Word Count: </strong>
              {/* Drop down selection here to pick an option out of specified list */}
                <select id='selectionDropDown' onChange={setValue} >
                  <option value='1'>0-50</option>
                  <option value='2'>51-200</option>
                  <option value='3'>201-500</option>
                  <option value='4'>501-1500</option>
                  <option value='5'>1500+</option>
                  
                </select>
            </label>
          </form>
        </td>
        <td>
          <label htmlFor='censoredCheck' id="censoredTitle">
            <strong> Censored </strong>
          </label>
        </td>
      </tr>
    </table>
  )
}

export default Tableheader;