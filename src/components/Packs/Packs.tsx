import {useDispatch, useSelector} from "react-redux";
import {
    addPack, deletePack,
    getPacks,
    InitialStatePackPageType,
    setPacksData,
    setPacksError,
    setPacksSortData, updatePack
} from "../../reducers/packReducer";
import {AppRootStateType} from "../../redux/store";
import {useEffect} from "react";
import {Link, Navigate} from "react-router-dom";
import {SuperButton} from "../common/SuperButton/SuperButton";
import {Sort} from "../common/Sort/Sort";


export const Packs = () => {
    const {
        cardPacks,
        cardPacksTotalCount,
        page,
        pageCount,
        error,
        user_id,
    } = useSelector<AppRootStateType, InitialStatePackPageType>(state => state.packPage);
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn);
    const userId = useSelector<AppRootStateType, string>(state => state.profile._id);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPacksError(''));
        dispatch(getPacks())
    }, [dispatch])

    const addPackHandler = () => {
        dispatch(addPack('SUPER PACK'));
    }

    const deletePackHandler = (packId: string) => dispatch(deletePack(packId));
    const updatePackHandler = (packId: string, name: string) => dispatch(updatePack(packId, name));

    const sortNameHandlerUp = () => dispatch(setPacksSortData('up', 'name'));
    const sortNameHandlerDown = () => dispatch(setPacksSortData('down', 'name'));

    const sortCardsCountHandlerUp = () => dispatch(setPacksSortData('up', "cardsCount"));
    const sortCardsCountHandlerDown = () => dispatch(setPacksSortData('down', "cardsCount"));

    const sortUpdatedHandlerUp = () => dispatch(setPacksSortData('up', "updated"));
    const sortUpdatedHandlerDown = () => dispatch(setPacksSortData('down', "updated"));


    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }


    const packList = cardPacks.map(p => {
        const deletePack = () => deletePackHandler(p._id)
        const updatePack = () => updatePackHandler(p._id, 'New name')

        return (
            <tr key={p._id}>
                <td>{p.name}</td>
                <td>{p.cardsCount}</td>
                <td>{p.updated}</td>
                <td>{p.user_name}</td>
                <td>
                    <div>
                        <Link to={`/cards/${p._id}`}>
                            <SuperButton>
                                Cards
                            </SuperButton>
                        </Link>
                        {
                            userId === p.user_id &&
                            <>
                                <SuperButton onClick={deletePack}>
                                    Delete
                                </SuperButton>
                                <SuperButton onClick={updatePack}>
                                    Edit name
                                </SuperButton>
                            </>
                        }
                    </div>
                </td>
            </tr>
        )
    })

    return (
        <div>
            <section>
                {/*paginator*/}
                {error && <div>{error}</div>}
                {/*Search component*/}
                <div>
                    <span>Packs number</span>
                    <select>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={30}>30</option>
                        <option value={40}>40</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                    <SuperButton> Refresh page</SuperButton>
                </div>
                <table>
                    <thead>
                    <tr>
                        <th>
                            <Sort sortHandlerUp={sortNameHandlerUp}
                                  sortHandlerDown={sortNameHandlerDown}
                                  title={'Name'}/>
                        </th>
                        <th>
                            <Sort sortHandlerUp={sortCardsCountHandlerUp}
                                  sortHandlerDown={sortCardsCountHandlerDown}
                                  title={'Cards Count'}/>
                        </th>
                        <th>
                            <Sort sortHandlerUp={sortUpdatedHandlerUp}
                                  sortHandlerDown={sortUpdatedHandlerDown}
                                  title={'Updated'}/>
                        </th>
                        <th>
                            <Sort sortHandlerUp={sortUpdatedHandlerUp}
                                  sortHandlerDown={sortUpdatedHandlerDown}
                                  title={'Created by'}/>
                        </th>
                        <th>
                            <div>
                                <label>
                                    <input type={'checkbox'}
                                           checked={user_id !== ''}/>
                                    My Packs
                                </label>
                                <SuperButton onClick={addPackHandler}>
                                    Add pack
                                </SuperButton>
                            </div>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {packList}
                    </tbody>
                </table>
            </section>
        </div>
    )


}