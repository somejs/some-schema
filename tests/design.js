var Schema= require('../lib/Schema')

console.log(
    Schema instanceof Function,
    Schema.prototype === Schema.prototype.constructor.prototype
)



var Foo= Schema({
        lol: Schema.Property({ default:'lol' }),
        f:'foo'
    })
  , foo= new Foo({
        lol: 'ololo',
        f:'Foo'
    })

console.log(
    Foo instanceof Function,
    foo instanceof Foo, foo instanceof Schema,
    foo.lol == 'ololo', foo.f == 'Foo'
)



var Bar= Foo({
        lol: Schema.Property({ default:'ololo' }),
        f:'foo-oo',
        b:'bar'
    })
  , bar= new Bar()

console.log(
    Bar instanceof Function,
    bar instanceof Bar, bar instanceof Foo, bar instanceof Schema,
    bar.f == 'foo-oo', bar.b == 'bar', bar.lol == 'ololo'
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

var model= new Model()
console.log(
    model instanceof Model, model instanceof Schema
)



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



var Sch= Schema({
    type:'sch',
    test: Schema.Property({ require:true }),
    children: Schema({
        type:'child0',
        children: Schema({
            type:'child1',
            children: Schema({
                type:'child2'
            })
        })
    })
})
var sch= new Sch({
    test: true
})
console.log(
    sch instanceof Schema,
    sch instanceof Schema.Property,
    sch.children instanceof Schema,
    sch.children.type == 'child0',
    sch.children.children instanceof Schema,
    sch.children.children.type == 'child1',
    sch.children.children.children instanceof Schema,
    sch.children.children.children.type == 'child2'
)
sch.children= {
    type:'child-0',
    children: {
        type:'child-1',
        children: {
            type:'child-2'
        }
    }
}
console.log(
    sch.children.type == 'child-0',
    sch.children.children.type == 'child-1',
    sch.children.children.children.type == 'child-2'
)
console.log(
    sch.validate({
        type:'child-00',
        children: {
            type:'child-11',
            children: {
                type:'child-22',
                children: {

                }
            }
        }
    }),
    !sch.validate({
        type:'child-00',
        test: false,
    })
)