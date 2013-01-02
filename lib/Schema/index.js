var inherits= require('util').inherits
var Property= require('./Property')

/**
 * Cхема данных
 *
 * Если вызывается как функция, — возвращает конструктор потомка
 * с соответствующим прототипом и определением родителя, расширенного
 * переданным определением
 *
 * Если вызывается как конструктор, — переобъявляет свойства инстанцируемого объекта,
 * значения которых — экземпляры Schema.Property
 *
 * @constructor
 * @param {Function|undefined} Parent — родительский конструктор
 * @param {Object} properties — определения свойств
 * @return {Function|Schema}
 */
var Schema= module.exports= function () {
    if (this instanceof Schema) {
        Schema.Property.copy(this.constructor.properties,
            this
        )
        // инициализирует свойства схемы
        var properties= this.properties= {}
          , values= arguments[0]
          , self= this
        Schema.Property.map(this, function (k, v, descriptor) {
            if (v instanceof Property) {
                descriptor.value.define(self, k)
                properties[k]= descriptor.value
                if (properties[k].require) {
                    if (!values || !values[k]) {
                        if (!properties[k].default) {
                          throw new Schema.Property.BadValue('property `'+ k +'` is required')
                        }
                        self[k]= properties[k].default
                    }
                }
            } else {
                if (v instanceof Function && v.properties) {
                    var schema= new v
                    schema.define(self, k)
                } else {
                    Property.define(this, k, descriptor)
                }
            }
        })
        // запускает метод инициализации
        this.init && this.init(values)
        return this
    }

    /*/
     * Родительский конструктор
     */
    var Parent= (2 == arguments.length) ? arguments[0] : Schema

    /*/
     * Конструктор потомка
     *
     * Наследует прототип родителя
     *
     * @constructor
     * @param {Object} properties — определения свойств
     */
    var Extended= function (properties) {
        if (this instanceof Schema) {
            return Schema.apply(this, arguments)
        }
        return Schema.call(this, Extended, properties)
    }
    inherits(Extended, Parent)

    /*/
     * Определения свойств потомка
     *
     * @exports Extended.properties
     * @type {Object}
     */
    Extended.properties= {}
    // копирует свойства родителя
    Object.keys(Parent.properties).map(function (k) {
        Object.defineProperty(
            Extended.properties, k, Object.getOwnPropertyDescriptor(
                Parent.properties, k
            )
        )
    })
    // копирует переданные свойства
    var properties= (2 == arguments.length) ? arguments[1] : arguments[0]
    properties instanceof Object && Object.keys(properties).map(function (k) {
        Object.defineProperty(
            Extended.properties, k, Object.getOwnPropertyDescriptor(
                properties, k
            )
        )
    })

    /*/
     * Модель свойства схемы
     *
     * @exports Schema.Property as Extended.Property
     * @type {Function}
     */
    Extended.Property= Property

    return Extended
}
inherits(Schema, Property)

/*/
 * Модель свойства схемы
 *
 * @exports Property as Schema.Property
 * @type {Function} - модель свойства схемы
 */
Schema.Property= Property

/*/
 * Определения свойств схемы
 *
 * @exports Schema.properties
 * @type {Object}
 */
Schema.properties= {}

/*/
 *
 *
 * Методы экземпляра
 */

/**
 * Инициализирует значения свойств
 *
 * @param {Object} values — значения определяемых свойств
 */
Schema.prototype.init= function(values) {
    values && this.set(values)
    return this
}

/**
 * Привязывает схему к свойству объекта
 *
 * @param {Object} obj — объект
 * @param {String} k — имя определяемого свойства
 */
Schema.prototype.define= function(obj, k) {
    var self= this
    Object.defineProperty(obj, k, {
        enumerable:true,
        set: function (v) {
            self.set(v)
        },
        get: function () {
            return self
        }
    })
    return self
}

/**
 * Устанавливает значения свойств
 *
 * @param {Object} values — значения свойств
 */
Schema.prototype.set= function(values) {
    var self= this
    Schema.Property.map(values, function (k, v) {
        self[k]= v
    })
    return self
}

/**
 * Проверяет значения свойств
 *
 * @param {Object} values — значения свойств
 */
Schema.prototype.validate= function(values) {
}