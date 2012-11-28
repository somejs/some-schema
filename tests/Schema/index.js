var assert= require('chai').assert

module.exports= function (Schema) { return function () {

    describe('Библиотека экспортирует конструктор схемы, который:', function () {


        it('является функцией — Schema()', function () {
            assert.isFunction(
                Schema
            )
        })

        it('несет на себе определения свойств — Schema.properties', function () {
            assert.isDefined(
                Schema.properties
            )
            assert.equal(
                'schema', Schema.properties.type
            )
        })



        describe('Вызванный как функция — Foo= Schema() — возвращает конструктор дочерней схемы, который:', function () {

            var Foo= Schema()

            it('является функцией — Foo()', function () {
                assert.isFunction(
                    Foo
                )
            })

            it('несет на себе определения свойств — Foo.properties', function () {
                assert.isDefined(
                    Foo.properties
                )
                assert.equal(
                    'schema', Foo.properties.type
                )
            })



            describe('Вызванный как функция — Bar= Foo() — возвращает конструктор дочерней схемы, который:', function () {

                var Bar= Schema()

                it('является функцией — Bar()', function () {
                    assert.isFunction(
                        Bar
                    )
                })

                it('несет на себе определения свойств — Bar.properties', function () {
                    assert.isDefined(
                        Bar.properties
                    )
                    assert.equal(
                        'schema', Bar.properties.type
                    )
                })

            })

        })



        describe('Несет на себе модель свойства:', require('./properties/Property')(
            Schema.Property
        ))


    })

}}