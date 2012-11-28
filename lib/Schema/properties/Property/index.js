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
var Property= module.exports= Schema.Property= function (descriptor) {

    if (!(this instanceof Property)) {
        return new Property(descriptor)
    }

    var descriptor= descriptor || {
        configurable: true,
        enumerable: true,
        writable: true
    }

    Object.defineProperty(this, 'configurable', {
        enumerable:true, writable:true, value: descriptor.configurable || false
    })
    Object.defineProperty(this, 'enumerable', {
        enumerable:true, writable:true, value: descriptor.enumerable || true
    })

    if (undefined !== descriptor.value) {
 
        Object.defineProperty(this, 'writable', {
            enumerable:true, writable:true, value: descriptor.writable || true
        })
        Object.defineProperty(this, 'value', {
            enumerable:true, writable:true, value: descriptor.value || true
        })

    } else {

        var value= descriptor.default || null

        Object.defineProperty(this, 'default', {
            enumerable:true, writable:true, value: descriptor.default || null
        })

        Object.defineProperty(this, 'require', {
            enumerable:true, writable:true, value: descriptor.require || null
        })

        var validate= function (value) {
            if (descriptor.validate) {
                value= descriptor.validate(value)
            }
            if (descriptor.require || descriptor.required) {
                if (!value) throw new BadValueError()
            }
            return value
        }
        Object.defineProperty(this, 'validate', {
            value: validate
        })

        Object.defineProperty(this, 'set', {
            enumerable:true,
            value: function (v) {
                value= validate(v)
            }
        })
        Object.defineProperty(this, 'get', {
            enumerable:true,
            value: function () {
                return value
            }
        })

        Object.defineProperty(this, 'verbose', {
            enumerable:true, writable:true, value: descriptor.verbose || null
        })

    }
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

    Property.define(target, k, this)

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
            iterator(k, source[k], Object.getOwnPropertyDescriptor(
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

    Property.map(source, function (k, v, descriptor) {
        Property.define(target, k,
            new Property(descriptor)
        )
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