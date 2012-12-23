var inherits= require('util').inherits

/**
 * Конструктор схемы данных
 *
 * Если вызывается как конструктор, — переобъявляет свойства инстанцируемого объекта,
 * значения которых — экземпляры Schema.Property
 *
 * Если вызывается как функция, — возвращает дочерний конструктор 
 * с соответствующим прототипом и определением родителя, расширенного
 * переданным определением
 *
 * @constructor
 * @params {Function|null} Parent — родительский конструктор
 * @params {Object} properties — определение схемы
 * @returns {Schema|Function}
 */
var Schema= module.exports= function () {
    if (this instanceof Schema) {
        this.init(arguments[0])
        return this
    }

    //console.log('расширят')

    var Parent= Schema
    if (2 == arguments.length) {
        if (arguments[0] instanceof Function) {
            Parent= arguments[0]
        }
    }
    var Extended= function (properties) {
        if (this instanceof Schema) {
            Object.keys(this.constructor.properties).map(function (k) {
                Object.defineProperty(
                    this, k, Object.getOwnPropertyDescriptor(
                        this.constructor.properties, k
                    )
                )
            }, this)
            return Schema.apply(this, arguments)
        }
        return Schema.call(this, Extended, properties)
    }
    inherits(Extended, Parent)
    Extended.properties= {}

    var properties= null
    if (2 == arguments.length) {
        properties= arguments[1]
    } else {
        properties= arguments[0]
    }
    properties= properties || {}

    Object.keys(Parent.properties).map(function (k) {
        Object.defineProperty(
            Extended.properties, k, Object.getOwnPropertyDescriptor(
                Parent.properties, k
            )
        )
    })
    Object.keys(properties).map(function (k) {
        Object.defineProperty(
            Extended.properties, k, Object.getOwnPropertyDescriptor(
                properties, k
            )
        )
    })

    return Extended
}

Schema.properties= {}

Schema.prototype= { constructor: Schema

    /**
     * Конструктор схемы данных
     *
     * Переобъявляет свойства инстанцируемого объекта,
     * значения которых — экземпляры Schema.Property
     *
     * @params {Object} values — значения определяемых свойств
     */
,   init: function(values) {

        //console.log('инициализировать', this, 'со значениями', values)

        var properties= this.properties= {}
        var self= this

        Schema.Property.map(this, function (k, v, descriptor) {

            if (descriptor.value instanceof Schema.Property) {
                descriptor.value.define(self, k)
                properties[k]= descriptor.value

                if (properties[k].require) {
                    if (!values || !values[k]) {
                        throw new Schema.Property.BadValue('property `'+ k +'` is required')
                    }
                }
            } else {
                Property.define(this, k, descriptor)
            }
        })

        values && Schema.Property.map(values, function (k, v) {
            self[k]= v
        })
    }
}

var Property= Schema.Property= require('./properties/Property')