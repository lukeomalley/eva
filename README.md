# 🦉 Eva Lang

> Eva is a dialect of lisp implemented in JavaScript. This project was build with the purpose of understanding how an interpreter for a dialect of lisp works

## Examples

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
