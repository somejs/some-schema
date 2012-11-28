# [Some.js](http://somejs.org/) / [Schema](https://github.com/freaking-awesome/some-schema/tree/master/lib/Schema) / Property
Свойство схемы. Атомарная единица модели данных.

Представляет собой js-совместимый дескриптор свойства.

Может быть сконструировано из js-дескриптора:
```javascript
descriptor= new Schema.Property(
    Object.getOwnPropertyDescriptor(obj, 'foo')
)
```

И может быть использовано в качестве js-дескриптора:
```javascript
descriptor= Schema.Property(
    Object.defineProperty(obj, 'foo', new Schema.Property(
        configurable:true, default:null
    ))
)
```

Если при инстанцировании модели свойства не указано его значение, — ```decriptor.value```, — тогда дескриптор будет создан с закрытым от прямого изменения, — с помощь сеттера и геттера, — значением ```null```

 

## API

 

##### Параметры свойств схемы
* **require**, или **required** — указывает на то, что свойство обязательно должно иметь некое значение. Простейший валидатор.
* **validate** — функция проверки значения. Может менять устанавливаемое значение. Для неподходящего бросает исключение ```BadValueError```

##### Нативные параметры js-свойств
* **enumerable** — свойство должно быть видимо. По умолчанию — ```false```
* **configurable** — определение свойства можно изменить. По умолчанию — ```false```
* **writable** — значение можно изменить. По умолчанию — ```false```

 

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