import { RequestPersonalTrainingInterface, StatusRequestTraining, UserRole } from '@fit-friends/shared-types';
import { useAppDispatch } from '../../hooks';
import { fetchPersonalTrainingRequests, fetchPersonalTrainingRequestsForMe, submitPersonalTrainingRequest, submitUpdatedPersonalTrainingRequest } from '../../store/api-actions';
import { UserRdo } from '../../types/user-rdo';

type FriendsListItemProps = {
  user: UserRdo;
  myPersonalTrainingRequest?: RequestPersonalTrainingInterface;
  personalTrainingRequestForMe?: RequestPersonalTrainingInterface;
}

function FriendsListItem({ user, myPersonalTrainingRequest, personalTrainingRequestForMe }: FriendsListItemProps): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <li className="friends-list__item">
      <div className="thumbnail-friend">
        <div className={`thumbnail-friend__info ${user.role === UserRole.User ? 'thumbnail-friend__info--theme-light' : 'thumbnail-friend__info--theme-dark'}`}>
          <div className="thumbnail-friend__image-status">
            <div className="thumbnail-friend__image">
              <picture>
                <source type="image/webp" srcSet="img/content/thumbnails/friend-08.webp, img/content/thumbnails/friend-08@2x.webp 2x" /><img src="img/content/thumbnails/friend-08.jpg" srcSet="img/content/thumbnails/friend-08@2x.jpg 2x" width="78" height="78" alt="" />
              </picture>
              <div className="thumbnail-friend__online-status thumbnail-friend__online-status--is-online"></div>
            </div>
          </div>
          <div className="thumbnail-friend__header">
            <h2 className="thumbnail-friend__name">{user.name}</h2>
            <div className="thumbnail-friend__location">
              <svg width="14" height="16" aria-hidden="true">
                <use xlinkHref="#icon-location"></use>
              </svg>
              <address className="thumbnail-friend__location-address">{user.location}</address>
            </div>
          </div>
          <ul className="thumbnail-friend__training-types-list">
            {
              user.questionnaire?.trainingTypes && user.questionnaire.trainingTypes.map((type) => (
                <li key={type}>
                  <div className="hashtag thumbnail-friend__hashtag"><span>#{type}</span></div>
                </li>
              ))
            }
          </ul>
          <div className="thumbnail-friend__activity-bar">
            {user.questionnaire?.isReadyToTrain && (
              <div className="thumbnail-friend__ready-status thumbnail-friend__ready-status--is-ready"><span>Готов к&nbsp;тренировке</span>
              </div>)
            }
            {!user.questionnaire?.isReadyToTrain && (
              <div className="thumbnail-friend__ready-status thumbnail-friend__ready-status--is-not-ready"><span>Не&nbsp;готов к&nbsp;тренировке</span>
              </div>)
            }
            {user.questionnaire?.isReadyToTrain && !myPersonalTrainingRequest && !personalTrainingRequestForMe && (
              <button className={`thumbnail-friend__invite-button${user.role === UserRole.Coach ? ' thumbnail-friend__invite-button--light' : ''}`} type="button"
                onClick={() => {
                  dispatch(submitPersonalTrainingRequest({ targetUserId: user.id }))
                    .then(() => {
                      dispatch(fetchPersonalTrainingRequests());
                    });
                }}
              >
                <svg width="43" height="46" aria-hidden="true" focusable="false">
                  <use xlinkHref="#icon-invite"></use>
                </svg><span className="visually-hidden">Пригласить друга на совместную тренировку</span>
              </button>)
            }
          </div>
        </div>
        {personalTrainingRequestForMe && (<div className="thumbnail-friend__request-status thumbnail-friend__request-status--role-user">
          <p className="thumbnail-friend__request-text">Запрос на&nbsp;совместную тренировку{personalTrainingRequestForMe.status !== StatusRequestTraining.Consideration && (` был вами ${personalTrainingRequestForMe.status}`)}</p>
          <div className="thumbnail-friend__button-wrapper">
            <button className="btn btn--medium btn--dark-bg thumbnail-friend__button" type="button"
              disabled={personalTrainingRequestForMe.status !== StatusRequestTraining.Consideration}
              onClick={() => {
                if (!personalTrainingRequestForMe.id) { return; }
                dispatch(submitUpdatedPersonalTrainingRequest({ id: personalTrainingRequestForMe.id, status: StatusRequestTraining.Accepted }))
                  .then(() => {
                    dispatch(fetchPersonalTrainingRequestsForMe);
                  });
              }}
            >Принять</button>
            <button className="btn btn--medium btn--outlined btn--dark-bg thumbnail-friend__button" type="button"
              disabled={personalTrainingRequestForMe.status !== StatusRequestTraining.Consideration}
              onClick={() => {
                if (!personalTrainingRequestForMe.id) { return; }
                dispatch(submitUpdatedPersonalTrainingRequest({ id: personalTrainingRequestForMe.id, status: StatusRequestTraining.Rejected }))
                  .then(() => {
                    dispatch(fetchPersonalTrainingRequestsForMe);
                  });
              }}
            >Отклонить</button>
          </div>
        </div>)}
        {myPersonalTrainingRequest && (<div className="thumbnail-friend__request-status thumbnail-friend__request-status--role-coach">
          <p className="thumbnail-friend__request-text">Запрос на&nbsp;{user.role === UserRole.User ? 'совместную' : 'персональную'} тренировку {myPersonalTrainingRequest.status.toLowerCase()}</p>
        </div>)}
      </div>
    </li>
  );
}

export default FriendsListItem;
