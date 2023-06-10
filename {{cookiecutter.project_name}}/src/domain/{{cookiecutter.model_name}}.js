const { v4: uuidv4 } = require('uuid');
class {{cookiecutter.model_class_name}} {
    constructor
    (
        {
            {{cookiecutter.model_secondary_property}},
            createdBy, 
            updatedAt, 
            updatedBy,
            deletedAt, 
            deletedBy
        }
    ) {
        this.{{cookiecutter.model_secondary_property}} = {{cookiecutter.model_secondary_property}};
        this.createdAt              = new Date().toISOString();
        this.createdBy              = createdBy;
        this.updatedAt              = updatedAt || null;
        this.updatedBy              = updatedBy;
        this.deletedAt              = deletedAt || null;
        this.deletedBy              = deletedBy || null;
        this.{{cookiecutter.model_partition_key}} = uuidv4() + '_' + this.createdAt;
    }

    toItem() {
        return {
            {{cookiecutter.model_partition_key}}: this.{{cookiecutter.model_partition_key}},
            {{cookiecutter.model_secondary_property}}: this.{{cookiecutter.model_secondary_property}},
            createdAt:              this.createdAt,
            createdBy:              this.createdBy,
            updatedAt:              this.updatedAt,
            updatedBy:              this.updatedBy,
            deletedAt:              this.deletedAt,
            deletedBy:              this.deletedBy,
        }
    }

    pk() {
        return this.{{cookiecutter.mode_partition_key}};
    }

    static sortKey(key) {
        return key.split('_')[1];
    }

    static getKeys(pk) {
        return {
            {{cookiecutter.model_partition_key}}: pk,
            createdAt: {{cookiecutter.model_class_name}}.sortKey(pk)
        };
    }
        
}

module.exports = {{cookiecutter.model_class_name}};
