import React, { useState, useEffect } from "react";
import { dbService } from "fbase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import PostNweet from "components/PostNweet";
import Nweet from "components/Nweet"

const Home = ({userObj}) => {

    const [nweets, setNweets] = useState([])

    useEffect(() => {
        const q = query(collection(dbService, "nweets"),
            orderBy("createdAt", "desc")
        )
        onSnapshot(q, (snapshot) => {
            const nweetArray = snapshot.docs.map((doc)=> ({
                id: doc.id,
                ...doc.data()
            }))
            setNweets(nweetArray)
        })
    }, [])

    return (
        <>
        <PostNweet userObj={userObj}/>
        <div>
        {nweets.map((nweet) => (
           <Nweet 
           key={nweet.id}
           nweetObj={nweet}
           isOwner={nweet.creatorId === userObj.uid}
           />
        ))
        }
        </div>
        </>
    )
}
export default Home;