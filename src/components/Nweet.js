import {useState} from "react"
import { dbService } from "fbase";
import {deleteDoc, updateDoc, doc} from "firebase/firestore";

const Nweet = ({nweetObj, isOwner}) => {
    const [isEditing, setIsEditing] = useState(false)
    const [newNweet, setNewNweet] = useState(nweetObj.text)
    const NweetTextRef =doc(dbService, "nweets", `${nweetObj.id}`);

    const toggleEditing = () => setIsEditing((prev) => !prev);

    const onSubmit = async (e) => {
        e.preventDefault();
        await updateDoc(NweetTextRef, {
            text: newNweet,
        });
        setIsEditing(false);
    }

    const onChange = (e) => {
        const {target:{value}} = e;
        setNewNweet(value)
    }

    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you want to delete?")
            if(ok){
                await deleteDoc(NweetTextRef);
            }
    }

    return (
        <div>
            {isEditing ? (
                <>
                {isOwner && (
                    <>
                    <form onSubmit={onSubmit}>
                        <input type="text"
                        placeholder="Edit your nweet"
                        value={newNweet}
                        onChange={onChange} 
                        required/>
                        <input type="submit" value="Update"/>
                        <button onClick={toggleEditing}>Cancel</button>
                    </form>
                    </>
                )}
                </>
            )
            :(<h4>{nweetObj.text}</h4>)
            }

            {isOwner && (
            <>
            <button onClick={toggleEditing}>Edit</button>
            <button onClick={onDeleteClick}>Delete</button>
            </>
            )}
        </div>
    )   
}

export default Nweet