/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { PrismaClient } from '@prisma/client';
import { GymPriceRange, MAX_TRAINING_TYPE_LENGTH } from '../../../libs/shared-types/src/lib/validate-range';
import { CaloriesLossRange, Gender, GymOption, MIN_TRAINING_PRICE, TrainingDuration, TrainingLevel, TrainingType, UserLocation } from '../../../libs/shared-types/src';

const ENTITY_COUNT = 10;
const MAX_TRAINING_PRICE = 10000;
const GYM_NAMES = ['REFORMA', 'NEO', 'FITSTAR', 'GRAND FITNESS', 'АТЛЕТИКА', 'WORLD SPORT', 'Super Stars', 'SEVEN FIT', 'GLOBE', 'НИНДЗЯ', 'SPORT UNIT', 'POWER FIT', 'FITREPUBLIC'];
const GYM_DESCRIPTIONS = [
  'Более 200 современных тренажеров, множество дополнительных фитнес-услуг и лучшие тренеры Санкт-Петербурга.',
  'Новый, небольшой и уютный спортивный комплекс с современным оборудованием и потрясающим видом на город.',
  'Комплекс площадью более 1200 м2, 20 зон для проведения разнообразных групповых и индивидуальных тренировок.',
  'Спортивный комплекс премиум-класса с 3 видами сауны, бассейном длинной 54 м., услугами массажиста и большой парковкой.',
  'Большой выбор направлений групповых занятий, от йоги до бокса. После упорной тренировки можно расслабиться в сауне.',
  'Огромный зал с отдельной зоной кроссфит. Разнообразное оборудование для занятий практически любым видом спорта.',
  'Стильный, современный комплекс в стиле лофт с большой кардио-зоной, зоной кроссфит и залами для тренировок.',
  'Известный тренажерный зал с многолетней историей. Профессиональные тренеры по боксу, силовым и другим специальностям.',
  'Настоящий рай для спортсменов: все виды тренажеров, простор и высокий уровень тренировок вам обеспечен.',
  'Небольшой стильный спортивный зал с самым необходимым оборудованием. Среди направлений: бокс, пилатес и йога.',
  'Потрясающий зал с панорамными окнами и вдохновляющим видом на город, огромное разнообразие направлений.',
  'Спортивный комплекс с тренажерным залом, комнатами для групповых занятий и огромным залом для бега.',
];
const GYM_IMAGES = [
  'img/content/thumbnails/gym-01',
  'img/content/thumbnails/gym-02',
  'img/content/thumbnails/gym-03',
  'img/content/thumbnails/gym-04',
  'img/content/thumbnails/gym-05',
  'img/content/thumbnails/gym-06',
  'img/content/thumbnails/gym-07',
  'img/content/thumbnails/gym-08',
  'img/content/thumbnails/gym-09',
  'img/content/thumbnails/gym-10',
  'img/content/thumbnails/gym-11',
  'img/content/thumbnails/gym-12',
];
const USER_NAMES = ['ВИКТОРИЯ', 'КРИСТИНА', 'АЛЕКСЕЙ', 'КАТЕРИНА', 'КСЕНИЯ', 'АЛИСА', 'АЛЁНА', 'СОФИЯ', 'ВАЛЕРИЯ', 'ЕЛИЗАВЕТА', 'ТАТЬЯНА', 'ЕВА', 'СТАНИСЛАВ', 'МАРИЯ', 'ДИАНА', 'МАРК'];
const USER_AVATARS = [
  'img/content/avatars/user/photo-1',
  'img/content/avatars/user/photo-2',
  'img/content/avatars/user/photo-3',
  'img/content/avatars/user/photo-4',
  'img/content/avatars/user/photo-5',
];
const COACH_CERTIFICATES = [
  'img/content/certificates-and-diplomas/certificate-1',
  'img/content/certificates-and-diplomas/certificate-2',
  'img/content/certificates-and-diplomas/certificate-3',
  'img/content/certificates-and-diplomas/certificate-4',
  'img/content/certificates-and-diplomas/certificate-5',
  'img/content/certificates-and-diplomas/certificate-6',
];
const COACH_MERITS = [
  'Привет! Меня зовут Иванова Валерия, мне 34 года. Я профессиональный тренер по боксу. Не боюсь пробовать новое, также увлекаюсь кроссфитом, йогой и силовыми тренировками. Провожу как индивидуальные тренировки, так и групповые занятия. Помогу вам достигнуть своей цели и сделать это с удовольствием!',
  'Привет, я Максим, профессиональный тренер по фитнесу. Спорт - это моя страсть и я с радостью делюсь ею со своими клиентами, помогая им достигать своих целей и улучшать свое здоровье.',
  'Мое имя - Анна и я занимаюсь тренировками в зале уже несколько лет. Мне нравится создавать персонализированные программы для каждого своего клиента, учитывая их цели и уровень подготовки.',
  'Привет, я Александр и являюсь тренером по бегу. Я люблю работать с начинающими бегунами и помогаю им достигать своих первых целей, а также с опытными бегунами, улучшая их технику бега и помогая повысить результаты.',
  'Меня зовут Катя и я тренер по йоге. Я предоставляю индивидуальные занятия, а также веду групповые занятия. Йога помогает развивать гибкость, силу и психическое здоровье, и я с радостью помогу вам в этом.',
  'Я Степан, тренер по плаванию. Я люблю работать со своими клиентами, чтобы они достигали своих целей в плавании. Я помогаю улучшить технику, увеличить выносливость и скорость, чтобы они могли достичь новых результатов.',
  'Мое имя - Наташа и я являюсь тренером по кроссфиту. Я люблю создавать интенсивные, но увлекательные тренировки, которые помогают улучшить физическую подготовку и достичь желаемых целей.',
  'Привет, я Андрей и я тренер по бодибилдингу. Я помогаю своим клиентам увеличить мышечную массу, улучшить форму тела и достичь наилучших результатов. Я создаю индивидуальные программы для каждого из своих клиентов.',
  'Я Вика, тренер по танцам. Я увлечена танцами с детства и с радостью передаю свою страсть своим клиентам. Я работаю с различными стилями танцев и создаю индивидуальные программы, чтобы каждый из моих клиентов научился танцевать с уверенностью.',
];
const TRAINING_NAMES = ['CROSSFIT', 'ENERGY', 'BOXING', 'POWER', 'ANTISTRESS', 'RUN, FORREST, RUN', 'FITBALL', 'HATHA', 'FULL BODY STRETCH', 'UPPER BODY', 'DEVIL\'S CINDY', 'FLEKSBEND'];
const TRAINING_IMAGES = [
  'img/content/thumbnails/preview-01',
  'img/content/thumbnails/preview-02',
  'img/content/thumbnails/preview-03',
];
const TRAINING_DESCRIPTIONS = [
  'Сложный комплекс упражнений для профессиональных атлетов на отработку показателей в классическом стиле.',
  'Упражнения укрепляют мышечный корсет, делают суставы более гибкими, улучшают осанку и координацию.',
  'Тренировка на отработку правильных ударов, координации и оптимальной механики защитных движений.',
  'Тренировка на отработку правильной техники работы с тяжелыми весами, укрепления мышц кора и спины.',
  'В основе программы лежит работа с телом и с психо-эмоциональным состоянием. Уберем зажимы тела, избавимся от стресса.',
  'Узнайте правильную технику бега, развивайте выносливость и откройте для себя все секреты длительных пробежек.',
  'Тренировка на фитболе — отличном тренажере для развития чувства баланса и равновесия, улучшения координации.',
  'Упражнения по хатха йоге, направленные на понижение нервной возбудимости и активацию процессов анаболизма.',
  'Комплекс упражнений на растяжку всего тела для новичков. Плавное погружение в стретчинг и умеренная нагрузка.',
  'Проработка мышц груди для профи, экспериментируем с уровнем наклона скамьи и различной шириной хвата.',
  'Знаменитый кроссфит комплекс. Синди — универсальная тренировка для развития функциональной силы.',
  'Тренируясь с резинкой для фитнеса, вы можете проработать почти все мышечные группы и разнообразить тренировки.'
];

