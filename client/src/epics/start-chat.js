import { ofType } from 'redux-observable';
import { actionTypes } from '../reducers/app';
import { mergeMap, withLatestFrom } from 'rxjs/operators';

const startChatEpic = (action$, state$, { openChat$ }) => action$.pipe(
  ofType(actionTypes.START_CHAT),
  withLatestFrom(state$),
  mergeMap(([_, state]) => {
    return openChat$(state.auth.authToken).pipe(
      map(isOpen => chatActions.setIsOpen(isOpen))
    );
  }),
);

export default startChatEpic;
