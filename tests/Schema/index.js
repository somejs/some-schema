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



        describe('Классический способ определения модели', function () {

            var Model= function() {

                this.db= Schema.Property({ verbose:'база данных', require:true })
                this.key= Schema.Property({ verbose:'путь к данным модели в базе данных', require:true })

                this.loaded= false
                this.saved= true

                Schema.apply(this, arguments)
            }
            Model.prototype= Schema.prototype

            describe('Конструктор схемы', function () {
                it('бросает исключение, если значение требуемого свойства не передано', function () {
                    var model= null
                    try {
                        model= new Model({
                            db: {}, //key: 'path/to/data'
                        })
                    } catch (e) {
                        assert.instanceOf(
                            e, Schema.Property.BadValue
                        )
                    } finally {
                        assert.isNull(
                            model
                        )
                    }
                })
            })



            describe('Экземпляр схемы', function () {

                var db= {}
                var model= new Model({
                    db:db, key:'path/to/data',
                    loaded:true,

                    other:'something',
                    empty:null,
                })

                it('имеет определенный тип', function () {
                    assert.instanceOf(
                        model, Model
                    )
                    assert.instanceOf(
                        model, Schema
                    )
                })

                it('имеет объявленные свойства', function () {
                    assert.isDefined(
                        model.db
                    )
                    assert.isDefined(
                        model.key
                    )
                    assert.isDefined(
                        model.loaded
                    )
                    assert.isDefined(
                        model.other
                    )
                    assert.isDefined(
                        model.empty
                    )
                })
                it('содержит переданные значения', function () {
                    assert.equal(
                        'path/to/data', model.key
                    )
                    assert.equal(
                        db, model.db
                    )
                    assert.equal(
                        true, model.loaded
                    )
                    assert.equal(
                        'something', model.other
                    )
                    assert.equal(
                        null, model.empty
                    )
                })



                describe('имеет контейнер с объявлениями свойств, который', function () {
                    it('является объектом', function () {
                        assert.isObject(
                            model.properties
                        )
                    })
                    it('содержит объявления свойств, чьи дескрипторы — экземпляры Schema.Property', function () {
                        assert.isDefined(
                            model.properties.db
                        )
                        assert.instanceOf(
                            model.properties.db, Schema.Property
                        )

                        assert.isDefined(
                            model.properties.key
                        )
                        assert.instanceOf(
                            model.properties.key, Schema.Property
                        )
                    })
                    it('остальных объявлений не содержит', function () {
                        assert.isUndefined(
                            model.properties.loaded
                        )
                        assert.isUndefined(
                            model.properties.other
                        )
                        assert.isUndefined(
                            model.properties.empty
                        )
                    })

                })



            })

        })



    })
}}