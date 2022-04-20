import { Test, TestingModule } from '@nestjs/testing';
import {
  HttpStatus,
  BadRequestException,
  ArgumentsHost,
  UnauthorizedException,
  NotFoundException,
  InternalServerErrorException,
  ForbiddenException
} from '@nestjs/common';

const mockJson = jest.fn();
const mockStatus = jest.fn().mockImplementation(() => ({
  json: mockJson
}));
const mockGetResponse = jest.fn().mockImplementation(() => ({
  status: mockStatus
}));
const mockHttpArgumentsHost = jest.fn().mockImplementation(() => ({
  getResponse: mockGetResponse,
  getRequest: jest.fn()
}));
const mockArgumentsHost: ArgumentsHost = {
  switchToHttp: mockHttpArgumentsHost,
  getArgByIndex: jest.fn(),
  getArgs: jest.fn(),
  getType: jest.fn(),
  switchToRpc: jest.fn(),
  switchToWs: jest.fn()
};

import { ExceptionFilterMiddleware } from './exception-filter.middleware';
import { ErrorCodes, ErrorLevel, ErrorMessages } from '@destiny/shared-interfaces';

describe('ExceptionFilterMiddleware', () => {
  let service: ExceptionFilterMiddleware;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [ExceptionFilterMiddleware]
    }).compile();

    service = module.get<ExceptionFilterMiddleware>(ExceptionFilterMiddleware);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('ArgumentsHost test && default exception call', () => {
    const error = new Error('Some Error');
    const expectedResult = {
      code: ErrorCodes.internalError,
      name: error.name,
      message: error.message,
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      level: ErrorLevel.error
    };

    service.catch(error, mockArgumentsHost);

    expect(mockHttpArgumentsHost).toBeCalledTimes(1);
    expect(mockHttpArgumentsHost).toBeCalledWith();
    expect(mockGetResponse).toBeCalledTimes(1);
    expect(mockGetResponse).toBeCalledWith();
    expect(mockStatus).toBeCalledTimes(1);
    expect(mockJson).toBeCalledTimes(1);
    expect(mockStatus).toBeCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(mockJson).toBeCalledWith(expectedResult);
  });

  it('BadRequestException', () => {
    const errorMessage = 'Validation error';
    const BadRequest = new BadRequestException(errorMessage);
    const expectedResult = {
      code: ErrorCodes.validationError,
      name: 'Validation Error',
      message: errorMessage,
      status: HttpStatus.BAD_REQUEST,
      level: ErrorLevel.info,
      meta: 'Validation error'
    };

    service.catch(BadRequest, mockArgumentsHost);

    expect(mockStatus).toBeCalledWith(HttpStatus.BAD_REQUEST);
    expect(mockJson).toBeCalledWith(expectedResult);
  });

  it('UnauthorizedException', () => {
    const errorMessage = 'Token has been expired';
    const BadRequest = new UnauthorizedException(errorMessage);
    const expectedResult = {
      code: ErrorCodes.authError,
      name: 'Auth Error',
      message: errorMessage,
      status: HttpStatus.UNAUTHORIZED,
      level: ErrorLevel.error
    };

    service.catch(BadRequest, mockArgumentsHost);

    expect(mockStatus).toBeCalledWith(HttpStatus.UNAUTHORIZED);
    expect(mockJson).toBeCalledWith(expectedResult);
  });

  it('NotFoundException', () => {
    const errorMessage = 'Not found';
    const BadRequest = new NotFoundException(errorMessage);
    const expectedResult = {
      code: ErrorCodes.notFoundError,
      name: 'Not Found Error',
      message: errorMessage,
      status: HttpStatus.NOT_FOUND,
      level: ErrorLevel.error
    };

    service.catch(BadRequest, mockArgumentsHost);

    expect(mockStatus).toBeCalledWith(HttpStatus.NOT_FOUND);
    expect(mockJson).toBeCalledWith(expectedResult);
  });

  it('InternalServerErrorException', () => {
    const errorMessage = 'Internal server error';
    const BadRequest = new InternalServerErrorException(errorMessage);
    const expectedResult = {
      code: ErrorCodes.internalError,
      name: 'Internal Error',
      message: errorMessage,
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      level: ErrorLevel.error
    };

    service.catch(BadRequest, mockArgumentsHost);

    expect(mockStatus).toBeCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(mockJson).toBeCalledWith(expectedResult);
  });

  it('ForbiddenException', () => {
    const errorMessage = ErrorMessages.forbidden;
    const BadRequest = new ForbiddenException(errorMessage);
    const expectedResult = {
      code: ErrorCodes.permissionsError,
      name: 'Permissions Error',
      message: errorMessage,
      status: HttpStatus.FORBIDDEN,
      level: ErrorLevel.warning
    };

    service.catch(BadRequest, mockArgumentsHost);

    expect(mockStatus).toBeCalledWith(HttpStatus.FORBIDDEN);
    expect(mockJson).toBeCalledWith(expectedResult);
  });
});
