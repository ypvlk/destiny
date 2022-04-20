export const ErrorMessages = {
  default: 'Oops, something went wrong.',
  forbidden: 'You do not have permission to this action.'
};

export enum ErrorCodes {
  apiError = 'apiError',
  appsSettingsError = 'appsSettingsError',
  authError = 'authError',
  dbError = 'dbError',
  internalError = 'internalError',
  notFoundError = 'notFoundError',
  permissionsError = 'permissionsError',
  rolesError = 'rolesError',
  validationError = 'validationError',
  badRequestError = 'badRequestError',
  infoMessage = 'infoMessage',
}

export enum ErrorLevel {
  info = 'info',
  warning = 'warning',
  error = 'error',
}
