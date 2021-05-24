import { Router } from 'express';

import consultaRouter from './consultaRouter';
import receitaRouter from './receitaRouter';
import prontuarioRouter from './prontuarioRouter';

const router = Router();

router.use('/consultas', consultaRouter);
router.use('/receitas', receitaRouter);
router.use('/prontuarios', prontuarioRouter);

// TESTE
router.use('/test', (req, res) => {
    res.status(200).json({
        message: 'funciona'
    })
});

export default router;