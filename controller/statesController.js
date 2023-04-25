const data = {};
data.states = require('../model/statesData.json');
const statesFunFacts = require('../model/statesFunFacts');


const getStateObj = (paramInfo) => {
    return data.states.find(sta => sta.code === paramInfo.toUpperCase());
}

const fixNum = (population) => { return population.toLocaleString('US-en'); }

const getStates = (req, res) => {
    if (req.query.contig === 'false') {
        return res.json(data.states.filter((state) => state.code === "AK" || state.code === "HI"));
    }
    else if (req.query.contig === 'true') {
        return res.json(data.states.filter((state) => state.code != "AK" && state.code != "HI"));
    }
    else {
        return res.json(data.states);
    }
}

const getState = async (req, res) => {
    const stateInfo = getStateObj(req.params.stateId);
    if (!stateInfo) {
        return res.status(400).json({ "message": `Invalid state abbreviation parameter` });
    }
    const dataFacts = await statesFunFacts.findOne({ stateCode: req.params.stateId }).exec();
    if (dataFacts) stateInfo.funfacts = dataFacts.funfacts;
    return res.json(stateInfo);
}

const getFunFact = async (req, res) => {
    const stateInfo = getStateObj(req.params.stateId);
    if (stateInfo) {
        const dataFacts = await statesFunFacts.findOne({ stateCode: stateInfo.code }).exec();
        if (!dataFacts)
            return res.json({ "message": `No Fun Facts found for ${stateInfo.state}` });
        else {
            const factNum = Math.floor(Math.random() * dataFacts.funfacts.length);
            return res.json({ "funfact": dataFacts.funfacts[factNum] });
        }
    } else {
        return res.status(400).json({ "message": `Invalid state abbreviation parameter` });
    }
}

const createFunFact = async (req, res) => {
    if (!req.body.funfacts) {
        return res.status(400).json({ "message": `State fun facts value required` });
    } else {
        if (Array.isArray(req.body.funfacts)) {
            return res.status(400).json({ "message": `State fun facts value must be an array` });
        }
        else {

            const stateInfo = getStateObj(req.params.stateId);
            if (stateInfo) {
                const dataFacts = await statesFunFacts.findOne({ stateCode: stateInfo.code }).exec();
                if (!dataFacts) {
                    try {
                        const result = await statesFunFacts.create({ stateCode: stateInfo.code, funfacts: req.body.funfacts });
                        return res.status(201).json(result);
                    } catch (err) {
                        console.log(err);
                    }
                } else {
                    try {
                        dataFacts.funfacts.push(...req.body.funfacts);
                        const results = await dataFacts.save();
                        return res.status(201).json(results);
                    } catch (err) {
                        console.log(err);
                    }
                }
            } else {
                return res.status(400).json({ "message": `Invalid state abbreviation parameter` });
            }
        }
    }
}

const updateFunFact = async (req, res) => {
    if (!req.body.index) {
        return res.status(400).json({ "message": `State fun fact index value required` });
    } else {
        if (!req.body.funfact) {
            return res.status(400).json({ "message": `State fun fact value required` });
        } else {
            const stateInfo = getStateObj(req.params.stateId);
            if (stateInfo) {
                const dataFacts = await statesFunFacts.findOne({ stateCode: stateInfo.code }).exec();
                if (dataFacts) {
                    if (req.body.index > 0 && req.body.index <= dataFacts.funfacts.length) {
                        try {
                            dataFacts.funfacts[req.body.index - 1] = req.body.funfact;
                            const results = await dataFacts.save();
                            return res.json(results);
                        } catch (err) {
                            console.log(err);
                        }
                    } else {
                        return res.status(400).json({ "message": `No Fun Fact found at that index for ${stateInfo.state}` });
                    }
                } else {
                    return res.status(400).json({ "message": `No Fun Facts found for ${stateInfo.state}` });
                }
            } else {
                return res.status(400).json({ "message": `Invalid state abbreviation parameter` });
            }
        }
    }
}

const deleteFunFact = async (req, res) => {
    if (!req.body.index) {
        return res.status(400).json({ "message": `State fun fact index value required` });
    } else {
        const stateInfo = getStateObj(req.params.stateId);
        if (stateInfo) {
            const dataFacts = await statesFunFacts.findOne({ stateCode: stateInfo.code }).exec();
            if (dataFacts) {
                if (req.body.index > 0 && req.body.index <= dataFacts.funfacts.length) {
                    try {
                        dataFacts.funfacts.splice(req.body.index - 1, 1);
                        const results = await dataFacts.save();
                        return res.json(results);
                    } catch (err) {
                        console.log(err);
                    }

                } else {
                    return res.status(400).json({ "message": `No Fun Fact found at that index for ${stateInfo.state}` });
                }
            } else {
                return res.status(400).json({ "message": `No Fun Facts found for ${stateInfo.state}` });
            }
        } else {
            return res.status(400).json({ "message": `Invalid state abbreviation parameter` });
        }
    }
}

const getCapital = (req, res) => {
    const stateInfo = getStateObj(req.params.stateId);
    if (!stateInfo) {
        return res.status(400).json({ "message": `Invalid state abbreviation parameter` });
    }
    return res.json({ "state": stateInfo.state, "capital": stateInfo.capital_city });
}

const getNickname = (req, res) => {
    const stateInfo = getStateObj(req.params.stateId);
    if (!stateInfo) {
        return res.status(400).json({ "message": `Invalid state abbreviation parameter` });
    }
    return res.json({ "state": stateInfo.state, "nickname": stateInfo.nickname });
}

const getPopulation = (req, res) => {
    const stateInfo = getStateObj(req.params.stateId);
    if (!stateInfo) {
        return res.status(400).json({ "message": `Invalid state abbreviation parameter` });
    }
    return res.json({ "state": stateInfo.state, "population": fixNum(stateInfo.population) });
}

const getAdmission = (req, res) => {
    const stateInfo = getStateObj(req.params.stateId);
    if (!stateInfo) {
        return res.status(400).json({ "message": `Invalid state abbreviation parameter` });
    }
    return res.json({ "state": stateInfo.state, "admitted": stateInfo.admission_date });
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