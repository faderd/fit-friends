import { makeNewFriendsList } from '../../../helpers';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { updateUser } from '../../store/api-actions';
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
        const newFriendsList = makeNewFriendsList(action, friendId, userFriends);

        dispatch(updateUser({ friends: newFriendsList }))
      }}>
      {isFriend ? 'Удалить из друзей' : 'Добавить в друзья'}</button>
  );
}

export default ButtonAddRemoveFriend;