const prisma = new PrismaClient();

function generateRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomEnumElement<T>(enumType: T) {
  const values = Object.values(enumType as unknown as T[]);
  const randomIndex = Math.floor(Math.random() * values.length);
  return values[randomIndex];
}

function getRandomEnumElements<T>(enumType: T): T[] {
  const values = Object.values(enumType as unknown as T[]);

  const selectedOptions: T[] = [];

  const numOptions = Math.floor(Math.random() * (values.length + 1));

  let loopCount = 0;
  while (selectedOptions.length < numOptions && loopCount < values.length) {
    const randomIndex = Math.floor(Math.random() * (values.length - selectedOptions.length));

    const option = values[randomIndex];
    selectedOptions.includes(option) ? null : selectedOptions.push(option);
    loopCount++;
  }

  return selectedOptions;
}

function getRandomStringFromArray(arr: string[]): string {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

function getGymData() {
  return {
    name: getRandomStringFromArray(GYM_NAMES),
    location: getRandomEnumElement<typeof UserLocation>(UserLocation) as unknown as string,
    isVerified: true,
    options: getRandomEnumElements<typeof GymOption>(GymOption) as unknown as string[],
    description: getRandomStringFromArray(GYM_DESCRIPTIONS),
    price: generateRandomNumber(GymPriceRange.Min, GymPriceRange.Max),
    photos: getRandomStringFromArray(GYM_IMAGES)
  }
}

function getUserData(count: number) {
  return {
    email: `user${count}@notfound.local`,
    name: getRandomStringFromArray(USER_NAMES),
    passwordHash: '$2b$10$NYtPCSFVt6ox29RWl8eVreB3V84Fi1mDAGF1l8/ZU5fDkeEwCfGz2',
    gender: getRandomEnumElement(Gender) as unknown as string,
    role: 'user',
    location: getRandomEnumElement<typeof UserLocation>(UserLocation) as unknown as string,
    avatar: getRandomStringFromArray(USER_AVATARS),
    createdAt: new Date(),
    birthDate: '',
  }
}

function getCoachData(count: number) {
  return {
    email: `coach${count}@notfound.local`,
    name: getRandomStringFromArray(USER_NAMES),
    passwordHash: '$2b$10$NYtPCSFVt6ox29RWl8eVreB3V84Fi1mDAGF1l8/ZU5fDkeEwCfGz2',
    gender: getRandomEnumElement(Gender) as unknown as string,
    role: 'coach',
    location: getRandomEnumElement<typeof UserLocation>(UserLocation) as unknown as string,
    avatar: getRandomStringFromArray(USER_AVATARS),
    createdAt: new Date(),
    birthDate: '',
  }
}

function getUserQuestionnaire(count: number) {
  return {
    userId: count,
    trainingLevel: getRandomEnumElement(TrainingLevel) as unknown as string,
    trainingTypes: getRandomEnumElements(TrainingType).slice(0, MAX_TRAINING_TYPE_LENGTH) as unknown as string[],
    trainingDuration: getRandomEnumElement(TrainingDuration) as unknown as string,
    caloriesLoss: 1500,
    burnsCaloriesPerDay: 1500,
    isReadyToTrain: Math.random() < 0.5,
  }
}

function getCoachQuestionnaire(count: number) {
  return {
    userId: count,
    trainingLevel: getRandomEnumElement(TrainingLevel) as unknown as string,
    trainingTypes: getRandomEnumElements(TrainingType).slice(0, MAX_TRAINING_TYPE_LENGTH) as unknown as string[],
    merits: getRandomStringFromArray(COACH_MERITS),
    certificate: getRandomStringFromArray(COACH_CERTIFICATES),
    isReadyToTrain: Math.random() < 0.5,
  }
}

function getTrainingData() {
  return {
    name: getRandomStringFromArray(TRAINING_NAMES),
    backgroundImage: getRandomStringFromArray(TRAINING_IMAGES),
    level: getRandomEnumElement(TrainingLevel) as unknown as string,
    type: getRandomEnumElement(TrainingType) as unknown as string,
    trainingDuration: getRandomEnumElement(TrainingDuration) as unknown as string,
    price: generateRandomNumber(MIN_TRAINING_PRICE, MAX_TRAINING_PRICE),
    gender: getRandomEnumElement(Gender) as unknown as string,
    video: 'img/content/training-video/video-thumbnail',
    isSpecialOffer: Math.random() < 0.5,
    description: getRandomStringFromArray(TRAINING_DESCRIPTIONS),
    rate: 0,
    userId: generateRandomNumber(ENTITY_COUNT / 2, ENTITY_COUNT),
    calories: generateRandomNumber(CaloriesLossRange.Min, CaloriesLossRange.Max),
  }
}

async function fillDb() {
  for (let i = 1; i <= ENTITY_COUNT; i++) {
    await prisma.gym.create({ data: getGymData() });

    // Половина будет пользователми
    if (i <= ENTITY_COUNT / 2) {
      await prisma.user.create({ data: getUserData(i) });
      await prisma.userQuestionnaire.create({ data: getUserQuestionnaire(i) });
    }
    // Половина будет тренерами
    if (i > ENTITY_COUNT / 2) {
      await prisma.user.create({ data: getCoachData(i) });
      await prisma.coachQuestionnaire.create({ data: getCoachQuestionnaire(i) });
    }

    await prisma.training.create({ data: getTrainingData() });
  }
}

fillDb()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.log(err);
    await prisma.$disconnect();

    process.exit(1);
  })
