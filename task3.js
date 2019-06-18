const axios = require("axios");
const moment = require("moment");
const R = require("ramda");

let instance = null;

const auth = () =>
  axios
    .get("https://motorway-challenge-api.herokuapp.com/api/login")
    .then(({ data: { token } }) =>
      axios.create({
        baseURL: "https://motorway-challenge-api.herokuapp.com/api/",
        timeout: 10000,
        params: {
          token
        }
      })
    );

let api = null;

const init = () =>
  !api
    ? auth().then(instance => {
        api = instance;
        return api;
      })
    : Promise.resolve(api);

const getVisits = (params = { page: 1 }) =>
  api
    .get("/visits", {
      params: {
        ...params,
        ...api.defaults.params
      }
    })
    .then(({ data }) => data);

const followTotal = ({ promise, accumulated, prevPage }) => {
  return promise.then(
    ({ total, data }) =>
      accumulated.length + data.length >= total
        ? [...accumulated, ...data]
        : followTotal({
            promise: getVisits({ page: prevPage + 1 }),
            prevPage: prevPage + 1,
            accumulated: [...accumulated, ...data]
          })
  );
};

const getAllVisits = () =>
  getVisits({ page: 1 }).then(
    ({ data, total }) =>
      total === data.length
        ? data
        : followTotal({
            promise: getVisits({ page: 2 }),
            prevPage: 2,
            accumulated: [...data]
          })
  );

const summarize = visits => {
  const filtered = visits.filter(visit => {
    const day = moment(visit.date).day();
    return (
      !moment(visit.date).isSame(moment(), "date") && day !== 0 && day !== 6
    );
  });
  const visitorGroups = R.groupBy(obj => obj.name, filtered);
  return Object.keys(visitorGroups).map(key => ({
    name: key,
    visits: visitorGroups[key].length
  }));
};

module.exports = {
  init,
  auth,
  getVisits,
  getAllVisits,
  summarize
};
