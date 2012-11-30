var Schema= require('../lib/Schema')

console.log(
    Schema instanceof Function,
    Schema.prototype === Schema.prototype.constructor.prototype
)



var Foo= Schema({
        f:'foo'
    })
  , foo= new Foo()

console.log(
    Foo instanceof Function,
    foo instanceof Foo, foo instanceof Schema
)



var Bar= Foo({
        f:'foo-oo',
        b:'bar'
    })
  , bar= new Bar()

console.log(
    Bar instanceof Function,
    bar instanceof Bar, bar instanceof Foo, bar instanceof Schema,
    bar.f == 'foo-oo', bar.b == 'bar'
)



var Foo= Schema({
        f:'foo'
    })
  , foo= new Foo()

console.log(
    Foo instanceof Function,
    foo instanceof Foo, foo instanceof Schema
)



var Baz= Bar({
        f:'foo-oo-o',
        b:'baz'
    })
  , baz= new Baz()

console.log(
    Baz instanceof Function,
    baz instanceof Baz, baz instanceof Bar, baz instanceof Foo, baz instanceof Schema,
    baz.f == 'foo-oo-o', baz.b == 'baz'
)



var Model= function () {
    Schema.apply(this, arguments)
}
Model.prototype= Schema.prototype
Model.prototype.protoprop= true

var model= new Model()

console.log(model instanceof Model, model instanceof Schema, model.protoprop)



var Foo= Schema({
    f: Schema.Property({default:'foo'}),
})

var foo= new Foo()

console.log(
    foo instanceof Foo, foo instanceof Schema, !!foo.properties,
    foo.f == 'foo'
)

foo= new Foo({
    f:'fooooo',
})

console.log(
    foo.f === 'fooooo'
)

foo.f= 'foo'

var Bar= Foo({
    b: Schema.Property({default:'bar'}),
})

var bar= new Bar()

console.log(
    bar instanceof Bar, bar instanceof Foo, bar instanceof Schema, !!bar.properties,
    bar.f === 'foo', bar.b === 'bar'
)



var Baz= Bar({
    b: Schema.Property({default:'baz'}),
})

var baz= new Baz()

console.log(
    baz instanceof Baz, baz instanceof Foo, bar instanceof Schema, !!baz.properties,
    baz.f === 'foo', baz.b === 'baz'
)



console.info('\n\nКлассический способ определения класса\n')

var Model= function() {

    this.key= Schema.Property({ verbose:'путь к данным модели', require:true })

    this.loaded= false
    this.saved= true

    Schema.apply(this, arguments)
}
Model.prototype= Schema.prototype

console.log(
    Model instanceof Function
)



var model= null

try {
    model= new Model()
} catch (e) {
    console.log(
        e instanceof Schema.Property.BadValueError
    )
} finally {
    console.log(
        model === null
    )
}



var model= new Model({
    key:'path/to/data',
    loaded:true,

    other:'something'
})

console.log(
    model instanceof Model, model instanceof Schema, !!model.properties,
    model.key == 'path/to/data', model.loaded == true, model.other == 'something'
)

try {
    model.key= false
} catch (e) {
    console.log(
        e instanceof Schema.Property.BadValueError
    )
} finally {
    console.log(
        model.key !== false, model.key == 'path/to/data'
    )
}