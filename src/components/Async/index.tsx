import { useEffect, useState } from "react"

export function Async() {

    const [isButtonVisible, setIsButtonVIsible] = useState(false)
    const [isButtonTwoInvisible, setIsButtonTwoInvisible] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setIsButtonVIsible(true)
            setIsButtonTwoInvisible(true)
        }, 1000)
    }, [])

    return(
        <div>
            <div>Example of how to test things that are async</div>
            {isButtonVisible && (
                <button>Button One</button>
            )}
            {!isButtonTwoInvisible && (
                <button>Button Two</button>
            )}
        </div>
    )
}