import { TrainingLevel, UserRole } from '@fit-friends/shared-types';
import { AppRoute } from '../../../const';
import { generatePath, Link } from 'react-router-dom';
import { UserRdo } from '../../types/user-rdo';

type UserCatalogItemProps = {
  user: UserRdo;
  isDark?: boolean;
}

function UserCatalogItem({ user, isDark }: UserCatalogItemProps): JSX.Element {
  const userRoleClassName = user.role === UserRole.Coach
    ? 'thumbnail-user--role-coach'
    : 'thumbnail-user--role-user';
  const topStatusClassName = user.role === UserRole.Coach
    ? 'thumbnail-user__top-status--role-coach'
    : 'thumbnail-user__top-status--role-user';
  const darkClassName = isDark
    ? 'thumbnail-user--dark'
    : '';
  const isBtnOutlinedClassName = isDark
    ? 'btn--outlined'
    : '';
  const trainingTypes = user.questionnaire?.trainingTypes || [];
  return (
    <li className="users-catalog__item">
      <div className={`thumbnail-user ${userRoleClassName} ${darkClassName}`}>
        <div className="thumbnail-user__image">
          <picture>
            <source type="image/webp"
              srcSet={`${user.avatar}.webp, ${user.avatar}@2x.webp 2x`} />
            <img src={`${user.avatar}.png`} srcSet={`${user.avatar}@2x.png 2x`} width="82" height="82" alt="" />
          </picture>
        </div>
        {user.questionnaire?.trainingLevel === TrainingLevel.Professional && (
          <div className={`thumbnail-user__top-status ${topStatusClassName}`}>
            <svg width="12" height="12" aria-hidden="true">
              <use xlinkHref="#icon-crown"></use>
            </svg>
          </div>
        )}
        <div className="thumbnail-user__header">
          <h3 className="thumbnail-user__name">{user.name}</h3>
          <div className="thumbnail-user__location">
            <svg width="14" height="16" aria-hidden="true">
              <use xlinkHref="#icon-location"></use>
            </svg>
            <address className="thumbnail-user__location-address">{user.location}</address>
          </div>
        </div>
        <ul className="thumbnail-user__hashtags-list">
          {trainingTypes.map((trainingType) => (
            <li className="thumbnail-user__hashtags-item">
              <div className="hashtag thumbnail-user__hashtag">
                <span>#{trainingType.toLowerCase()}</span>
              </div>
            </li>
          ))}
        </ul>
        <Link className={`btn btn--dark-bg btn--medium thumbnail-user__button ${isBtnOutlinedClassName}`} to={generatePath(AppRoute.UserCard, { id: `${user.id}` })}>Подробнее</Link>
      </div>
    </li>
  );
}

export default UserCatalogItem;
