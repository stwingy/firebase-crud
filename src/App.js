import './App.css';
import { firestore } from './firebase';
import React, { useEffect, useState, useRef, useReducer } from 'react';
import { collectIdsAndDocs } from './utilities';
const App = () => {
	//const [ posts, setPosts ] = useState([]);
	const [ currentPost, setCurrentPost ] = useState({});
	const [ title, setTitle ] = useState('');
	const [ subject, setSubject ] = useState('');
	const titleRef = useRef('');
	const subjectRef = useRef('');
	const reducer = (state, action) => {
		switch (action.type) {
			case 'SET':
				return action.payload;
			case 'DELETE':
				return state.filter((s) => s.id !== action.payload.id);
			default:
				return state;
		}
	};
	const [ posts, dispatch ] = useReducer(reducer, []);
	useEffect(() => {
		//const snapshot = await firestore.collection('posts').get();
		// snapshot.forEach((doc) => {
		// 	const id = doc.id;
		// 	const data = doc.data;
		// 	console.log({ id, data });
		// });
		const unsubscribe = firestore.collection('posts').onSnapshot((snap) => {
			const post = snap.docs.map(collectIdsAndDocs);
			dispatch({ type: 'SET', payload: post });
		});

		return () => unsubscribe();
	}, []);
	const handleEdit = async (id) => {
		await firestore.doc(`posts/${id}`).update(currentPost);
	};

	const handleRemove = async (val) => {
		const { id } = val;
		await firestore.doc(`posts/${id}`).delete();
		dispatch({ type: 'DELETE', payload: val });
	};
	async function handleCreate(post) {
		await firestore.collection('posts').add(post);
		setTitle('');
		setSubject('');
		//setCurrentPost(newPost);
	}
	const userTitleOnChange = (e) => {
		setTitle(e.target.value);
	};
	const userSubjectOnChange = (e) => {
		setSubject(e.target.value);
	};
	const handleForm = (e) => {
		e.preventDefault();
		const post = { title: title, subject: subject };
		//setCurrentPost(post);
		handleCreate(post);
	};
	const editOnChange = (e) => {
		setCurrentPost({ ...currentPost, [e.target.name]: e.target.value });
		console.log(currentPost);
	};
	const resetInput = (e) => {
		e.target.value = '';
	};

	return (
		<div>
			<form onSubmit={handleForm}>
				<input placeholder="Title" onChange={userTitleOnChange} value={title} />
				<textarea placeholder="Subject" onChange={userSubjectOnChange} value={subject} />
				<button type="submit">SUBMIT</button>
			</form>
			{posts.map((p) => (
				<div key={p.id}>
					<h2>{p.title}</h2>
					<p>{p.subject}</p>
					<button onClick={handleRemove.bind(this, p)}>DELETE</button>
					<button onClick={handleEdit.bind(this, p.id)}>EDIT</button>
					<form>
						<input onBlur={resetInput} onChange={editOnChange} name={'title'} />
						<input onBlur={resetInput} onChange={editOnChange} name={'subject'} />
					</form>
				</div>
			))}
		</div>
	);
};
export default App;

//QuerySnapshot
//   docs=>all the documents
//            empty=>boolean
//            metadata
//            query=> reference to original query
//            size=>number of documents

//METHODS
//docChanges() array of changes since last snapshot
//forEach() iterates over entire snapshot array
//isEqual() if it equals another snapshot

//DocumentSnapshot
//id
//exists
//metadata
//ref  location in database
//METHODS
//data() all the object fields
//get()  particular property
//isEqual comparison


{/* <div className ="btnHolder">
                     <button className="btn" onClick={()=>dispatch({type:"SET_CURRENT_TODO",payload:todo})}>
                     <img src="https://icon.now.sh/edit/0050c5" alt ="aa" className ="delimg"/>
                     </button>
                     <button className="btn" onClick ={async()=>{await axios.delete(`https://hooks-api.john1963.now.sh/todos/${todo.id}`)
                     dispatch({type:"REMOVE_TODO",payload:todo})}}>
                         
                         <img src="https://icon.now.sh/delete/8b0000" alt ="aa" className ="delimg"/>
                     </button>
                     </div> */}