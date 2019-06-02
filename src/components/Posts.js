import React, { useContext } from 'react';
import { mainContext } from './mainContext';
import EditControls from './EditControls'
import EditText from './EditText'
import './Posts.css'
const Posts = () => {
    const postContext = useContext(mainContext);
   
	const makePosts = () => {
       
		return postContext.posts.map((p) => (
            postContext.current.id===p.id? <EditText key = {p.id}post ={p}/>:
			<div key={p.id} className = "feature">
                
				<h4 className = "heading-4">{p.title}</h4>
				<p className = 'feature__text'>{p.subject}</p>
                <EditControls id={p.id}/>
                
			</div>
		));
	};
   
        
	return(
        <section className = "features">
            {makePosts()}
        </section>
    )
};
export default Posts;



 // const makeArray =(l,str)=>{
    //     let i=0
    //     let ma =[]
    //     while(i<str.length){
    //       ma.push(str.slice(i,l+i))
    //      i=i+l
         
    //     }
    //     return ma
    //     }