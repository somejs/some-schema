/* Использует */

var Schema= module.parent.exports
  , inherits= require('util').inherits



/**
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

    var descriptor= descriptor || {}

    Object.defineProperty(this, 'configurable', {
        enumerable:true, writable:true, value: (undefined !== descriptor.configurable) ? descriptor.configurable : false
    })
    Object.defineProperty(this, 'enumerable', {
        enumerable:true, writable:true, value: (undefined !== descriptor.enumerable) ? descriptor.enumerable : true,
    })

    if (undefined !== descriptor.value) {

        Object.defineProperty(this, 'writable', {
            enumerable:true, writable:true, value: (undefined !== descriptor.writable) ? descriptor.writable : true
        })
        Object.defineProperty(this, 'value', {
            enumerable:true, writable:true, value: descriptor.value
        })

    } else {

        var value= descriptor.default || null

        Object.defineProperty(this, 'default', {
            enumerable:true, writable:true, value: descriptor.default || null
        })

        Object.defineProperty(this, 'require', {
            enumerable:true, writable:true, value: descriptor.require || null
        })

        Object.defineProperty(this, 'type', {
            enumerable:true, writable:true, value: descriptor.type || null
        })

        var self= this
        var validate= function (v) {
            return self.validate(v)
        }

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

/**
 * Определяет текущее свойство в указанном объекте
 *
 * @params {Object} obj — объект
 * @params {String} k — имя определяемого свойства
 * @returns {Property}
 */
Property.prototype.define= function (obj, k) {

    Property.define(obj, k, this)

    return this
}

/**
 * Модифицирует устанавливаемое значение
 *
 * @params {mixed} value — проверяемое значение
 * @returns {mixed} — возвращает валидное значение
 */
Property.prototype.filter= function (value) {

    return value

}

/**
 * Проверяет значение на соответствие требованиям свойства
 *
 * @params {mixed} value — проверяемое значение
 * @returns {mixed} — возвращает валидное значение
 *
 * @throws {BadValueError} — если значение не соответствует требованиям
 */
Property.prototype.validate= function (value) {

    if (this.type && this.type instanceof Function) {
        if (!(value instanceof this.type)) {
            try {
                value= new this.type(value)
            } catch (e) {
                throw new BadValue('property is not valid')
            }
        }
    }

    if (this.filter) {
        try {
            value= this.filter(value)
        } catch (e) {
            throw new BadValue('property is not valid')
        }
    }

    if (this.require) {
        if (!value) {
            throw new BadValue('property is required')
        }
    }

    return value
}



/* Методы класса */

/**
 * Определяет свойство в указанном объекте
 *
 * @params {Object} obj — объект
 * @params {String} k — имя определяемого свойства
 * @params {Object} descriptor — определение
 */
Property.define= function (obj, k, descriptor) {

    Object.defineProperty(obj, k, descriptor)

    return Property
}

/**
 * Применяет к свойствам объекта указанную функцию
 *
 * @params {Object} obj — объект
 * @params {Function} iterator — функция, применяемая к каждому свойству объекта
 */
Property.map= function (obj, iterator) {

    if (iterator) {
        Object.keys(obj).map(function (k) {
            iterator(k, obj[k], Object.getOwnPropertyDescriptor(
                obj, k
            ))
        })

        return Property
    }
}

/**
 * Копирует свойства из одного объекта в другой
 *
 * @params {Object} src — источник свойств
 * @params {Object} obj — приемник
 */
Property.copy= function (src, obj) {

    Property.map(src, function (k, v, descriptor) {
        Property.define(obj, k,
            new Property(descriptor)
        )
    })

    return Property
}



/* Исключения */

/**
 * Модель ошибки валидации
 */
var BadValue= Property.BadValueError= Property.BadValue= function (message) {

    Error.call(this)
    //Error.captureStackTrace(this, this.constructor)

    this.name= 'Bad value'
    this.message= message

}
inherits(BadValue, Error)