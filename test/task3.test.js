const assert = require("assert");
const { expect } = require("chai");
const { init, auth, getVisits, getAllVisits, summarize } = require("../task3");
describe("Task 3", function() {
  describe("init api", function() {
    before(function() {
      return init();
    });

    it("should get visits", function() {
      return getVisits().then(response => expect(response).to.be.an("object"));
    });

    it("should fetch pages following total", function() {
      return getAllVisits().then(visits => {
        return expect(visits).to.be.an("array");
      });
    });

    it("summarizes visitors", function() {
      const summary = summarize([
        {
          id: 21,
          name: "Visitor #70",
          date: "2019-06-15T08:43:44+00:00"
        },
        {
          id: 121,
          name: "Visitor #70",
          date: "2019-06-16T17:42:29+00:00"
        },
        {
          id: 111,
          name: "Visitor #70",
          date: "2019-06-13T22:21:02+00:00"
        },
        {
          id: 44,
          name: "Visitor #70",
          date: "2019-06-16T03:37:24+00:00"
        },
        {
          id: 43,
          name: "Visitor #71",
          date: "2019-06-04T12:17:47+00:00"
        },
        {
          id: 47,
          name: "Visitor #71",
          date: "2019-06-13T17:57:25+00:00"
        },
        {
          id: 23,
          name: "Visitor #71",
          date: "2019-06-16T11:46:53+00:00"
        },
        {
          id: 29,
          name: "Visitor #72",
          date: "2019-06-16T08:58:04+00:00"
        },
        {
          id: 98,
          name: "Visitor #72",
          date: "2019-06-12T20:09:48+00:00"
        },
        {
          id: 37,
          name: "Visitor #72",
          date: "2019-06-15T21:10:36+00:00"
        },
        {
          id: 52,
          name: "Visitor #74",
          date: "2019-06-12T03:50:18+00:00"
        },
        {
          id: 80,
          name: "Visitor #74",
          date: "2019-06-09T11:19:28+00:00"
        },
        {
          id: 66,
          name: "Visitor #74",
          date: "2019-06-10T22:53:30+00:00"
        },
        {
          id: 76,
          name: "Visitor #8",
          date: "2019-06-13T06:51:00+00:00"
        },
        {
          id: 70,
          name: "Visitor #8",
          date: "2019-06-11T01:16:52+00:00"
        }
      ]);

      return expect(summary).to.have.deep.members([
        { name: "Visitor #70", visits: 1 },
        { name: "Visitor #71", visits: 2 },
        { name: "Visitor #72", visits: 1 },
        { name: "Visitor #74", visits: 2 },
        { name: "Visitor #8", visits: 2 }
      ]);
    });

    it("should summarize visitors", function() {
      return getAllVisits()
        .then(visitors => summarize(visitors))
        .then(summary => {
          console.log("visitors summary: ", summary);
          return summary;
        });
    });
  });
});
