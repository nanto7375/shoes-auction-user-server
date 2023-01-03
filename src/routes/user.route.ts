import { Router, Request, Response } from 'express';
import { Joi, Segments, celebrate } from 'celebrate';

import ErrorException from '../exceptions/form.exception';
import { badRequest, badData, unAuthorized } from '../exceptions/definition.exception';
import { resSuccess, responseWrapper } from '../utils/handler';
import { UserService } from 'src/services/index.service';

const router = Router();

export default router;
