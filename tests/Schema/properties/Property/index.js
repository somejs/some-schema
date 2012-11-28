var assert= require('chai').assert

module.exports= function (Property) { return function () {

    describe('Property', function () {

        it('является функцией — Property()', function () {
            assert.isFunction(
                Property
            )
        })

        describe('несет на себе методы класса', function () {
            it('Property.define', function () {
                assert.isDefined(
                    Property.define
                )
            })
            it('Property.map', function () {
                assert.isDefined(
                    Property.map
                )
            })
            it('Property.copy', function () {
                assert.isDefined(
                    Property.copy
                )
            })
        })



        describe('инстанцирует дескриптор свойства', function () {

            var property= new Property()


            it('экземпляр класса Property', function () {
                assert.instanceOf(
                    property, Property
                )
            })



            it('имеет свойство configurable', function () {
                assert.isDefined(
                    property.configurable
                )
            })

            it('по умолчанию configurable — false', function () {
                assert.equal(
                    false, property.configurable
                )
            })



            it('имеет свойство enumerable', function () {
                assert.isDefined(
                    property.enumerable
                )
            })

            it('по умолчанию enumerable — true', function () {
                assert.equal(
                    true, property.enumerable
                )
            })


            // Экземпляр свойства представляет собой js-совместимый дескриптор свойства
            // Имеет опции: configurable, enumerable, set, get
            // Может быть сконструирован из js-дескриптора свойства
            // Может быть передан в js-функцию Object.defineProperty
        })

    })

}}