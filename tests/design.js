var Schema= require('../lib/Schema')



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