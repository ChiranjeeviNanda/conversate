import express from 'express';
import {
  getAgentStatus,
  startAiAgent,
  stopAiAgent,
} from '../controllers/ai.controller.js';

const router = express.Router();

router.get('/', getAgentStatus);
router.post('/start-ai-agent', startAiAgent);
router.post('/stop-ai-agent', stopAiAgent);

export default router;
