module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("students", [
      {
        department_id: 2,
        fullname: "John",
        year: 5,
        email: "example@gmail.com",
        password: "IamOzioma",
        gender: "Male",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("students", null, {});
  },
};
