# [some.js](http://somejs.org/) / schema
Язык моделирования и декларативного описания данных.

Используется для моделирования сложных иерархических структур данных простым наглядным способом в виде вложенных схем. Поддерживает наследование и переопределение свойств. Реализует возможность валидации значений.

 

Установить — ``` npm install https://github.com/freaking-awesome/some-schema/archive/master.tar.gz ```

Протестировать — ``` npm test ```

 

## Использование

### Определение схемы объекта

Например, определение некоторой иерархии схем:
```javascript

var Schema= require('some-schema')

var Foo= Schema({
    'f': 'foo',
})

var Bar= Foo({
    'b': Schema.Property({ default:'bar' }),
})

var Baz= Bar({
    'b': Schema.Property({ default:'baz' }),
})
```
Дочерняя схема наследует тип и определения свойств родителя.


### Инстанцирование экземпляра схемы

Вызов конструктора:
```javascript
var baz= new Baz({
    'f':'foo-oo-o',
    'o':'other',
})
```
Возвращает объект определенного типа с объявленными свойствами согласно схемы:

```javascript
assert(baz instanceof Schema === true)

assert(baz instanceof Baz === true, baz instanceof Bar === true, baz instanceof Foo === true)
```

Определения схемы доступно в экземпляре схемы в свойстве **properties**:
```javascript
assert( baz.properties )

assert( baz.properties.f.default === 'foo', baz.properties.f.value === 'foo-oo-o' )

assert( baz.properties.b.default === 'bar' )

assert( baz.properties.o === undefined )
```

 

## Документация
Будет [тут](http://api.somejs.org)

 

## API

 

# [Schema](https://github.com/freaking-awesome/some-schema/tree/master/lib/Schema)
Схема. Модель структуры данных.

 

##### Методы класса

### [Schema.factory]() (Parent, properties)
Производит конструктор схемы на основе родительского конструктора **parent**, расширеный указанными свойствами **properties**.

### [Schema.init]() (obj, properties, values)
Объявляет свойства в экземпляре схемы **obj** по определениям **properties**, и заполняет их значениями **values**.

 

# [Schema.Property](https://github.com/freaking-awesome/some-schema/tree/master/lib/Schema/models/Property)
Модель свойства схемы. Атомарная единица модели данных.

##### Параметры свойств 
* **require**, или **required** — указывает на то, что свойство обязательно должно иметь некое значение. Простейший валидатор.
* **validate** — функция проверки значения. Может менять устанавливаемое значение. Для неподходящего бросает исключение **BadValueError**

* **enumerable** — свойство должно быть видимо. По умолчанию — **false**.
* **configurable** — определение свойства можно изменить. По умолчанию — **false**.
* **writable** — значение можно изменить. По умолчанию — **false**.

 

##### Методы класса

### [Property.define]() (obj, k, descriptor)
Определяет свойство в указанном объекте **obj** под именем **k** согласно определению **descriptor**.

### [Property.map]() (source, iterator)
Получает дескрипторы свойств объекта **source** и передает их, и их имена в функцию **iterator(property, p)**
Если **iterator** не указан, — возвращает массив дескрипторов.

### [Property.copy]() (source, target)
Копирует свойства из объекта **source** в объект **target**.

 

##### Методы экземпляра

### [property.define]() (obj, p, options)
Определяет текущее свойство в указанном объекте **obj** под именем **p**.