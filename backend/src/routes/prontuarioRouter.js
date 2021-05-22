import { Router } from 'express';

import prontuarioController from '../controllers/prontuarioController';

const router = Router();

router.get('/:id', prontuarioController.show);
router.get('/', prontuarioController.index);
router.post('/', prontuarioController.store);
router.put('/:id', prontuarioController.update);


export default router;