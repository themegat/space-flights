const queries = {
  flights: {
    query:
      "query Flights($page: Int, $pageSize: Int) {\n  flights(page: $page, pageSize: $pageSize) {\n    id\n    code\n    launchSite {\n      id\n    }\n    landingSite {\n      id\n    }\n  }\n}",
    variables: {
      page: 1,
      pageSize: 10,
    },
    operationName: "Flights",
  },
  bookFlight: {
    query:
      "mutation BookFlight($seatCount: Int!, $flightId: Int!, $email: String!) {\n  bookFlight(seatCount: $seatCount, flightId: $flightId, email: $email) {\n    id\n    email\n    seatCount\n  }\n}",
    variables: {
      seatCount: 2,
      flightId: 1,
      email: "jest.test@mail.com",
    },
    operationName: "BookFlight",
  },
};

module.exports = queries;
