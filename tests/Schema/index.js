var assert= require('chai').assert

var describeSchema= module.exports= function (Schema) { return function () {

    describe('библиотека экспортирует конструктор схемы, который', describeConstructor(
        Schema
    ))

    var Foo= Schema()

    describe('конструктор схемы, вызванный как функция `Foo= Schema()`, возвращает дочерний конструктор, который', describeChildConstructor(
        Foo, Schema
    ))

    var Bar= Foo()

    describe('конструктор схемы, вызванный как функция `Bar= Foo()`, возвращает дочерний конструктор, который', describeChildConstructor(
        Bar, Foo
    ))

    var Baz= Bar()

    describe('конструктор схемы, вызванный как функция `Baz= Bar()`, возвращает дочерний конструктор, который', describeChildConstructor(
        Bar, Foo
    ))

}}



var describeConstructor= function (Schema) { return function () {
    it('является функцией', function () {
        assert.isFunction(
            Schema
        )
    })
    it('является конструктором схемы', function () {
        assert.equal(
            Schema.prototype.constructor.prototype, Schema.prototype
        )
    })
    describe('имеет свойство `properties` с определениеми свойств схемы, которое', describeConstructorProperties(
        Schema.properties
    ))
    describe('конструирует экземпляр схемы, который', describeInstance(
        Schema
    ))
}}

var describeConstructorProperties= function (properties) { return function () {
    it('является объектом', function () {
        assert.isObject(
            properties
        )
    })
    it('содержит определение свойства `properties.type` со значением `schema`', function () {
        assert.equal(
            'schema', properties.type
        )
    })
}}

var describeInstance= function (Schema, properties) { return function () {
    var schema= new Schema({
        other:'something'
    })
    it('является объектом', function () {
        assert.isObject(
            schema
        )
    })
    it('имеет определенный тип', function () {
        assert.instanceOf(
            schema, Schema
        )
    })
    it('имеет определенные свойства', function () {
        assert.equal(
            schema.type, 'schema'
        )
        assert.equal(
            schema.other, 'something'
        )
    })
    describe('имеет свойство `properties`, которое', describeInstanceProperties(
        schema.properties
    ))
}}

var describeInstanceProperties= function (properties) { return function () {
    it('является объектом', function () {
        assert.isObject(
            properties
        )
    })
    it('содержит определение свойства c определениями — экземплярами `Schema.Property`', function () {

    })
    it('других определений не содержит', function () {
        assert.isUndefined(
            properties.type
        )
        assert.isUndefined(
            properties.other
        )
    })
}}


var describeChildConstructor= function (Child, Schema) { return function () {
    it('является функцией', function () {
        assert.isFunction(
            Child
        )
    })
    describe('имеет свойство `properties`, которое', describeConstructorProperties(
        Child.properties
    ))
    describe('конструирует экземпляр схемы, который', describeChildInstance(
        new Child(), Child, Schema
    ))
}}

var describeChildInstance= function (schema, Child, Schema) { return function () {
    it('является объектом', function () {
        assert.isObject(
            schema
        )
    })
    it('имеет определенный тип', function () {
        assert.instanceOf(
            schema, Child
        )
        assert.instanceOf(
            schema, Schema
        )
    })
}}
//        describe('Несет на себе модель свойства:', require('./properties/Property')(
//            Schema.Property
//        ))
//
//
//
//        describe('Классический способ определения модели', function () {
//
//            var Model= function() {
//
//                this.db= Schema.Property({ verbose:'база данных', require:true })
//                this.key= Schema.Property({ verbose:'путь к данным модели в базе данных', require:true })
//
//                this.loaded= false
//                this.saved= true
//
//                Schema.apply(this, arguments)
//            }
//            Model.prototype= Schema.prototype
//
//            describe('Конструктор схемы', function () {
//                it('бросает исключение, если значение требуемого свойства не передано', function () {
//                    var model= null
//                    try {
//                        model= new Model({
//                            db: {}, //key: 'path/to/data'
//                        })
//                    } catch (e) {
//                        assert.instanceOf(
//                            e, Schema.Property.BadValue
//                        )
//                    } finally {
//                        assert.isNull(
//                            model
//                        )
//                    }
//                })
//            })
//
//
//
//            describe('Экземпляр схемы', function () {
//
//                var db= {}
//                var model= new Model({
//                    db:db, key:'path/to/data',
//                    loaded:true,
//
//                    other:'something',
//                    empty:null,
//                })
//
//                it('имеет определенный тип', function () {
//                    assert.instanceOf(
//                        model, Model
//                    )
//                    assert.instanceOf(
//                        model, Schema
//                    )
//                })
//
//                it('имеет объявленные свойства', function () {
//                    assert.isDefined(
//                        model.db
//                    )
//                    assert.isDefined(
//                        model.key
//                    )
//                    assert.isDefined(
//                        model.loaded
//                    )
//                    assert.isDefined(
//                        model.other
//                    )
//                    assert.isDefined(
//                        model.empty
//                    )
//                })
//                it('содержит переданные значения', function () {
//                    assert.equal(
//                        'path/to/data', model.key
//                    )
//                    assert.equal(
//                        db, model.db
//                    )
//                    assert.equal(
//                        true, model.loaded
//                    )
//                    assert.equal(
//                        'something', model.other
//                    )
//                    assert.equal(
//                        null, model.empty
//                    )
//                })
//
//
//
//                describe('имеет контейнер с объявлениями свойств, который', function () {
//                    it('является объектом', function () {
//                        assert.isObject(
//                            model.properties
//                        )
//                    })
//                    it('содержит объявления свойств, чьи дескрипторы — экземпляры Schema.Property', function () {
//                        assert.isDefined(
//                            model.properties.db
//                        )
//                        assert.instanceOf(
//                            model.properties.db, Schema.Property
//                        )
//
//                        assert.isDefined(
//                            model.properties.key
//                        )
//                        assert.instanceOf(
//                            model.properties.key, Schema.Property
//                        )
//                    })
//                    it('остальных объявлений не содержит', function () {
//                        assert.isUndefined(
//                            model.properties.loaded
//                        )
//                        assert.isUndefined(
//                            model.properties.other
//                        )
//                        assert.isUndefined(
//                            model.properties.empty
//                        )
//                    })
//
//                })
//
//
//
//            })
//
//        })