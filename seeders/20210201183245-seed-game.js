'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   let dateNow = new Date()
    DATA.map(item => {
      item.created_at = dateNow
      item.updated_at = dateNow
    })
    await queryInterface.bulkInsert(TABLE, DATA, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete(TABLE, null, {});
  }
};

const TABLE = "Games"

const DATA = [
  {
    "code_game": "AABBCC",
    "countdown": 30,
    "winner": 10,
    "start_at": "2020-02-01 13:00",
    "end_at": "2020-02-01 13:30"
  },  
  {
    "code_game": "DDEEFF",
    "countdown": 30,
    "winner": 10,
    "start_at": "2020-02-01 14:00",
    "end_at": "2020-02-01 14:30"
  },
]