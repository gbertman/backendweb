const data = {};
data.states = require('../data/statesData.json');


const getStateObj = (paramInfo) => {
    return data.states.find(sta => sta.code === paramInfo.toUpperCase());
}

const fixNum = (population) => { return population.toLocaleString('US-en'); }

const getStates = (req, res) => {
    res.json(data.states);
}

const getState = (req, res) => {
    const stateInfo = getStateObj(req.params.stateId);
    if (!stateInfo) {
        return res.status(400).json({ "message": `Invalid state abbreviation parameter` });
    }
    res.json(stateInfo);
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
    const stateInfo = getStateObj(req.params.stateId);
    if (!stateInfo) {
        return res.status(400).json({ "message": `Invalid state abbreviation parameter` });
    }
    const state = {};
    state.state = stateInfo.state;
    state.capital = stateInfo.capital_city;
    res.json(state);
}

const getNickname = (req, res) => {
    const stateInfo = getStateObj(req.params.stateId);
    if (!stateInfo) {
        return res.status(400).json({ "message": `Invalid state abbreviation parameter` });
    }
    const state = {};
    state.state = stateInfo.state;
    state.nickname = stateInfo.nickname;
    res.json(state);
}

const getPopulation = (req, res) => {
    const stateInfo = getStateObj(req.params.stateId);
    if (!stateInfo) {
        return res.status(400).json({ "message": `Invalid state abbreviation parameter` });
    }
    const state = {};
    state.state = stateInfo.state;
    state.population = fixNum(stateInfo.population);
    res.json(state);
}

const getAdmission = (req, res) => {
    const stateInfo = getStateObj(req.params.stateId);
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