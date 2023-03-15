import { TrainingLevel } from '@fit-friends/shared-types';

type TrainingLevelCheckboxProps = {
  setTrainingLevel: (trainingLevel: TrainingLevel) => void;
  trainingLevel: TrainingLevel;
  className: string;
}

function TrainingLevelCheckbox({ setTrainingLevel, trainingLevel, className }: TrainingLevelCheckboxProps): JSX.Element {
  return (
    <div className={className}><span className="questionnaire-user__legend">Ваш уровень</span>
      <div className="custom-toggle-radio custom-toggle-radio--big questionnaire-user__radio">
        <div className="custom-toggle-radio__block">
          <label>
            <input type="radio" name="level"
              checked={trainingLevel === TrainingLevel.Beginner ? true : false}
              onChange={() => { setTrainingLevel(TrainingLevel.Beginner) }} /><span className="custom-toggle-radio__icon"></span><span className="custom-toggle-radio__label">Новичок</span>
          </label>
        </div>
        <div className="custom-toggle-radio__block">
          <label>
            <input type="radio" name="level"
              checked={trainingLevel === TrainingLevel.Amateur ? true : false}
              onChange={() => { setTrainingLevel(TrainingLevel.Amateur) }} /><span className="custom-toggle-radio__icon"></span><span className="custom-toggle-radio__label">Любитель</span>
          </label>
        </div>
        <div className="custom-toggle-radio__block">
          <label>
            <input type="radio" name="level"
              checked={trainingLevel === TrainingLevel.Professional ? true : false}
              onChange={() => { setTrainingLevel(TrainingLevel.Professional) }} /><span className="custom-toggle-radio__icon"></span><span className="custom-toggle-radio__label">Профессионал</span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default TrainingLevelCheckbox;
