import { useState } from "react";
import { GithubLogo } from "./GithubLogo";
import "./App.css";

//Main component - no added components
function App() {

  //define defualt states for useState 
  const defaultVerbiage = 'Lorem ipsum motherfu..',
		defaultSelection = '1',
		defaultCensor = false;

  const [output, setVulgar] = useState(defaultVerbiage),
		[selection, setSelection] = useState(defaultSelection),
  		[censored, setCensored] = useState(defaultCensor);

	//sets output back to defualt state
	const clearOutputText = () => {
		setVulgar(defaultVerbiage);
	}
  
	//copyText - copies stored state of 'output' to clipboard
	const copyText = () => {
		navigator.clipboard.writeText(output);
		alert('Copied to Clipboard');
		return output;
	}

	//sets the value of the selection state
	const setValue = (event:any) => {
		setSelection(event.target.value);
	}	
	//set the boolean of the censor state
	const setCensor = (event:any) => {
		setCensored(event.target.checked);
	}

    //DEBUGGING:debugging method
    // const consoleLogFile = () => {
	// 	console.log(selection);
	// }

	const generateWords = () => {
		//Locally stored lists of words to randomly generate: one vulgar list, one censored list
		const vulgarWords = ['fuck you', 'bitch','cunt','motherfucker','shitstain','ogre','limpdick','gumby','paperhanded bitch','ass whipe', 'plonker'],
			censoredWords = ['f**k you', 'b**ch','cunt','motherf***er','sh**stain','ogre','limpd**k','gumby','paperhanded b**ch','a*s whipe', 'plonker'];
	  
		//define number of defualt words
		let numberOfOutputWords = 0;

		//returns random number between min and max
		function numberInterval(min:number, max:number){
			return Math.floor(Math.random() * (max - min + 1) + min);
		}
	  
		//chunks an array input and outputs chunked array of length 150 elements
		function makesParagraphs(listOfWords:any[]){
			const chunkedArray = [];
				for(let i = 0; i< listOfWords.length; i+= 150){
				const chunk = listOfWords.slice(i, i + 150)
				chunkedArray.push(chunk);
				}

			return chunkedArray.map(wordGroup => wordGroup.join(' ')).join('\n\n');
		}
		  
		//sets value of numberOfOutputWords based on selectionDropDown value
		switch(selection){
			case '1': numberOfOutputWords = numberInterval(0,50);
			break;
			case '2': numberOfOutputWords = numberInterval(51,200);
			break;
			case '3': numberOfOutputWords = numberInterval(201,500);
			break;
			case '4': numberOfOutputWords = numberInterval(501,1500);
			break;
			case '5': numberOfOutputWords = numberInterval(1500,3000);
			break;
		}
	  
		//generates array of random length with number input for vulgar words
		function generateVulgarWords(numberOfWords:number){
			const outputWords = [];
			for(let i = 0; i < numberOfWords; i++){
				let randomIndex = Math.floor(Math.random()*vulgarWords.length);
				outputWords.push(vulgarWords[randomIndex]);
			}

			return outputWords;
		}

		//for censored words
		function generateCensoredWords(numberOfWords:number){
			const outputWords = [];
			for(let i = 0; i < numberOfWords; i++){
				let randomIndex = Math.floor(Math.random()*censoredWords.length);
				outputWords.push(censoredWords[randomIndex]);
			}

			return outputWords;
		}
		  
		//checks censored state and returns makesParagraphs method of censored or not method 
		return censored ? makesParagraphs(generateCensoredWords(numberOfOutputWords)) : makesParagraphs(generateVulgarWords(numberOfOutputWords));
	  };

  return (
    <div className="App">
      <h1>Vulgar Ipsum</h1>
      <GithubLogo />
		{/*DEGUGGING:This button is for debugging */}
		{/* <button className="button1" id='displayDataButton' onClick={consoleLogFile}>
			Console Log 
        </button> */}
      <table id="table">
		<tbody>
      		<tr id='dropDown'>
				<td>
					<form id="dropDownForm">
						<label htmlFor='selectionDropDown' id="dropDownTitle">
							<strong> Word Count: </strong>
							<select id='selectionDropDown' onChange={setValue}>
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
				<td>
					<div className="container">
						<label className="switch" htmlFor="censoredCheck">
							<input type="checkbox" id="censoredCheck" onChange={setCensor}/>
							<div className="slider round"></div>
						</label>
					</div>
				</td>
			</tr>
			<tr id='navigationButtons'>
				<td>
					<button onClick={() => setVulgar(generateWords())}>Generate</button>
				</td>
				<td>
					<button onClick={() => clearOutputText()}>Clear</button>
				</td>
				<td>
					<button onClick={() => copyText()}>Copy to Clipboard</button>
				</td>
			</tr>
			<tr id="outputBox">
				<td id="outputText">{output}</td>
			</tr>
		</tbody>
      </table>
    </div>
  );
}
export default App;
