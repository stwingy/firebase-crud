import React,{useContext,useState,useEffect} from 'react';
import { mainContext } from './mainContext';
import './Form.css';
const Form = () => {
    const contX=useContext(mainContext)
    const [ title, setTitle ] = useState('');
	const [ subject, setSubject ] = useState('');
	 
       
    
    const submitPost=(e)=>{
        e.preventDefault()
			contX.handleCreate({subject:subject,title:title})
			setTitle("")
			setSubject("")
  
	}
	

    
	return (
		
		<div className="form-container">
			<form className="form" onSubmit={submitPost}>
				<div className="u-margin-bottom-medium">
					<h2 className="heading-2">Enter Your Comments</h2>
				</div>

				<div className="form__group">
					<input type="text" className="form__input" placeholder="Title" 
					value={title} onChange ={(e)=>{setTitle(e.target.value)}} required />
				</div>

				<div className="form__group">
					<textarea className="form__input" placeholder="Subject"
					value ={subject} onChange ={(e)=>{setSubject(e.target.value)}} required />
				</div>

				<div className="form__group">
				<button className="btn btn--green">POST &rarr;</button>
					
				</div>
			</form>
		</div>
		
	);
};
export default Form;
