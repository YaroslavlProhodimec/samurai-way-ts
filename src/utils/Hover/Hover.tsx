import {useState} from "react";

export const Hover = () => {
  const [isHovering,setHovering] = useState(false)
    const handleMouseOver = () => {
        setHovering(true)
    }
    const handleMouseOut = () => {
        setHovering(false)
    }
    return ( <div>
            <div className={isHovering ? 'bg-salmon': ""}
onMouseOver={handleMouseOver}
                 onMouseOut={handleMouseOut}
            >
                Hover me
            </div>
        </div>

    )
}