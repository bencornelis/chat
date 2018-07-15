import express from 'express';
import channelController from './channels';

const router = express.Router();

router.use('/channels', channelController);

export default router;
