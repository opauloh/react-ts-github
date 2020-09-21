import { Dispatch, useContext, useEffect } from 'react';
import { getProfile } from '../api';
import UserContext from '../contexts/userContext';
import { ResultAction, ResultState } from '../reducers/resultReducer';

const useProfile = (username: string) => {
  const [{ error, profile, loading }, dispatch]: [
    ResultState,
    Dispatch<ResultAction>
  ] = useContext(UserContext);

  useEffect(() => {
    dispatch({ type: 'loading' });
    getProfile(username)
      .then((profile) => dispatch({ type: 'success', profile }))
      .catch(({ message }) => dispatch({ type: 'error', error: message }));
  }, [username]);

  return {
    error,
    profile,
    loading
  };
};

export default useProfile;
