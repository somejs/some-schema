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
            var property= Property()
            describe('instance of Property', describePropertyInstance(
                Property, property
            ))
        })
    }
}