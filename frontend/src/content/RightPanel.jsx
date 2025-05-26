import { useState, useRef, useContext, useEffect } from "react";
import { NoteContext } from "../context/NoteContext";
import { CurrentNoteContext } from "../context/CurrentNoteContext";

function RightPanel(props) {

    //i could use a props for dispatch, but im trying out the hook
    const { dispatch } = useContext(NoteContext)
    const { setCurrentNote } = useContext(CurrentNoteContext);

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const titleRef = useRef(null);
    const bodyRef = useRef(null);

    const handleSave = async () => {
        //TODO: add a checker to see if the notes exist before adding
        const note = { title, body }

        var url, method, type;

        if (title != "" && body != "") {
            if (props.currentNote != "NEW") {
                //only update if there's change
                if (title != props.currentNote.title || body != props.currentNote.title) {
                    url = `http://localhost:3000/api/notes/${props.currentNote._id}`;
                    method = 'PATCH';
                    type = 'UPDATE_NOTE';
                }
            } else {
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
                props.setIsChange(false);
                dispatch({ type: type, payload: data });
                //set the current note again to update the current note title and body(for checking any change)
                setCurrentNote(data)
            }
        }
    }
    useEffect(() => {
        if (props.currentNote && props.currentNote != "NEW") {
            setTitle(props.currentNote.title);
            setBody(props.currentNote.body);

        } else if (props.currentNote == "NEW") {
            setTitle('');
            setBody('');
        }
    }, [props.currentNote]);

    //useeffect for checking any changes
    useEffect(() => {
        if (titleRef.current?.value != props.currentNote?.title || bodyRef.current?.value != props.currentNote?.body) {
            props.setIsChange(true);
        } else {
            props.setIsChange(false);
        }
    }, [title, body])

    return (
        <>
            {props.currentNote ? <section className="right-panel">
                <div className="top">
                    <input ref={titleRef} className="note-title" type="text" maxLength="100" placeholder="Title" onChange={e => setTitle(e.target.value)} value={title} />
                    {props.isChange && <button onClick={handleSave}>Save</button>}
                </div>
                <textarea ref={bodyRef} className="note-body" name="note-body" id="note-body" placeholder="body" onChange={e => setBody(e.target.value)} value={body}></textarea>
            </section> : ""}
        </>
    );
}

export default RightPanel;