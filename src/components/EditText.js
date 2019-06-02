import React,{useContext,useState} from 'react'
import { mainContext } from './mainContext';
import './EditText.css'
const EditText =({post})=>{
    const etContext = useContext(mainContext)
    const [subject,setSubject]=useState(post.subject)
    const [title,setTitle] =useState(post.title)
    const changeText=()=>{
            etContext.applyEdit({subject:subject,title:title})
            etContext.setCurrent({id:null})
    }
    const updateTitle =(e)=>{
setTitle(e.target.value)
    }
    const updateSubject =(e)=>{
setSubject(e.target.value)
    }
    return (
        <div className = "editfeature" key ={post.id}>
             <div className ="fix">
            <div>
            <input className="form__input stretch" type="text" defaultValue ={post.title} onChange ={updateTitle}/>
            </div>
            <div >
            <textarea  className="form__input stretch" defaultValue ={post.subject} onChange ={updateSubject}/>
            </div>
            <div>
            <button className="edit-btn" onClick={changeText}>
                     <img src="https://icon.now.sh/edit/000000" alt ="aa" className ="delimg"/>
                     </button>
            </div>
            </div>
			
                
        </div>
    )
}
export default EditText