# 🏔 Eva Lang

> Eva is a dialect of lisp implemented in JavaScript. This project was build with the purpose of understanding how an interpreter for a dialect of lisp works. The current implementation supports variables, loops, conditionals, fisrt class functions, lambda functions, closures, classes and modules.

## Usage

1. Clone the repository

2. Run the eva 'binary' with the '-e' flag to execute code passed on the command line or '-f' to execute an eva file.

### Execute an eva source code file

`./bin/eva -f fib.eva`

### Execute a simple statement in the console

`./bin/eva -e '(var x 10) (print x)'`

## Example Eva Code

Simple Arithmetic

```
(+ (* 3 2) 5) => 11

(- (- (* 5 3) 2) 3) => 10
```

Variables

```
(var x 5)

(print x) => 5
```

Conditionals

```
(var value (- 10))

(if (< value 0)
  (- value)
  (value)
)
```

Switch

```
(begin
  (var x 10)
  (switch ((= x 10) 100)
          ((> x 10) 200)
          (else     300)
  )
)
```

For Loops

```
(var result 0)

(for
  (var x 10)
  (> x 0)
  (-- x)
  (
    (++ result)
  )
)

result
```

Functions

```
(def square (x)
  (* x x)
)

(square 5)
```

Closures and First Class Functions

```
(var value 100)

(def calc (x y)
  (begin
    (var z (+ x y))

    (def inner (foo)
      (+ (+ foo z) value)
    )

    inner
  )
)

(var fn (calc 10 20))

(fn 30)
```

Lambda Functions

```
(def onClick (callback)
  (begin
    (var x 10)
    (var y 20)
    (callback (+ x y))
  )
)

(onClick (lambda (data) (* data 10)))
```

Classes and Inheritance

```
(class Point null
  (begin

    (def constructor (this x y)
      (begin
        (set (prop this x) x)
        (set (prop this y) y)
      )
    )

    (def calc (this)
      (begin
        (+ (prop this x) (prop this y))
      )
    )

  )
)

(class Point3D Point
  (begin

    (def constructor (this x y z)
      (begin
        ((prop (super Point3D) constructor) this x y)
        (set (prop this z) z)
      )
    )

    (def calc (this)
      (+ ((prop (super Point3D) calc) this) (prop this z))
    )

  )
)

(var p (new Point3D 10 20 30))
((prop p calc) p)
```
