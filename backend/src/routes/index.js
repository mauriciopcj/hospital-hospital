import { Router } from 'express';

import consultaRouter from './consultaRouter';

const router = Router();

router.use('/consultas', consultaRouter)

// TESTE
router.use('/test', (req, res) => {
    res.status(200).json({
        message: 'funciona'
    })
});

export default router;