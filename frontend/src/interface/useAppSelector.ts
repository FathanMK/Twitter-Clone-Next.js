import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "./RootState";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
