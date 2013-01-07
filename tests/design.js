var Schema= require('../lib/Schema')



var Scm= Schema({
    p1: Schema.Property(),
    p2: Object,
    p3: Array,
    p4: String
})
var s= new Scm
console.log(
    s.p2 instanceof Object,
    s.p3 instanceof Array,
    s.p4 instanceof String, s.p4 instanceof Object
)



console.log(
    Schema instanceof Function,
    Schema.prototype === Schema.prototype.constructor.prototype
)



var Foo= Schema({
        f: Schema.Property({ default:'foo' }),
    })
  , foo= new Foo()

console.log(
    Foo instanceof Function,
    foo instanceof Foo, foo instanceof Schema,
    foo.f == 'foo'
)



var Bar= Foo({
        f: Schema.Property({ default:'foo-oo' }),
        b: Schema.Property({ default:'bar' }),
    })
  , bar= new Bar()

console.log(
    Bar instanceof Function,
    bar instanceof Bar, bar instanceof Foo, bar instanceof Schema,
    bar.f == 'foo-oo', bar.b == 'bar'
)



var Baz= Bar({
        f: Schema.Property({ default:'foo-oo-o' }),
        b: Schema.Property({ default:'baz' }),
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
    foo instanceof Foo, foo instanceof Schema,
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
    bar instanceof Bar, bar instanceof Foo, bar instanceof Schema,
    bar.f === 'foo', bar.b === 'bar'
)



var Baz= Bar({
    b: Schema.Property({default:'baz'}),
})

var baz= new Baz()

console.log(
    baz instanceof Baz, baz instanceof Foo, bar instanceof Schema,
    baz.f === 'foo', baz.b === 'baz'
)



console.info('\n\nКлассический способ определения класса\n')

var Model= function() {

    this.key= Schema.Property({ verbose:'путь к данным модели', require:true })
    this.loaded= Schema.Property({ default:false })

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
    model instanceof Model, model instanceof Schema,
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
    type: Schema.Property({ default:'sch' }),
    test: Schema.Property({ require:true }),
    children: Schema({
        type: Schema.Property({ default:'child0' }),
        children: Schema({
            type: Schema.Property({ default:'child1' }),
            children: Schema({
                type: Schema.Property({ default:'child2' })
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

var Phone= Schema({
    title: Schema.Property(),
    number: Schema.Property({
        required:true
    }),
})

var PhonesContainer= function(phones) {
    this.phones= []
    if (phones instanceof Array) {
        phones.map(function (phone) {
            this.push(phone)
        }, this)
    }
}
PhonesContainer.prototype.map= function () {
    this.phones.map.apply(this.phones, arguments)
    return this
}
PhonesContainer.prototype.push= function (data) {
    this.phones.push.call(this.phones,
        (data instanceof Phone) ? data : new Phone(data)
    )
    return this
}

var Contact= Schema({
    name: Schema.Property({
        type:String, required:true, default:'anonymous'
    }),
    phones: Schema.Property({
        type:PhonesContainer, // default:new PhonesContainer
    }),
})

var contact= new Contact({
    name:'Username',
    phones: [
        { title:'мобильный телефон', number:'31-33-73' },
        { title:'рабочий телефон', number:'+7 911 2 31-33-73' },
    ]
})

console.log(
    contact instanceof Contact, contact instanceof Schema
)
console.log(
    contact.phones instanceof PhonesContainer
)
contact.phones.map(function (phone) {
    console.log(
        phone instanceof Phone
    )
})



var Scm1= Schema({
    p1:Array
})
var Scm2= Scm1({
    p2:Array
})
var s1= new Scm1
  , s2= new Scm1
var s3= new Scm2
console.log(
    s1.p1 !== s2.p1,
    s3.p1 !== s1.p1
)


var S1= Schema({
    s1: Schema.Property()
})
S1.Classmethod= function () {}

var S11= S1({
    s11: Schema.Property()
})

console.log(
    S11.Classmethod === S1.Classmethod
)