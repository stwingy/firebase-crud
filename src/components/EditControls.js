import React,{useContext} from 'react'
import { mainContext } from './mainContext';
import './EditControls.css'
 const EditControls =({id})=>{
     const editContext =useContext(mainContext)
     const handleDelete =()=>{
         editContext.handleRemove(id)
     }
     const handleEdit =()=>{
        editContext.setEdit(true)
         editContext.handleEdit(id)
         
     }
    return(
        <div className ="btnHolder">
                     <button className="edit-btn" onClick={handleEdit}>
                     <img src="https://icon.now.sh/edit/000000" alt ="aa" className ="delimg"/>
                     </button>
                     <button className="edit=btn" onClick={handleDelete}>
                     <img src="https://icon.now.sh/delete/8b0000" alt ="aa" className ="delimg"/>
                     </button>
                     </div> 
    )
}

export default EditControls