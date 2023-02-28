import React, { useEffect, useState } from 'react';
import SignOut from './SignOut';
import { db, auth } from '../firebase';
import SendMessage from './SendMessage';

const Line = () => {
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        db.collection('messages')
        .orderBy('createdAt')
        .limit(50)
        .onSnapshot((snapshot) => {
            setMessages(snapshot.docs.map((doc) => doc.data()));
        });
    }, []);
    return (
        <div>
            {console.log(messages)}
            <SignOut />
            <div className='msgs'>
                {messages.map(({id, text, photoURL, uid}) => (
                    <div key={id}
                    className={`msg ${uid == auth.currentUser.uid ? 'sent' : 'received'}`}
                    >
                        <img src={photoURL} alt="" />
                        <p>{text}</p>
                    </div>
                ))}
            </div>
            <SendMessage />
        </div>
    )
}

export default Line
