import express from 'express';
import Channel from '../models/channel';
import authMiddleware from '../middleware/auth';

const router = express.Router();
router.use(authMiddleware.isUserAuthenticated);

router.get('/', async (req, res) => {
  let channels;
  try {
    channels = await Channel.getAll();
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }

  res.json({ channels });
});

router.get('/:channelId/messages', async (req, res) => {
  let messages;
  try {
    messages = await Channel.getMessages(req.params.channelId);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }

  res.json({ messages });
});

export default router;
