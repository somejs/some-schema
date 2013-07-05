var SchemaProperty= require('./Property')



/**
 * Схема. Конструктор схемы.
 *
 * Инстанцирует экземпляр схемы, определяет свойства
 * и инициализирует их значения.
 *
 * @class
 * @namespace
 * @param {Object} values — значения свойств
 * @param {Object|null} properties — определения свойств
 * @returns {Schema}
 */
var Schema= module.exports= function Schema(values, properties) {

    if (!properties || !(properties instanceof Object)) { // определения не указаны
        properties= this.constructor.properties || {}
    } else {
        properties= Schema.merge({}, this.constructor.properties, properties)
    }

    // определяет свойства
    for (var p in properties) if (properties.hasOwnProperty(p)) { var property= properties[p]
        this[p]= null
    }

    // инициализирует значения
    this.init(values || {}, properties)

}



/**
 * Свойство схемы.
 *
 * @class
 * @memberof Schema
 */
Schema.Property= SchemaProperty

/**
 * Помошник слияния схем.
 *
 * @class
 * @memberof Schema
 */
Schema.merge= function () {

    var target= arguments[0] || {}
    for (var i= 1, l= arguments.length; i < l; i++) { var source= arguments[i] || {}

        var keys= Object.keys(source)
        for (var k in keys) { var key= keys[k]
            target[key]= source[key]
        }

    }

    return target
}



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

    if (!data || !(data instanceof Object)) { // значения не переданы

        data= {}

    }

    if (!properties || !(properties instanceof Object)) { // устанавливаемые свойства не указаны

        // инициализирует все свойства
        properties= this.constructor.properties || {}

    }

    // устанавливает значения свойств
    for (var p in properties) if (properties.hasOwnProperty(p)) { var property= properties[p]

        if (property instanceof this.constructor.Property) {

            property.init(this, p, data[p])

        } else {

            if (property= this.constructor.properties[p]) {
                property.init(this, p, data[p])
            }

        }

    }

    return this
}
