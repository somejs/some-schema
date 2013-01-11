var Schema= module.parent.exports
var inherits= require('util').inherits

/*/
 * Свойство схемы
 *
 * Принимает определение, возвращает экземпляр модели свойства
 *
 * @param {Object} descriptor — определение свойства
 * @return {Property|Function}
 */
var Property= module.exports= Schema.Property= function (descriptor) {

    if (!(this instanceof Property)) {
        return new Property(descriptor)
    }

    var descriptor= descriptor || {}

    /*/
     * Возможность переопределения свойства
     *
     * @type {Boolean}
     */
    Object.defineProperty(this, 'configurable', {
        enumerable:true, writable:true, value: (undefined !== descriptor.configurable) ? descriptor.configurable : false
    })

    /*/
     * Видимость при перечислении
     *
     * @type {Boolean}
     */
    Object.defineProperty(this, 'enumerable', {
        enumerable:true, writable:true, value: (undefined !== descriptor.enumerable) ? descriptor.enumerable : true,
    })

    /*/
     * Тип значения
     *
     * @type {Function}
     */
    Object.defineProperty(this, 'type', {
        enumerable:true, writable:true, value: descriptor.type || null
    })
    if (this.type && !(this.type instanceof Function)) {
        throw Error('type must be a function')
    }

    if (undefined !== descriptor.value) {

        /*/
         * Возможность перезаписи значения
         *
         * @type {Boolean}
         */
        Object.defineProperty(this, 'writable', {
            enumerable:true, writable:true, value: (undefined !== descriptor.writable) ? descriptor.writable : true
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
            enumerable:true, writable:true, value: descriptor.value
        })

    } else {

        /*/
         * Значение по умолчанию
         *
         * Определяет значение инициализируемого свойства. Значение
         * комплексного типа копируется по ссылке.
         *
         * @type {*}
         */
        Object.defineProperty(this, 'default', {
            enumerable:true, writable:true, value: descriptor.default
        })

        /*/
         * Сеттер
         *
         * @type {Function}
         */
        Object.defineProperty(this, 'set', {
            enumerable:true, value:null
        })

        /*/
         * Геттер
         *
         * @type {Function}
         */
        Object.defineProperty(this, 'get', {
            enumerable:true, value:null
        })


        Object.defineProperty(this, 'verbose', {
            enumerable:true, writable:true, value: descriptor.verbose || null
        })

        /*/
         * Необходимость наличия значения
         *
         * @type {Function}
         */
        Object.defineProperty(this, 'require', {
            enumerable:true, writable:true, value: descriptor.require || null
        })
    }
}
Property.prototype.constructor= Property


/*/
 *
 *
 * Методы экземпляра
 */

/*/
 * Определяет текущее свойство в указанном объекте
 *
 * Создает замыкание для значения свойства, определяет геттер и сеттер
 *
 * @param {Object} obj — объект
 * @param {String} k — имя определяемого свойства
 * @return {Property}
 */
Property.prototype.define= function (obj, k) {
    var descriptor= {
        configurable: this.configurable,
        enumerable: this.enumerable,
    }
    if (this.value) {
        descriptor.writable= this.writable
        descriptor.value= (
            this.type && (
                (this.value instanceof this.type && this.value) || new this.type(this.value)
            ) || this.value
        )
    } else {
        var value= this.default
        ,   property= this, validate= function (v) {
                return property.validate(v)
            }
        descriptor.set= function (v) {
            value= validate(v)
        }
        descriptor.get= function () {
            if (property.type) {
                if (!(value instanceof property.type)) {
                    value= new property.type(value)
                }
            }
            return value
        }
    }
    Property.define(obj, k, descriptor)
    return this
}

/*/
 * Модифицирует устанавливаемое значение
 *
 * @param {mixed} value — проверяемое значение
 * @return {mixed} — возвращает валидное значение
 */
Property.prototype.filter= function (value) {

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
Property.prototype.validate= function (value) {

    if (this.type) {
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
 * Клонирует свойство указанного объекта
 *
 * @param {Object} obj — объект
 * @param {String} k — имя клонируемого свойства
 */
Property.clone= function (obj, k) {
    var value= obj[k]

    return v
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
            new Property(descriptor)
        )
    })

    return Property
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
inherits(BadValue, Error)