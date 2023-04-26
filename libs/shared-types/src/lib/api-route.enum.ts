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

export enum APIRouteUser {
  Prefix = '/user',
  GetMyFriends = 'get-my-friends',
  GetAll = '/',
}

export enum APIRouteTraining {
  Prefix = '/training',
  Create = '/',
  GetAll = '/',
  Update = '/:id',
  GetById = '/:id',
}

export enum APIRouteReview {
  Prefix = '/review',
  Create = '/',
  GetByTrainingId = '/:id',
}

export enum APIRouteGym {
  Prefix = '/gym',
  Create = '/',
  GetAll = '/',
  GetById = '/:id',
}

export enum APIRouteOrder {
  Prefix = '/order',
  Create = '/',
  GetAll = '/',
  getCoachOrders = '/coach-orders',
  getCoachOrdersInfo = '/coach-orders-info',
  GetById = '/:id',
}

export enum APIRouteFoodDiary {
  Prefix = '/food-diary',
  Create = '/',
  Get = '/',
  Update = '/',
  GetById = '/:id',
}
