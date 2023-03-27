import { TrainingLevel } from '@fit-friends/shared-types';
import { UserData } from '../../types/user-data';
import ButtonAddRemoveFriend from '../button-add-remove-friend/button-add-remove-friend';

type UserCardUserProps = {
  user: UserData;
}

function UserCardUser({ user }: UserCardUserProps): JSX.Element {
  const trainingTypes = user.questionnaire?.trainingTypes || [];

  return (
    <div className="inner-page__content">
      <section className="user-card">
        <h1 className="visually-hidden">Карточка пользователя</h1>
        <div className="user-card__wrapper">
          <div className="user-card__content">
            <div className="user-card__head">
              <h2 className="user-card__title">{user.name}</h2>
              {user.questionnaire?.trainingLevel === TrainingLevel.Professional && (<div className="user-card__icon">
                <svg className="user-card__crown" width="12" height="12" aria-hidden="true">
                  <use xlinkHref="#icon-crown"></use>
                </svg>
              </div>)}
            </div>
            <div className="user-card__label">
              <svg className="user-card__icon-location" width="12" height="14" aria-hidden="true">
                <use xlinkHref="#icon-location"></use>
              </svg><span>{user.location}</span>
            </div>
            {user.questionnaire?.isReadyToTrain && (<div className="user-card__status"><span>Готов к тренировке</span></div>)}
            <div className="user-card__text">
              {user.questionnaire?.merits}
            </div>
            <ul className="user-card__hashtag-list">
              {trainingTypes.map((trainingType) => (
                <li className="user-card__hashtag-item">
                  <div className="hashtag">
                    <span>#{trainingType.toLowerCase()}</span>
                  </div>
                </li>
              ))}
            </ul>
            <ButtonAddRemoveFriend friendId={user.id} />
          </div>
          <div className="user-card__gallary">
            <ul className="user-card__gallary-list">
              <li className="user-card__gallary-item"><img src="img/content/user-card-photo1.jpg" srcSet="img/content/user-card-photo1@2x.jpg 2x" width="334" height="573" alt="photo1" />
              </li>
              <li className="user-card__gallary-item"><img src="img/content/user-card-photo2.jpg" srcSet="img/content/user-card-photo2@2x.jpg 2x" width="334" height="573" alt="photo2" />
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default UserCardUser;
