import { Router } from 'express';
import { generateMetadata } from './generateMetadata.controller.ts';
import { validate } from '../../../shared/Middlewares/valildateSchema.ts';
import { generateMetadataSchema } from './generateMetadata.schema.ts';
import { authenticateToken } from '../../../shared/Middlewares/auth.middleware.ts';
import { authorizeRoles } from '../../../shared/Middlewares/role.middleware.ts';

const generateMetadataRoutes = Router();

generateMetadataRoutes.post(
    '/generate-metadata',
    authenticateToken,
    authorizeRoles('PRODUCER', 'ADMIN'),
    validate(generateMetadataSchema),
    generateMetadata
);

export default generateMetadataRoutes;
