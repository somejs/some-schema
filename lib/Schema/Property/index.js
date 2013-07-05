/**
 * Конструктор свойства схемы.
 *
 * @param {mixed} type
 * @returns {Property}
 */
var SchemaProperty= module.exports= function SchemaProperty(type) {

    this.type= type

}



/**
 * Инициализирует свойство схемы.
 *
 * Устанавливает в указанной схеме значение указанного свойства.
 *
 * @param {Schema} schema
 * @param {String} key
 * @param {*} val
 * @returns {Schema} — return self
 */
SchemaProperty.prototype.init= function(schema, key, val) {

    if (Number === this.type) {

        schema[key]= (val !== undefined && val !== null) ? Number(val) : null

    } else if (String === this.type) {

        schema[key]= (val !== undefined && val !== null) ? (''+val) : null

    } else {

        schema[key]= new this.type(val)

    }
}
