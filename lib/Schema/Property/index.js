var Schema= module.parent.exports

,   Descriptor= require('./Descriptor')

/*/
 * Фабрика свойств схемы
 *
 * Принимает определение, возвращает экземпляр свойства подходящего типа
 *
 * @param {Object} options — определение свойства
 * @return {Property|Function}
 */
var Property= module.exports= Schema.Property= function (options) {
    var options= options || {}

    if (!(this instanceof Property)) {

        if (options.value && (!options.type)) {
            return new PublicProperty(options)
        }
        return new PrivateProperty(options)
    }
}
Property.prototype= new Descriptor
Property.prototype.constructor= Property

/*/
 * Инициализирует значение свойства
 *
 * @param {mixed} value — проверяемое значение
 * @return {mixed} — возвращает валидное значение
 */
Property.prototype.init= function (value) {

    return value
}

/*/
 * Проверяет значение на соответствие требованиям свойства
 *
 * @param {mixed} value — проверяемое значение
 * @return {mixed} — возвращает валидное значение
 */
Property.prototype.validate= function (value) {

    return value
}



/*/
 * Свойство с простым значением
 *
 * Принимает определение, возвращает экземпляр модели свойства
 *
 * @param {Object} options — определение свойства
 * @return {Property|Function}
 */
var PublicProperty= function (options) {
    Descriptor.call(this, options)

    /*/
     * Возможность перезаписи значения
     *
     * @type {Boolean}
     */
    Object.defineProperty(this, 'writable', {
        enumerable:true, writable:true, value: (undefined !== options.writable) ? options.writable : true
    })

    /*/
     * Значение свойства
     *
     * Определяет значение инициализируемого свойства без установки
     * сеттера и геттера.
     *
     * @type {*}
     */
    Object.defineProperty(this, 'value', {
        enumerable:true, writable:true, value: options.value
    })

}
PublicProperty.prototype= new Property

/*/
 * Определяет свойство в указанном объекте
 *
 * @param {Object} obj — объект
 * @param {String} k — имя определяемого свойства
 * @return {Property} — возвращает себя
 */
PublicProperty.prototype.define= function (obj, k) {

    var descriptor= {
        enumerable: this.enumerable,
        configurable: this.configurable,
        writable: this.writable,
        value: this.value
    }

    Property.define(obj, k, descriptor)
    return this
}



/*/
 * Свойство с контролируемым значением
 *
 * Принимает определение, возвращает экземпляр модели свойства
 *
 * @param {Object} options — определение свойства
 * @return {Property|Function}
 */
var PrivateProperty= function (options) {
    Descriptor.call(this, options)

    if (options.type) {
        if (!(options.type instanceof Function)) {
            throw Error('type must be a function')
        }

        /*/
         * Тип значения
         *
         * @type {Function}
         */
        Object.defineProperty(this, 'type', {
            enumerable:true, writable:true, value:(
                options.type
            )
        })
    }

    if (undefined !== options.value) {

        /*/
         * Начальное значения
         *
         * @type {mixed}
         */
        Object.defineProperty(this, 'value', {
            enumerable:true, writable:true, value:(
                options.value
            )
        })
    }

    var property= this

    /*/
     * Сеттер
     *
     * @type {Function}
     */
    Object.defineProperty(this, 'set', {
        enumerable:true, value:function (v) {
            value= property.validate(v)
        }
    })

    /*/
     * Геттер
     *
     * @type {Function}
     */
    Object.defineProperty(this, 'get', {
        enumerable:true, value:function () {
            return value
        }
    })
}
PrivateProperty.prototype= new Property

/*/
 * Определяет свойство в указанном объекте
 *
 * @param {Object} obj — объект
 * @param {String} k — имя определяемого свойства
 * @return {Property} — возвращает себя
 */
PrivateProperty.prototype.define= function (obj, k) {

    var descriptor= {
        enumerable: this.enumerable,
        configurable: this.configurable,
    }

    var property= this
    var value= property.init(
        property.value
    )

    descriptor.set= function (v) {
        value= property.validate(v)
    }
    descriptor.get= function () {
        return value
    }

    Property.define(obj, k, descriptor)
    return this
}

/*/
 * Инициализирует значение свойства
 *
 * @param {mixed} value — инициализируемое значение
 * @return {mixed} — возвращает годное значение
 *
 * @throws {BadValueError} — если результат не соответствует требованиям
 */
PrivateProperty.prototype.init= function (value) {

    if (this.type) {
        if (!(value instanceof this.type)) {

            if (Boolean === this.type) {
                if (undefined === value) {
                    return false // по умолчанию
                }
                if (false === value || value === true) {
                    return value
                }
                return undefined
            }

            if (String === this.type) {
                if (undefined === value) {
                    return '' // по умолчанию
                }
                if ('string' === typeof value) {
                    return value
                }
                return undefined
            }

            if (Number === this.type) {
                if (undefined === value) {
                    return 0 // по умолчанию
                }
                if ('number' === typeof value) {
                    return value
                }
                return undefined
            }

            value= new this.type(value)
            if (value instanceof this.type) {
                return value
            }

            return undefined
        }
    }
    return value
}

/*/
 * Проверяет значение на соответствие требованиям свойства
 *
 * @param {mixed} value — проверяемое значение
 * @return {mixed} — возвращает валидное значение
 *
 * @throws {BadValueError} — если значение не соответствует требованиям
 */
PrivateProperty.prototype.validate= function (value) {

    if (this.type) {
        if (!(value instanceof this.type)) {
            if (undefined !== value) {
                v= this.init(value)
                if (undefined !== v) {
                    return v
                }
            }
            throw new BadValue('value must be an instance of '+ this.type.name +', given '+ value)
        }
    }
    return value
}


/*/
 *
 *
 * Экспортирует
 */

/*/
 * Модель ошибки валидации
 */
var BadValue= Property.BadValueError= Property.BadValue= function (message) {

    Error.call(this)
    //Error.captureStackTrace(this, this.constructor)

    this.name= 'Bad value'
    this.message= message

}
require('util').inherits(BadValue, Error)



/*/
 *
 *
 * Методы класса
 */

/*/
 * Определяет свойство в указанном объекте
 *
 * @param {Object} obj — объект
 * @param {String} k — имя определяемого свойства
 * @param {Object} descriptor — определение
 */
Property.define= function (obj, k, descriptor) {

    Object.defineProperty(obj, k, descriptor)
    return Property
}

/*/
 * Применяет к свойствам объекта указанную функцию
 *
 * @param {Object} obj — объект
 * @param {Function} iterator — функция, применяемая к каждому свойству объекта
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

/*/
 * Копирует свойства из одного объекта в другой
 *
 * @param {Object} src — источник свойств
 * @param {Object} obj — приемник
 */
Property.copy= function (src, obj) {

    Property.map(src, function (k, v, descriptor) {
        Property.define(obj, k,
            descriptor
        )
    })
    return Property
}