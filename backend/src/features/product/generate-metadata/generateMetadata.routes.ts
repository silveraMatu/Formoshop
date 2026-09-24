import { Router } from 'express';
import { generateMetadata } from './generateMetadata.controller.ts';
import { validate } from '../../../shared/Middlewares/valildateSchema.ts';
import { generateMetadataSchema } from './generateMetadata.schema.ts';

const generateMetadataRoutes = Router();

generateMetadataRoutes.post(
    '/generate-metadata',
    validate(generateMetadataSchema),
    generateMetadata
);

export default generateMetadataRoutes;