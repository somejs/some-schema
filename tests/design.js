var Schema= require('../lib/Schema')



console.log(
    Schema instanceof Function,
    Schema.prototype === Schema.prototype.constructor.prototype
)



var Foo= Schema({
        f: Schema.Property({ value:'foo' }),
    })
  , foo= new Foo()

console.log(
    Foo instanceof Function,
    foo instanceof Foo, foo instanceof Schema,
    foo.f == 'foo'
)



var Bar= Foo({
        f: Schema.Property({ value:'foo-oo' }),
        b: Schema.Property({ value:'bar' }),
    })
  , bar= new Bar()

console.log(
    Bar instanceof Function,
    bar instanceof Bar, bar instanceof Foo, bar instanceof Schema,
    bar.f == 'foo-oo', bar.b == 'bar'
)



var Baz= Bar({
        f: Schema.Property({ value:'foo-oo-o' }),
        b: Schema.Property({ value:'baz' }),
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
    f: Schema.Property({value:'foo'}),
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
    b: Schema.Property({value:'bar'}),
})

var bar= new Bar()

console.log(
    bar instanceof Bar, bar instanceof Foo, bar instanceof Schema,
    bar.f === 'foo', bar.b === 'bar'
)



var Baz= Bar({
    b: Schema.Property({value:'baz'}),
})

var baz= new Baz()

console.log(
    baz instanceof Baz, baz instanceof Foo, bar instanceof Schema,
    baz.f === 'foo', baz.b === 'baz'
)



