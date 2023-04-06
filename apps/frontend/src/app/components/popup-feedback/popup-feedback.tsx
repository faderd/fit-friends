import { ReviewLengthRange } from '@fit-friends/shared-types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { fetchTrainings, submitNewReview } from '../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useState } from 'react';
import { getIsDataLoaded } from '../../store/app-data/selectors';
import { toast } from 'react-toastify';

const DEFAULT_RATE = 5;

type PopupFeedbackProps = {
  setIsPopupFeedbackOpen: (isPopupFeedbackOpen: boolean) => void;
  trainingId: number;
}

type ReactHookFormData = {
  description: string;
}

function PopupFeedback({ setIsPopupFeedbackOpen, trainingId }: PopupFeedbackProps): JSX.Element {
  const dispatch = useAppDispatch();

  const isDataLoaded = useAppSelector(getIsDataLoaded);

  const [rate, setRate] = useState(DEFAULT_RATE);

  const { register, handleSubmit, formState: { errors } } = useForm<ReactHookFormData>();

  const onSubmit: SubmitHandler<ReactHookFormData> = async (reactHookFormData) => {
    const reviewData = {
      text: reactHookFormData.description,
      rate,
      trainingId
    };

    dispatch(submitNewReview(reviewData))
      .then((data) => {
        if (data.payload) {
          dispatch(fetchTrainings({}));
          setIsPopupFeedbackOpen(false);
          window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
          });
          toast.info('Комментарий создан');
        }
      });
  };

  return (
    <div className="popup-form popup-form--feedback">
      <section className="popup">
        <div className="popup__wrapper">
          <div className="popup-head">
            <h2 className="popup-head__header">Оставить отзыв</h2>
            <button
              className="btn-icon btn-icon--outlined btn-icon--big"
              type="button"
              aria-label="close"
              onClick={() => setIsPopupFeedbackOpen(false)}
            >
              <svg width="20" height="20" aria-hidden="true">
                <use xlinkHref="#icon-cross"></use>
              </svg>
            </button>
          </div>
          <div className="popup__content popup__content--feedback">
            <h3 className="popup__feedback-title">Оцените тренировку</h3>
            <ul className="popup__rate-list">
              <li className="popup__rate-item">
                <div className="popup__rate-item-wrap">
                  <label>
                    <input type="radio" name="оценка тренировки" aria-label="оценка 1." value="1"
                      disabled={!isDataLoaded}
                      checked={rate === 1}
                      onChange={(evt) => setRate(+evt.target.value)}
                    /><span className="popup__rate-number">1</span>
                  </label>
                </div>
              </li>
              <li className="popup__rate-item">
                <div className="popup__rate-item-wrap">
                  <label>
                    <input type="radio" name="оценка тренировки" aria-label="оценка 2." value="2"
                      disabled={!isDataLoaded}
                      checked={rate === 2}
                      onChange={(evt) => setRate(+evt.target.value)}
                    /><span className="popup__rate-number">2</span>
                  </label>
                </div>
              </li>
              <li className="popup__rate-item">
                <div className="popup__rate-item-wrap">
                  <label>
                    <input type="radio" name="оценка тренировки" aria-label="оценка 3." value="3"
                      disabled={!isDataLoaded}
                      checked={rate === 3}
                      onChange={(evt) => setRate(+evt.target.value)}
                    /><span className="popup__rate-number">3</span>
                  </label>
                </div>
              </li>
              <li className="popup__rate-item">
                <div className="popup__rate-item-wrap">
                  <label>
                    <input type="radio" name="оценка тренировки" aria-label="оценка 4." value="4"
                      disabled={!isDataLoaded}
                      checked={rate === 4}
                      onChange={(evt) => setRate(+evt.target.value)}
                    /><span className="popup__rate-number">4</span>
                  </label>
                </div>
              </li>
              <li className="popup__rate-item">
                <div className="popup__rate-item-wrap">
                  <label>
                    <input type="radio" name="оценка тренировки" aria-label="оценка 5." value="5"
                      disabled={!isDataLoaded}
                      checked={rate === 5}
                      onChange={(evt) => setRate(+evt.target.value)}
                    /><span className="popup__rate-number">5</span>
                  </label>
                </div>
              </li>
            </ul>
            <div className="popup__feedback">
              <h3 className="popup__feedback-title popup__feedback-title--text">Поделитесь своими впечатлениями о тренировке</h3>
              <div className="popup__feedback-textarea">
                <div className={`custom-textarea ${errors.description && 'custom-textarea--error'}`}>
                  <label>
                    <textarea
                      placeholder=" "
                      disabled={!isDataLoaded}
                      {...register('description', {
                        required: true,
                        minLength: ReviewLengthRange.Min,
                        maxLength: ReviewLengthRange.Max,
                      })}
                    ></textarea>
                    {errors.description && (
                      <span className='custom-input--error custom-textarea--error'>{`Возможное значение от ${ReviewLengthRange.Min} до ${ReviewLengthRange.Max} символов`}
                      </span>
                    )}
                  </label>
                </div>
              </div>
            </div>
            <div className="popup__button">
              <button className="btn" type="button"
                disabled={!isDataLoaded}
                onClick={handleSubmit(onSubmit)}>Продолжить</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PopupFeedback;
