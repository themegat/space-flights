const queries = {
  flights: {
    query:
      "query Flights($page: Int, $pageSize: Int, $departureDay: String) {\n  flights(page: $page, pageSize: $pageSize, departureDay: $departureDay) {\n    pagination {\n      total\n      page\n      pageSize\n    }\n    nodes {\n      code\n      availableSeats\n      launchSite {\n        name\n      }\n      landingSite {\n        name\n      }\n    }\n  }\n}\n",
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