var Sch= Schema({
    type: Schema.Property({ value:'sch' }),
    test: Schema.Property({ require:true }),
    children: Schema({
        type: Schema.Property({ value:'child0' }),
        children: Schema({
            type: Schema.Property({ value:'child1' }),
            children: Schema({
                type: Schema.Property({ value:'child2' })
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



//var Phone= Schema({
//    title: Schema.Property(),
//    number: Schema.Property({
//        required:true
//    }),
//})
//
//var PhonesContainer= function(phones) {
//    this.phones= []
//    if (phones instanceof Array) {
//        phones.map(function (phone) {
//            this.push(phone)
//        }, this)
//    }
//}
//PhonesContainer.prototype.map= function () {
//    this.phones.map.apply(this.phones, arguments)
//    return this
//}
//PhonesContainer.prototype.push= function (data) {
//    this.phones.push.call(this.phones,
//        (data instanceof Phone) ? data : new Phone(data)
//    )
//    return this
//}
//
//var Contact= Schema({
//    name: Schema.Property({ required:true,
//        value:'anonymous'
//    }),
//    phones: Schema.Property({
//        type:PhonesContainer, // default:new PhonesContainer
//    }),
//})
//
//var contact= new Contact({
//    name:'Username',
//    phones: [
//        { title:'мобильный телефон', number:'31-33-73' },
//        { title:'рабочий телефон', number:'+7 911 2 31-33-73' },
//    ]
//})
//
//console.log(
//    contact instanceof Contact, contact instanceof Schema
//)
//console.log(
//    contact.phones instanceof PhonesContainer
//)
//contact.phones.map(function (phone) {
//    console.log(
//        phone instanceof Phone
//    )
//})



// Свойству можно указать тип

var S1= Schema({
    b1: Schema.Property({
        value:true
    }),
    b2: Schema.Property({
        type:Boolean, value:true
    })
})

var s11= new S1
console.log(
    s11.b1 === true, s11.b2 === true
)

var s12= new S1({
    b1:false,
    b2:false 
})
console.log(
    s12.b2 === false, s12.b2 === false
)

// В качестве типа можно указать схему

var S2= Schema({
    s1: Schema.Property({
        type:S1, value:{
            b1: false,
            b2: false
        }
    }),
})

var s21= new S2
console.log(
    s21.s1 instanceof S1,
    s21.s1.b1 === false, s21.s1.b2 === false
)

var s22= new S2({
    s1: {
        b1: false,
        b2: true
    }
})
console.log(
    s22.s1 instanceof S1,
    s22.s1.b1 === false, s22.s1.b2 === true
)

// Можно объявить дерево схем

var S3= Schema({
    s1: Schema.Property({
        type:S1, value:{
            b1: true,
            b2: false
        }
    }),
    s2: Schema.Property({
        type:S2, value:{
            s1:{
                b1: false,
                b2: true
            }
        }
    })
})

var s31= new S3
console.log(
    s31.s1 instanceof S1,
    s31.s1.b1 === true, s31.s1.b2 === false
)
console.log(
    s31.s2 instanceof S2, s31.s2.s1 instanceof S1,
    s31.s2.s1.b1 === false, s31.s2.s1.b2 === true
)

var s31= new S3({
    s1: {
        b1: false,
    },
    s2:{
        s1:{
            b1: true
        }
    }
})
console.log(
    s31.s1 instanceof S1,
    s31.s1.b1 === false, s31.s1.b2 === false, 'мерджить переданное значения с объявленным'
)
console.log(
    s31.s2 instanceof S2, s31.s2.s1 instanceof S1,
    s31.s2.s1.b1 === true, s31.s2.s1.b2 === true
)

// Можно объявить тип коротким способом

var S4= Schema({
    b1: Schema.Property({
        type:Boolean
    }),
    b2: Boolean
})

console.log(
    'Boolean' === S4.properties.b1.type.name,
    'Boolean' === S4.properties.b2.type.name
)

var s41= new S4
console.log(
    s41.b1 === false, (s41.b1= true) && s41.b1 === true,
    s41.b2 === false, (s41.b2= true) && s41.b2 === true
)

// Нельзя установить значение неподходящего типа

var errors= []
try {
    s41.b1= undefined
} catch (e) {
    if (e instanceof Schema.Property.BadValue) {
        errors.push(e)
    }
}
console.log(
    1 === errors.length
)
try {
    s41.b1= null
    console.log(s41.b1)
} catch (e) {
    if (e instanceof Schema.Property.BadValue) {
        errors.push(e)
    }
}
console.log(
    2 === errors.length
)
try {
    s41.b1= ''
} catch (e) {
    if (e instanceof Schema.Property.BadValue) {
        errors.push(e)
    }
}
console.log(
    3 === errors.length
)

console.log(
    s41.constructor.properties.b1.validate(true),
    s41.constructor.properties.b1.validate(Boolean(true))
)

// В качестве типа можно указать конструктор

var T= function () {

}

var S5= Schema({
    p1: Schema.Property({
        type:T
    })
})

var s51= new S5
console.log(
    s51.p1 instanceof T,
    s51.p1= new T && s51.p1 instanceof T
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
    name: Schema.Property({ required:true,
        value:'anonymous'
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
    'Username' === contact.name
)
console.log(
    contact.phones instanceof PhonesContainer,
    contact.phones.phones.length === 2,
    contact.phones.phones[0] instanceof Phone,
    contact.phones.phones[1] instanceof Phone
)

console.info('\n\nКлассический способ определения класса\n')

var Model= function() {

    this.key= Schema.Property({ verbose:'путь к данным модели', require:true })
    this.loaded= Schema.Property({ value:false })

    Schema.apply(this, arguments)
}
Model.prototype= Schema.prototype

console.log(
    Model instanceof Function
)



//var model= null
//
//try {
//    model= new Model()
//} catch (e) {
//    console.log(
//        e instanceof Schema.Property.BadValueError
//    )
//} finally {
//    console.log(
//        model === null
//    )
//}



//var model= new Model({
//    key:'path/to/data',
//    loaded:true,
//    other:'something'
//})
//
//console.log(
//    model instanceof Model, model instanceof Schema,
//    model.key == 'path/to/data', model.loaded == true, model.other == 'something'
//)
//
//try {
//    model.key= false
//} catch (e) {
//    console.log(
//        e instanceof Schema.Property.BadValueError
//    )
//} finally {
//    console.log(
//        model.key !== false, model.key == 'path/to/data'
//    )
//}