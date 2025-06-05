import React, { useEffect, useRef } from 'react'
import gsap from 'gsap';

export default function Index({ children }) {
    const magneticRef = useRef(null);

    useEffect( () => {
        console.log(children)
        const xTo = gsap.quickTo(magneticRef.current, "x", {duration: 1, ease: "elastic.out(1, 0.3)"})
        const yTo = gsap.quickTo(magneticRef.current, "y", {duration: 1, ease: "elastic.out(1, 0.3)"})

        magneticRef.current.addEventListener("mousemove", (e) => {
            const { clientX, clientY } = e;
            const {height, width, left, top} = magneticRef.current.getBoundingClientRect();
            const x = clientX - (left + width/2)
            const y = clientY - (top + height/2)
            xTo(x * 0.35);
            yTo(y * 0.35)
        })
        magneticRef.current.addEventListener("mouseleave", (e) => {
            xTo(0);
            yTo(0)
        })

        // Perform cleanup on unmount
        return () => {
            magneticRef.current.removeEventListener("mousemove", e => {
                // ...
            });
            magneticRef.current.removeEventListener("mouseleave", e => {
                // ...
            });
        }
    }, []);

    return (
        React.cloneElement(children, { ref: magneticRef })
    )
}