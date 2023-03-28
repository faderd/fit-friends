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
  GetAll = '/',
}

export enum APIRouteTRaining {
  Prefix = '/training',
  Create = '/',
  GetAll = '/',
  GetById = '/:id',
}
