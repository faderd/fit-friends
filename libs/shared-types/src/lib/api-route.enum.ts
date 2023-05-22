export enum APIRouteAuth {
  Prefix = '/auth',
  Register = '/register',
  Login = '/login',
  Logout = '/logout',
  Refresh = '/refresh',
  Get = '/:id',
  Upload = '/upload/:id',
  GetQuestionnaire = '/questionnaire/:userId',
  UpdateQuestionnaire = '/questionnaire',
  UpdateUser = '/update',
}

export enum APIRouteEmailSubscriber {
  Prefix = '/email-subscriber',
  AddSubscriber = '/add-subscriber/:coachId',
  RemoveSubscriber = 'remove-subscriber/:coachId',
}

export enum APIRouteEmailSender {
  Prefix = '/email-sender',
  Send = '/',
}

export enum APIRouteUser {
  Prefix = '/user',
  GetMyFriends = 'get-my-friends',
  GetAll = '/',
  AddFriend = '/add-friend/:id',
  RemoveFriend = '/remove-friend/:id',
}

export enum APIRouteTraining {
  Prefix = '/training',
  Create = '/',
  GetAll = '/',
  Update = '/:id',
  GetById = '/:id',
  GetSpecialForMe = '/get-special-for-me',
}

export enum APIRoutePersonalTraining {
  Prefix = '/personal-training',
  Create = '/',
  GetByTargetUserId = '/i-am-target',
  GetById = '/:id',
  Update = '/:id',
}

export enum APIRouteReview {
  Prefix = '/review',
  Create = '/',
  GetByTrainingId = '/:id',
}

export enum APIRouteNotify {
  Prefix = '/notify',
  Get = '/',
  Remove = '/:id',
}

export enum APIRouteGym {
  Prefix = '/gym',
  Create = '/',
  GetAll = '/',
  GetById = '/:id',
  AddFavoriteGym = '/add-favorite-gym/:id',
  RemoveFavoriteGym = '/remove-favorite-gym/:id',
  GetFavoriteGyms = '/get-favorite-gyms',
}

export enum APIRouteOrder {
  Prefix = '/order',
  Create = '/',
  GetAll = '/',
  GetCoachOrders = '/coach-orders',
  GetCoachOrdersInfo = '/coach-orders-info',
  GetById = '/:id',
  StartTraining = '/start/:id',
  FinishTraining = '/finish/:id',
}

export enum APIRouteFoodDiary {
  Prefix = '/food-diary',
  Create = '/',
  Get = '/',
  Update = '/',
  GetById = '/:id',
}

export enum APIRouteTrainingDiary {
  Prefix = '/training-diary',
  Get = '/',
  GetById = '/:id',
}

export enum APIRouteUserBalance {
  Prefix = '/user-balance',
  Get = '/',
  Create = '/',
  Update = '/:id',
  GetById = '/:id',
}
