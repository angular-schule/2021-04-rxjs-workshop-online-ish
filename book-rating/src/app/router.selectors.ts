import { getSelectors, RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector } from '@ngrx/store';

export const selectRouterState = createFeatureSelector<RouterReducerState>('router');

export const { selectRouteParam, selectRouteParams } = getSelectors(selectRouterState);