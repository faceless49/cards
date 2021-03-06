import React, {useState} from "react";
//@ts-ignore
import styles from './Paginator.module.css'
import {SuperButton} from "../common/SuperButton/SuperButton";
//@ts-ignore
import arrowLeft from '../../images/arrowLeft.svg';
//@ts-ignore
import arrowRight from '../../images/arrowRight.svg';

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
        const rightPortionPageNumber = portionNumber * portionSize


        const onFirstPageClick = () => {
            onChangedPage(1)
            setPortionNumber(1)
        }

        const onLastPageClick = () => {
            onChangedPage(pagesCounts)
            setPortionNumber(portionCount)
        }

        return (
            <div className={styles.pagesWrapper}>
                {portionNumber > 1 &&
                <>
                    <button className={styles.paginatorArrow}
                                 onClick={() => {
                                     onChangedPage((portionSize * (portionNumber - 2)) + 1)
                                     setPortionNumber(portionNumber - 1)
                                 }}><img src={arrowLeft}/></button>
                    <div className={styles.item} onClick={onFirstPageClick}>1</div>
                    <div className={styles.points}>...</div>
                </>}

                {pages
                    .filter((p) => p ? p >= leftPortionPageNumber && p <= rightPortionPageNumber : '')
                    .map(p => {
                        return <div
                            key={p}
                            className={currentPage === p ? styles.currentPage : styles.page}
                            onClick={() => {
                                onChangedPage(p)
                            }}>{p}
                        </div>
                    })}
                {
                    portionNumber !== portionCount &&
                    <>
                        <div className={styles.points}>...</div>
                        <div className={styles.item} onClick={onLastPageClick}>{pagesCounts}</div>
                    </>
                }
                {
                    portionCount > portionNumber &&

                    <button className={styles.paginatorArrow} onClick={() => {
                        setPortionNumber(portionNumber + 1)
                        onChangedPage(portionSize * portionNumber + 1)
                    }}><img src={arrowRight}/></button>

                
                }
            </div>
        )
    }
