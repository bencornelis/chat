import express from 'express';
import channelController from './channels';
import authController from './auth';

const router = express.Router();

router.use('/channels', channelController);
router.use('/auth', authController);

export default router;
