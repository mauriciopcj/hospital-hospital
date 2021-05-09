import { Router } from 'express';

import receitaController from '../controllers/receitaController';

const router = Router();

router.get('/:id', receitaController.show);
router.get('/', receitaController.index);
router.post('/', receitaController.store);
router.put('/:id', receitaController.update);


export default router;