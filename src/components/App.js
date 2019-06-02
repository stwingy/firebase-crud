//import './App.css';
import { firestore } from '../firebase';
import React, { useEffect, useState, useReducer } from 'react';
import { collectIdsAndDocs } from '../utilities';
import { mainContext } from './mainContext';
import Posts from './Posts'

import Form from './Form';
const App = () => {
	const [edit,setEdit] =useState(false)
	const [current,setCurrent] =useState({})
	const reducer = (state, action) => {
		
		switch (action.type) {
			case 'SET':
				return action.payload;
			// case 'DELETE':
			// 	return state
				//return state.filter((s) => s.id !== action.payload.id);
			default:
				return state;
		}
	};
	const [ posts, dispatch ] = useReducer(reducer, []);

	useEffect(() => {
		const unsubscribe = firestore.collection('posts').onSnapshot((snap) => {
			const post = snap.docs.map(collectIdsAndDocs);
			dispatch({ type: 'SET', payload: post });
			
		});

		return () => unsubscribe();
	}, []);
	async function handleCreate(post) {
		await firestore.collection('posts').add(post);
		//setTitle('');
		//setSubject('');
		//setCurrentPost(newPost);
	}
	const handleEdit = async (id) => {
	
		const p =posts.filter(post=>post.id===id)
		setCurrent({id:p[0].id,title:p[0].title,subject:p[0].subject})
		
		//await firestore.doc(`posts/${id}`).update(currentPost);
	};
	const applyEdit =async(val)=>{
		console.log("c= ",val)
		await firestore.doc(`posts/${current.id}`).update(val)
	}

	const handleRemove = async (id) => {
		
		await firestore.doc(`posts/${id}`).delete();
		//dispatch({ type: 'DELETE', payload: val });
	};

	return (
		<mainContext.Provider value={{posts:posts,handleCreate:handleCreate,handleRemove:handleRemove,handleEdit:handleEdit,edit:edit,setEdit:setEdit,current:current,setCurrent:setCurrent,applyEdit:applyEdit}}>
			<Form />
			<Posts/>
		</mainContext.Provider>
	);
};

export default App;
