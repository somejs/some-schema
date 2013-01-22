/*/
 * Дескриптор свойства
 *
 * @constructor
 * @param {Object} options — определение свойства
 * @return {Descriptor}
 */
var Descriptor= module.exports= function (options) {

    var options= options || {}

    /*/
     * Возможность переопределения свойства
     *
     * @type {Boolean}
     */
    Object.defineProperty(this, 'configurable', {
        enumerable:true, writable:true, value: (undefined !== options.configurable) ? options.configurable : false
    })

    /*/
     * Видимость при перечислении
     *
     * @type {Boolean}
     */
    Object.defineProperty(this, 'enumerable', {
        enumerable:true, writable:true, value: (undefined !== options.enumerable) ? options.enumerable : true,
    })

}

/*/
 * Определяет свойство в указанном объекте с указанным именем
 *
 * @param {Object} obj — объект
 * @param {String} k — имя определяемого свойства
 * @return {Descriptor}
 */
Descriptor.prototype.define= function (obj, k) {

}