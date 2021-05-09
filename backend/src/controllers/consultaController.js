import { Consulta, Receita } from '../database/models';

export default {

  store: async (req, res, next) => {
    try {            
      await Consulta.create(req.body).then(response => {
        res.status(201).json({ consulta: response });
      }).catch(error => {
        res.status(400).json({ error });
      });
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  index: async (req, res, next) => {
    try {
      await Consulta.findAll({ 
        include: [{
          model: Receita,
          as: 'receitas'
        }]
      }).then(response => {
        res.status(200).json({ consultas: response });
      }).catch(error => {
        res.status(400).json({ error });
      });
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  show: async (req, res, next) => {
    try {
      await Consulta.findOne({ 
        where: { id: req.params.id },        
        include: [{
          model: Receita,
          as: 'receitas',
          attributes: {
            exclude: ['consulta_id']
          },
        }]
      }).then(response => {
        res.status(200).json({ consulta: response });
      }).catch(error => {
        res.status(400).json({ error });
      })
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  update: async (req, res, next) => {
    try {
      await Consulta.findOne({ where: { id: req.params.id }}).then(response => {
        response.update(req.body).then(response => {
          res.status(200).json({ consulta: response });
        }).catch(error => {
          res.status(400).json({ error });
        });
      }).catch(error => {
        res.status(400).json({ error });
      });
    } catch (error)  {
      res.status(500).json({ error });
    }
  }
}