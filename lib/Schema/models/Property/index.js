/* Использует */

var Schema= module.parent.exports
  , inherits= require('util').inherits



/*
 * Свойство схемы
 *
 * Принимает определение, возвращает экземпляр модели свойства
 *
 * @params {Object} descriptor — определение свойства
 * @returns {Property|Function}
 */
var Property= module.exports= Schema.Property= function (options) {

    if (!(this instanceof Property)) {
        return new Property(options)
    }

    var options= options || {}

    var value= options.default || null

    var validate= function (value) {
        if (options.validate) {
            value= options.validate(value)
        }
        if (options.require || options.required) {
            if (!value) throw new BadValueError()
        }
        return value
    }


    Object.defineProperty(this, 'validate', {
        value: validate
    })

    Object.defineProperty(this, 'setter', {
        value: function (v) {
            value= validate(v)
        }
    })

    Object.defineProperty(this, 'getter', {
        value: function () {
            return value
        }
    })


    Object.defineProperty(this, 'verbose', {
        enumerable:true, writable:true,
        value: options.verbose || null
    })

    Object.defineProperty(this, 'default', {
        enumerable:true, writable:true,
        value: options.default || null
    })
}



/* Методы экземпляра */

/*
 * Определяет текущее свойство в указанном объекте
 *
 * @params {Object} target — объект
 * @params {String} k — имя определяемого свойства
 * @returns {Property}
 */
Property.prototype.define= function (target, k) {

    Object.defineProperty(target, k, {
        enumerable:true, configurable:true, set:this.setter, get:this.getter
    })

    return this
}

/*
 * Проверяет значение на соответсвие требованиям свойства
 *
 * @params {mixed} value — проверяемое значение
 * @returns {mixed} — возвращает валидное значение
 *
 * @throws {BadValueError} — если значение не соответствует требованиям
 */
Property.prototype.validate= function (value) {

    return this.validate(value)

}



/* Методы класса */

/*
 * Определяет свойство в указанном объекте
 *
 * @params {Object} target — объект
 * @params {String} k — ключ определяемого свойства
 * @params {Object} descriptor — определение
 */
Property.define= function (target, k, descriptor) {

    if (descriptor.value instanceof Property) {
        return descriptor.value.define(target, k)
    }

    Object.defineProperty(target, k, descriptor)

    return Property
}

/*
 * Применяет к свойствам объекта указанную функцию
 *
 * @params {Object} source — объект
 * @params {Function} iterator — функция, применяемая к каждому свойству объекта
 */
Property.map= function (source, iterator) {

    if (iterator) {
        Object.keys(source).map(function (k) {
            iterator(k, Object.getOwnPropertyDescriptor(
                source, k
            ))
        })

        return Property
    }
}

/*
 * Копирует свойства из одного объекта в другой
 *
 * @params {Object} source — источник свойств
 * @params {Object} target — приемник
 */
Property.copy= function (source, target) {

    Property.map(source, function (k, descriptor) {
        Property.define(target, k, descriptor)
    })

    return Property
}



/* Исключения */

/*
 * Модель ошибки валидации
 */
var BadValueError= Property.BadValueError= function () {
    Error.apply(this, arguments)
}
BadValueError.prototype= Error.prototype