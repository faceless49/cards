import React, {useState} from "react";
//@ts-ignore
import styles from './Paginator.module.css'
import {SuperButton} from "../common/SuperButton/SuperButton";

export type PaginatorTypeProps = {
    totalCount: number
    pageSize: number
    currentPage: number
    onChangedPage: (currentPage: number) => void
}
export const Paginator: React.FC<PaginatorTypeProps> =
    ({
         totalCount,
         pageSize,
         currentPage,
         onChangedPage
     }) => {
        let portionSize = 10;
        let pagesCounts = Math.ceil(totalCount / pageSize);
        let pages = [];
        for (let i = 1; i <= pagesCounts; i++) {
            pages.push(i)
        }

        let portionCount = Math.ceil(pagesCounts / portionSize)
        let [portionNumber, setPortionNumber] = useState(1);
        const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
        const rightPortionPageNumber =  portionNumber * portionSize

return <div className={styles.pagesWrapper}>

    <div className={styles.pageList}>
        {portionNumber > 1 &&
        <SuperButton style={{ width: "80px", height:"40px"}} onClick={() => {
            setPortionNumber(portionNumber - 1)
        }}>Prev</SuperButton>}
        {
            pages
            .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map((p) => {
                return <span key={p}
                             className={currentPage === p ? styles.currentPage : styles.page}
                             onClick={() => onChangedPage(p)}>
                        {p}
                    </span>
            })}
        {
            portionCount > portionNumber &&
            <SuperButton style={{ width: "80px", height:"40px"}}
                         onClick={() => {setPortionNumber(portionNumber + 1)}}>Next</SuperButton>
        }
    </div>
</div>
}
