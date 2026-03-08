class AuthRepository {
  constructor(model) {
    this.model = model;
  }

  async findOne(query) {
    return this.model.findOne(query);
  }

  async create(data) {
    return this.model.create(data);
  }
}

module.exports = AuthRepository;
