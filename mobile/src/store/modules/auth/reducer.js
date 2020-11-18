import produce from 'immer';

const INITIAL_STATE = {
  accessToken: null,
  signed: false,
  loading: false,
};

export default function auth(state = { INITIAL_STATE }, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_REQUEST': {
        draft.loading = true;
        break;
      }

      case '@auth/SIGN_IN_SUCCESS': {
        draft.accessToken = action.payload.accessToken;
        draft.signed = true;
        draft.loading = false;
        break;
      }

      case '@auth/SIGN_FAILURE': {
        draft.loading = false;
        break;
      }

      case '@auth/SIGN_OUT': {
        draft.accessToken = null;
        draft.signed = false;
        break;
      }

      default:
    }
  });
}
