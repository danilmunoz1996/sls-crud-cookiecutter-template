/**
 * This is the service layer. It is responsible for handling business logic.
 */

/**
 * This is an example of a foreign relation in case you need it
 */
// const RELATED_ENTITY_INDEX_NAME = 'entityIdIndex';

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

    async list() {
        // Add any business logic here before listing the models
        return await this.dbAdapter.list();
    }

    /**
     * an example implementarion of a foreign relation
     */
    // async foreignRelationEntity(entityId) {
    //     return await this.dbAdapter.getByIndex(ENTITY_INDEX_NAME, 'entityId', entityId);
    // }
}

module.exports = Service;
