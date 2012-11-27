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