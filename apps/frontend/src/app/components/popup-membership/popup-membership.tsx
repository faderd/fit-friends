import { GymInterface, GymOption, OrderType, PaymentMethod } from '@fit-friends/shared-types';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getIsDataLoaded } from '../../store/app-data/selectors';
import { useState } from 'react';
import { submitNewOrder } from '../../store/api-actions';
import { toast } from 'react-toastify';

const DEFAULT_OPTION_PRICE = 1000;
const DEFAULT_QUANTITY = 1;
const DEFAULT_PAYMENT_METHOD = PaymentMethod.Mir;

type PopoupMembershipProps = {
  setIsPopupMembershipOpen: (isPopupMembershipOpen: boolean) => void;
  gym: GymInterface;
}

function PopoupMembership({ setIsPopupMembershipOpen, gym }: PopoupMembershipProps): JSX.Element {
  const dispatch = useAppDispatch();

  const isDataLoaded = useAppSelector(getIsDataLoaded);
  const [quantity, setQuantity] = useState(DEFAULT_QUANTITY);
  const [options, setOptions] = useState<GymOption[]>([]);
  const [paymentMethod, setPaymentMethod] = useState(DEFAULT_PAYMENT_METHOD);

  const getOptionIsChecked = (option: GymOption) => options.includes(option);

  const handleCheckedOption = (typeOfInputElement: GymOption) => {
    const index = options.findIndex((optionItem) => optionItem === typeOfInputElement);

    index === -1
      ? setOptions([...options, typeOfInputElement])
      : setOptions([...options.slice(0, index), ...options.slice(index + 1)]);
  };

  const calculatePrice = () => gym.price * quantity + options.length * DEFAULT_OPTION_PRICE;

  const handleSubmit = () => {
    if (!gym.id) { return; }

    const orderData = {
      type: OrderType.Subscription,
      price: calculatePrice(),
      count: quantity,
      paymentMethod,
      entityId: gym.id,
    }

    dispatch(submitNewOrder(orderData))
      .then((data) => {
        if (data.payload) {
          setIsPopupMembershipOpen(false);
          toast.info('Заказ создан');
        }
      });
  };

  return (
    <div className="popup-form popup-form--membership">
      <section className="popup">
        <div className="popup__wrapper">
          <div className="popup-head">
            <h2 className="popup-head__header">Оформить абонемент</h2>
            <button
              className="btn-icon btn-icon--outlined btn-icon--big"
              type="button"
              aria-label="close"
              onClick={() => setIsPopupMembershipOpen(false)}
            >
              <svg width="20" height="20" aria-hidden="true">
                <use xlinkHref="#icon-cross"></use>
              </svg>
            </button>
          </div>
          <div className="popup__content popup__content--membership">
            <div className="popup__product">
              <div className="popup__product-image">
                <picture>
                  <source type="image/webp" srcSet="img/content/popup/popup-worldsport.webp, img/content/popup/popup-worldsport@2x.webp 2x" /><img src="img/content/popup/popup-worldsport.jpg" srcSet="img/content/popup/popup-worldsport@2x.jpg 2x" width="98" height="80" alt="" />
                </picture>
              </div>
              <div className="popup__product-info">
                <h3 className="popup__product-title">{gym.name}</h3>
                <p className="popup__product-price">{gym.price} ₽</p>
              </div>
              <div className="popup__product-quantity">
                <p className="popup__quantity">Количество</p>
                <div className="input-quantity">
                  <button
                    className="btn-icon btn-icon--quantity"
                    type="button"
                    aria-label="minus"
                    onClick={() => {
                      if (quantity > 1) {
                        setQuantity(quantity - 1);
                      }
                    }}
                  >
                    <svg width="12" height="12" aria-hidden="true">
                      <use xlinkHref="#icon-minus"></use>
                    </svg>
                  </button>
                  <div className="input-quantity__input">
                    <label>
                      <input
                        type="text"
                        value={quantity}
                        size={2}
                        readOnly />
                    </label>
                  </div>
                  <button
                    className="btn-icon btn-icon--quantity"
                    type="button"
                    aria-label="plus"
                    onClick={() => { setQuantity(quantity + 1) }}
                  >
                    <svg width="12" height="12" aria-hidden="true">
                      <use xlinkHref="#icon-plus"></use>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <section className="services-check">
              <h4 className="services-check__title">Дополнительные услуги ({DEFAULT_OPTION_PRICE} ₽)</h4>
              <ul className="services-check__list">
                {
                  gym.options.map((option) => (
                    <li className="services-check__item">
                      <div className="custom-toggle custom-toggle--checkbox">
                        <label>
                          <input
                            type="checkbox"
                            value={option}
                            name="user-agreement"
                            checked={getOptionIsChecked(option)}
                            onChange={(evt) => handleCheckedOption(evt.target.value as GymOption)}
                            disabled={!isDataLoaded}
                          /><span className="custom-toggle__icon">
                            <svg width="9" height="6" aria-hidden="true">
                              <use xlinkHref="#arrow-check"></use>
                            </svg></span><span className="custom-toggle__label">{option}</span>
                        </label>
                      </div>
                    </li>
                  ))
                }
              </ul>
            </section>
            <section className="payment-method">
              <h4 className="payment-method__title">Выберите способ оплаты</h4>
              <ul className="payment-method__list">
                <li className="payment-method__item">
                  <div className="btn-radio-image">
                    <label>
                      <input
                        type="radio"
                        name="payment-membership"
                        aria-label="Visa."
                        checked={paymentMethod === PaymentMethod.Visa}
                        onChange={() => { setPaymentMethod(PaymentMethod.Visa) }}
                      /><span className="btn-radio-image__image">
                        <svg width="58" height="20" aria-hidden="true">
                          <use xlinkHref="#visa-logo"></use>
                        </svg></span>
                    </label>
                  </div>
                </li>
                <li className="payment-method__item">
                  <div className="btn-radio-image">
                    <label>
                      <input
                        type="radio"
                        name="payment-membership"
                        aria-label="Мир."
                        checked={paymentMethod === PaymentMethod.Mir}
                        onChange={() => { setPaymentMethod(PaymentMethod.Mir) }}
                      /><span className="btn-radio-image__image">
                        <svg width="66" height="20" aria-hidden="true">
                          <use xlinkHref="#mir-logo"></use>
                        </svg></span>
                    </label>
                  </div>
                </li>
                <li className="payment-method__item">
                  <div className="btn-radio-image">
                    <label>
                      <input
                        type="radio"
                        name="payment-membership"
                        aria-label="Iomoney."
                        checked={paymentMethod === PaymentMethod.Umoney}
                        onChange={() => { setPaymentMethod(PaymentMethod.Umoney) }}
                      /><span className="btn-radio-image__image">
                        <svg width="106" height="24" aria-hidden="true">
                          <use xlinkHref="#iomoney-logo"></use>
                        </svg></span>
                    </label>
                  </div>
                </li>
              </ul>
            </section>
            <div className="popup__total">
              <p className="popup__total-text">Итого</p>
              <svg className="popup__total-dash" width="310" height="2" aria-hidden="true">
                <use xlinkHref="#dash-line"></use>
              </svg>
              <div>
                <p className="popup__total-price">{calculatePrice()}&nbsp;₽&nbsp;</p>
              </div>
            </div>
            <div className="popup__button">
              <button className="btn" type="button"
                onClick={handleSubmit}
              >Купить</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PopoupMembership;
