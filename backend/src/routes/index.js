import { Router } from 'express';

import consultaRouter from './consultaRouter';
import receitaRouter from './receitaRouter';

const router = Router();

router.use('/consultas', consultaRouter)
router.use('/receitas', receitaRouter)

// TESTE
router.use('/test', (req, res) => {
    res.status(200).json({
        message: 'funciona'
    })
});

export default router;