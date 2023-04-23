const data = {};
data.states = require('../data/statesData.json');

const getStates = (req, res) => {
    res.json(data.states);
}

const getState = (req, res) => {
    const state = data.states.find(sta => sta.code === req.params.stateId.toUppperCase());
    if (!state) {
        return res.status(400).json({ "message": `Invalid state abbreviation parameter` });
    }
    res.json(state);
}

const getFunFact = (req, res) => {
    res.json(data.states);
}

const createFunFact = (req, res) => {
    res.json(data.states);
}

const updateFunFact = (req, res) => {
    res.json(data.states);
}

const deleteFunFact = (req, res) => {
    res.json(data.states);
}

const getCapital = (req, res) => {
    const stateInfo = data.states.find(sta => sta.code === req.params.stateId.toUppperCase());
    if (!stateInfo) {
        return res.status(400).json({ "message": `Invalid state abbreviation parameter` });
    }
    const state = {};
    state.state = stateInfo.state;
    state.capital = stateInfo.capital_city;
    res.json(state);
}

const getNickname = (req, res) => {
    const stateInfo = data.states.find(sta => sta.code === req.params.stateId);
    if (!stateInfo) {
        return res.status(400).json({ "message": `Invalid state abbreviation parameter` });
    }
    const state = {};
    state.state = stateInfo.state;
    state.nickname = stateInfo.nickname;
    res.json(state);
}

const getPopulation = (req, res) => {
    const stateInfo = data.states.find(sta => sta.code === req.params.stateId.toUppperCase());
    if (!stateInfo) {
        return res.status(400).json({ "message": `Invalid state abbreviation parameter` });
    }
    const state = {};
    state.state = stateInfo.state;
    state.population = stateInfo.population;
    res.json(state);
}

const getAdmission = (req, res) => {
    const stateInfo = data.states.find(sta => sta.code === req.params.stateId.toUppperCase());
    if (!stateInfo) {
        return res.status(400).json({ "message": `Invalid state abbreviation parameter` });
    }
    const state = {};
    state.state = stateInfo.state;
    state.admitted = stateInfo.admission_date;
    res.json(state);
}

module.exports = {
    getStates,
    getState,
    getFunFact,
    createFunFact,
    updateFunFact,
    deleteFunFact,
    getCapital,
    getNickname,
    getPopulation,
    getAdmission
}