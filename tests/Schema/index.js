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
        describe('#properties', function () {
            it('should be an object', function () {
                assert.isObject(
                    instance.properties
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
            var Foo= Schema({ type: 'Schema/Foo',
                f: Schema.Property({ default: 'foo' }),
            })
            describe('should be Schema constructor', describeConstructor(
                Foo
            ))
            describe('should be Foo constructor', function () {
                describe('#properties', function () {
                    describe('#type', function () {
                        it('should be defined', function () {
                            assert.equal(
                                Foo.properties.type, 'Schema/Foo'
                            )
                        })
                    })
                    describe('#f', function () {
                        it('should be defined', function () {
                            assert.instanceOf(
                                Foo.properties.f, Schema.Property
                            )
                            assert.equal(
                                Foo.properties.f.default, 'foo'
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
                describe('#properties', function () {
                    describe('#type', function () {
                        it('should be undefined', function () {
                            assert.isUndefined(
                                foo.properties.type
                            )
                        })
                    })
                    describe('#f', function () {
                        it('should be defined', function () {
                            assert.instanceOf(
                                foo.properties.f, Schema.Property
                            )
                            assert.equal(
                                foo.properties.f.default, 'foo'
                            )
                        })
                    })
                })
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
                var Bar= Foo({ type: 'Schema/Foo/Bar',
                    f: Schema.Property({ default: 'foo-o' }),
                    b: Schema.Property({ default: 'bar' }),
                })
                describe('should be Schema constructor', describeConstructor(
                    Bar
                ))
                describe('should be Bar constructor', function () {
                    describe('#properties', function () {
                        describe('#type', function () {
                            it('should be defined', function () {
                                assert.equal(
                                    Bar.properties.type, 'Schema/Foo/Bar'
                                )
                            })
                        })
                        describe('#f', function () {
                            it('should be defined', function () {
                                assert.instanceOf(
                                    Bar.properties.f, Schema.Property
                                )
                                assert.equal(
                                    Bar.properties.f.default, 'foo-o'
                                )
                            })
                        })
                        describe('#b', function () {
                            it('should be defined', function () {
                                assert.instanceOf(
                                    Bar.properties.b, Schema.Property
                                )
                                assert.equal(
                                    Bar.properties.b.default, 'bar'
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
                    describe('#properties', function () {
                        describe('#type', function () {
                            it('should be undefined', function () {
                                assert.isUndefined(
                                    bar.properties.type
                                )
                            })
                        })
                        describe('#f', function () {
                            it('should be defined', function () {
                                assert.instanceOf(
                                    bar.properties.f, Schema.Property
                                )
                                assert.equal(
                                    bar.properties.f.default, 'foo-o'
                                )
                            })
                        })
                        describe('#b', function () {
                            it('should be defined', function () {
                                assert.instanceOf(
                                    bar.properties.b, Schema.Property
                                )
                                assert.equal(
                                    bar.properties.b.default, 'bar'
                                )
                            })
                        })
                    })
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
                    var Baz= Bar({ type: 'Schema/Foo/Bar/Baz',
                        f: Schema.Property({ default: 'foo-oo-o' }),
                        b: Schema.Property({ default: 'baz' }),
                    })
                    describe('should be Schema constructor', describeConstructor(
                        Baz
                    ))
                    describe('should be Baz constructor', function () {
                        describe('#properties', function () {
                            describe('#type', function () {
                                it('should be defined', function () {
                                    assert.equal(
                                        Baz.properties.type, 'Schema/Foo/Bar/Baz'
                                    )
                                })
                            })
                            describe('#f', function () {
                                it('should be defined', function () {
                                    assert.instanceOf(
                                        Baz.properties.f, Schema.Property
                                    )
                                    assert.equal(
                                        Baz.properties.f.default, 'foo-oo-o'
                                    )
                                })
                            })
                            describe('#b', function () {
                                it('should be defined', function () {
                                    assert.instanceOf(
                                        Baz.properties.b, Schema.Property
                                    )
                                    assert.equal(
                                        Baz.properties.b.default, 'baz'
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
                        describe('#properties', function () {
                            describe('#type', function () {
                                it('should be undefined', function () {
                                    assert.isUndefined(
                                        baz.properties.type
                                    )
                                })
                            })
                            describe('#f', function () {
                                it('should be defined', function () {
                                    assert.instanceOf(
                                        baz.properties.f, Schema.Property
                                    )
                                    assert.equal(
                                        baz.properties.f.default, 'foo-oo-o'
                                    )
                                })
                            })
                            describe('#b', function () {
                                it('should be defined', function () {
                                    assert.instanceOf(
                                        baz.properties.b, Schema.Property
                                    )
                                    assert.equal(
                                        baz.properties.b.default, 'baz'
                                    )
                                })
                            })
                        })
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
            describe('Values for required properties should be defined.', function () {
                var Foo= Schema({
                    f: Schema.Property({
                        require:true
                    })
                })
                describe('Instance with valid values:', function () {
                    var foo= new Foo({
                        f: 'foo'
                    })
                    it('should be constructed', function () {
                        assert.instanceOf(
                            foo, Foo
                        )
                        assert.equal(
                            foo.f, 'foo'
                        )
                    })
                })
                describe('Instance with invalid values:', function () {
                    it('should throw error', function (done) {
                        try {
                            var err= null
                            var foo= new Foo({
                                f: null
                            })
                        } catch (e) {
                            err= e
                        } finally {
                            assert.isUndefined(
                                foo
                            )
                            assert.instanceOf(
                                err, Schema.Property.BadValue
                            )
                            done()
                        }
                    })
                })
            })
            describe('Values for required properties with defaults should be defined or empty.', function () {
                var Foo= Schema({
                    f: Schema.Property({
                        require:true, default:'foo'
                    })
                })
                describe('Instance without values:', function () {
                    var foo= new Foo()
                    it('should be constructed', function () {
                        assert.instanceOf(
                            foo, Foo
                        )
                        assert.equal(
                            foo.f, 'foo'
                        )
                    })
                    it('should throw error when setter obtain empty value', function (done) {
                        try {
                            var err= null
                            foo.f= null
                        } catch (e) {
                            err= e
                        } finally {
                            assert.equal(
                                foo.f, 'foo'
                            )
                            assert.instanceOf(
                                err, Schema.Property.BadValue
                            )
                            done()
                        }
                    })
                })
            })
        })
    }
}