var assert= require('chai').assert

module.exports= function (Schema) { return function () {



    describe('Schema constructor: ...', function () {

        it('... should be a function', function () {
            assert.isFunction(Schema)
        })

        it('... should instantiate schema', function () {

            var schema= new Schema()

            assert.isObject(schema)
            assert.instanceOf(schema, Schema)
        })

    })



    describe('Schema instance: ...', function () {

        var schema= new Schema(undefined, {
            'foo': new Schema.Property(String)
        })

        it('... should have defined properies', function () {
            assert.isNull(schema.foo)
            assert.isUndefined(schema.bar)
        })

        describe('Schema#init(values, properties):', function () {
            var schema= new Schema()

            schema.init(undefined, {
                'bar': new schema.constructor.Property(String),
                'baz': new schema.constructor.Property(String)
            })

            it('should define properies and initialize values', function () {

                assert.isUndefined(schema.foo)
                assert.isNull(schema.bar)
                assert.isNull(schema.baz)

                schema.init(undefined, {
                    'foo': new schema.constructor.Property(Number)
                })
                assert.isNull(schema.foo)

                schema.init({foo:'1', bar:'2', baz:'3'}, {
                    'foo': new schema.constructor.Property(Number)
                })

                assert.strictEqual(schema.foo, 1)
                assert.strictEqual(schema.bar, null)
                assert.strictEqual(schema.baz, null)

                schema.init({foo:'1', bar:'2', baz:'3'}, {
                    'foo': new schema.constructor.Property(String),
                    'bar': new schema.constructor.Property(String),
                    'baz': new schema.constructor.Property(String)
                })

                assert.strictEqual(schema.foo, '1')
                assert.strictEqual(schema.bar, '2')
                assert.strictEqual(schema.baz, '3')
            })
        })

        describe('Schema#init(values):', function () {
            Schema.properties= {
                'foo': new Schema.Property(Number),
                'bar': new Schema.Property(Number),
                'baz': new Schema.Property(Number)
            }

            var schema= new Schema({foo:0})

            it('should initialize values of all defined properies', function () {

                assert.strictEqual(schema.foo, 0)
                assert.isNull(schema.bar)
                assert.isNull(schema.baz)

                schema.init({foo:'1', bar:'2', baz:'3'})

                assert.strictEqual(schema.foo, 1)
                assert.strictEqual(schema.bar, 2)
                assert.strictEqual(schema.baz, 3)
            })
        })
    })

}}
