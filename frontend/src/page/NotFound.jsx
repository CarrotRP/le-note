import { useEffect } from "react";

export default function NotFound(){
    useEffect(() => {
        fetch('http://localhost:3000/unknown')
        .then(res => res.json())
        .then(data => console.log(data));
    }, []);

    return(
        <>
            not found
        </>
    );
}