var assert= require('chai').assert

module.exports= function (Schema) {

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

    var assertProperty= function (Property) { return function () {
        assert.isDefined(
            Property
        )
    }}

    var describeConstructorInstance= function (Constructor, instance) { return function () {
        it('should be an instance of Constructor', assertClassInstance(
            Constructor, instance
        ))
        describe('#constructor', function () {
            it('should be Constructor', function () {
                assert.equal(
                    Constructor, instance.constructor
                )
            })
        })
    }}

    var describeConstructor= function (Constructor) { return function () {
        it('should be a class', assertClass(
            Constructor
        ))
        describe('#Property', describeConstructorProperty(
            Constructor.Property
        ))
        describe('#properties', function () {
            it('should be defined', assertProperty(
                Constructor.properties
            ))
        })
        describe('new Constructor()', describeConstructorInstance(
            Constructor, new Constructor
        ))
    }}

    var describeConstructorProperty= require(
        './Property'
    )

    return function () {
        describe('Schema — конструктор схемы', describeConstructor(
            Schema
        ))
        describe('Foo= Schema()', function () {
            var Foo= Schema({
                type: Schema.Property({ value: 'Schema/Foo' }),
                f: Schema.Property({ value: 'foo' }),
            })
            describe('should be Schema constructor', describeConstructor(
                Foo
            ))
            describe('should be Foo constructor', function () {
                describe('#properties', function () {
                    describe('#type', function () {
                        it('should be defined', function () {
                            assert.instanceOf(
                                Foo.properties.type, Schema.Property
                            )
                            assert.equal(
                                Foo.properties.type.value, 'Schema/Foo'
                            )
                        })
                    })
                    describe('#f', function () {
                        it('should be defined', function () {
                            assert.instanceOf(
                                Foo.properties.f, Schema.Property
                            )
                            assert.equal(
                                Foo.properties.f.value, 'foo'
                            )
                        })
                    })
                })
            })
            describe('foo= new Foo', function () {
                var foo= new Foo
                describe('should be an instance of Foo', describeConstructorInstance(
                    Foo, foo
                ))
                describe('#type', function () {
                    it('should be defined', function () {
                        assert.equal(
                            foo.type, 'Schema/Foo'
                        )
                    })
                })
                describe('#f', function () {
                    it('should be defined', function () {
                        assert.equal(
                            foo.f, 'foo'
                        )
                    })
                })
            })
            describe('Bar= Foo()', function () {
                var Bar= Foo({
                    type: Schema.Property({ value: 'Schema/Foo/Bar' }),
                    f: Schema.Property({ value: 'foo-o' }),
                    b: Schema.Property({ value: 'bar' }),
                })
                describe('should be Schema constructor', describeConstructor(
                    Bar
                ))
                describe('should be Bar constructor', function () {
                    describe('#properties', function () {
                        describe('#type', function () {
                            it('should be defined', function () {
                                assert.instanceOf(
                                    Bar.properties.type, Schema.Property
                                )
                                assert.equal(
                                    Bar.properties.type.value, 'Schema/Foo/Bar'
                                )
                            })
                        })
                        describe('#f', function () {
                            it('should be defined', function () {
                                assert.instanceOf(
                                    Bar.properties.f, Schema.Property
                                )
                                assert.equal(
                                    Bar.properties.f.value, 'foo-o'
                                )
                            })
                        })
                        describe('#b', function () {
                            it('should be defined', function () {
                                assert.instanceOf(
                                    Bar.properties.b, Schema.Property
                                )
                                assert.equal(
                                    Bar.properties.b.value, 'bar'
                                )
                            })
                        })
                    })
                })
                describe('bar= new Bar', function () {
                    var bar= new Bar
                    describe('should be an instance of Bar', describeConstructorInstance(
                        Bar, bar
                    ))
                    describe('#type', function () {
                        it('should be defined', function () {
                            assert.equal(
                                bar.type, 'Schema/Foo/Bar'
                            )
                        })
                    })
                    describe('#f', function () {
                        it('should be defined', function () {
                            assert.equal(
                                bar.f, 'foo-o'
                            )
                        })
                    })
                    describe('#b', function () {
                        it('should be defined', function () {
                            assert.equal(
                                bar.b, 'bar'
                            )
                        })
                    })
                })
                describe('Baz= Bar()', function () {
                    var Baz= Bar({
                        type: Schema.Property({ value: 'Schema/Foo/Bar/Baz' }),
                        f: Schema.Property({ value: 'foo-oo-o' }),
                        b: Schema.Property({ value: 'baz' }),
                    })
                    describe('should be Schema constructor', describeConstructor(
                        Baz
                    ))
                    describe('should be Baz constructor', function () {
                        describe('#properties', function () {
                            describe('#type', function () {
                                it('should be defined', function () {
                                    assert.instanceOf(
                                        Baz.properties.type, Schema.Property
                                    )
                                    assert.equal(
                                        Baz.properties.type.value, 'Schema/Foo/Bar/Baz'
                                    )
                                })
                            })
                            describe('#f', function () {
                                it('should be defined', function () {
                                    assert.instanceOf(
                                        Baz.properties.f, Schema.Property
                                    )
                                    assert.equal(
                                        Baz.properties.f.value, 'foo-oo-o'
                                    )
                                })
                            })
                            describe('#b', function () {
                                it('should be defined', function () {
                                    assert.instanceOf(
                                        Baz.properties.b, Schema.Property
                                    )
                                    assert.equal(
                                        Baz.properties.b.value, 'baz'
                                    )
                                })
                            })
                        })
                    })
                    describe('baz= new Baz', function () {
                        var baz= new Baz
                        describe('should be an instance of Baz', describeConstructorInstance(
                            Baz, baz
                        ))
                        describe('#type', function () {
                            it('should be defined', function () {
                                assert.equal(
                                    baz.type, 'Schema/Foo/Bar/Baz'
                                )
                            })
                        })
                        describe('#f', function () {
                            it('should be defined', function () {
                                assert.equal(
                                    baz.f, 'foo-oo-o'
                                )
                            })
                        })
                        describe('#b', function () {
                            it('should be defined', function () {
                                assert.equal(
                                    baz.b, 'baz'
                                )
                            })
                        })
                    })
                })
            })
        })
        describe('Validation.', function () {
            //describe('Values for required properties should be defined.', function () {
            //    var Foo= Schema({
            //        f: Schema.Property({
            //            require:true
            //        })
            //    })
            //    describe('Instance with valid values:', function () {
            //        var foo= new Foo({
            //            f: 'foo'
            //        })
            //        it('should be constructed', function () {
            //            assert.instanceOf(
            //                foo, Foo
            //            )
            //            assert.equal(
            //                foo.f, 'foo'
            //            )
            //        })
            //    })
            //    describe('Instance with invalid values:', function () {
            //        it('should throw error', function (done) {
            //            try {
            //                var err= null
            //                var foo= new Foo({
            //                    f: null
            //                })
            //            } catch (e) {
            //                err= e
            //            } finally {
            //                assert.isUndefined(
            //                    foo
            //                )
            //                assert.instanceOf(
            //                    err, Schema.Property.BadValue
            //                )
            //                done()
            //            }
            //        })
            //    })
            //})
            //describe('Values for required properties with defaults should be defined or empty.', function () {
            //    var Foo= Schema({
            //        f: Schema.Property({
            //            require:true, value:'foo'
            //        })
            //    })
            //    describe('Instance without values:', function () {
            //        var foo= new Foo()
            //        it('should be constructed', function () {
            //            assert.instanceOf(
            //                foo, Foo
            //            )
            //            assert.equal(
            //                foo.f, 'foo'
            //            )
            //        })
            //        it('should throw error when setter obtain empty value', function (done) {
            //            try {
            //                var err= null
            //                foo.f= null
            //            } catch (e) {
            //                err= e
            //            } finally {
            //                assert.equal(
            //                    foo.f, 'foo'
            //                )
            //                assert.instanceOf(
            //                    err, Schema.Property.BadValue
            //                )
            //                done()
            //            }
            //        })
            //    })
            //})
            //describe('Values for typed properties should be right typed.', function () {
            //    it('should call type constructor', function (done) {
            //        var T= function (value, n) {
            //            if (!n) done()
            //        }
            //        var Foo= Schema({
            //            f: Schema.Property({
            //                require:true, type:T
            //            })
            //        })
            //        var foo= new Foo({
            //            f: new T('foo-o', true)
            //        })
            //        assert.instanceOf(
            //            foo.f, T
            //        )
            //        var foo= new Foo({
            //            f: 'foo-o'
            //        })
            //        assert.instanceOf(
            //            foo.f, T
            //        )
            //    })
            //})
        })
    }
}