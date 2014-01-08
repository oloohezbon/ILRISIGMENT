function Person(params)
{
	this.age = params.age;
	this.name = params.name;
}

Person.prototype.getAge = function()
{
	return this.age;
}

var student = new Person({name : 'oliver', age : 23});

console.log(student.getAge());