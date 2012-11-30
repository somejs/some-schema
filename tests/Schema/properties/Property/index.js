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

    })

}}