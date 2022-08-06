const persistence = require("../../src/persistance");
const helpers = require("../helpers");

const data = require("../data/persistence");

describe("Testing persistance queries", () => {
  test("Test getPlanets should return a planet list", async () => {
    const result = await persistence.Queries.getPlanets();
    expect(result).toEqual(data.planets);
  });

  test("Test getSpaceCenters should contain a space center", async () => {
    const result = await persistence.Queries.getSpaceCenters();
    expect(result).toContainEqual(data.launchSpaceCenter);
  });
});

describe("Testing persistance mutations", () => {
  test("Test scheduleFlight should insert a flight", async () => {
    const from = data.launchSpaceCenter;
    const to = data.landingSpaceCenter;
    let departureDate = new Date();
    const weekDay = helpers.getRandomIntInclusive(1, 7);
    const seatCount = helpers.getRandomIntInclusive(10, 40);

    departureDate.setDate(departureDate.getDate() + weekDay);

    const result = await persistence.Mutations.scheduleFlight(
      from.uid,
      to.uid,
      departureDate,
      seatCount
    );

    const item = result[0];

    expect(parseInt(item.id)).toBeGreaterThan(0);
    expect(new Date(item.departureAt).getTime()).toEqual(
      departureDate.getTime()
    );
    expect(item.seatCount).toEqual(seatCount);
  });
});

afterAll((done) => {
  persistence.knex.context.destroy();
  done();
});
