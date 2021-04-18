import { Router } from 'express';

import consultaController from '../controllers/consultaController';

const router = Router();

router.get('/:id', consultaController.show);
router.get('/', consultaController.index);
router.post('/', consultaController.store);
router.put('/:id', consultaController.update);


export default router;