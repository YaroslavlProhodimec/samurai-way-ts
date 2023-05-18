import s from './Paginator.module.css'
import React, {useEffect, useState} from "react";
import cn from 'classnames'


type PropsPaginator = {
    totalItemsCount:number
    pageSize:number
    currentPage:number
    onPageChange:(pageNumber:number)=>void
    potionSize?:number
}
let Paginator:React.FC<PropsPaginator> = ({totalItemsCount,pageSize,currentPage,onPageChange,potionSize=10}:PropsPaginator) => {

    let pagesCount = Math.ceil(totalItemsCount / pageSize)
    let pages:Array<number> = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    useEffect(()=>setPortion(Math.ceil(currentPage/potionSize)), [currentPage]);

    let portionCount = Math.ceil(pagesCount / potionSize)
    let [portionNumber, setPortion] = useState<number | null>(1)
    if(portionNumber === null) portionNumber = 1
    let leftPortionPageNumber = (portionNumber - 1 ) * potionSize + 1
    let rightPortionPageNumber = portionNumber * potionSize
    return <div className={cn(s.paginator)}>
                {portionNumber > 1 &&
                <button onClick={(e) => {setPortion(portionNumber! - 1)}}>Prev</button> }

                {pages.filter(p =>  p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                    .map((p:any) => {
                    return <span className={ cn({
                        [s.selectedPage]: currentPage === p
                    }, s.pageNumber)}
                                 key={p}
                                 onClick={(e) => {
                                     onPageChange(p)
                                 }}>{p}</span>
})}
    {portionCount > portionNumber &&
    <button onClick={ () => { setPortion(portionNumber! + 1) }}>Next</button>}

    </div>

}

export default Paginator;