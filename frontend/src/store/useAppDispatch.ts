import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../state/store'; // Предположим, что у вас есть файл store.ts с RootState и AppDispatch

// Создание кастомного хука для использования useDispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Создание кастомного хука для использования useSelector с типизацией RootState
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;