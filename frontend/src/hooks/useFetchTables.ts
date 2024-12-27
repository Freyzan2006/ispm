


import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/useAppDispatch";
import { tablesThunk, tablesUserThunk } from "../store/slices/tablesSlice/tablesThunk";



interface UseFetchTablesParams {
  isBelongsUser: boolean | undefined;
}



export const useFetchTables = ({ isBelongsUser }: UseFetchTablesParams) => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user.id);

  useEffect(() => {
    if (isBelongsUser && userId !== undefined) {
      dispatch(tablesUserThunk({ userId }));
    } else if (!isBelongsUser) {
      dispatch(tablesThunk({}));
    }
  }, [dispatch, userId, isBelongsUser]);
};