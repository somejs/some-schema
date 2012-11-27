# [Some.js](http://somejs.org/) / Schema
Схема. Модель структуры данных.

 

## API

 

##### Модели

# [Schema.Property](https://github.com/freaking-awesome/some-schema/tree/master/lib/Schema/models/Property)
Модель свойства схемы. Атомарная единица модели данных.

 

##### Методы класса

### [Schema.factory](https://github.com/freaking-awesome/some-schema/blob/master/lib/Schema/index.js#L38) (Parent, properties)
Производит конструктор схемы на основе родительского конструктора **parent**, расширеный указанными свойствами **properties**.

### [Schema.init](https://github.com/freaking-awesome/some-schema/blob/master/lib/Schema/index.js#L69) (obj, properties, values)
Объявляет свойства в экземпляре схемы **obj** по определениям **properties**, и заполняет их значениями **values**.