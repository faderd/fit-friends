import { ChangeEvent, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ReactHookFormData } from '../../pages/register-page/register-page';

type InputLoadFvatarProps = {
  form: UseFormReturn<ReactHookFormData>;
}

function InputLoadFvatar({ form }: InputLoadFvatarProps): JSX.Element {
  const [avatar, setAvatar] = useState<File | null>(null);
  const { register } = form;

  const handleAvatarOnChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (!evt.target.files) { return; }

    setAvatar(evt.target.files[0]);
  };

  return (
    <>
      <div className="input-load-avatar">
        <label>
          <input
            className="visually-hidden"
            type="file"
            accept="image/png, image/jpeg"
            {...register('avatar')}
            onChange={handleAvatarOnChange}
          />
          <span className="input-load-avatar__btn">
            {!avatar && (<svg width="20" height="20" aria-hidden="true">
              <use xlinkHref="#icon-import"></use>
            </svg>)}
          </span>
        </label>
      </div>
      <div className="sign-up__description">
        <h2 className="sign-up__legend">Загрузите фото профиля</h2><span className="sign-up__text">JPG, PNG, оптимальный размер 100&times;100&nbsp;px</span>
      </div>
    </>
  );
}

export default InputLoadFvatar;
