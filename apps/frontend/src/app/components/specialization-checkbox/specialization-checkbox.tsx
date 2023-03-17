import { MAX_TRAINING_TYPE_LENGTH, TrainingType } from '@fit-friends/shared-types';
import { useAppSelector } from '../../hooks';
import { getIsDataLoaded } from '../../store/app-data/selectors';

type SpecializationCheckboxProps = {
  trainingTypes: TrainingType[];
  setTrainingType: (trainingTypes: TrainingType[]) => void;
  className: string;
}

function SpecializationCheckbox({ trainingTypes, setTrainingType, className }: SpecializationCheckboxProps): JSX.Element {
  const isDataLoaded = useAppSelector(getIsDataLoaded);

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
    <div className={`specialization-checkbox ${className}`}>
      <div className="btn-checkbox">
        <label>
          <input className="visually-hidden" type="checkbox" name="specialization" value="yoga"
            checked={getTrainingTypeIsChecked(TrainingType.Yoga)}
            onChange={() => handleCheckedTrainingType(TrainingType.Yoga)}
            disabled={!isDataLoaded}
          /><span className={`btn-checkbox__btn ${!isDataLoaded ? 'is-disabled' : ''}`}>Йога</span>
        </label>
      </div>
      <div className="btn-checkbox">
        <label>
          <input className="visually-hidden" type="checkbox" name="specialization" value="running"
            checked={getTrainingTypeIsChecked(TrainingType.Running)}
            onChange={() => handleCheckedTrainingType(TrainingType.Running)}
            disabled={!isDataLoaded}
          /><span className={`btn-checkbox__btn ${!isDataLoaded ? 'is-disabled' : ''}`}>Бег</span>
        </label>
      </div>
      <div className="btn-checkbox">
        <label>
          <input className="visually-hidden" type="checkbox" name="specialization" value="aerobics"
            checked={getTrainingTypeIsChecked(TrainingType.Aerobics)}
            onChange={() => handleCheckedTrainingType(TrainingType.Aerobics)}
            disabled={!isDataLoaded}
          /><span className={`btn-checkbox__btn ${!isDataLoaded ? 'is-disabled' : ''}`}>Аэробика</span>
        </label>
      </div>
      <div className="btn-checkbox">
        <label>
          <input className="visually-hidden" type="checkbox" name="specialization" value="boxing"
            checked={getTrainingTypeIsChecked(TrainingType.Boxing)}
            onChange={() => handleCheckedTrainingType(TrainingType.Boxing)}
            disabled={!isDataLoaded}
          /><span className={`btn-checkbox__btn ${!isDataLoaded ? 'is-disabled' : ''}`}>Бокс</span>
        </label>
      </div>
      <div className="btn-checkbox">
        <label>
          <input className="visually-hidden" type="checkbox" name="specialization" value="power"
            checked={getTrainingTypeIsChecked(TrainingType.Power)}
            onChange={() => handleCheckedTrainingType(TrainingType.Power)}
            disabled={!isDataLoaded}
          /><span className={`btn-checkbox__btn ${!isDataLoaded ? 'is-disabled' : ''}`}>Силовые</span>
        </label>
      </div>
      <div className="btn-checkbox">
        <label>
          <input className="visually-hidden" type="checkbox" name="specialization" value="pilates"
            checked={getTrainingTypeIsChecked(TrainingType.Pilates)}
            onChange={() => handleCheckedTrainingType(TrainingType.Pilates)}
            disabled={!isDataLoaded}
          /><span className={`btn-checkbox__btn ${!isDataLoaded ? 'is-disabled' : ''}`}>Пилатес</span>
        </label>
      </div>
      <div className="btn-checkbox">
        <label>
          <input className="visually-hidden" type="checkbox" name="specialization" value="stretching"
            checked={getTrainingTypeIsChecked(TrainingType.Stretching)}
            onChange={() => handleCheckedTrainingType(TrainingType.Stretching)}
            disabled={!isDataLoaded}
          /><span className={`btn-checkbox__btn ${!isDataLoaded ? 'is-disabled' : ''}`}>Стрейчинг</span>
        </label>
      </div>
      <div className="btn-checkbox">
        <label>
          <input className="visually-hidden" type="checkbox" name="specialization" value="crossfit"
            checked={getTrainingTypeIsChecked(TrainingType.Crossfit)}
            onChange={() => handleCheckedTrainingType(TrainingType.Crossfit)}
            disabled={!isDataLoaded}
          /><span className={`btn-checkbox__btn ${!isDataLoaded ? 'is-disabled' : ''}`}>Кроссфит</span>
        </label>
      </div>
    </div>
  );
}

export default SpecializationCheckbox;
