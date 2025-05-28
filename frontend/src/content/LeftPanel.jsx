function LeftPanel(props) {
    
    const convertDate = (createdAt) => {
        var date = new Date(createdAt);
        let ddate = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();

        var newDate = `${ddate}/${month}/${year.toString().slice(2)}`

        return newDate;
    }
    const handleDelete = async (id) => {
        const response = await fetch(`http://localhost:3000/api/notes/${id}`, {
            method: 'DELETE',
            credentials: 'include'
        });
        const data = await response.json();
        if(response.ok){
            props.dispatch({type: 'REMOVE_NOTE', payload: data})
        }
    }

    return (
        <section className="left-panel">
            {/* props.notes?.length(optional chaining, if props.notes exist then get its length else undefined) */}
            {props.notes?.length > 0 ? props.notes.map((_, i) => {
                return <div className="box" key={props.notes[i]._id}>
                    <div className="detail" onClick={() => {props.handleClick(props.notes[i]._id)}}>
                        <h3>{props.notes[i].title}</h3>
                        <p>{convertDate(props.notes[i].updatedAt)}</p>
                    </div>
                    <svg onClick={() => {handleDelete(props.notes[i]._id)}} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                    </svg>
                </div>
            }) : <p className="no-note">No note created yet!<br></br>create a note and save to see it here :D</p>}
        </section>
    );
}

export default LeftPanel;