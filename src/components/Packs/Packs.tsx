// @ts-ignore TODO: Fix scss modules
import s from "./Packs.module.scss";
import BtnActions from "./BtnActions/BtnActions";
import { useDispatch, useSelector } from "react-redux";
import {
  addPack,
  deletePack,
  getPacks,
  InitialStatePackPageType,
  setCardsPackTC,
  setPacksData,
  setPacksError,
  setPacksSortData,
  updatePack,
} from "../../reducers/packReducer";
import { AppRootStateType } from "../../redux/store";
import { ChangeEvent, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { SuperButton } from "../common/SuperButton/SuperButton";
import { Sort } from "../common/Sort/Sort";
import Subtitle from "../common/Subtitle/Subtitle";
import { SearchField } from "../SearchField/SearchField";
import { Paginator } from "../Paginator/Paginator";
import { fetchCardsTC } from "../../reducers/cards";
import SuperDoubleRange from "../common/SuperDoubleRange/SuperDoubleRange";

export const Packs = () => {
  const {
    cardPacks,
    cardPacksTotalCount,
    page,
    pageCount,
    error,
    user_id,
    maxCardsCount,
    minCardsCount,
  } = useSelector<AppRootStateType, InitialStatePackPageType>(
    (state) => state.packPage
  );
  const isLoggedIn = useSelector<AppRootStateType, boolean>(
    (state) => state.login.isLoggedIn
  );
  const userId = useSelector<AppRootStateType, string>(
    (state) => state.profile._id
  );

  const [searchValue, setSearchValue] = useState("");
  const [min, setMin] = useState(minCardsCount);
  const [max, setMax] = useState(maxCardsCount);

  const onChangeSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPacksError(""));
    dispatch(getPacks(searchValue));
  }, [searchValue, dispatch]);

  const addPackHandler = () => {
    dispatch(addPack("SuperMega Pack"));
  };

  const checkMyHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.checked) {
      dispatch(setPacksData({ user_id: userId }));
      dispatch(getPacks());
    } else {
      dispatch(setPacksData({ user_id: "" }));
      dispatch(getPacks());
    }
  };

  const deletePackHandler = (packId: string) => dispatch(deletePack(packId));
  const updatePackHandler = (packId: string, name: string) =>
    dispatch(updatePack(packId, name));

  const sortNameHandlerUp = () => dispatch(setPacksSortData("up", "name"));
  const sortNameHandlerDown = () => dispatch(setPacksSortData("down", "name"));

  const sortCardsCountHandlerUp = () =>
    dispatch(setPacksSortData("up", "cardsCount"));
  const sortCardsCountHandlerDown = () =>
    dispatch(setPacksSortData("down", "cardsCount"));

  const sortUpdatedHandlerUp = () =>
    dispatch(setPacksSortData("up", "updated"));
  const sortUpdatedHandlerDown = () =>
    dispatch(setPacksSortData("down", "updated"));

  const sortCreatedByHandlerUp = () =>
    dispatch(setPacksSortData("up", "user_name"));
  const sortCreatedByHandlerDown = () =>
    dispatch(setPacksSortData("down", "user_name"));

  const onChangePageCountHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setPacksData({ pageCount: +e.currentTarget.value }));
    dispatch(getPacks());
  };

  const onChangedPage = (currentPage: number) => {
    dispatch(setPacksError(""));
    dispatch(setPacksData({ page: currentPage }));
    dispatch(getPacks());
  };

  const onChangeRange = (value: number[]) => {
    dispatch(setCardsPackTC(value[0], value[1]));
    setMin(value[0]);
    setMax(value[1]);
  };

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />;
  }

  const packList = cardPacks.map((p) => {
    const deletePack = () => deletePackHandler(p._id);
    const updatePack = () =>
      updatePackHandler(p._id, "New name for SuperMega Pack");
    const requestToLearnCard = () => dispatch(fetchCardsTC(p._id));

    return (
      <tr className={s.tr} key={p._id}>
        <td className={s.td}>{p.name}</td>
        <td className={s.td}>{p.cardsCount}</td>
        <td className={s.td}>{p.updated}</td>
        <td className={s.td}>{p.user_name}</td>
        <td>
          <div className={s.BtnBox}>
            {userId === p.user_id && (
              <>
                <BtnActions
                  name="Delete"
                  onClick={deletePack}
                  style={{ color: "#FFFFFF", backgroundColor: "#F1453D" }}
                />

                <BtnActions
                  name="Edit"
                  onClick={updatePack}
                  style={{ color: "#21268F", backgroundColor: "#D7D8EF" }}
                />
              </>
            )}
            <Link to={`/cards/${p._id}`}>
              <BtnActions
                name="Learn"
                onClick={requestToLearnCard}
                style={{ color: "#21268F", backgroundColor: "#D7D8EF" }}
              />
            </Link>
          </div>
        </td>
      </tr>
    );
  });

  return (
    <div className={s.packsList}>
      <div className={s.ContentAside}>
        <h3 className={s.TitleButtons}>Show pack cards</h3>
        <div className={s.btnWrap}>
          <label style={{ display: "flex", alignItems: "center", gap: "2px" }}>
            <input
              type={"checkbox"}
              checked={user_id !== ""}
              onChange={checkMyHandler}
            />
            My Packs
          </label>
        </div>{" "}
        {/*для кнопок My/All*/}
        <h3 className={s.TitleSlider}>Number of cards</h3>
        <div className={s.sliderWrap}>
          {/*<SuperDoubleRange min={minCardsCount} max={maxCardsCount} onChange={}/>*/}
        </div>
      </div>
      <div className={s.ContentMain}>
        <Subtitle
          subtitle="Packs list"
          style={{ width: "max-content", marginBottom: "15px" }}
        />

        <div className={s.contentRightTop}>
          {error && <div>{error}</div>}
          <div
            style={{
              display: "flex",
              gap: "40px",
              width: "100%",
            }}
          >
            <div style={{ width: "460px" }}>
              <SearchField
                searchValue={searchValue}
                setSearchValue={onChangeSearchValue}
              />
            </div>

            <SuperButton onClick={addPackHandler} style={{ width: "184px" }}>
              Add new pack
            </SuperButton>
          </div>
        </div>

        <div className={s.tableMain}>
          <table className={s.table}>
            <thead className={s.tableHeader}>
              <tr className={s.tr}>
                <th className={s.th}>
                  <Sort
                    sortHandlerUp={sortNameHandlerUp}
                    sortHandlerDown={sortNameHandlerDown}
                    title={"Name"}
                  />
                </th>
                <th align="center" className={s.th}>
                  <Sort
                    sortHandlerUp={sortCardsCountHandlerUp}
                    sortHandlerDown={sortCardsCountHandlerDown}
                    title={"Cards"}
                  />
                </th>
                <th align="center" className={s.th}>
                  <Sort
                    sortHandlerUp={sortUpdatedHandlerUp}
                    sortHandlerDown={sortUpdatedHandlerDown}
                    title={"Last Updated"}
                  />
                </th>
                <th className={s.th} style={{ textAlign: "center" }}>
                  <Sort
                    sortHandlerUp={sortCreatedByHandlerUp}
                    sortHandlerDown={sortCreatedByHandlerDown}
                    title={"Created by"}
                  />
                </th>
                <th className={s.th}>Actions</th>
              </tr>
            </thead>

            <tbody>{packList}</tbody>
          </table>
        </div>

        <div className={s.SelectWrap}>
          <Paginator
            totalCount={cardPacksTotalCount}
            pageSize={pageCount}
            currentPage={page}
            onChangedPage={onChangedPage}
          />

          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <span> Show </span>
            <select style={s.SelectBox} onChange={onChangePageCountHandler}>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
              <option value={40}>40</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span>Cards per Page</span>
          </div>
        </div>
      </div>
    </div>
  );
};
