import { useAppDispatch, useAppSelector } from '../../hooks';
import { addOrRemoveFriend, fetchFriends } from '../../store/api-actions';
import { getIsFriend, getUser } from '../../store/user-process/selectors';

type ButtonAddRemoveFriendProps = {
  friendId: number;
}

function ButtonAddRemoveFriend({ friendId }: ButtonAddRemoveFriendProps): JSX.Element {
  const dispatch = useAppDispatch();

  const isFriend = useAppSelector(getIsFriend(friendId));
  const userFriends = useAppSelector(getUser)?.friends;

  return (
    <button
      className={
        isFriend ? 'btn btn--outlined' : 'btn user-card__btn'
      }
      type="button"
      onClick={() => {
        if (!userFriends) { return; }

        const action = isFriend ? 'remove' : 'add';

        dispatch(addOrRemoveFriend({ action, friendId }))
          .then(() => {
            dispatch(fetchFriends());
          });
      }}>
      {isFriend ? 'Удалить из друзей' : 'Добавить в друзья'}</button>
  );
}

export default ButtonAddRemoveFriend;
