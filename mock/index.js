export default [
  {
    url: "/api/test",
    method: "get",
    response: () => {
      console.log("some words");
      return {
        code: 200,
        message: "ok",
        data: [
          {
            warnBl: 0, // 预警占比
          },
        ],
      };
    },
  },
];
