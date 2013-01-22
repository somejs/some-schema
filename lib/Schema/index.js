var inherits= require('util').inherits
var Property= require('./Property')

/*/
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
        var properties= {}
          , values= arguments[0] || {}
          , self= this
        Schema.Property.map(this, function (k, v, descriptor) {
            var property= v
            if (!(property instanceof Property)) {
                throw new Error('Constructor error: property `'+ k +'` must be an instance of Schema.Property')
            }
            property.define(
                self, k
            )
        })
        // запускает метод инициализации
        this.init(values)
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
    properties instanceof Object && Schema.Property.map(properties, function (k, property, descriptor) {
        if (!(property instanceof Property)) {
            if (property instanceof Function) {
                property= Property({
                    type:property
                })
            } else {
                throw Error('bad property descriptor')
            }
        }
        Extended.properties[k]= property
    })
    Parent.inherit && Parent.inherit.call(undefined, Extended, Parent)
    return Extended
}
inherits(Schema, Property)


/*/
 *
 *
 * Экспортирует
 */

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
 * Методы класса
 */

/**
 * Наследует форму
 *
 * @param {mixed} args
 */
Schema.inherit= function (Extended, Parent) {
    // пробрасывает свойства конструктора, если нет
    Schema.Property.map(Parent, function (k, property, descriptor) {
        if (!Extended.hasOwnProperty(k)) {
            Object.defineProperty(Extended, k, descriptor)
        }
    })
}


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

    var self= this
    Schema.Property.map(values, function (k, v) {
        self[k]= v
    })

    return self
}

/*/
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

/*/
 * Проверяет значения свойств
 *
 * @param {Object} values — значения свойств
 */
Schema.prototype.validate= function(values) {

    var self= this
    var valid= true
    Schema.Property.map(values, function (k, v) {
        var property= self.constructor.properties[k]
        var value= v
        if (property) {
            try {
                value= property.validate(value)
            } catch (e) {
                if (e instanceof Schema.Property.BadValue) {
                    valid= false
                } else {
                    throw e
                }
            }
        }
    })
    return valid
}