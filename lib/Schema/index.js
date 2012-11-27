/*
 * Конструктор схемы данных
 *
 * Если вызывается как конструктор, возвращает экземпляр модели
 *
 * Если вызывается как функция, возвращает дочерний конструктор 
 * с соответствующим прототипом и определением родителя,
 * расширенного переданным определением
 *
 * @params {Object} descriptor — определение схемы
 * @returns {Schema|Function}
 */
var Schema= module.exports= function () {

}



/* Использует */

var Property= Schema.Property= require('./models/Property')
  , inherits= require('util').inherits



/* Методы класса */

/*
 * Производит конструктор схемы
 *
 * Принимает родительский конструктор и параметры,
 * которые будут переопределены параметрами дочернего конструктора,
 * и переданы в родительский
 *
 * @params {Function} Parent — родительский конструктор
 * @params {Object} properties — значения или определения свойств
 */
var factory= Schema.factory= function (Parent, properties) {
    Parent= Parent || function () {}

    var Constructor= function (properties) {
        if (!(this instanceof Constructor)) {
            return factory(Constructor, properties) // осторожно, рекурсия
        }
        init(this, Constructor.properties, properties)
    }
    inherits(Constructor, Parent)

    Constructor.properties= {} // скопировать опции родителя
    Parent.properties && Property.copy(Parent.properties,
        Constructor.properties
    )

    // дополнить переданными опциями
    properties && Property.copy(properties,
        Constructor.properties
    )

    return Constructor
}

/*
 * Инстанцирует схему по определению
 *
 * @params {Function} obj — инстанцируемый объект
 * @params {Object} properties — определения свойств
 * @params {Object} values — значения свойств
 */
var init= Schema.init= function (obj, properties, values) {

    var props= obj.properties || ( obj.properties= {} )

    Schema.Property.map(properties, function (k, descriptor) {
        Schema.Property.define(obj, k, descriptor)

        if (descriptor instanceof Schema.Property) {
            props[k]= descriptor
        }

        values && values[k] && ( obj[k]= values[k] )
    })

    return obj
}



/* Экспортирует */

Schema= module.exports= factory(null, {
    type:'schema' // свойство всех экземпляров схемы
})

Schema.Property= Property