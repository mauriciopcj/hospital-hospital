import { Receita } from '../database/models';

export default {

  store: async (req, res, next) => {
    try {            
      await Receita.create(req.body).then(response => {
        res.status(201).json({ receita: response });
      }).catch(error => {
        res.status(400).json({ error });
      });
    } catch (error) {
      res.status(400).json({ error });
    }
  },
}