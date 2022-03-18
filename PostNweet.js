import React, { useState } from "react";
import { authService, dbService, storageService } from "fbase";
import { v4 as uuidv4 } from 'uuid';
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import ImageIcon from "icon/ImageIcon"

const PostNweet = ({userObj}) => {
const [isLoading, setIsLoading] = useState(false);
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
    
    if(!isLoading) {
        setIsLoading(true);
    try {
        await addDoc(collection(dbService, "nweets"), {
            text: nweet,
            author: {avatarURL: userObj.photoURL,
                    userName: userObj.displayName      
                    },
            createdAt: new Date().toLocaleString(),
            creatorId: userObj.uid,
            attachmentURL
    });
       
    } catch (error) {
    console.error("Error adding document: ", error);
    }
    setNweet("");
    setAttachment("");
    setIsLoading(false); 
    }
};

const onFileChange = (e) => {
    const {target:{files}} = e;
    const theFile = files[0];

    const reader = new FileReader(); //API
    reader.onloadend = (finishedEvent) => { // 이미지 파일 로드
        const {target:{result}} = finishedEvent;
        setAttachment(result)
    }
    reader.readAsDataURL(theFile); // 긴 문자열("data:image/png")   
}

const onClearAttachment = () => setAttachment(null)

    return (
        <form onSubmit={onSubmit}>
            <div style={{display:"grid"}}>
                <div style={{gridColumn: "1 / 2"}}>
                <img  src={authService.currentUser.photoURL} alt="profile" width="50px" height="50px"/>
                </div>
            <textarea
            style={{gridColumn: "2 / 8"}} 
            className="nweet-area"
            maxLength={120}
            value={nweet}
            onChange={onChange}
            required
            disasbled
            placeholder="What's on your mind">
            </textarea>
            
                <div style={{gridColumn: "2 / 8", justifySelf: "flex-start", paddingBlock: "1rem"}}>
                <button className="transparant-btn" onClick={()=>{document.getElementById('getFile').click()}}><ImageIcon/></button>
                    <input
                    id="getFile" style={{display:"none"}}
                    type="file"
                    accept="image/*"
                    onChange={onFileChange}
                    />
                    <input
                    className="bg-accent"
                    type="submit"
                    value="Nweet"
                    />
                </div>
            </div>


            {attachment && (
            <div>
                <img src={attachment} width="160px" height="128px" alt="user profile"/>
                <button onClick={onClearAttachment}>Clear</button>
            </div>
            )}
        </form>
    )
}
export default PostNweet