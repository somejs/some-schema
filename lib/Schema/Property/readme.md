# [some-schema](http://somejs.org/schema) / [Schema](https://github.com/somejs/some-schema/tree/master/lib/Schema) / Property

Свойство схемы.

Может быть сконструирована из js-дескриптора:
```javascript
descriptor= new Schema.Property(
    Object.getOwnPropertyDescriptor(obj, 'foo')
)
```
И может быть использована в качестве js-дескриптора:
```javascript
Object.defineProperty(obj, 'foo', new Schema.Property(
    configurable:true, default:null
))
```

 
## API

 
# [Schema.Property](https://github.com/somejs/some-schema/tree/master/lib/Schema/Property)
Свойство схемы. Модель дескриптора свойства js-объекта.

##### Параметры определения свойства

**property.type** — конструктор, экземпляром которого должно являться значение свойства. Если значение не соответствует указанному типу, свойство пытается инстанцировать значение нужного типа с помощью имеющегося конструктора. Если не получается — бросает исключение ```BadValueError```.

**property.value** — значение свойства.

##### Нативные параметры свойства

**property.enumerable** — свойство должно быть видимо. По умолчанию — ```false```.

**property.configurable** — определение свойства можно изменить. По умолчанию — ```false```.

**property.writable** — значение можно изменить. По умолчанию — ```false```.

##### Методы класса

### [Property.define](https://github.com/somejs/some-schema/blob/master/lib/Schema/Property/index.js#L135) (obj, k, descriptor)
Определяет свойство в указанном объекте **obj** под именем **k** согласно определению **descriptor**.

### [Property.map](https://github.com/somejs/some-schema/blob/master/lib/Schema/Property/index.js#L149) (obj, iterator)
Получает дескрипторы свойств объекта **obj** и передает их, и их имена в функцию **iterator(property, k)**
Если **iterator** не указан, — возвращает массив дескрипторов.

### [Property.copy](https://github.com/somejs/some-schema/blob/master/lib/Schema/Property/index.js#L168) (src, obj)
Копирует свойства из объекта **src** в объект **obj**.

##### Методы экземпляра

### [property.define](https://github.com/somejs/some-schema/blob/master/lib/Schema/Property/index.js#L103) (obj, k)
Определяет текущее свойство в указанном объекте **obj** под именем **k**.

### [property.validate](https://github.com/somejs/some-schema/blob/master/lib/Schema/Property/index.js#L117) (value)
Проверяет значение **value** на соответствие требованиям свойства.

 
##### Экспортирует

# [Schema.Property.BadValue](https://github.com/somejs/some-schema/blob/master/lib/Schema/Property/index.js#L189)
Ошибка валидации значения.