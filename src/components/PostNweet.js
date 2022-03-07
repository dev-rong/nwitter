import React, { useState } from "react";
import { dbService, storageService } from "fbase";
import { v4 as uuidv4 } from 'uuid';
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";


const PostNweet = ({userObj}) => {

const [nweet, setNweet] = useState("");
const [attachment, setAttachment] = useState("")

const onChange = (e) => {
    const {target:{value}} = e;
    setNweet(value)
}

const onSubmit = async (e) => { // submit마다 firestore에 document 생성
    e.preventDefault();
    // 사진
    let attachmentURL="";
    if(attachment !== "") {
    const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
    const response = await uploadString(attachmentRef, attachment, "data_url");
    attachmentURL = await getDownloadURL(response.ref);
    }
    try {
        await addDoc(collection(dbService, "nweets"), {
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentURL
    });
    } catch (error) {
    console.error("Error adding document: ", error);
    }
    setNweet("");
    setAttachment("");
};

const onFileChange = (e) => {
    const {target:{files}} = e;
    const theFile = files[0];
    console.log(theFile)
    const reader = new FileReader(); //API
    reader.onloadend = (finishedEvent) => { // 이미지 파일 로드
        console.log(finishedEvent)
        const {target:{result}} = finishedEvent;
        setAttachment(result)
    }
    reader.readAsDataURL(theFile); // 긴 문자열("data:image/png")   
}

const onClearAttachment = () => setAttachment(null)

    return (
        <form onSubmit={onSubmit}>
                <input type="text"
                maxLength={120}
                value={nweet}
                onChange={onChange}
                placeholder="What's on your mind"/>

                <input type="file"
                accept="image/*" 
                onChange={onFileChange}/>
                <input type="submit" value="Nweet"/>

                {attachment && (
                <div>
                    <img src={attachment} width="50" height="50" alt="user profile"/>
                    <button onClick={onClearAttachment}>Clear</button>
                </div>
                )}
        </form>
    )
}
export default PostNweet