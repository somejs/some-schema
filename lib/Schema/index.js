var SchemaProperty= require('./Property')



/**
 * Схема. Конструктор схемы.
 *
 * Инстанцирует экземпляр схемы, объявляет свойства
 * и инициализирует их значения.
 *
 * @class
 * @namespace
 * @param {object} data
 * @returns {Schema}
 */
var Schema= module.exports= function Schema(data) {

    // объявляет свойства
    var properties= this.constructor.properties
    for (var p in properties) if (properties.hasOwnProperty(p)) { var property= properties[p]
        this[p]= null
    }

    // инициализирует значения
    this.init(data || {}, properties)

}



/**
 * Свойство схемы.
 *
 * @class
 * @memberof Model
 */
Schema.Property= SchemaProperty



/**
 * Инициализирует схему.
 *
 * Устанавливает значения указанных свойств схемы.
 * Если устанавливаемые свойства не указаны, инициализирует все свойства.
 *
 * @param {Object} data
 * @param {Object|null} properties
 * @returns {Schema} — возвращает себя
 */
Schema.prototype.init= function (data, properties) {

    if (!properties || !(properties instanceof Object)) { // устанавливаемые свойства не указаны

        // инициализирует все свойства
        properties= this.constructor.properties || {}

    }

    if (data && data instanceof Object) { // значения переданы

        // устанавливает значения свойств
        for (var p in properties) if (properties.hasOwnProperty(p)) { var property= properties[p]
            console.assert(property instanceof this.constructor.Property)
            property.init(this, p, data[p])
        }

    }

    return this
}
