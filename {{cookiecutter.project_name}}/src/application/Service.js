class Service {
    constructor(dbAdapter) {
        this.dbAdapter = dbAdapter;
    }

    async create(model) {
        // Add any business logic here before creating the model
        return await this.dbAdapter.create(model);
    }

    async read(id) {
        // Add any business logic here before reading the model
        return await this.dbAdapter.read(id);
    }

    async update(id, model) {
        // Add any business logic here before updating the model
        return await this.dbAdapter.update(id, model);
    }

    async delete(id) {
        // Add any business logic here before deleting the model
        return await this.dbAdapter.delete(id);
    }
}

module.exports = Service;
