import express from 'express';
import channelController from './channels';
import authController from './auth';
import seed from '../utils/seed';

const router = express.Router();

router.use('/channels', channelController);
router.use('/auth', authController);

router.post('/seed', async (req, res) => {
  await seed();
  res.sendStatus(200);
});

export default router;
