const express = require('express');
const router = express.Router();
const stateController = require('../../controller/statesController');

router.route('/')
    .get(stateController.getStates);

router.route('/:stateId')
    .get(stateController.getState);

router.route('/:stateId/funfact')
    .get(stateController.getFunFact)
    .post(stateController.createFunFact)
    .patch(stateController.updateFunFact)
    .delete(stateController.deleteFunFact);

router.route('/:stateId/capital')
    .get(stateController.getCapital);

router.route('/:stateId/nickname')
    .get(stateController.getNickname);

router.route('/:stateId/population')
    .get(stateController.getPopulation);

router.route('/:stateId/admission')
    .get(stateController.getAdmission);

module.exports = router;

