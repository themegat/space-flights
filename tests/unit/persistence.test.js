const persistence = require("../../src/persistance");

const data = require("../data/persistence");

describe("Testing Queries", () => {
  test("Test getPlanets to return a planet list", async () => {
    const result = await persistence.Queries.getPlanets();
    expect(result).toEqual(data.planets);
  });

  test("Test getSpaceCenters to contain a space center", async () => {
    const result = await persistence.Queries.getSpaceCenters();
    expect(result).toContainEqual(data.launchSpaceCenter);
  });

  test("Test getBookings to return an empty list", async () => {
    const result = await persistence.Queries.getBookings();
    expect(result).toEqual([]);
  });
});

describe("Testing Mutations", () => {
  test("Test scheduleFlight to insert a flight", async () => {
    const from = data.launchSpaceCenter;
    const to = data.landingSpaceCenter;
    const result = await persistence.Mutations.scheduleFlight(
      from.uid,
      to.uid,
      "12-05-2022",
      20
    );
    expect(parseInt(result[0].id)).toBeGreaterThan(0);
  });
});

afterAll((done) => {
  persistence.knex.context.destroy();
  done();
});
