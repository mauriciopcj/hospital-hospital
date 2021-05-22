import { Router } from 'express';

import cirurgiaController from '../controllers/cirurgiaController';

const router = Router();

router.get('/:id', cirurgiaController.show);
router.get('/', cirurgiaController.index);
router.post('/', cirurgiaController.store);
router.put('/:id', cirurgiaController.update);


export default router;