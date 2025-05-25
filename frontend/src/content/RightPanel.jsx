import { useState, useContext, useEffect } from "react";
import { NoteContext } from "../context/NoteContext";
import { CurrentNoteContext } from "../context/CurrentNoteContext";

function RightPanel(props) {

    //i could use a props for dispatch, but im trying out the hook
    const { dispatch } = useContext(NoteContext)
    const { setCurrentNote } = useContext(CurrentNoteContext);

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const handleSave = async () => {
        //TODO: add a checker to see if the notes exist before adding
        const note = { title, body }

        var url, method, type;

        if (title != "" && body != "") {
            if (props.currentNote != "NEW") {
                url = `http://localhost:3000/api/notes/${props.currentNote._id}`;
                method = 'PATCH';
                type = 'UPDATE_NOTE';
            } else {
                console.log('new')
                url = 'http://localhost:3000/api/notes';
                method = 'POST';
                type = 'ADD_NOTE';
            }
            const response = await fetch(url, {
                method: method,
                body: JSON.stringify(note),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json();
            if (response.ok) {
                console.log('hello')
                dispatch({ type: type, payload: data });
                //if the current note is new, and user added it, set the currentnote to it so user can update and not add another
                if(props.currentNote == 'NEW'){
                    setCurrentNote(data)
                }
            }
        }
    }
    useEffect(() => {
        if (props.currentNote && props.currentNote != "NEW") {
            setTitle(props.currentNote.title);
            setBody(props.currentNote.body);
        } else if(props.currentNote == "NEW"){
            setTitle('');
            setBody('');
        }
    }, [props.currentNote]);

    return (
        <>
            {props.currentNote ? <section className="right-panel">
                <div className="top">
                    <input className="note-title" type="text" maxLength="100" placeholder="Title" onChange={e => setTitle(e.target.value)} value={title} />
                    <button onClick={handleSave}>Save</button>
                </div>
                <textarea className="note-body" name="note-body" id="note-body" placeholder="body" onChange={e => setBody(e.target.value)} value={body}></textarea>
            </section> : ""}
        </>
    );
}

export default RightPanel;