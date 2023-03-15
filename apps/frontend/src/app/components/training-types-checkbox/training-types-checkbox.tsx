import { MAX_TRAINING_TYPE_LENGTH, TrainingType } from '@fit-friends/shared-types';

type TrainingTypesCheckboxProps = {
  setTrainingType: (trainingTypes: TrainingType[]) => void;
  trainingTypes: TrainingType[];
  className: string;
}

function TrainingTypesCheckbox({trainingTypes, setTrainingType, className}: TrainingTypesCheckboxProps): JSX.Element {
  const getTrainingTypeIsChecked = (typeOfInputElement: TrainingType) => {
    return trainingTypes.includes(typeOfInputElement);
  };

  const handleCheckedTrainingType = (typeOfInputElement: TrainingType) => {
    const index = trainingTypes.findIndex((typeItem) => typeItem === typeOfInputElement);

    const newTrainingTypes = trainingTypes.map((trainingTypeItem) => trainingTypeItem);

    if (index === -1) {
      if (newTrainingTypes.length >= MAX_TRAINING_TYPE_LENGTH) {
        return;
      }
      newTrainingTypes.push(typeOfInputElement);
      setTrainingType(newTrainingTypes);
    } else {
      newTrainingTypes.splice(index, 1);
      setTrainingType(newTrainingTypes);
    }
  };

  return (
    <div className={className}>
      <span className="questionnaire-user__legend">Ваша специализация (тип) тренировок</span>
      <div className="specialization-checkbox questionnaire-user__specializations">
        <div className="btn-checkbox">
          <label>
            <input className="visually-hidden" type="checkbox" name="specialisation" value="yoga"
              checked={getTrainingTypeIsChecked(TrainingType.Yoga)}
              onChange={() => handleCheckedTrainingType(TrainingType.Yoga)}
            /><span className="btn-checkbox__btn">Йога</span>
          </label>
        </div>
        <div className="btn-checkbox">
          <label>
            <input className="visually-hidden" type="checkbox" name="specialisation" value="running"
              checked={getTrainingTypeIsChecked(TrainingType.Running)}
              onChange={() => handleCheckedTrainingType(TrainingType.Running)}
            /><span className="btn-checkbox__btn">Бег</span>
          </label>
        </div>
        <div className="btn-checkbox">
          <label>
            <input className="visually-hidden" type="checkbox" name="specialisation" value="power"
              checked={getTrainingTypeIsChecked(TrainingType.Power)}
              onChange={() => handleCheckedTrainingType(TrainingType.Power)}
            /><span className="btn-checkbox__btn">Силовые</span>
          </label>
        </div>
        <div className="btn-checkbox">
          <label>
            <input className="visually-hidden" type="checkbox" name="specialisation" value="aerobics"
              checked={getTrainingTypeIsChecked(TrainingType.Aerobics)}
              onChange={() => handleCheckedTrainingType(TrainingType.Aerobics)}
            />
            <span className="btn-checkbox__btn">Аэробика</span>
          </label>
        </div>
        <div className="btn-checkbox">
          <label>
            <input className="visually-hidden" type="checkbox" name="specialisation" value="crossfit"
              checked={getTrainingTypeIsChecked(TrainingType.Crossfit)}
              onChange={() => handleCheckedTrainingType(TrainingType.Crossfit)}
            /><span className="btn-checkbox__btn">Кроссфит</span>
          </label>
        </div>
        <div className="btn-checkbox">
          <label>
            <input className="visually-hidden" type="checkbox" name="specialisation" value="boxing"
              checked={getTrainingTypeIsChecked(TrainingType.Boxing)}
              onChange={() => handleCheckedTrainingType(TrainingType.Boxing)}
            /><span className="btn-checkbox__btn">Бокс</span>
          </label>
        </div>
        <div className="btn-checkbox">
          <label>
            <input className="visually-hidden" type="checkbox" name="specialisation" value="pilates"
              checked={getTrainingTypeIsChecked(TrainingType.Pilates)}
              onChange={() => handleCheckedTrainingType(TrainingType.Pilates)}
            /><span className="btn-checkbox__btn">Пилатес</span>
          </label>
        </div>
        <div className="btn-checkbox">
          <label>
            <input className="visually-hidden" type="checkbox" name="specialisation" value="stretching"
              checked={getTrainingTypeIsChecked(TrainingType.Stretching)}
              onChange={() => handleCheckedTrainingType(TrainingType.Stretching)}
            /><span className="btn-checkbox__btn">Стрейчинг</span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default TrainingTypesCheckbox;
