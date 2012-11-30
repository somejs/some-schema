/**
 * Конструктор схемы данных
 *
 * Переобъявляет свойства инстанцируемого объекта,
 * значения которых — экземпляры Schema.Property
 *
 * @params {Object} values — значения определяемых свойств
 */
var Schema= module.exports= function (values) {
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



/* Использует */

var Property= Schema.Property= require('./properties/Property')



/* Методы класса */

/**
 * Производит конструктор схемы
 *
 * Оборачивает переданный конструктор в конструктор схемы
 * и расширяет его определение переданными определениями свойств
 *
 *
 * @params {Function} Constructor — родительский конструктор
 * @params {Object} properties — определения свойств
 * @params {Object} properties — новые определения свойств
 */
Schema.factory= function (Constructor, properties, override) {

    var Extended= function (properties) {
        if (!(this instanceof Extended)) {
            return Schema.factory(Schema, Extended.properties, properties)
        }
        Property.copy(Extended.properties,
            this
        )
        Constructor.apply(this, arguments)
    }
    Property.copy(Constructor,
        Extended
    )
    Extended.prototype= Constructor.prototype

    Extended.properties= {}
    Property.copy(properties, Extended.properties)
    override && Property.copy(override, Extended.properties)

    return Extended
}



/* Экспортирует */

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
 * @params {Object} descriptor — определение схемы
 * @returns {Schema|Function}
 */
module.exports= Schema.factory(Schema, {
    type:'schema' // свойство всех экземпляров схемы
})