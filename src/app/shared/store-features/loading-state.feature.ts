import { signalStoreFeature, withComputed, withState } from '@ngrx/signals';
import { computed } from '@angular/core';

export type LoadingStatus =
  | 'idle'
  | 'pending'
  | 'fulfilled'
  | { error: string };
export type LoadingState = { loadingStatus: LoadingStatus };

export function withLoadingState() {
  return signalStoreFeature(
    withState<LoadingState>({ loadingStatus: 'idle' }),
    withComputed(({ loadingStatus }) => ({
      isPending: computed(() => loadingStatus() === 'pending'),
      isFulfilled: computed(() => loadingStatus() === 'fulfilled'),
      isIdle: computed(() => loadingStatus() === 'idle'),
      isError: computed(() => {
        const status = loadingStatus();

        return typeof status === 'object' ? status.error : null;
      }),
    })),
  );
}

export function setPending(): LoadingState {
  return { loadingStatus: 'pending' };
}

export function setFulfilled(): LoadingState {
  return { loadingStatus: 'fulfilled' };
}

export function setError(error: string): LoadingState {
  return { loadingStatus: { error } };
}
