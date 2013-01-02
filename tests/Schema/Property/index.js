var assert= require('chai').assert

module.exports= function (Property) {

    var assertClass= function (Class) { return function () {
        assert.isFunction(
            Class
        )
    }}

    var assertClassInstance= function (Class, instance) { return function () {
        assert.instanceOf(
            instance, Class
        )
    }}

    var assertMethod= function (Method) {
        return function () {
            assert.isFunction(
                Method
            )
        }
    }

    var describePropertyInstance= function (Property, instance) { return function () {
        it('should be an instance of Property', assertClassInstance(
            Property, instance
        ))
        describe('#constructor', function () {
            it('should be Constructor', function () {
                assert.equal(
                    Property, instance.constructor
                )
            })
        })
        describe('#configurable', function () {
            it('should be defined', function () {
                assert.isDefined(
                    instance.configurable
                )
            })
            it('should have default value', function () {
                assert.equal(
                    instance.configurable, false
                )
            })
        })
        describe('#enumerable', function () {
            it('should be defined', function () {
                assert.isDefined(
                    instance.enumerable
                )
            })
            it('should have default value', function () {
                assert.equal(
                    instance.enumerable, true
                )
            })
        })
    }}

    return function () {
        it('should be a class', assertClass(
            Property
        ))
        describe('#define', function () {
            it('should be a method', assertMethod(
                Property.define
            ))
        })
        describe('#map', function () {
            it('should be a method', assertMethod(
                Property.map
            ))
        })
        describe('#copy', function () {
            it('should be a method', assertMethod(
                Property.copy
            ))
        })
        describe('property= new Property()', function () {
            var property= new Property()
            describe('instance of Property', describePropertyInstance(
                Property, property
            ))
        })
        describe('параметр `type` указывает конструктор, экземпляром которого должно быть значение свойства', function () {
            var property= new Property({
                type:Function
            })
            it('имеет параметр type', function () {
                assert.isDefined(
                    property.type
                )
            })
            it('позволяет установить только значение определенного типа', function () {
                var fn= function() {

                }
                assert.equal(
                    property.validate(fn), fn
                )
            })
            it('другое значение выбросит исключение', function () {
                try {
                    property.validate(123), 123
                } catch (e) {
                    assert.equal(
                        e.name, 'Bad Value'
                    )
                }
            })
        })
    }
}