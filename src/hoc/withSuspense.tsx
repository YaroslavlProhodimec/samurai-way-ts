
import React from "react";
import {Prealoder} from "../Components/common/Prealoder/Preloader";

export function withSuspense <WCP>(WrapppedComponent:React.ComponentType<WCP>)  {

    return (props:WCP) => {
        return <React.Suspense fallback={<Prealoder/>}>
           <WrapppedComponent {...props}/>
        </React.Suspense>
    }
    }





